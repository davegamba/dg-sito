import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Exit popup (cattura morbida solo-email, stile Sweat/Kayla):
// crea il contatto su Systeme e gli assegna "nurture-attivo" → parte il funnel
// di benvenuto (allenamento gratis → invito al Club). Salva anche su Supabase
// `leads` con source=exit-popup per segmentazione/analytics.
const NURTURE_TAG_ID = 2064505; // nurture-attivo

export async function POST(req: NextRequest) {
  const { email, website } = await req.json();

  // Honeypot: campo invisibile, compilato solo dai bot
  if (website) return NextResponse.json({ ok: true });

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Email non valida" }, { status: 400 });
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

  const errors: string[] = [];

  /* ── 1. SYSTEME.IO: crea contatto + tag nurture-attivo ── */
  const systemeKey = process.env.SYSTEME_API_KEY;
  if (systemeKey) {
    const sysHeaders = {
      "X-API-Key": systemeKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      let contactId: number | null = null;
      const createRes = await fetch("https://api.systeme.io/api/contacts", {
        method: "POST",
        headers: sysHeaders,
        body: JSON.stringify({ email }),
      });
      const createText = await createRes.text();
      if (createRes.ok) {
        try { contactId = JSON.parse(createText).id; } catch {}
      } else {
        console.log(`Systeme.io create ${createRes.status} (probabile contatto esistente)`);
      }

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

      await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
        method: "POST",
        headers: sysHeaders,
        body: JSON.stringify({ tagId: NURTURE_TAG_ID }),
      });
    } catch (e) {
      errors.push("systeme");
      console.error("Systeme.io error:", e);
    }
  } else {
    errors.push("systeme");
    console.error("Systeme.io error: SYSTEME_API_KEY mancante");
  }

  /* ── 2. SUPABASE: salva lead (source=exit-popup) ── */
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "resolution=ignore-duplicates",
        },
        body: JSON.stringify({ name: "", email, source: "exit-popup" }),
      });
      if (!res.ok) throw new Error(`Supabase ${res.status}`);
    } catch (e) {
      errors.push("supabase");
      console.error("Supabase error:", e);
    }
  }

  return NextResponse.json({ ok: errors.length === 0, errors });
}
