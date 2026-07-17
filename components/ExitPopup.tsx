"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "dg_exit_popup_seen";
const COOLDOWN_DAYS = 7;

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Non mostrare nella pagina club né nella pagina links (è già un hub di CTA)
    const path = window.location.pathname;
    if (path.startsWith("/club") || path.startsWith("/links") || path.startsWith("/questionario-acquisto")) return;

    // Forza popup se ?popup=1 nell'URL
    const force = new URLSearchParams(window.location.search).get("popup") === "1";

    if (force) {
      setVisible(true);
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const { ts, converted } = JSON.parse(stored);
      if (converted) return;
      if (Date.now() - ts < COOLDOWN_DAYS * 24 * 60 * 60 * 1000) return;
    }

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (!isMobile) {
      // Desktop: exit intent — mouse che esce dalla finestra verso l'alto
      let triggered = false;
      const handleMouseLeave = (e: MouseEvent) => {
        if (triggered || e.clientY > 10) return;
        triggered = true;
        setVisible(true);
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    } else {
      // Mobile: timer 30s + scroll minimo 25%
      let triggered = false;
      let timerReady = false;
      let scrollReady = false;

      const tryTrigger = () => {
        if (triggered || !timerReady || !scrollReady) return;
        triggered = true;
        setVisible(true);
      };

      const timer = setTimeout(() => {
        timerReady = true;
        tryTrigger();
      }, 30000);

      const handleScroll = () => {
        const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrolled >= 0.25) {
          scrollReady = true;
          tryTrigger();
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const dismiss = (converted = false) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), converted }));
    setVisible(false);
  };

  const handleStartQuiz = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), converted: true }));
    window.location.href = "/quiz-fisico";
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      {/* Wrapper bordo gradiente ciano→giallo */}
      <div
        className="relative w-full max-w-2xl rounded-2xl p-px"
        style={{ background: "linear-gradient(135deg, #00CBDB 0%, #F0C040 100%)" }}
      >
      <div
        className="relative w-full rounded-2xl p-8 flex flex-col md:flex-row gap-6 md:items-center"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(30,40,50,1) 0%, #080C0F 70%)" }}
      >
        {/* Chiudi */}
        <button
          onClick={() => dismiss()}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors z-10"
          aria-label="Chiudi"
        >
          <X size={18} />
        </button>

        {/* Immagine laterale */}
        <div
          className="w-full md:w-2/5 aspect-square md:aspect-auto md:h-64 rounded-xl shrink-0 order-1 md:order-2 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg')",
          }}
        />

        {/* Testo */}
        <div className="flex flex-col gap-5 order-2 md:order-1">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F0C040] animate-pulse" />
            <span className="text-[#F0C040] text-[10px] font-semibold tracking-[0.2em] uppercase">
              Quiz gratuito
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-white leading-tight">
              Scopri il tuo{" "}
              <span style={{ color: "#F0C040" }}>Tipo Fisico reale in 2 minuti.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Per sapere cosa funziona più efficacemente sul tuo specifico corpo e non fare più gli errori che ti bloccano i progressi.
            </p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="flex items-center justify-center gap-2.5 text-white font-bold text-base tracking-wide rounded-2xl px-7 py-4 transition-transform duration-200 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #00e5f5 0%, #00CBDB 50%, #0090b8 100%)",
              boxShadow: "0 8px 28px rgba(0,203,219,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <span style={{ filter: "sepia(1) saturate(5) hue-rotate(5deg)" }}>⚡</span> Fai il quiz gratis
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => dismiss()}
            className="text-white/25 hover:text-white/50 text-xs text-center transition-colors"
          >
            No grazie, magari un&apos;altra volta
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
