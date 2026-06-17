"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PREZZO_SFIDA = 33;
const PREZZO_BUMP = 9;
const PREZZO_BUNDLE = 42;

const STYLES = `
  .ck-body { font-family: 'DM Sans', sans-serif; background: #f7f4ef; min-height: 100vh; color: #0a0a0a; }
  .ck-wrap { max-width: 560px; margin: 0 auto; padding: 40px 20px 80px; }
  .ck-header { text-align: center; margin-bottom: 32px; }
  .ck-logo { font-family: serif; font-size: 22px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
  .ck-subtitle { font-size: 13px; color: #888; margin-top: 6px; letter-spacing: 0.08em; text-transform: uppercase; }
  .ck-card { background: #fff; border-radius: 16px; border: 1px solid #e8e2d8; overflow: hidden; margin-bottom: 16px; }
  .ck-card-head { padding: 16px 20px; border-bottom: 1px solid #f0ebe2; }
  .ck-card-head h3 { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #999; margin: 0; }
  .ck-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; gap: 12px; }
  .ck-item-name { font-size: 15px; font-weight: 600; }
  .ck-item-sub { font-size: 12px; color: #999; margin-top: 2px; }
  .ck-item-price { font-size: 16px; font-weight: 700; color: #00CBDB; white-space: nowrap; }
  .ck-bump { border: 2px dashed #00CBDB; border-radius: 16px; background: #f0fdfe; margin-bottom: 16px; cursor: pointer; transition: background 0.15s; }
  .ck-bump:hover { background: #e5f9fb; }
  .ck-bump.active { background: #e0f8fb; border-style: solid; }
  .ck-bump-top { display: flex; align-items: center; gap: 10px; padding: 14px 18px 10px; }
  .ck-bump-arrow { font-size: 18px; color: #00CBDB; }
  .ck-bump-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #0a1a1e; }
  .ck-bump-body { padding: 0 18px 16px 42px; }
  .ck-bump-body h4 { font-size: 15px; font-weight: 700; margin: 0 0 4px; }
  .ck-bump-body p { font-size: 13px; color: #666; line-height: 1.5; margin: 0 0 8px; }
  .ck-bump-pricing { display: flex; align-items: center; gap: 8px; }
  .ck-bump-new { font-size: 18px; font-weight: 800; color: #00CBDB; }
  .ck-bump-old { font-size: 13px; color: #aaa; text-decoration: line-through; }
  .ck-bump-save { font-size: 11px; font-weight: 700; background: #00CBDB; color: #fff; padding: 2px 8px; border-radius: 100px; }
  .ck-checkbox { width: 20px; height: 20px; accent-color: #00CBDB; cursor: pointer; flex-shrink: 0; }
  .ck-total { background: #fff; border-radius: 16px; border: 1px solid #e8e2d8; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .ck-total-label { font-size: 15px; font-weight: 700; }
  .ck-total-price { font-family: serif; font-size: 32px; font-weight: 700; }
  .ck-payment-card { background: #fff; border-radius: 16px; border: 1px solid #e8e2d8; padding: 20px; margin-bottom: 16px; }
  .ck-payment-title { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #999; margin-bottom: 16px; }
  .ck-btn { width: 100%; background: linear-gradient(to bottom, #F7E27A, #F0C040); color: #000; font-size: 17px; font-weight: 800; padding: 18px; border-radius: 14px; border: none; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
  .ck-btn:hover { filter: brightness(1.05); transform: translateY(-1px); }
  .ck-btn:disabled { opacity: 0.6; cursor: default; transform: none; }
  .ck-secure { text-align: center; font-size: 11px; color: #aaa; margin-top: 12px; }
  .ck-error { color: #e05555; font-size: 13px; margin-bottom: 12px; text-align: center; }
  .ck-legal { text-align: center; font-size: 11px; color: #bbb; margin-top: 24px; line-height: 1.8; }
  .ck-legal a { color: #aaa; text-decoration: underline; }
`;

function CheckoutForm({ bump, totale }: { bump: boolean; totale: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/sfida-estiva/grazie`,
      },
    });

    if (error) {
      setError(error.message ?? "Errore nel pagamento. Riprova.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="ck-payment-card">
        <div className="ck-payment-title">💳 Dati di pagamento</div>
        <PaymentElement />
      </div>
      {error && <p className="ck-error">{error}</p>}
      <button className="ck-btn" type="submit" disabled={loading || !stripe}>
        {loading ? "Pagamento in corso…" : `Paga €${totale} in modo sicuro →`}
      </button>
      <p className="ck-secure">🔒 Pagamento sicuro via Stripe · Carta, Apple Pay, Google Pay</p>
    </form>
  );
}

export default function CheckoutPage() {
  const [bump, setBump] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);

  const totale = bump ? PREZZO_BUNDLE : PREZZO_SFIDA;

  // Crea/aggiorna il PaymentIntent quando cambia bump
  useEffect(() => {
    setLoadingIntent(true);
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bump }),
    })
      .then((r) => r.json())
      .then(({ clientSecret }) => {
        setClientSecret(clientSecret);
        setLoadingIntent(false);
      });
  }, [bump]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="ck-body">
        <div className="ck-wrap">

          <div className="ck-header">
            <div className="ck-logo">Dave Gamba</div>
            <div className="ck-subtitle">Checkout sicuro</div>
          </div>

          {/* Prodotto principale */}
          <div className="ck-card">
            <div className="ck-card-head"><h3>Il tuo ordine</h3></div>
            <div className="ck-item">
              <div>
                <div className="ck-item-name">⚡ Sfida Estiva 21 Giorni</div>
                <div className="ck-item-sub">Accesso immediato · Programma completo</div>
              </div>
              <div className="ck-item-price">€{PREZZO_SFIDA}</div>
            </div>
          </div>

          {/* Bump offer */}
          <div className={`ck-bump${bump ? " active" : ""}`} onClick={() => setBump(!bump)}>
            <div className="ck-bump-top">
              <input
                type="checkbox"
                className="ck-checkbox"
                checked={bump}
                onChange={(e) => { e.stopPropagation(); setBump(e.target.checked); }}
              />
              <span className="ck-bump-arrow">➜</span>
              <span className="ck-bump-label">Sì! Aggiungi il Corso Addominali</span>
            </div>
            <div className="ck-bump-body">
              <h4>Corso Addominali Completo</h4>
              <p>Tecnica corretta, progressioni e il programma definitivo per addominali visibili — senza distruggere la schiena.</p>
              <div className="ck-bump-pricing">
                <span className="ck-bump-new">€{PREZZO_BUMP}</span>
                <span className="ck-bump-old">€21</span>
                <span className="ck-bump-save">risparmi €12</span>
              </div>
            </div>
          </div>

          {/* Totale */}
          <div className="ck-total">
            <span className="ck-total-label">Totale</span>
            <span className="ck-total-price">€{totale}</span>
          </div>

          {/* Form pagamento embedded */}
          {clientSecret && !loadingIntent ? (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, locale: "it", appearance: { theme: "stripe" } }}
            >
              <CheckoutForm bump={bump} totale={totale} />
            </Elements>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#aaa", fontSize: 14 }}>
              Caricamento form pagamento…
            </div>
          )}

          <p className="ck-legal">
            Acquistando accetti i nostri <Link href="/termini">Termini e Condizioni</Link> e la <Link href="/privacy">Privacy Policy</Link>.
          </p>

        </div>
      </div>
    </>
  );
}
