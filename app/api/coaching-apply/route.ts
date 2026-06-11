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
    }
  }

  // Notifica email a Dave
  const campi = Object.entries(rest)
    .map(([k, v]) => `<tr><td style="padding:8px 12px;color:#9a9a94;font-size:13px;white-space:nowrap">${k}</td><td style="padding:8px 12px;color:#fafaf8;font-size:13px">${Array.isArray(v) ? (v as string[]).join(", ") : String(v ?? "—")}</td></tr>`)
    .join("");

  await sendNotification(
    `🎯 Nuova candidatura coaching — ${nome}`,
    `<div style="background:#0a0a0a;padding:40px 24px;font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#fafaf8;font-size:22px;margin-bottom:4px">Nuova candidatura coaching</h2>
      <p style="color:#9a9a94;font-size:14px;margin-bottom:24px">Ricevuta da davegamba.com/coaching</p>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden">
        <tr><td style="padding:8px 12px;color:#9a9a94;font-size:13px;white-space:nowrap">Nome</td><td style="padding:8px 12px;color:#fafaf8;font-size:14px;font-weight:600">${nome}</td></tr>
        <tr style="background:#1c1c1c"><td style="padding:8px 12px;color:#9a9a94;font-size:13px">Email</td><td style="padding:8px 12px"><a href="mailto:${email}" style="color:#00CBDB;font-size:14px">${email}</a></td></tr>
        ${campi}
      </table>
      <p style="color:#5a5a55;font-size:12px;margin-top:24px">© DaveGamba.com</p>
    </div>`
  );

  return NextResponse.json({ ok: true });
}
