"use client";

import { useState } from "react";
import Link from "next/link";
import { LEZIONI, hrefLezione } from "@/lib/lezioni";

// Su desktop l'elenco e' sempre aperto; su telefono si apre e si chiude.
export default function ElencoLezioni({ corrente }: { corrente: number }) {
  const [aperto, setAperto] = useState(false);

  return (
    <nav aria-label="Lezioni del corso">
      <button
        type="button"
        onClick={() => setAperto((v) => !v)}
        aria-expanded={aperto}
        className="lg:hidden w-full flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-white"
        style={{ background: "#080C0F" }}
      >
        <span>Tutte le lezioni</span>
        <span style={{ color: "#00CBDB", fontSize: 20, lineHeight: 1 }}>{aperto ? "−" : "+"}</span>
      </button>

      <ol className={`${aperto ? "flex" : "hidden"} lg:flex flex-col gap-1 mt-2 lg:mt-0`} style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {LEZIONI.map((l) => {
          const attiva = l.numero === corrente;
          return (
            <li key={l.slug}>
              <Link
                href={hrefLezione(l)}
                aria-current={attiva ? "page" : undefined}
                className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors"
                style={{
                  background: attiva ? "#080C0F" : "transparent",
                  border: "1px solid transparent",
                  textDecoration: "none",
                }}
              >
                <span
                  className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 1,
                    background: attiva ? "#00CBDB" : "transparent",
                    color: attiva ? "#000" : "#007f8c",
                    border: attiva ? "none" : "1.5px solid #00a5b5",
                  }}
                >
                  {l.numero}
                </span>
                <span className="text-sm leading-snug" style={{ color: attiva ? "#fff" : "#3a3a36", fontWeight: attiva ? 600 : 400 }}>
                  {l.titolo}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
