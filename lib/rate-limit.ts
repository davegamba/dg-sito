import { NextRequest, NextResponse } from "next/server";

// Rate limit in memoria, per istanza serverless.
//
// Non è distribuito: su Vercel ogni lambda ha la sua mappa, quindi il limite
// reale è "N richieste per finestra PER ISTANZA". Basta e avanza contro lo
// spam da singolo IP (mail bombing su /api/coaching-apply, creazione contatti
// a raffica su Systeme), che è il caso che ci interessa. Per un attacco
// distribuito serve il Firewall di Vercel o Upstash — vedi CODE-REVIEW.
//
// La mappa non cresce all'infinito: ogni chiamata ripulisce le finestre scadute
// e c'è un tetto duro di voci, oltre il quale si azzera.

type Finestra = { count: number; reset: number };

const hits = new Map<string, Finestra>();
const MAX_VOCI = 10_000;

function pulisci(ora: number) {
  if (hits.size < MAX_VOCI) {
    for (const [k, v] of hits) if (v.reset <= ora) hits.delete(k);
    return;
  }
  hits.clear();
}

/** IP del chiamante. Su Vercel `x-forwarded-for` è impostato dal proxy e il
 *  primo elemento è l'IP reale del client. */
function ip(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "sconosciuto";
}

/**
 * Ritorna una NextResponse 429 se il chiamante ha superato il limite,
 * altrimenti `null` e la richiesta può proseguire.
 */
export function rateLimit(
  req: NextRequest,
  chiave: string,
  max: number,
  finestraMs: number
): NextResponse | null {
  const ora = Date.now();
  pulisci(ora);

  const id = `${chiave}:${ip(req)}`;
  const corrente = hits.get(id);

  if (!corrente || corrente.reset <= ora) {
    hits.set(id, { count: 1, reset: ora + finestraMs });
    return null;
  }

  corrente.count++;
  if (corrente.count > max) {
    const retryAfter = Math.ceil((corrente.reset - ora) / 1000);
    return NextResponse.json(
      { ok: false, error: "Troppe richieste. Riprova tra qualche minuto." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }
  return null;
}

export const DIECI_MINUTI = 10 * 60 * 1000;
