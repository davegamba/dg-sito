"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"login" | "reset" | "reset-sent">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (err) {
      setError("Email o password errati. Riprova.");
      setLoading(false);
      return;
    }

    window.location.href = "/club";
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: "https://davegamba.com/auth/confirm" }
    );

    setLoading(false);
    if (err) { setError("Errore: " + err.message); return; }
    setView("reset-sent");
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
          background: rgba(255,255,255,0.91);
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
        .lg-logo {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(22px, 5vw, 40px);
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          line-height: 1;
        }

        /* Card vetro */
        .lg-card {
          width: 100%;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(28px);
          border: 1.5px solid rgba(0,203,219,0.55);
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
        }

        .lg-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
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
          transition: border-color 0.2s, background 0.2s;
        }
        .lg-input::placeholder { color: rgba(10,26,32,0.35); }
        .lg-input:focus { border-color: rgba(0,203,219,0.75); background: rgba(255,255,255,0.15); }

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

        /* Divider */
        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 0;
        }
        .lg-divider-line { flex: 1; height: 1px; background: rgba(0,203,219,0.12); }
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
          color: rgba(10,26,32,0.45);
          font-size: 12px;
          text-align: center;
          line-height: 1.6;
        }
        .lg-footer a { color: rgba(0,203,219,0.7); text-decoration: none; transition: color 0.2s; }
        .lg-footer a:hover { color: #00CBDB; }
      `}</style>

      <div className="lg-wrap">
        <div className="lg-bg" />

        <div className="lg-content">
          {/* Logo */}
          <div className="lg-logo-wrap">
            <div className="lg-logo">
              <span style={{ color: "#0A1A20" }}>DG </span><span style={{ color: "#00CBDB" }}>Fit Club</span>
            </div>
          </div>

          {/* Card */}
          <div className="lg-card">

            {view === "login" && (
              <form onSubmit={handleSubmit}>
                <div className="lg-title">Accedi</div>
                <p className="lg-desc">Inserisci le tue credenziali per entrare.</p>
                {error && <div className="lg-error">{error}</div>}
                <label className="lg-label" htmlFor="email">Email</label>
                <input id="email" className="lg-input" type="email" placeholder="tua@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                <label className="lg-label" htmlFor="password">Password</label>
                <input id="password" className="lg-input" type="password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                <button className="lg-btn" type="submit" disabled={loading || !email.trim() || !password.trim()}>
                  {loading ? "Accesso in corso..." : "Entra →"}
                </button>
                <div className="lg-divider">
                  <div className="lg-divider-line" />
                  <span className="lg-divider-text">accesso sicuro</span>
                  <div className="lg-divider-line" />
                </div>
                <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px" }}>
                  <button type="button" onClick={() => { setError(""); setView("reset"); }}
                    style={{ background: "none", border: "none", color: "rgba(0,203,219,0.8)", cursor: "pointer", fontSize: "13px" }}>
                    Hai dimenticato la password?
                  </button>
                </p>
              </form>
            )}

            {view === "reset" && (
              <form onSubmit={handleReset}>
                <div className="lg-title">Reset password</div>
                <p className="lg-desc">Inserisci la tua email. Ti mando un link per impostare una nuova password.</p>
                {error && <div className="lg-error">{error}</div>}
                <label className="lg-label" htmlFor="reset-email">Email</label>
                <input id="reset-email" className="lg-input" type="email" placeholder="tua@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" autoFocus />
                <button className="lg-btn" type="submit" disabled={loading || !email.trim()}>
                  {loading ? "Invio in corso..." : "Invia link →"}
                </button>
                <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px" }}>
                  <button type="button" onClick={() => { setError(""); setView("login"); }}
                    style={{ background: "none", border: "none", color: "rgba(0,203,219,0.8)", cursor: "pointer", fontSize: "13px" }}>
                    ← Torna al login
                  </button>
                </p>
              </form>
            )}

            {view === "reset-sent" && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>📬</div>
                <div className="lg-title" style={{ marginBottom: "8px" }}>Controlla la mail</div>
                <p className="lg-desc">Ti ho inviato il link a <strong style={{ color: "#0A1A20" }}>{email}</strong>. Clicca il link per impostare la nuova password.</p>
                <button type="button" onClick={() => setView("login")}
                  style={{ marginTop: "16px", background: "none", border: "none", color: "rgba(0,203,219,0.8)", cursor: "pointer", fontSize: "13px" }}>
                  ← Torna al login
                </button>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="lg-footer">
            Prima volta qui?{" "}
            <a href="/quiz-fisico">Registrati gratis</a>
            {" "}e ottieni gli strumenti per la tua trasformazione fisica.
          </div>
        </div>
      </div>
    </>
  );
}
