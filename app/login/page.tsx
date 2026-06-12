"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: "https://davegamba.com/club",
      },
    });

    setLoading(false);
    if (err) {
      setError("Qualcosa è andato storto. Riprova.");
      return;
    }
    setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @font-face {
          font-family: 'Flatline';
          src: url('/fonts/Flatline-Regular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Flatline';
          src: url('/fonts/Flatline-SemiBold.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
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
          background: rgba(250,246,240,0.92);
        }

        .lg-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lg-logo-wrap {
          text-align: center;
          margin-bottom: 40px;
        }
        .lg-logo {
          font-family: 'Flatline', sans-serif;
          font-size: clamp(22px, 5.5vw, 48px);
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
          color: #0A1A20;
        }

        .lg-card {
          width: 100%;
          background: rgba(255,255,255,0.80);
          backdrop-filter: blur(28px);
          border: 1.5px solid rgba(0,203,219,0.45);
          border-radius: 24px;
          padding: 32px 28px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.07);
        }

        .lg-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #0A1A20;
          margin: 0 0 8px;
        }
        .lg-desc {
          color: rgba(10,26,32,0.55);
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 28px;
          font-weight: 300;
        }
        .lg-label {
          display: block;
          color: rgba(0,203,219,0.9);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .lg-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(0,203,219,0.35);
          border-radius: 12px;
          color: #0A1A20;
          font-size: 16px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          margin-bottom: 20px;
          transition: border-color 0.2s;
        }
        .lg-input::placeholder { color: rgba(10,26,32,0.35); }
        .lg-input:focus { border-color: rgba(0,203,219,0.75); }

        .lg-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
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

        .lg-sent {
          text-align: center;
          padding: 8px 0;
        }
        .lg-sent-icon { font-size: 48px; margin-bottom: 20px; }
        .lg-sent-title {
          font-size: 20px;
          font-weight: 600;
          color: #0A1A20;
          margin-bottom: 12px;
        }
        .lg-sent-text {
          color: rgba(10,26,32,0.55);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 300;
        }
        .lg-sent-text strong { color: #0A1A20; font-weight: 600; }

        .lg-footer {
          position: relative;
          z-index: 5;
          margin-top: 24px;
          color: #0A1A20;
          font-size: 13px;
          font-weight: 400;
          text-align: center;
          line-height: 1.6;
        }
        .lg-footer a { color: #00CBDB; text-decoration: none; font-weight: 700; }
        .lg-footer a:hover { color: #0077CC; }
      `}</style>

      <div className="lg-wrap">
        <div className="lg-bg" />

        <div className="lg-content">
          <div className="lg-logo-wrap">
            <div className="lg-logo">DG Athletic Club</div>
          </div>

          <div className="lg-card">
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="lg-title">Accedi al Club</div>
                <p className="lg-desc">Inserisci la tua email. Ti mando un link diretto — nessuna password.</p>
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
                  autoFocus
                />
                <button className="lg-btn" type="submit" disabled={loading || !email.trim()}>
                  {loading ? "Invio in corso..." : "Invia link di accesso →"}
                </button>
              </form>
            ) : (
              <div className="lg-sent">
                <div className="lg-sent-icon">📬</div>
                <div className="lg-sent-title">Controlla la mail</div>
                <p className="lg-sent-text">
                  Ho inviato il link a <strong>{email}</strong>.<br />
                  Clicca il link per entrare nel Club.
                </p>
              </div>
            )}
          </div>

          {!sent && (
            <div className="lg-footer">
              Non hai ancora un account?{" "}
              <a href="/club">Scopri il Club</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
