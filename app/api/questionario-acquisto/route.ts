import { NextRequest, NextResponse } from "next/server";
import { rateLimit, DIECI_MINUTI } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DAVE_EMAIL = "davept.info@gmail.com";

// Ogni campo arriva da un form pubblico e finisce dentro l'HTML di una mail
// che legge Dave: senza escape chiunque ci infila un <a href> verso un sito
// suo e la mail sembra comunque legittima.
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Upload foto: whitelist di tipo e tetto di dimensione. Il `type` e il `name`
// del File arrivano dal client e non sono affidabili — l'estensione la
// decidiamo noi dal MIME, e il nome del file lo generiamo, cosi' nessun input
// utente finisce nel path di storage.
const FOTO_TIPI: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
};
const FOTO_MAX_BYTE = 8 * 1024 * 1024;

async function sendNotification(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "DaveGamba.com <info@davegamba.com>",
      to: [DAVE_EMAIL],
      subject,
      html,
    }),
  });
}

function row(label: string, value: string | null | undefined, dark = false) {
  const bg = dark ? "background:#1c1c1c;" : "";
  return `<tr style="${bg}"><td style="padding:8px 12px;color:#9a9a94;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#fafaf8;font-size:13px">${value || "—"}</td></tr>`;
}

export async function POST(req: NextRequest) {
  const limite = rateLimit(req, "questionario", 5, DIECI_MINUTI);
  if (limite) return limite;
  const formData = await req.formData();

  const nome = formData.get("nome") as string | null;
  const email = formData.get("email") as string | null;

  if (!nome || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Nome e email obbligatori" }, { status: 400 });
  }

  // `f` = valore grezzo, va nel DB. `fe` = valore escapato, va nell'HTML della
  // mail. Tenerli separati evita sia l'injection sia di salvare "&amp;" a DB.
  const f = (key: string) => (formData.get(key) as string | null) ?? "";
  const fe = (key: string) => esc(f(key));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // `foto_url` = path nel bucket, salvato a DB. `foto_link` = URL firmato
  // temporaneo, usato solo nella mail.
  let foto_url: string | null = null;
  let foto_link: string | null = null;

  if (supabaseUrl && supabaseKey) {
    try {
      const foto = formData.get("foto") as File | null;
      const ext = foto ? FOTO_TIPI[foto.type] : undefined;
      if (foto && foto.size > 0 && ext && foto.size <= FOTO_MAX_BYTE) {
        // Nome generato: niente input utente nel path di storage.
        const filename = `coaching/${Date.now()}_${crypto.randomUUID()}.${ext}`;
        const uploadRes = await fetch(
          `${supabaseUrl}/storage/v1/object/coaching-foto/${filename}`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              // Dal MIME che abbiamo validato, non da quello dichiarato dal client
              "Content-Type": foto.type,
            },
            body: await foto.arrayBuffer(),
          }
        );
        if (uploadRes.ok) {
          // Il bucket `coaching-foto` e' PRIVATO: l'URL /object/public/ che
          // c'era prima rispondeva 400 e il link "Visualizza foto" nella mail
          // era morto. Serve un URL firmato.
          foto_url = filename;
          try {
            const signRes = await fetch(
              `${supabaseUrl}/storage/v1/object/sign/coaching-foto/${filename}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  apikey: supabaseKey,
                  Authorization: `Bearer ${supabaseKey}`,
                },
                // 30 giorni: il tempo di leggere la mail con comodo
                body: JSON.stringify({ expiresIn: 60 * 60 * 24 * 30 }),
              }
            );
            if (signRes.ok) {
              const { signedURL } = await signRes.json();
              foto_link = `${supabaseUrl}/storage/v1${signedURL}`;
            }
          } catch { /* la riga a DB resta valida anche senza link firmato */ }
        }
      }

      await fetch(`${supabaseUrl}/rest/v1/coaching_questionari`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          nome, email,
          whatsapp: f("whatsapp"),
          data_nascita: f("data_nascita"),
          peso: f("peso"), altezza: f("altezza"), bia: f("bia"),
          braccio: f("braccio"), vita: f("vita"), coscia: f("coscia"),
          obiettivo: f("obiettivo"),
          frequenza: f("frequenza"),
          luogo: f("luogo"),
          allenamento_attuale: f("allenamento_attuale"),
          alimentazione: f("alimentazione"),
          cibi_preferiti: f("cibi_preferiti"),
          altro: f("altro"),
          foto_url,
          created_at: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("Errore salvataggio questionario:", e);
    }
  }

  await sendNotification(
    `📋 Nuovo questionario coaching — ${nome}`,
    `<div style="background:#0a0a0a;padding:40px 24px;font-family:sans-serif;max-width:640px;margin:0 auto">
      <h2 style="color:#fafaf8;font-size:22px;margin-bottom:4px">Nuovo questionario coaching</h2>
      <p style="color:#9a9a94;font-size:14px;margin-bottom:24px">Ricevuto da davegamba.com/questionario-acquisto</p>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">01 — Dati</td></tr>
        ${row("Nome", esc(nome))}
        ${row("Email", `<a href="mailto:${esc(email)}" style="color:#00CBDB">${esc(email)}</a>`, true)}
        ${row("WhatsApp", fe("whatsapp"))}
        ${row("Data di nascita", fe("data_nascita"), true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">02/03 — Misure</td></tr>
        ${row("Peso", fe("peso") + " kg")}
        ${row("Altezza", fe("altezza") + " cm", true)}
        ${row("BIA", fe("bia"))}
        ${row("Braccio", fe("braccio") + " cm", true)}
        ${row("Vita", fe("vita") + " cm")}
        ${row("Coscia", fe("coscia") + " cm", true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">05 — Obiettivo e allenamento</td></tr>
        ${row("Obiettivo", fe("obiettivo"))}
        ${row("Frequenza", fe("frequenza"), true)}
        ${row("Luogo", fe("luogo"))}
        ${row("Allenamento attuale", fe("allenamento_attuale"), true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">06 — Alimentazione</td></tr>
        ${row("Giornata tipo", fe("alimentazione"))}
        ${row("Cibi preferiti", fe("cibi_preferiti"), true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">07 — Altro</td></tr>
        ${row("Note", fe("altro"))}
        ${foto_link ? row("Foto", `<a href="${esc(foto_link)}" style="color:#00CBDB">Visualizza foto →</a>`, true) : ""}
      </table>
      <p style="color:#5a5a55;font-size:12px;margin-top:8px">© DaveGamba.com</p>
    </div>`
  );

  return NextResponse.json({ ok: true });
}
