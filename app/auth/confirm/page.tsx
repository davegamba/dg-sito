"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function AuthConfirmPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"loading" | "recovery" | "done">("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");

    if (type === "recovery") {
      // Sessione già impostata da Supabase via hash — aspetta onAuthStateChange
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          subscription.unsubscribe();
          setMode("recovery");
        }
      });
      return () => subscription.unsubscribe();
    }

    // Flusso normale (magic link) — vai al club
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/club");
      } else {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
          if (session) {
            subscription.unsubscribe();
            router.replace("/club");
          }
        });
        setTimeout(() => {
          subscription.unsubscribe();
          router.replace("/login");
        }, 5000);
      }
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
    if (err) { setError("Errore: " + err.message); setSaving(false); return; }
    setMode("done");
    setTimeout(() => router.replace("/club"), 1500);
  };

  const styles = {
    wrap: { minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#080810", fontFamily: "'DM Sans', sans-serif", padding: "24px" },
    card: { width: "100%", maxWidth: "380px", background: "rgba(255,255,255,0.06)",
      border: "1.5px solid rgba(0,203,219,0.4)", borderRadius: "20px", padding: "36px 28px" },
    title: { fontFamily: "serif", fontSize: "22px", color: "#fff", marginBottom: "8px" },
    desc: { fontSize: "14px", color: "rgba(255,255,255,0.45)", marginBottom: "24px", lineHeight: 1.6 },
    label: { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em",
      textTransform: "uppercase" as const, color: "rgba(0,203,219,0.8)", marginBottom: "6px" },
    input: { width: "100%", padding: "13px 14px", background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(0,203,219,0.25)", borderRadius: "10px", color: "#fff",
      fontSize: "15px", outline: "none", marginBottom: "16px", fontFamily: "inherit", boxSizing: "border-box" as const },
    btn: { width: "100%", padding: "14px", background: "linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%)",
      border: "none", borderRadius: "10px", color: "#fff", fontSize: "15px", fontWeight: 700,
      cursor: "pointer", fontFamily: "inherit" },
    error: { background: "rgba(232,85,85,0.1)", border: "1px solid rgba(232,85,85,0.3)",
      borderRadius: "8px", color: "#E85555", fontSize: "13px", padding: "10px 12px", marginBottom: "14px" },
    loading: { color: "#555", fontSize: "15px" },
  };

  if (mode === "loading") return (
    <div style={styles.wrap}><p style={styles.loading}>Accesso in corso...</p></div>
  );

  if (mode === "done") return (
    <div style={styles.wrap}><p style={{ color: "#00CBDB", fontSize: "16px" }}>✓ Password salvata — entro nel club...</p></div>
  );

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.title}>Imposta la password</div>
        <p style={styles.desc}>Scegli una password per accedere al DG Fit Club.</p>
        <form onSubmit={handleSetPassword}>
          {error && <div style={styles.error}>{error}</div>}
          <label style={styles.label}>Nuova password</label>
          <input style={styles.input} type="password" placeholder="min. 8 caratteri"
            value={password} onChange={e => setPassword(e.target.value)} required autoFocus />
          <label style={styles.label}>Conferma password</label>
          <input style={styles.input} type="password" placeholder="ripeti la password"
            value={confirm} onChange={e => setConfirm(e.target.value)} required />
          <button style={styles.btn} type="submit" disabled={saving}>
            {saving ? "Salvataggio..." : "Salva password →"}
          </button>
        </form>
      </div>
    </div>
  );
}
