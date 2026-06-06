"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function AuthConfirmPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"loading" | "recovery" | "done" | "error">("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (type === "recovery" && accessToken && refreshToken) {
      // Setta la sessione direttamente dai token nell'hash
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) { setMode("error"); return; }
          setMode("recovery");
        });
      return;
    }

    // Flusso normale (magic link) — vai al club
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { router.replace("/club"); return; }

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
        if (s) { subscription.unsubscribe(); router.replace("/club"); }
      });
      setTimeout(() => { subscription.unsubscribe(); router.replace("/login"); }, 5000);
    });
  }, [router]);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Le password non coincidono."); return; }
    if (password.length < 8) { setError("Minimo 8 caratteri."); return; }
    setSaving(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) { setError(err.message); setSaving(false); return; }
    setMode("done");
    setTimeout(() => router.replace("/club"), 1500);
  };

  const s = {
    wrap: { minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/palmeBg.jpeg') center/cover",
      fontFamily: "'DM Sans', sans-serif", padding: "24px" },
    overlay: { position: "fixed" as const, inset: 0, background: "rgba(255,255,255,0.91)", zIndex: 0 },
    card: { position: "relative" as const, zIndex: 1, width: "100%", maxWidth: "380px",
      background: "rgba(255,255,255,0.80)", backdropFilter: "blur(20px)",
      border: "1.5px solid rgba(0,203,219,0.5)", borderRadius: "20px", padding: "36px 28px" },
    title: { fontFamily: "serif", fontSize: "22px", color: "#0A1A20", marginBottom: "8px" },
    desc: { fontSize: "14px", color: "rgba(10,26,32,0.5)", marginBottom: "24px", lineHeight: 1.6 },
    label: { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em",
      textTransform: "uppercase" as const, color: "rgba(0,203,219,0.9)", marginBottom: "6px" },
    input: { width: "100%", padding: "13px 14px", background: "rgba(255,255,255,0.85)",
      border: "1px solid rgba(0,203,219,0.3)", borderRadius: "10px", color: "#0A1A20",
      fontSize: "15px", outline: "none", marginBottom: "16px", fontFamily: "inherit",
      boxSizing: "border-box" as const },
    btn: { width: "100%", padding: "14px",
      background: "linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%)",
      border: "none", borderRadius: "10px", color: "#fff", fontSize: "15px",
      fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
    err: { background: "rgba(232,85,85,0.1)", border: "1px solid rgba(232,85,85,0.3)",
      borderRadius: "8px", color: "#E85555", fontSize: "13px", padding: "10px 12px", marginBottom: "14px" },
  };

  if (mode === "loading") return (
    <div style={s.wrap}>
      <div style={s.overlay} />
      <p style={{ position: "relative", zIndex: 1, color: "#0A1A20", fontSize: "15px" }}>Accesso in corso...</p>
    </div>
  );

  if (mode === "error") return (
    <div style={s.wrap}>
      <div style={s.overlay} />
      <div style={{ ...s.card, textAlign: "center" as const }}>
        <p style={{ color: "#E85555", marginBottom: "16px" }}>Link scaduto o non valido.</p>
        <a href="/login" style={{ color: "#0077CC", fontSize: "14px" }}>← Torna al login</a>
      </div>
    </div>
  );

  if (mode === "done") return (
    <div style={s.wrap}>
      <div style={s.overlay} />
      <p style={{ position: "relative", zIndex: 1, color: "#00CBDB", fontSize: "16px", fontWeight: 700 }}>
        ✓ Password salvata — entro nel club...
      </p>
    </div>
  );

  return (
    <div style={s.wrap}>
      <div style={s.overlay} />
      <div style={s.card}>
        <div style={s.title}>Imposta la password</div>
        <p style={s.desc}>Scegli una password per accedere al DG Fit Club.</p>
        <form onSubmit={handleSetPassword}>
          {error && <div style={s.err}>{error}</div>}
          <label style={s.label}>Nuova password</label>
          <input style={s.input} type="password" placeholder="min. 8 caratteri"
            value={password} onChange={e => setPassword(e.target.value)} required autoFocus />
          <label style={s.label}>Conferma password</label>
          <input style={s.input} type="password" placeholder="ripeti la password"
            value={confirm} onChange={e => setConfirm(e.target.value)} required />
          <button style={s.btn} type="submit" disabled={saving}>
            {saving ? "Salvataggio..." : "Salva password →"}
          </button>
        </form>
      </div>
    </div>
  );
}
