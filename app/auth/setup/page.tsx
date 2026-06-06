"use client";
import { useState } from "react";

export default function SetupPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: "dg2026admin", email: "davept.info@gmail.com", password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setDone(true);
  };

  if (done) return (
    <div style={{ minHeight:"100dvh", display:"flex", alignItems:"center", justifyContent:"center", background:"#080810" }}>
      <div style={{ textAlign:"center", color:"#00CBDB", fontFamily:"sans-serif" }}>
        <div style={{ fontSize:40, marginBottom:16 }}>✓</div>
        <p style={{ fontSize:18, marginBottom:16 }}>Password impostata!</p>
        <a href="/login" style={{ color:"#fff", fontSize:14 }}>Vai al login →</a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100dvh", display:"flex", alignItems:"center", justifyContent:"center", background:"#080810", fontFamily:"sans-serif", padding:24 }}>
      <form onSubmit={handle} style={{ width:"100%", maxWidth:360, background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(0,203,219,0.4)", borderRadius:20, padding:"36px 28px" }}>
        <h2 style={{ color:"#fff", marginBottom:8, fontSize:20 }}>Imposta password</h2>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, marginBottom:24 }}>davept.info@gmail.com</p>
        {error && <p style={{ color:"#E85555", fontSize:13, marginBottom:16 }}>{error}</p>}
        <label style={{ display:"block", color:"rgba(0,203,219,0.8)", fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:6 }}>Nuova password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="min. 8 caratteri" required minLength={8} autoFocus
          style={{ width:"100%", padding:"13px 14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(0,203,219,0.25)", borderRadius:10, color:"#fff", fontSize:15, outline:"none", marginBottom:20, boxSizing:"border-box" as const, fontFamily:"inherit" }} />
        <button type="submit" disabled={loading}
          style={{ width:"100%", padding:14, background:"linear-gradient(135deg,#00CBDB,#0077CC)", border:"none", borderRadius:10, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
          {loading ? "Salvataggio..." : "Salva password →"}
        </button>
      </form>
    </div>
  );
}
