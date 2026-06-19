"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOfferta } from "@/lib/offerte";

// Tutti i prodotti si sbloccano nell'area Club: il cliente accede con
// l'email usata per pagare e vede sbloccato ciò che ha comprato.
const CLUB_URL = "https://davegamba.com/club";

const STYLES = `
  .gz-body { font-family: 'DM Sans', sans-serif; background: #f7f4ef; min-height: 100vh; color: #0a0a0a; }
  .gz-wrap { max-width: 560px; margin: 0 auto; padding: 56px 20px 80px; text-align: center; }
  .gz-check { width: 72px; height: 72px; border-radius: 50%; background: #00CBDB; color: #fff; font-size: 38px; line-height: 72px; margin: 0 auto 24px; }
  .gz-title { font-family: 'DM Serif Display', serif; font-size: 34px; margin: 0 0 8px; }
  .gz-sub { font-size: 15px; color: #666; line-height: 1.6; margin: 0 0 32px; }
  .gz-card { background: #fff; border: 1px solid #e8e2d8; border-radius: 16px; padding: 20px; margin-bottom: 14px; text-align: left; }
  .gz-card h3 { font-size: 16px; font-weight: 700; margin: 0 0 4px; }
  .gz-card p { font-size: 13px; color: #999; margin: 0 0 14px; }
  .gz-btn { display: inline-block; background: #00CBDB; color: #000; font-weight: 800; font-size: 15px; padding: 12px 22px; border-radius: 12px; text-decoration: none; }
  .gz-note { font-size: 13px; color: #888; margin-top: 24px; line-height: 1.6; }
  .gz-home { display: inline-block; margin-top: 28px; font-size: 14px; color: #888; text-decoration: underline; }
  .gz-fail-title { font-family: 'DM Serif Display', serif; font-size: 30px; margin: 0 0 8px; }
`;

function GrazieContent() {
  const params = useSearchParams();
  const status = params.get("redirect_status");
  const paymentIntent = params.get("payment_intent");
  const slug = params.get("p") ?? "sfida-estiva";
  const hasBump = params.get("b") === "1";

  const offerta = getOfferta(slug);

  // È un vero ritorno da Stripe? (Stripe aggiunge sempre questi parametri)
  const daStripe = Boolean(status) || Boolean(paymentIntent);
  // "succeeded" = ok subito · "processing" = ok ma in conferma (es. alcuni metodi)
  const pagato = status === "succeeded" || status === "processing";

  // Visita diretta alla pagina senza un ordine reale → nessuna finta conferma
  if (!daStripe) {
    return (
      <div className="gz-wrap">
        <h1 className="gz-fail-title">Nessun ordine da mostrare</h1>
        <p className="gz-sub">
          Questa pagina compare dopo un acquisto. Se hai appena comprato e non
          la vedi correttamente, controlla la mail di conferma.
        </p>
        <Link className="gz-btn" href="/sfida-estiva">Scopri la Sfida Estiva →</Link>
        <Link className="gz-home" href="/">← Torna alla home</Link>
      </div>
    );
  }

  if (!pagato) {
    return (
      <div className="gz-wrap">
        <div className="gz-check" style={{ background: "#e05555" }}>!</div>
        <h1 className="gz-fail-title">Pagamento non completato</h1>
        <p className="gz-sub">
          Qualcosa è andato storto e l'addebito non è andato a buon fine.
          Nessun importo è stato prelevato. Puoi riprovare in sicurezza.
        </p>
        <Link className="gz-btn" href={`/checkout/${slug}`}>Riprova il pagamento →</Link>
        <Link className="gz-home" href="/">← Torna alla home</Link>
      </div>
    );
  }

  return (
    <div className="gz-wrap">
      <div className="gz-check">✓</div>
      <h1 className="gz-title">Benvenuto a bordo</h1>
      <p className="gz-sub">Pagamento confermato. Hai sbloccato:</p>

      <div className="gz-card">
        <h3>✅ {offerta?.nome ?? "Il tuo prodotto"}</h3>
        {hasBump && offerta?.bump && <h3 style={{ marginTop: 10 }}>✅ {offerta.bump.nome}</h3>}
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Trovi tutto nella tua area personale, già sbloccato.
        </p>
      </div>

      <div className="gz-card">
        <h3>Come accedere</h3>
        <p>
          Entra nel Club e accedi con <strong>la stessa email</strong> che hai
          usato per pagare. Ti arriva un link diretto — nessuna password.
        </p>
        <a className="gz-btn" href={CLUB_URL}>Entra nel Club →</a>
      </div>

      <p className="gz-note">
        Ti abbiamo inviato anche un'email con le istruzioni. Non la trovi?
        Controlla spam e promozioni, o scrivi a <a href="mailto:info@davegamba.com">info@davegamba.com</a>.
      </p>
      <Link className="gz-home" href="/">← Torna alla home</Link>
    </div>
  );
}

export default function GraziePage() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="gz-body">
        <Suspense fallback={<div className="gz-wrap"><p className="gz-sub">Caricamento…</p></div>}>
          <GrazieContent />
        </Suspense>
      </div>
    </>
  );
}
