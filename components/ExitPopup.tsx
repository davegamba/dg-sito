"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

const SUPABASE_URL = "https://nkojjrvndjyivsjvrqds.supabase.co";
const SUPABASE_KEY = "sb_publishable_4WlxUEDHRnR0BGxCViP4NA_QVYLUwtg";
const QUIZ_URL = "https://club.davegamba.com/optin-quiz.html";
const STORAGE_KEY = "dg_exit_popup_seen";
const COOLDOWN_DAYS = 7;

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim().toLowerCase();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return;
    setLoading(true);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates",
        },
        body: JSON.stringify({ name: "", email: val, source: "exit-popup" }),
      });
    } catch {}
    setDone(true);
    dismiss(true);
    setTimeout(() => {
      window.location.href = `${QUIZ_URL}?email=${encodeURIComponent(val)}`;
    }, 800);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8 flex flex-col gap-5"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(30,40,50,1) 0%, #080C0F 70%)",
          border: "1px solid rgba(240,192,64,0.5)",
        }}
      >
        {/* Chiudi */}
        <button
          onClick={() => dismiss()}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Chiudi"
        >
          <X size={18} />
        </button>

        {/* Badge */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F0C040] animate-pulse" />
          <span className="text-[#F0C040] text-[10px] font-semibold tracking-[0.2em] uppercase">
            Gratis per te
          </span>
        </div>

        {/* Testo */}
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-3xl text-white leading-tight">
            Prima di andare —
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Scopri il tuo Tipo Metabolico in 2 minuti.<br />
            Un quiz gratuito per capire perché non riesci a dimagrire — e cosa fare davvero.
          </p>
        </div>

        {/* Form */}
        {!done ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email..."
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder-white/40 text-base outline-none focus:border-[#00CBDB]/60 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#00CBDB] hover:bg-[#00b8c6] disabled:bg-[#006f78] text-[#F0C040] font-bold text-sm tracking-wide rounded-xl px-6 py-3.5 transition-colors"
            >
              {loading ? "..." : (
                <>
                  🧬 Fai il quiz gratis
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          <p className="text-[#00CBDB] text-sm text-center">Perfetto — ti porto al quiz...</p>
        )}

        {/* No grazie */}
        <button
          onClick={() => dismiss()}
          className="text-white/25 hover:text-white/50 text-xs text-center transition-colors"
        >
          No grazie, non mi interessa migliorarmi
        </button>
      </div>
    </div>
  );
}
