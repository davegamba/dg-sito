"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

// ─── CONFIGURAZIONE ───────────────────────────────────────────────
const WA_NUMBER = "39XXXXXXXXXX"; // ← inserisci il numero senza + (es. 393331234567)
const WA_PHOTO  = "https://via.placeholder.com/80"; // ← sostituisci con URL foto di Dave
const WA_MESSAGE = encodeURIComponent(
  "Ciao Dave 👋 Ho visto il tuo sito e vorrei saperne di più sul Metodo BIM."
);
// ──────────────────────────────────────────────────────────────────

export default function WhatsAppButton() {
  // ← NASCOSTO: attivare quando il numero WhatsApp è pronto
  return null;
  const [open, setOpen] = useState(false);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  return (
    <>
      {/* POPUP */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
        >
          {/* Header verde */}
          <div className="flex items-center gap-3 px-4 py-4" style={{ background: "#25D366" }}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
              <Image src={WA_PHOTO} alt="Dave Gamba" fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base leading-tight">Dave Gamba</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                <span className="text-white/80 text-xs">Online</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>
          </div>

          {/* Corpo chat */}
          <div className="bg-[#ECE5DD] px-4 py-5">
            {/* Bubble messaggio */}
            <div className="flex items-end gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1">
                <Image src={WA_PHOTO} alt="Dave Gamba" fill className="object-cover" unoptimized />
              </div>
              <div
                className="bg-white rounded-2xl rounded-bl-none px-4 py-3 text-[#111] text-sm leading-relaxed shadow-sm max-w-[85%]"
              >
                Ciao 👋<br />
                Scrivimi direttamente su WhatsApp per avere più informazioni sui protocolli per la tua trasformazione e prenotare una <strong>chiamata conoscitiva gratuita</strong> senza impegno.
              </div>
            </div>

            {/* CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#25D366" }}
            >
              {/* Icona WhatsApp inline SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Scrivimi su WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* BOTTONE FISSO */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Scrivimi su WhatsApp"
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    </>
  );
}
