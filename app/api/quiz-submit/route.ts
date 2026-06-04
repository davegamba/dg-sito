import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, answers } = await req.json();

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
      await fetch(`${supabaseUrl}/rest/v1/quiz_leads`, {
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
          answers,
          profile: determineProfile(answers),
          created_at: new Date().toISOString(),
        }),
      });
    } catch (e) {
      errors.push("supabase");
      console.error("Supabase error:", e);
    }
  }

  return NextResponse.json({ ok: true, errors });
}

function determineProfile(answers: Record<string, string | string[]>): string {
  const livello = answers["livello"] as string;
  const blocchi = (answers["blocchi"] as string[]) || [];
  if (livello === "avanzato") return "salto";
  if (blocchi.includes("tempo")) return "tempo";
  if (livello === "principiante") return "zero";
  return "stallo";
}
