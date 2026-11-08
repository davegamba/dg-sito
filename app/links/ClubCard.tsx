"use client";

import { useRef, useState } from "react";

const CLUB_FEATURES = [
  "Schede progressive mese per mese",
  "Corsi Focus mirati per obiettivi",
  "I pasti pronti di Dave regolabili su misura",
  "Per casa e palestra",
];

const OPTIN_DEST = "https://club.davegamba.com/7-giorni";

// Nome ed email viaggiano verso la pagina del Club in un cookie di 5 minuti sul dominio
// principale (mai nell'indirizzo). La pagina /7-giorni lo legge una volta, iscrive la
// persona alla settimana gratis e lo cancella.
function passaAlClub(nome: string, email: string) {
  const valore = encodeURIComponent(JSON.stringify({ nome, email }));
  const dominio = window.location.hostname.endsWith("davegamba.com") ? "; Domain=.davegamba.com; Secure" : "";
  document.cookie = `dg_optin=${valore}; Max-Age=300; Path=/; SameSite=Lax${dominio}`;
  window.location.href = OPTIN_DEST;
}

export default function ClubCard() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [errore, setErrore] = useState("");
  const [invio, setInvio] = useState(false);
  const nomeRef = useRef<HTMLInputElement>(null);

  const apri = () => {
    if (open) return;
    setOpen(true);
    setTimeout(() => nomeRef.current?.focus(), 50);
  };

  const invia = (e: React.FormEvent) => {
    e.preventDefault();
    const n = nome.trim();
    const m = email.trim();
    if (!n) return setErrore("Scrivi il tuo nome.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) return setErrore("Controlla l'email.");
    setErrore("");
    setInvio(true);
    passaAlClub(n, m);
  };

  return (
    <div className="card card-club" style={open ? undefined : { cursor: "pointer" }} onClick={apri}>
      <div className="card-top">
        <div className="card-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/affondo-dave-intera.jpg" alt="DG Athletic Club" style={{ objectPosition: "center top", transform: "scale(1.25)", transformOrigin: "52% 8%" }} />
        </div>
        <div className="card-info">
          <span className="chip-shine" style={{ alignSelf: "flex-start", background: "#F0C040", color: "#000", fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.03em", whiteSpace: "nowrap", textTransform: "uppercase", padding: "3px 9px", borderRadius: 20, marginBottom: 7 }}>Allenati con me - provalo gratis</span>
          <div className="card-title" style={{ fontSize: "1.45rem" }}>DG Athletic Club</div>
          <div className="card-desc">Tutto ciò che ti serve per un fisico atletico, asciutto e scolpito. In meno di mezz&apos;ora al giorno.</div>
        </div>
      </div>
      <div className="card-features">
        {CLUB_FEATURES.map((f) => (
          <div key={f} className="card-feature"><span className="dot"><span className="dot-tri" /></span>{f}</div>
        ))}
      </div>

      {!open ? (
        <button type="button" className="card-btn btn-wiggle" onClick={apri}>Ricevi il tuo piano gratuito →</button>
      ) : (
        <form className="optin-form" onSubmit={invia} noValidate>
          <input ref={nomeRef} type="text" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" placeholder="Nome" aria-label="Nome" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" placeholder="Email" aria-label="Email" />
          {errore && <p className="optin-err" role="alert">{errore}</p>}
          <button type="submit" className="card-btn" disabled={invio}>{invio ? "Un attimo..." : "Ricevi il tuo piano gratuito →"}</button>
          <p className="optin-legal">Zero spam, solo strumenti. Iscrivendoti accetti la <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>. Cancellati gratis quando vuoi.</p>
        </form>
      )}
    </div>
  );
}
