"use client";

import { useState } from "react";

const COACHING_FEATURES = [
  "Call conoscitiva con Dave, senza impegno",
  "Piano d'allenamento costruito su di te",
  "Piano alimentare con biologa nutrizionista",
  "Affiancamento WhatsApp fino all'obiettivo",
];

// Chiuso = tasto vuoto a bordo giallo. Aperto = card intera; un clic ovunque
// (tranne sul bottone verso /coaching) la richiude.
export default function CoachingToggle() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" className="card card-coaching coaching-closed" aria-expanded={false} onClick={() => setOpen(true)}>
        <span className="card-title" style={{ marginBottom: 0 }}>Coaching Personale 1-1</span>
        <span className="coaching-plus">+</span>
      </button>
    );
  }

  return (
    <div
      className="card card-coaching"
      style={{ cursor: "pointer" }}
      aria-expanded={true}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        setOpen(false);
      }}
    >
      <div className="card-top">
        <div className="card-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/affondo-dave-intera.jpg" alt="Coaching Personale 1-1" style={{ objectPosition: "center top" }} />
        </div>
        <div className="card-info">
          <span style={{ alignSelf: "flex-start", background: "#F0C040", color: "#000", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 20, marginBottom: 7 }}>Servizio premium</span>
          <div className="card-title">Coaching Personale 1-1</div>
          <div className="card-desc">Ti seguo io, personalmente, fino all&apos;obiettivo. Allenamento e alimentazione costruiti sulla tua vita reale.</div>
        </div>
      </div>
      <div className="card-features">
        {COACHING_FEATURES.map((f) => (
          <div key={f} className="card-feature"><span className="dot"><span className="dot-tri" /></span>{f}</div>
        ))}
      </div>
      <a href="https://www.davegamba.com/coaching" className="card-btn">Compila il questionario →</a>
    </div>
  );
}
