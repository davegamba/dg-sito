import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DAVE_EMAIL = "davept.info@gmail.com";

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
      from: "DaveGamba.com <onboarding@resend.dev>",
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
  const formData = await req.formData();

  const nome = formData.get("nome") as string | null;
  const email = formData.get("email") as string | null;

  if (!nome || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Nome e email obbligatori" }, { status: 400 });
  }

  const f = (key: string) => (formData.get(key) as string | null) ?? "";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let foto_url: string | null = null;

  if (supabaseUrl && supabaseKey) {
    try {
      const foto = formData.get("foto") as File | null;
      if (foto && foto.size > 0) {
        const ext = foto.name.split(".").pop() ?? "jpg";
        const filename = `coaching/${Date.now()}_${nome.replace(/\s+/g, "_")}.${ext}`;
        const uploadRes = await fetch(
          `${supabaseUrl}/storage/v1/object/coaching-photos/${filename}`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": foto.type,
            },
            body: await foto.arrayBuffer(),
          }
        );
        if (uploadRes.ok) {
          foto_url = `${supabaseUrl}/storage/v1/object/public/coaching-photos/${filename}`;
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
        ${row("Nome", nome)}
        ${row("Email", `<a href="mailto:${email}" style="color:#00CBDB">${email}</a>`, true)}
        ${row("WhatsApp", f("whatsapp"))}
        ${row("Data di nascita", f("data_nascita"), true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">02/03 — Misure</td></tr>
        ${row("Peso", f("peso") + " kg")}
        ${row("Altezza", f("altezza") + " cm", true)}
        ${row("BIA", f("bia"))}
        ${row("Braccio", f("braccio") + " cm", true)}
        ${row("Vita", f("vita") + " cm")}
        ${row("Coscia", f("coscia") + " cm", true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">05 — Obiettivo e allenamento</td></tr>
        ${row("Obiettivo", f("obiettivo"))}
        ${row("Frequenza", f("frequenza"), true)}
        ${row("Luogo", f("luogo"))}
        ${row("Allenamento attuale", f("allenamento_attuale"), true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">06 — Alimentazione</td></tr>
        ${row("Giornata tipo", f("alimentazione"))}
        ${row("Cibi preferiti", f("cibi_preferiti"), true)}
      </table>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden;margin-bottom:16px">
        <tr><td colspan="2" style="padding:10px 12px;background:#00CBDB;color:#000;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">07 — Altro</td></tr>
        ${row("Note", f("altro"))}
        ${foto_url ? row("Foto", `<a href="${foto_url}" style="color:#00CBDB">Visualizza foto →</a>`, true) : ""}
      </table>
      <p style="color:#5a5a55;font-size:12px;margin-top:8px">© DaveGamba.com</p>
    </div>`
  );

  return NextResponse.json({ ok: true });
}
