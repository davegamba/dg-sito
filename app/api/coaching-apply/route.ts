import { NextRequest, NextResponse } from "next/server";
import { rateLimit, DIECI_MINUTI } from "@/lib/rate-limit";
import { notificaDave } from "@/lib/notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Solo i campi del form di /coaching/candidati. Senza whitelist si puo'
// scrivere un JSON arbitrariamente grande dentro la tabella.
const VALID_KEYS = [
  "data_nascita",
  "situazione_frustrazione",
  "obiettivo",
  "perche_no",
  "vita_con_fisico",
  "canale_call",
  "telefono",
  "consenso",
  "impegno",
] as const;
const MAX_LEN = 4000;

// Etichette leggibili per la mail: le chiavi grezze erano illeggibili.
const ETICHETTE: Record<string, string> = {
  data_nascita: "Data di nascita",
  telefono: "Telefono",
  canale_call: "Canale per la call",
  obiettivo: "Obiettivo",
  situazione_frustrazione: "Situazione attuale e frustrazione",
  perche_no: "Perché non ha funzionato finora",
  vita_con_fisico: "Come cambierebbe la sua vita",
  impegno: "Impegno (1-5)",
  consenso: "Consenso privacy",
};

// Salva la candidatura. Tabella dedicata e append-only: `leads` ha l'email
// UNIQUE, quindi chi si ricandidava (o era gia' lead da exit-popup) faceva
// fallire l'insert. Michela si e' candidata due volte a luglio.
async function salvaCandidatura(
  url: string,
  key: string,
  riga: Record<string, unknown>
): Promise<boolean> {
  try {
    const res = await fetch(`${url}/rest/v1/coaching_candidature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(riga),
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    return true;
  } catch (e) {
    console.error("[coaching-apply] salvataggio candidatura fallito:", e);
    return false;
  }
}

// L'email va anche nella lista generica. `on_conflict` esplicito: senza,
// PostgREST usa la primary key (un uuid sempre nuovo) e il duplicato di email
// esplode lo stesso con un 409.
async function aggiungiALista(url: string, key: string, nome: string, email: string) {
  try {
    await fetch(`${url}/rest/v1/leads?on_conflict=email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify({ name: nome, email, source: "coaching-application" }),
    });
  } catch (e) {
    console.error("[coaching-apply] inserimento in leads fallito:", e);
  }
}

export async function POST(req: NextRequest) {
  const limite = rateLimit(req, "coaching-apply", 5, DIECI_MINUTI);
  if (limite) return limite;

  const body = await req.json();
  const { nome, email, hp_riferimento, ...rest } = body;

  // Honeypot: campo invisibile, compilato solo dai bot. Il nome NON deve
  // somigliare a un campo reale (prima era `website` e l'autofill del browser
  // poteva riempirlo da solo, scartando candidature vere in silenzio).
  if (hp_riferimento) return NextResponse.json({ ok: true });

  if (!nome || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Nome e email obbligatori" }, { status: 400 });
  }

  const answers: Record<string, string> = {};
  for (const key of VALID_KEYS) {
    const v = rest[key];
    if (v === undefined || v === null) continue;
    answers[key] = (Array.isArray(v) ? v.join(", ") : String(v)).slice(0, MAX_LEN);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let salvata = false;
  if (supabaseUrl && supabaseKey) {
    salvata = await salvaCandidatura(supabaseUrl, supabaseKey, {
      nome,
      email,
      ...answers,
      created_at: new Date().toISOString(),
    });
    await aggiungiALista(supabaseUrl, supabaseKey, nome, email);
  } else {
    console.error("[coaching-apply] credenziali Supabase mancanti: candidatura non salvata");
  }

  const campi = Object.entries(answers)
    .map(([k, v]) => {
      const label = esc(ETICHETTE[k] ?? k);
      return `<tr><td style="padding:8px 12px;color:#9a9a94;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#fafaf8;font-size:13px">${esc(v)}</td></tr>`;
    })
    .join("");

  const { inviata } = await notificaDave(`🎯 Nuova candidatura coaching — ${nome}`, {
    html: `<div style="background:#0a0a0a;padding:40px 24px;font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#fafaf8;font-size:22px;margin-bottom:4px">Nuova candidatura coaching</h2>
      <p style="color:#9a9a94;font-size:14px;margin-bottom:24px">Ricevuta da davegamba.com/coaching</p>
      <table style="width:100%;border-collapse:collapse;background:#161616;border-radius:12px;overflow:hidden">
        <tr><td style="padding:8px 12px;color:#9a9a94;font-size:13px;white-space:nowrap">Nome</td><td style="padding:8px 12px;color:#fafaf8;font-size:14px;font-weight:600">${esc(nome)}</td></tr>
        <tr style="background:#1c1c1c"><td style="padding:8px 12px;color:#9a9a94;font-size:13px">Email</td><td style="padding:8px 12px"><a href="mailto:${esc(email)}" style="color:#00CBDB;font-size:14px">${esc(email)}</a></td></tr>
        ${campi}
      </table>
      ${salvata ? "" : `<p style="color:#e05555;font-size:12px;margin-top:16px">⚠️ Questa candidatura NON è stata salvata sul database: conservala da questa mail.</p>`}
      <p style="color:#5a5a55;font-size:12px;margin-top:24px">© DaveGamba.com</p>
    </div>`,
  });

  // Se nessuno dei due canali ha funzionato la candidatura e' persa: meglio
  // dirlo a chi l'ha compilata che mostrare "ricevuta" e buttarla via.
  if (!salvata && !inviata) {
    console.error("[coaching-apply] candidatura PERSA — né salvata né notificata:", email);
    return NextResponse.json(
      { ok: false, error: "Non siamo riusciti a registrare la candidatura. Riprova o scrivimi su Instagram." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
