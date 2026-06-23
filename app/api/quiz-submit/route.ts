import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";
import { determineProfile } from "@/lib/quiz";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_KEYS = new Set(["obiettivo", "blocchi", "fisico", "tempo", "sessioni", "livello", "luogo"]);

export async function POST(req: NextRequest) {
  const { name, email, answers, website } = await req.json();

  // Honeypot: campo invisibile agli utenti, compilato solo dai bot
  if (website) return NextResponse.json({ ok: true });

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "name e email obbligatori" }, { status: 400 });
  }

  // Verifica MX del dominio — timeout 2s, se non risponde lascia passare
  const domain = email.split("@")[1];
  try {
    const mx = await Promise.race([
      dns.resolveMx(domain),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 2000)),
    ]);
    if (!mx.length) return NextResponse.json({ ok: false, error: "Email non valida" }, { status: 400 });
  } catch (e) {
    if ((e as Error).message !== "timeout") {
      return NextResponse.json({ ok: false, error: "Email non valida" }, { status: 400 });
    }
  }

  // Filtra solo le chiavi attese per non salvare payload arbitrari
  const safeAnswers: Record<string, unknown> = {};
  if (answers && typeof answers === "object") {
    for (const key of VALID_KEYS) {
      if (key in answers) safeAnswers[key] = answers[key];
    }
  }

  const errors: string[] = [];

  /* ── 1. SYSTEME.IO (API ufficiale: crea contatto + assegna tag) ── */
  // Tag: profilo-fisico (lead quiz) + nurture-attivo (accende il funnel di benvenuto)
  const SYSTEME_TAG_IDS = [2064441, 2064505];
  const systemeKey = process.env.SYSTEME_API_KEY;

  if (systemeKey) {
    const sysHeaders = {
      "X-API-Key": systemeKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      // 1a. Crea il contatto (409 = esiste già, va bene)
      let contactId: number | null = null;
      const createRes = await fetch("https://api.systeme.io/api/contacts", {
        method: "POST",
        headers: sysHeaders,
        body: JSON.stringify({ email, firstName: name }),
      });
      const createText = await createRes.text();
      if (createRes.ok) {
        try { contactId = JSON.parse(createText).id; } catch {}
      } else {
        // 422/409 = contatto già esistente: non è un errore, lo cerchiamo sotto.
        console.log(`Systeme.io create ${createRes.status} (probabile contatto esistente)`);
      }

      // 1b. Recupera l'ID se il contatto esisteva già
      if (!contactId) {
        const findRes = await fetch(
          `https://api.systeme.io/api/contacts?email=${encodeURIComponent(email)}`,
          { headers: sysHeaders },
        );
        if (findRes.ok) {
          const data = await findRes.json();
          contactId = (data.items || [])[0]?.id ?? null;
        }
      }
      if (!contactId) throw new Error("contactId non trovato");

      // 1c. Assegna i tag per ID
      for (const tagId of SYSTEME_TAG_IDS) {
        await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
          method: "POST",
          headers: sysHeaders,
          body: JSON.stringify({ tagId }),
        });
      }
    } catch (e) {
      errors.push("systeme");
      console.error("Systeme.io error:", e);
    }
  } else {
    errors.push("systeme");
    console.error("Systeme.io error: SYSTEME_API_KEY mancante");
  }

  /* ── 2. SUPABASE — salva lead + crea utente Auth ── */
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    // 2a. Salva in quiz_leads
    try {
      const supabaseRes = await fetch(`${supabaseUrl}/rest/v1/quiz_leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          email,
          answers: safeAnswers,
          profile: determineProfile(safeAnswers as Record<string, string | string[]>),
          created_at: new Date().toISOString(),
        }),
      });
      if (!supabaseRes.ok) throw new Error(`Supabase ${supabaseRes.status}`);
    } catch (e) {
      errors.push("supabase");
      console.error("Supabase error:", e);
    }
  }

  return NextResponse.json({ ok: errors.length === 0, errors });
}

