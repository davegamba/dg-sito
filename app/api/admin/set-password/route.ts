import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

// Endpoint temporaneo — da eliminare dopo l'uso
const SECRET = "dg2026admin";

export async function POST(req: NextRequest) {
  const { secret, email, password } = await req.json();

  if (secret !== SECRET) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();

  // Trova l'utente per email
  const { data: users, error: listErr } = await admin.auth.admin.listUsers();
  if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });

  const user = users.users.find(u => u.email === email.toLowerCase().trim());
  if (!user) return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });

  // Imposta la password
  const { error } = await admin.auth.admin.updateUserById(user.id, { password });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, message: "Password impostata con successo" });
}
