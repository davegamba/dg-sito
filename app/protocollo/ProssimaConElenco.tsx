"use client";

import { useState } from "react";
import Link from "next/link";
import ElencoLezioni from "./ElencoLezioni";
import { DESTINAZIONE_FINALE, LEZIONI, hrefLezione } from "@/lib/lezioni";

// Bottone "Prossima" diviso in due. Parte grande: va alla lezione successiva.
// Parte piccola (solo telefono): apre il riquadro con tutte le lezioni.
// Su desktop l'elenco sta gia' nella colonna a sinistra e resta il solo bottone.
export default function ProssimaConElenco({ corrente }: { corrente: number }) {
  const [aperto, setAperto] = useState(false);
  const prossima = LEZIONI[corrente + 1];

  const principale = {
    padding: "12px 18px",
    textDecoration: "none",
    ...(prossima ? { background: "#080C0F", color: "#00CBDB" } : { background: "#00CBDB", color: "#000" }),
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div className="flex items-stretch">
        {prossima ? (
          <Link href={hrefLezione(prossima)} className="flex-1 inline-flex items-center text-sm font-bold rounded-xl rounded-r-none lg:rounded-r-xl" style={principale}>
            Prossima: {prossima.titolo} →
          </Link>
        ) : (
          <a href={DESTINAZIONE_FINALE} className="flex-1 inline-flex items-center text-sm font-bold rounded-xl rounded-r-none lg:rounded-r-xl" style={principale}>
            Prova la settimana gratis →
          </a>
        )}
        <button
          type="button"
          onClick={() => setAperto((v) => !v)}
          aria-expanded={aperto}
          aria-label="Tutte le lezioni"
          className="lg:hidden shrink-0 flex flex-col items-center justify-center rounded-r-xl"
          style={{ background: "#080C0F", color: "#00CBDB", width: 64, borderLeft: "1px solid rgba(255,255,255,0.18)" }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Tutte</span>
          <span style={{ fontSize: 12, lineHeight: 1, marginTop: 2, transform: aperto ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
        </button>
      </div>

      {aperto && (
        <div className="lg:hidden" style={{ marginTop: 14 }}>
          <ElencoLezioni corrente={corrente} />
        </div>
      )}
    </div>
  );
}
