// Notifiche email a Dave via Resend.
//
// Il mittente primario è sul nostro dominio, che deve essere VERIFICATO in
// Resend (record DNS SPF/DKIM). Se la verifica manca, Resend rifiuta ogni
// invio: è successo dal 4 agosto 2026, quando il mittente è passato da
// onboarding@resend.dev a info@davegamba.com senza che il dominio fosse
// verificato. Risultato: nessuna notifica per quasi un mese, in silenzio.
//
// Da qui il fallback: se il primario fallisce si riprova con il mittente di
// test di Resend, che funziona sempre ma SOLO verso l'indirizzo del titolare
// dell'account. Va bene per le notifiche a Dave, NON per le mail ai clienti
// (quelle richiedono per forza il dominio verificato).

const FROM_PRIMARIO = "DaveGamba.com <info@davegamba.com>";
const FROM_FALLBACK = "DaveGamba.com <onboarding@resend.dev>";

export const DAVE_EMAIL = "davept.info@gmail.com";

export type EsitoNotifica = { inviata: boolean; errore?: string };

type Corpo = { html: string; text?: never } | { text: string; html?: never };

async function invia(apiKey: string, from: string, subject: string, corpo: Corpo) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to: [DAVE_EMAIL], subject, ...corpo }),
  });
  if (res.ok) return null;
  return `${res.status} ${await res.text()}`;
}

export async function notificaDave(subject: string, corpo: Corpo): Promise<EsitoNotifica> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[notify] RESEND_API_KEY mancante: notifica non inviata —", subject);
    return { inviata: false, errore: "RESEND_API_KEY mancante" };
  }

  try {
    const errPrimario = await invia(apiKey, FROM_PRIMARIO, subject, corpo);
    if (!errPrimario) return { inviata: true };

    // Tipicamente dominio non verificato (403). Non perdiamo la notifica.
    console.error(`[notify] mittente primario rifiutato (${errPrimario}), riprovo con il fallback`);
    const errFallback = await invia(apiKey, FROM_FALLBACK, subject, corpo);
    if (!errFallback) return { inviata: true };

    console.error(`[notify] anche il fallback ha fallito (${errFallback}) — notifica persa:`, subject);
    return { inviata: false, errore: errFallback };
  } catch (e) {
    console.error("[notify] errore di rete verso Resend:", e);
    return { inviata: false, errore: String(e) };
  }
}
