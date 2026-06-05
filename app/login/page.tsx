"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (err) {
      setError("Qualcosa è andato storto. Riprova.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        .lg-wrap {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #080810;
          font-family: 'DM Sans', sans-serif;
        }
        .lg-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          background: linear-gradient(135deg, #00F0FF, #0077CC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          text-align: center;
        }
        .lg-sub {
          color: #666;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 48px;
          text-align: center;
        }
        .lg-card {
          background: #111118;
          border: 1px solid #1E1E2E;
          border-radius: 20px;
          padding: 40px 32px;
          width: 100%;
          max-width: 400px;
        }
        .lg-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #F0F0F0;
          margin: 0 0 8px;
        }
        .lg-desc {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 28px;
        }
        .lg-label {
          display: block;
          color: #888;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .lg-input {
          width: 100%;
          padding: 14px 16px;
          background: #0D0D18;
          border: 1px solid #2A2A3E;
          border-radius: 10px;
          color: #F0F0F0;
          font-size: 16px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          margin-bottom: 20px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lg-input:focus { border-color: #00CBDB; }
        .lg-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #00CBDB, #0077CC);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .lg-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .lg-error {
          background: #E8555520;
          border: 1px solid #E85555;
          border-radius: 8px;
          color: #E85555;
          font-size: 13px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }
        .lg-success {
          text-align: center;
        }
        .lg-success-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .lg-success-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #00CBDB;
          margin: 0 0 12px;
        }
        .lg-success-text {
          color: #888;
          font-size: 14px;
          line-height: 1.6;
        }
        .lg-footer {
          margin-top: 32px;
          color: #444;
          font-size: 12px;
          text-align: center;
        }
      `}</style>

      <div className="lg-wrap">
        <div className="lg-logo">DaveGamba</div>
        <div className="lg-sub">Area Personale</div>

        <div className="lg-card">
          {sent ? (
            <div className="lg-success">
              <div className="lg-success-icon">📬</div>
              <div className="lg-success-title">Controlla la mail</div>
              <p className="lg-success-text">
                Ti ho inviato un link di accesso a <strong style={{ color: "#F0F0F0" }}>{email}</strong>.
                <br /><br />
                Clicca il link per entrare. Scade tra 1 ora.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="lg-title">Accedi</div>
              <p className="lg-desc">
                Inserisci la tua mail. Ti mando un link — niente password.
              </p>
              {error && <div className="lg-error">{error}</div>}
              <label className="lg-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="lg-input"
                type="email"
                placeholder="tua@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button className="lg-btn" type="submit" disabled={loading || !email.trim()}>
                {loading ? "Invio in corso..." : "Invia link di accesso →"}
              </button>
            </form>
          )}
        </div>

        <div className="lg-footer">
          Non hai ancora acquistato nulla?{" "}
          <a href="/quiz" style={{ color: "#00CBDB", textDecoration: "none" }}>
            Parti dal quiz gratuito
          </a>
        </div>
      </div>
    </>
  );
}
