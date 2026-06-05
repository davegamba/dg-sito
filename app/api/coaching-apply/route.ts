import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nome, email, ...rest } = body;

  if (!nome || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Nome e email obbligatori" }, { status: 400 });
  }

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
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ name: nome, email, source: "coaching-application", answers: rest }),
      });
      if (!res.ok) throw new Error(`Supabase ${res.status}`);
    } catch (e) {
      console.error("Supabase error:", e);
      // non blocchiamo il submit — la candidatura è ricevuta comunque
    }
  }

  return NextResponse.json({ ok: true });
}
