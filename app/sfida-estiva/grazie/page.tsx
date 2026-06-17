"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// TODO: sostituire con i link d'accesso reali quando Dave li fornisce
const ACCESS_SFIDA = "https://sfida.davegamba.com";
const ACCESS_ADDOMINALI = "https://PLACEHOLDER-corso-addominali";

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
  const hasBump = params.get("b") === "1";
  const success = status === "succeeded" || status === null;

  if (!success) {
    return (
      <div className="gz-wrap">
        <div className="gz-check" style={{ background: "#e05555" }}>!</div>
        <h1 className="gz-fail-title">Pagamento non completato</h1>
        <p className="gz-sub">
          Qualcosa è andato storto e l'addebito non è andato a buon fine.
          Nessun importo è stato prelevato. Puoi riprovare in sicurezza.
        </p>
        <Link className="gz-btn" href="/checkout">Riprova il pagamento →</Link>
        <Link className="gz-home" href="/">← Torna alla home</Link>
      </div>
    );
  }

  return (
    <div className="gz-wrap">
      <div className="gz-check">✓</div>
      <h1 className="gz-title">Benvenuto a bordo</h1>
      <p className="gz-sub">
        Pagamento confermato. Trovi i tuoi accessi qui sotto —
        e te li abbiamo inviati anche via email. Salvali.
      </p>

      <div className="gz-card">
        <h3>⚡ Sfida Estiva 21 Giorni</h3>
        <p>Accesso immediato al programma completo.</p>
        <a className="gz-btn" href={ACCESS_SFIDA}>Inizia la Sfida →</a>
      </div>

      {hasBump && (
        <div className="gz-card">
          <h3>🔥 Corso Addominali Completo</h3>
          <p>Tecnica, progressioni e il programma per addominali visibili.</p>
          <a className="gz-btn" href={ACCESS_ADDOMINALI}>Apri il corso →</a>
        </div>
      )}

      <p className="gz-note">
        Non trovi l'email? Controlla spam e promozioni.
        Per qualsiasi problema scrivi a <a href="mailto:info@davegamba.com">info@davegamba.com</a>.
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
