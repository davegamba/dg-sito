"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * target).toLocaleString("it-IT"));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(target.toLocaleString("it-IT"));
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Hero() {

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
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 pt-64 sm:pt-48 pb-10 sm:pb-20">

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

        {/* CTA Quiz */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-2">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-[#00CBDB] hover:bg-[#00b8c6] text-black font-bold text-base tracking-wide rounded-xl px-8 py-4 transition-colors"
          >
            Fai il quiz <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Micro label */}
        <p className="text-white/35 text-xs tracking-wide">
          Scopri il tuo Profilo Fisico gratuitamente — 2 minuti
        </p>

      </div>

      {/* STATS OVERLAY — fissi in basso sull'hero, completamente trasparenti */}
      <div className="absolute bottom-8 inset-x-0">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-center divide-x divide-white/30">
          {[
            { target: 15, suffix: "+", label: "Anni di Esperienza" },
            { target: 3000, suffix: "+", label: "Clienti Trasformati" },
          ].map(({ target, suffix, label }) => (
            <div key={label} className="flex-1 text-center px-8">
              <div className="font-serif text-4xl sm:text-5xl text-[#00CBDB] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                <AnimatedNumber target={target} suffix={suffix} />
              </div>
              <div className="text-white/60 text-[11px] uppercase tracking-[0.2em] mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
