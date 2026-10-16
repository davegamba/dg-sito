// Consenso cookie — unica fonte di verita' per GA e Meta Pixel.
//
// Prima esistevano due strade parallele: il CookieBanner, che caricava il
// tracking solo dopo "Accetta tutti", e due <Script> incondizionati su
// /sfida-estiva e /coaching che lo caricavano comunque. Chi cliccava "Solo
// essenziali" veniva tracciato lo stesso, e chi accettava contava doppio.

export const CONSENT_KEY = "dg_cookie_consent";
export const CONSENT_EVENT = "dg-consent-granted";

export const CONSENT_AT_KEY = "dg_cookie_consent_at";
export const CONSENT_REOPEN_EVENT = "dg-consent-reopen";
// Le Linee guida del Garante (2021) chiedono di riproporre la scelta dopo circa 6 mesi.
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

/** Scelta salvata ("accepted" | "rejected") oppure "" se assente o scaduta.
 *  Le scelte salvate prima dell'introduzione della scadenza non hanno data e restano valide. */
export function readConsent(): string {
  if (typeof window === "undefined") return "";
  const v = localStorage.getItem(CONSENT_KEY) ?? "";
  if (!v) return "";
  const at = Number(localStorage.getItem(CONSENT_AT_KEY));
  if (at && Date.now() - at > CONSENT_MAX_AGE_MS) return "";
  return v;
}

export const PIXEL_ID = "1727789690815942";
export const GA_ID = "G-13K7EH5XM3";

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return readConsent() === "accepted";
}

/** Esegue `fn` subito se il consenso c'e' gia', altrimenti quando arriva.
 *  Ritorna la funzione di cleanup per il useEffect. */
export function onConsent(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (hasConsent()) {
    fn();
    return () => {};
  }
  const handler = () => fn();
  window.addEventListener(CONSENT_EVENT, handler, { once: true });
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
