"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

export default function ClubPrestoPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: clean, source: "club-coming-soon" });
      if (error) throw error;
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        background: "#0A0A0A",
        color: "#ECEEF0",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 22px",
        fontFamily: "var(--font-dm-sans), sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".2em",
            color: "#00C8DB",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Sta per aprire
        </div>

        <h1
          style={{
            fontFamily: "var(--font-dm-serif), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(34px, 9vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: ".02em",
            marginBottom: 20,
          }}
        >
          DG Athletic Club
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#ECEEF0", marginBottom: 14 }}>
          Manca pochissimo.
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.65, color: "#9AA0A6", marginBottom: 30 }}>
          21 minuti atletici al giorno.
          <br />
          Un percorso di 12 mesi per un corpo atletico — asciutto, scolpito, funzionale.
          <br />
          A casa o in palestra.
        </p>

        <div
          style={{
            background: "#16181B",
            border: "0.5px solid rgba(0,200,219,.25)",
            borderRadius: 18,
            padding: "24px 20px",
          }}
        >
          {status === "done" ? (
            <div>
              <div style={{ fontSize: 30, marginBottom: 8 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Ci sei.</div>
              <div style={{ fontSize: 13.5, color: "#9AA0A6", lineHeight: 1.55 }}>
                Sei nella lista dei primi. Ti avviso appena apre — e blocchi il prezzo founder.
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>
                Entra tra i primi.
              </div>
              <div style={{ fontSize: 13, color: "#9AA0A6", lineHeight: 1.5, marginBottom: 16 }}>
                Chi entra al lancio blocca <b style={{ color: "#F0C040" }}>€19/mese a vita</b>.
                <br />
                Lascia la tua email: ti avviso per primo.
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="La tua email…"
                  autoComplete="email"
                  inputMode="email"
                  style={{
                    width: "100%",
                    height: 48,
                    padding: "0 14px",
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(0,200,219,.3)",
                    borderRadius: 12,
                    color: "#ECEEF0",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 15,
                    outline: "none",
                    marginBottom: 10,
                  }}
                />
                {status === "error" && (
                  <div style={{ fontSize: 12.5, color: "#F87171", marginBottom: 10 }}>
                    Controlla l&apos;email e riprova.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    background: "linear-gradient(180deg,#41E4F1,#00C4D4 55%,#00ACBB)",
                    color: "#04282B",
                    fontWeight: 700,
                    fontSize: 16,
                    padding: "15px",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.35)",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? "Un attimo…" : "Avvisami al lancio →"}
                </button>
              </form>
            </>
          )}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 13,
            color: "#5F6469",
            lineHeight: 1.5,
          }}
        >
          Sali di livello,
          <br />
          <span style={{ color: "#9AA0A6", fontWeight: 600 }}>Dave</span>
        </div>
      </div>
    </div>
  );
}
