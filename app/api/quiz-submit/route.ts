import { NextRequest, NextResponse } from "next/server";
import { determineProfile } from "@/lib/quiz";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_KEYS = new Set(["obiettivo", "blocchi", "fisico", "tempo", "sessioni", "livello", "luogo"]);

export async function POST(req: NextRequest) {
  const { name, email, answers } = await req.json();

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "name e email obbligatori" }, { status: 400 });
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

  /* ── 2. SUPABASE ── */
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
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

