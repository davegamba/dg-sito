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
        emailRedirectTo: `https://davegamba.com/auth/callback`,
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-wrap {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Sfondo palme */
        .lg-bg {
          position: fixed;
          inset: 0;
          background-image: url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/palmeBg.jpeg');
          background-size: cover;
          background-position: center top;
          z-index: 0;
        }
        .lg-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(10,6,3,0.85);
        }

        /* Contenuto */
        .lg-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Logo */
        .lg-logo-wrap {
          text-align: center;
          margin-bottom: 40px;
        }
        .lg-logo-eyebrow {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(200,150,62,0.55);
          margin-bottom: 6px;
        }
        .lg-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 38px;
          color: #F5F0E8;
          line-height: 1;
        }
        .lg-logo em { font-style: italic; color: #C8963E; }

        /* Card vetro */
        .lg-card {
          width: 100%;
          background: rgba(14,9,4,0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(200,150,62,0.18);
          border-radius: 24px;
          padding: 40px 32px;
        }

        .lg-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #F5F0E8;
          margin: 0 0 8px;
        }
        .lg-desc {
          color: rgba(245,240,232,0.4);
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 28px;
          font-weight: 300;
        }
        .lg-label {
          display: block;
          color: rgba(200,150,62,0.6);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .lg-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(200,150,62,0.15);
          border-radius: 12px;
          color: #F5F0E8;
          font-size: 16px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          margin-bottom: 20px;
          transition: border-color 0.2s;
        }
        .lg-input::placeholder { color: rgba(245,240,232,0.2); }
        .lg-input:focus { border-color: rgba(200,150,62,0.45); }

        .lg-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #D4A84B, #C8963E);
          border: none;
          border-radius: 12px;
          color: #0A0603;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lg-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .lg-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .lg-error {
          background: rgba(232,85,85,0.1);
          border: 1px solid rgba(232,85,85,0.3);
          border-radius: 10px;
          color: #E85555;
          font-size: 13px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }

        /* Divider */
        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 0;
        }
        .lg-divider-line { flex: 1; height: 1px; background: rgba(200,150,62,0.1); }
        .lg-divider-text { font-size: 11px; color: rgba(245,240,232,0.2); letter-spacing: 0.05em; }

        /* Success */
        .lg-success { text-align: center; }
        .lg-success-icon { font-size: 52px; margin-bottom: 16px; }
        .lg-success-title {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          color: #F5F0E8;
          margin: 0 0 12px;
        }
        .lg-success-text {
          color: rgba(245,240,232,0.45);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 300;
        }
        .lg-success-text strong { color: #F5F0E8; font-weight: 500; }

        /* Footer */
        .lg-footer {
          position: relative;
          z-index: 5;
          margin-top: 28px;
          color: rgba(245,240,232,0.25);
          font-size: 12px;
          text-align: center;
          line-height: 1.6;
        }
        .lg-footer a { color: rgba(200,150,62,0.6); text-decoration: none; transition: color 0.2s; }
        .lg-footer a:hover { color: #C8963E; }
      `}</style>

      <div className="lg-wrap">
        <div className="lg-bg" />

        <div className="lg-content">
          {/* Logo */}
          <div className="lg-logo-wrap">
            <div className="lg-logo-eyebrow">DG Athletic Club</div>
            <div className="lg-logo">Dave <em>Gamba</em></div>
          </div>

          {/* Card */}
          <div className="lg-card">
            {sent ? (
              <div className="lg-success">
                <div className="lg-success-icon">📬</div>
                <div className="lg-success-title">Controlla la mail</div>
                <p className="lg-success-text">
                  Ti ho inviato un link di accesso a{" "}
                  <strong>{email}</strong>.
                  <br /><br />
                  Clicca il link per entrare nell&apos;area personale. Scade tra 1 ora.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="lg-title">Accedi</div>
                <p className="lg-desc">
                  Inserisci la tua email. Ti mando un link — niente password.
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

                <div className="lg-divider">
                  <div className="lg-divider-line" />
                  <span className="lg-divider-text">accesso sicuro</span>
                  <div className="lg-divider-line" />
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="lg-footer">
            Non hai ancora un account?{" "}
            <a href="/quiz-fisico">Parti dal quiz gratuito</a>
          </div>
        </div>
      </div>
    </>
  );
}
