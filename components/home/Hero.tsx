"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const SUPABASE_URL = "https://nkojjrvndjyivsjvrqds.supabase.co";
const SUPABASE_KEY = "sb_publishable_4WlxUEDHRnR0BGxCViP4NA_QVYLUwtg";
const QUIZ_URL = "https://hub.davegamba.com/optin-quiz.html";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ name: "", email: val, source: "home-hero" }),
      });
    } catch {}
    window.location.href = `${QUIZ_URL}?email=${encodeURIComponent(val)}`;
  };

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-black">

      {/* FOTO FULL-BLEED */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/heroBg.jpeg"
          alt="Dave Gamba — Personal Trainer"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          unoptimized
        />
        {/* Overlay scuro diffuso */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.42)" }}
        />
        {/* Vignetta bottom — più leggera, trasparenza arriva prima */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)",
          }}
        />
        {/* Vignetta top */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
        />
      </div>

      {/* CONTENUTO */}
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 pt-48 sm:pt-32 pb-10 sm:pb-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00CBDB] animate-pulse" />
          <span className="text-[#00CBDB] text-[11px] font-semibold tracking-[0.2em] uppercase">
            Personal Trainer Online dal 2009
          </span>
        </div>

        {/* Nome */}
        <h1 className="font-serif text-7xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight">
          Dave Gamba
        </h1>

        {/* Subtitle */}
        <p className="text-[#cccccc] text-lg sm:text-xl md:text-2xl leading-snug max-w-xl font-light">
          Il Metodo Breve, Intenso, Mirato<br className="hidden sm:block" />
          per un fisico atletico, asciutto e scolpito
        </p>

        {/* Optin form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="La tua email..."
            required
            className="flex-1 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder-white/40 text-base outline-none focus:border-[#00CBDB]/60 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#00CBDB] hover:bg-[#00b8c6] disabled:bg-[#006f78] text-black font-bold text-sm tracking-wide rounded-xl px-6 py-3.5 transition-colors whitespace-nowrap"
          >
            {loading ? "..." : (
              <>
                Scarica gratis
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Micro label */}
        <p className="text-white/35 text-xs tracking-wide">
          Ricevi il Quiz Metabolico gratuito — nessuno spam
        </p>

        {/* Social proof */}
        <div className="flex items-center gap-6 mt-4">
          {[
            { num: "15+", label: "anni online" },
            { num: "3K+", label: "clienti" },
            { num: "2M+", label: "lettori" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-serif text-2xl text-[#00CBDB] leading-none">{num}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
