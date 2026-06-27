"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import type { Offerta } from "@/lib/offerte";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
  .sub-body { font-family: 'DM Sans', sans-serif; background: #F5EEE1; min-height: 100vh; color: #1B1A18; }
  .sub-wrap { max-width: 520px; margin: 0 auto; padding: 40px 20px 80px; }
  .sub-header { text-align: center; margin-bottom: 32px; }
  .sub-logo { font-size: 20px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #1B1A18; }
  .sub-logo span { color: #00C8DB; }
  .sub-tag { display: inline-block; margin-top: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #00C8DB; background: rgba(0,200,219,0.12); padding: 4px 12px; border-radius: 100px; }
  .sub-card { background: #fff; border-radius: 16px; border: 1px solid #E6DCC9; overflow: hidden; margin-bottom: 14px; }
  .sub-card-head { padding: 14px 20px; border-bottom: 1px solid #F0E8D8; }
  .sub-card-head h3 { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9E9284; margin: 0; }
  .sub-item { display: flex; align-items: flex-start; justify-content: space-between; padding: 18px 20px; gap: 12px; }
  .sub-item-name { font-size: 16px; font-weight: 700; }
  .sub-item-sub { font-size: 12px; color: #6E665B; margin-top: 3px; line-height: 1.5; }
  .sub-item-price { text-align: right; flex-shrink: 0; }
  .sub-item-price .big { font-size: 28px; font-weight: 800; color: #00C8DB; line-height: 1; }
  .sub-item-price .per { font-size: 12px; color: #6E665B; }
  .sub-founder { background: rgba(0,200,219,0.08); border: 1px solid rgba(0,200,219,0.3); border-radius: 12px; padding: 12px 16px; margin-bottom: 14px; font-size: 13px; color: #04282B; line-height: 1.5; }
  .sub-founder strong { font-weight: 700; }
  .sub-features { background: #fff; border-radius: 16px; border: 1px solid #E6DCC9; padding: 18px 20px; margin-bottom: 14px; }
  .sub-features h3 { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9E9284; margin: 0 0 12px; }
  .sub-feat-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .sub-feat-list li { font-size: 14px; color: #1B1A18; display: flex; align-items: center; gap: 8px; }
  .sub-feat-list li::before { content: "✓"; color: #00C8DB; font-weight: 800; flex-shrink: 0; }
  .sub-email-card { background: #fff; border-radius: 16px; border: 1px solid #E6DCC9; padding: 20px; margin-bottom: 14px; }
  .sub-email-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9E9284; margin-bottom: 10px; }
  .sub-email-input { width: 100%; box-sizing: border-box; padding: 14px 16px; border: 1.5px solid #E6DCC9; border-radius: 12px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: #1B1A18; background: #FAFAF8; outline: none; transition: border-color 0.15s; }
  .sub-email-input:focus { border-color: #00C8DB; }
  .sub-payment-card { background: #fff; border-radius: 16px; border: 1px solid #E6DCC9; padding: 20px; margin-bottom: 14px; }
  .sub-payment-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #9E9284; margin-bottom: 14px; }
  .sub-btn { width: 100%; background: #E8743B; color: #fff; font-size: 16px; font-weight: 800; padding: 17px; border-radius: 14px; border: none; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
  .sub-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
  .sub-btn:disabled { opacity: 0.6; cursor: default; transform: none; filter: none; }
  .sub-secure { text-align: center; font-size: 11px; color: #9E9284; margin-top: 10px; }
  .sub-error { color: #d94f35; font-size: 13px; margin-bottom: 12px; text-align: center; background: #fff5f2; border: 1px solid #f5cfc6; border-radius: 10px; padding: 10px 16px; }
  .sub-legal { text-align: center; font-size: 11px; color: #B0A89C; margin-top: 24px; line-height: 1.8; }
  .sub-legal a { color: #9E9284; text-decoration: underline; }
  .sub-back { background: none; border: none; color: #6E665B; font-size: 13px; cursor: pointer; padding: 0; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }
  .sub-back:hover { color: #1B1A18; }
`;

function PaymentPhase({
  slug,
  email,
  clientSecret,
}: {
  slug: string;
  email: string;
  clientSecret: string;
}) {
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
        return_url: `${window.location.origin}/grazie?p=${slug}`,
        receipt_email: email,
      },
    });

    if (error) {
      setError(error.message ?? "Errore nel pagamento. Riprova.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="sub-payment-card">
        <div className="sub-payment-label">💳 Dati di pagamento</div>
        <PaymentElement />
      </div>
      {error && <p className="sub-error">{error}</p>}
      <button className="sub-btn" type="submit" disabled={loading || !stripe}>
        {loading ? "Attivazione in corso…" : "Attiva l'abbonamento →"}
      </button>
      <p className="sub-secure">🔒 Pagamento sicuro via Stripe · Carta, Apple Pay, Google Pay</p>
    </form>
  );
}

export default function CheckoutClientSub({ offerta }: { offerta: Offerta }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phase, setPhase] = useState<"email" | "payment">("email");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [intentError, setIntentError] = useState("");

  const isAnnual = offerta.recurring?.interval === "year";
  const interval = isAnnual ? "anno" : "mese";

  async function handleContinua(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setEmailError("Inserisci un'email valida per ricevere l'accesso.");
      return;
    }
    setEmailError("");
    setLoading(true);
    setIntentError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prodotto: offerta.slug, email: clean }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error ?? "Impossibile inizializzare il pagamento.");
      }
      setClientSecret(data.clientSecret);
      setPhase("payment");
    } catch (err) {
      setIntentError(err instanceof Error ? err.message : "Errore di connessione.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="sub-body">
        <div className="sub-wrap">

          <div className="sub-header">
            <div className="sub-logo">Dave<span>Gamba</span></div>
            <span className="sub-tag">Founder Price — bloccato a vita</span>
          </div>

          {/* Riepilogo prodotto */}
          <div className="sub-card">
            <div className="sub-card-head"><h3>Il tuo abbonamento</h3></div>
            <div className="sub-item">
              <div>
                <div className="sub-item-name">{offerta.emoji} {offerta.nome}</div>
                <div className="sub-item-sub">{offerta.descrizione}</div>
              </div>
              <div className="sub-item-price">
                <div className="big">€{offerta.prezzo}</div>
                <div className="per">/ {interval}</div>
              </div>
            </div>
          </div>

          {/* Banner founder */}
          <div className="sub-founder">
            <strong>Prezzo founder bloccato a vita.</strong> Chi entra ora paga €{offerta.prezzo}/{interval} per sempre — anche quando il prezzo salirà. Disdici quando vuoi, senza penali.
          </div>

          {/* Feature list */}
          <div className="sub-features">
            <h3>Incluso nel club</h3>
            <ul className="sub-feat-list">
              <li>Scheda nuova progressiva ogni mese</li>
              <li>Corsi focus (addominali, glutei, schiena…)</li>
              <li>Piani alimentari di Dave</li>
              <li>21 minuti al giorno, 3 volte a settimana</li>
              <li>Accesso immediato da qualsiasi dispositivo</li>
            </ul>
          </div>

          {phase === "email" ? (
            <form onSubmit={handleContinua}>
              <div className="sub-email-card">
                <div className="sub-email-label">✉️ La tua email per accedere</div>
                <input
                  className="sub-email-input"
                  type="email"
                  placeholder="nome@esempio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  autoComplete="email"
                />
                {emailError && <p style={{ color: "#d94f35", fontSize: 12, marginTop: 8, marginBottom: 0 }}>{emailError}</p>}
              </div>
              {intentError && <p className="sub-error">{intentError}</p>}
              <button className="sub-btn" type="submit" disabled={loading}>
                {loading ? "Un momento…" : "Continua al pagamento →"}
              </button>
              <p className="sub-secure">🔒 Pagamento sicuro via Stripe · Carta, Apple Pay, Google Pay</p>
            </form>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <button className="sub-back" onClick={() => setPhase("email")}>← Cambia email</button>
                <span style={{ fontSize: 13, color: "#6E665B" }}>{email}</span>
              </div>
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, locale: "it", appearance: { theme: "stripe", variables: { colorPrimary: "#00C8DB" } } }}
              >
                <PaymentPhase slug={offerta.slug} email={email} clientSecret={clientSecret} />
              </Elements>
            </>
          )}

          <p className="sub-legal">
            Abbonandoti accetti i nostri <Link href="/termini">Termini e Condizioni</Link> e la <Link href="/privacy">Privacy Policy</Link>.<br />
            L'abbonamento si rinnova automaticamente. Puoi disdire in qualsiasi momento.
          </p>

        </div>
      </div>
    </>
  );
}
