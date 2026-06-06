"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export default function RegistratiPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: nome.trim() },
      },
    });

    if (err) {
      if (err.message.includes("already registered") || err.message.includes("User already registered")) {
        setError("Questa email è già registrata. Accedi dalla pagina di login.");
      } else {
        setError("Errore durante la registrazione. Riprova.");
      }
      setLoading(false);
      return;
    }

    // Auto-login dopo signup
    const { error: loginErr } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);
    if (loginErr) {
      setDone(true); // mostra messaggio di conferma email
    } else {
      window.location.href = "/club";
    }
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
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(26px, 6vw, 48px);
          font-weight: 200;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          line-height: 1;
        }

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

        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 0;
        }
        .lg-divider-line { flex: 1; height: 1px; background: rgba(0,203,219,0.12); }
        .lg-divider-text { font-size: 11px; color: rgba(10,26,32,0.25); letter-spacing: 0.05em; }

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

        .lg-success-icon { font-size: 48px; margin-bottom: 16px; text-align: center; }
      `}</style>

      <div className="lg-wrap">
        <div className="lg-bg" />

        <div className="lg-content">
          <div className="lg-logo-wrap">
            <div className="lg-logo">
              <span style={{ color: "#0A1A20" }}>DG </span><span style={{ color: "#00CBDB" }}>Fit Club</span>
            </div>
          </div>

          <div className="lg-card">
            {done ? (
              <div style={{ textAlign: "center" }}>
                <div className="lg-success-icon">📬</div>
                <div className="lg-title" style={{ marginBottom: "8px" }}>Controlla la mail</div>
                <p className="lg-desc">
                  Ti ho inviato un link di conferma a{" "}
                  <strong style={{ color: "#0A1A20" }}>{email}</strong>.{" "}
                  Clicca il link per attivare il tuo account.
                </p>
                <a href="/login" style={{ color: "rgba(0,203,219,0.8)", fontSize: "13px", textDecoration: "none" }}>
                  ← Torna al login
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="lg-title">Crea il tuo account</div>
                <p className="lg-desc">Accedi gratuitamente a tutti gli strumenti del Club.</p>
                {error && <div className="lg-error">{error}</div>}

                <label className="lg-label" htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  className="lg-input"
                  type="text"
                  placeholder="Il tuo nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  autoComplete="given-name"
                  autoFocus
                />

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

                <label className="lg-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="lg-input"
                  type="password"
                  placeholder="Minimo 6 caratteri"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />

                <button
                  className="lg-btn"
                  type="submit"
                  disabled={loading || !nome.trim() || !email.trim() || !password.trim()}
                >
                  {loading ? "Creazione account..." : "Crea account →"}
                </button>

                <div className="lg-divider">
                  <div className="lg-divider-line" />
                  <span className="lg-divider-text">registrazione gratuita</span>
                  <div className="lg-divider-line" />
                </div>
              </form>
            )}
          </div>

          <div className="lg-footer">
            Hai già un account?{" "}
            <a href="/login">Accedi</a>
          </div>
        </div>
      </div>
    </>
  );
}
