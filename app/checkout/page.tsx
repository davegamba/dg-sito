"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PREZZO_SFIDA = 33;
const PREZZO_BUMP = 9;
const PREZZO_BUNDLE = 42;

export default function CheckoutPage() {
  const [bump, setBump] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totale = bump ? PREZZO_BUNDLE : PREZZO_SFIDA;

  async function handlePaga() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bump }),
      });
      const { url } = await res.json();
      if (url) router.push(url);
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .ck-body { font-family: 'DM Sans', sans-serif; background: #f7f4ef; min-height: 100vh; color: #0a0a0a; }
        .ck-wrap { max-width: 560px; margin: 0 auto; padding: 40px 20px 80px; }
        .ck-header { text-align: center; margin-bottom: 32px; }
        .ck-logo { font-family: serif; font-size: 22px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #0a0a0a; }
        .ck-title { font-size: 13px; color: #888; margin-top: 6px; letter-spacing: 0.08em; text-transform: uppercase; }
        .ck-card { background: #fff; border-radius: 16px; border: 1px solid #e8e2d8; overflow: hidden; margin-bottom: 16px; }
        .ck-card-head { padding: 18px 20px; border-bottom: 1px solid #f0ebe2; display: flex; align-items: center; justify-content: space-between; }
        .ck-card-head h3 { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin: 0; }
        .ck-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; gap: 12px; }
        .ck-item-name { font-size: 15px; font-weight: 600; color: #0a0a0a; }
        .ck-item-sub { font-size: 12px; color: #999; margin-top: 2px; }
        .ck-item-price { font-size: 16px; font-weight: 700; color: #00CBDB; white-space: nowrap; }
        .ck-divider { height: 1px; background: #f0ebe2; margin: 0 20px; }
        .ck-bump { border: 2px dashed #00CBDB; border-radius: 16px; background: #f0fdfe; margin-bottom: 16px; overflow: hidden; cursor: pointer; transition: background 0.15s; }
        .ck-bump:hover { background: #e5f9fb; }
        .ck-bump.active { background: #e0f8fb; border-style: solid; }
        .ck-bump-top { display: flex; align-items: center; gap: 10px; padding: 14px 18px 10px; }
        .ck-bump-arrow { font-size: 18px; color: #00CBDB; }
        .ck-bump-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #0a1a1e; }
        .ck-bump-body { padding: 0 18px 16px 18px; display: flex; gap: 14px; align-items: flex-start; }
        .ck-bump-img { width: 72px; height: 72px; object-fit: cover; border-radius: 10px; flex-shrink: 0; background: #ddd; }
        .ck-bump-info h4 { font-size: 15px; font-weight: 700; margin: 0 0 4px; color: #0a0a0a; }
        .ck-bump-info p { font-size: 13px; color: #666; line-height: 1.5; margin: 0 0 8px; }
        .ck-bump-pricing { display: flex; align-items: center; gap: 8px; }
        .ck-bump-new { font-size: 18px; font-weight: 800; color: #00CBDB; }
        .ck-bump-old { font-size: 13px; color: #aaa; text-decoration: line-through; }
        .ck-bump-save { font-size: 11px; font-weight: 700; background: #00CBDB; color: #fff; padding: 2px 8px; border-radius: 100px; }
        .ck-checkbox { width: 20px; height: 20px; accent-color: #00CBDB; cursor: pointer; flex-shrink: 0; margin-top: 1px; }
        .ck-total { background: #fff; border-radius: 16px; border: 1px solid #e8e2d8; padding: 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .ck-total-label { font-size: 15px; font-weight: 700; color: #0a0a0a; }
        .ck-total-price { font-family: serif; font-size: 32px; font-weight: 700; color: #0a0a0a; }
        .ck-btn { width: 100%; background: linear-gradient(to bottom, #F7E27A, #F0C040); color: #000; font-size: 17px; font-weight: 800; padding: 18px; border-radius: 14px; border: none; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
        .ck-btn:hover { filter: brightness(1.05); transform: translateY(-1px); }
        .ck-btn:disabled { opacity: 0.6; cursor: default; transform: none; }
        .ck-secure { text-align: center; font-size: 11px; color: #aaa; margin-top: 12px; }
        .ck-legal { text-align: center; font-size: 11px; color: #bbb; margin-top: 24px; line-height: 1.7; }
        .ck-legal a { color: #aaa; text-decoration: underline; }
      `}</style>

      <div className="ck-body">
        <div className="ck-wrap">

          {/* Header */}
          <div className="ck-header">
            <div className="ck-logo">Dave Gamba</div>
            <div className="ck-title">Checkout sicuro</div>
          </div>

          {/* Prodotto principale */}
          <div className="ck-card">
            <div className="ck-card-head">
              <h3>Il tuo ordine</h3>
            </div>
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
              <div className="ck-bump-info">
                <h4>Corso Addominali Completo</h4>
                <p>Tecnica corretta, progressioni e il programma definitivo per addominali visibili — senza distruggere la schiena.</p>
                <div className="ck-bump-pricing">
                  <span className="ck-bump-new">€{PREZZO_BUMP}</span>
                  <span className="ck-bump-old">€21</span>
                  <span className="ck-bump-save">risparmi €12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Totale */}
          <div className="ck-total">
            <span className="ck-total-label">Totale</span>
            <span className="ck-total-price">€{totale}</span>
          </div>

          {/* CTA */}
          <button className="ck-btn" onClick={handlePaga} disabled={loading}>
            {loading ? "Reindirizzamento…" : `Paga €${totale} in modo sicuro →`}
          </button>
          <p className="ck-secure">🔒 Pagamento sicuro via Stripe · Carta, Apple Pay, Google Pay</p>

          <p className="ck-legal">
            Acquistando accetti i nostri <Link href="/termini">Termini e Condizioni</Link> e la <Link href="/privacy">Privacy Policy</Link>.
          </p>

        </div>
      </div>
    </>
  );
}
