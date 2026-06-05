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

  /* ── 1. SYSTEME.IO ── */
  try {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("fields[first_name]", name);

    await fetch("https://4957-info.systeme.io/dc3ae16e", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
  } catch (e) {
    errors.push("systeme");
    console.error("Systeme.io error:", e);
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

    // 2b. Crea utente Auth (se non esiste già) e invia magic link per l'app
    try {
      // inviteUserByEmail crea l'utente se non esiste e manda il magic link
      await fetch(`${supabaseUrl}/auth/v1/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          email,
          data: { name },
          redirect_to: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://davegamba.com"}/auth/callback`,
        }),
      });
      // Non blocchiamo se fallisce — l'utente può sempre fare login manuale da /login
    } catch (e) {
      console.error("Supabase invite error:", e);
    }
  }

  return NextResponse.json({ ok: errors.length === 0, errors });
}

