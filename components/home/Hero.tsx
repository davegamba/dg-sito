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
    <section className="relative min-h-dvh flex items-start justify-center overflow-hidden bg-black">

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
      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 pt-52 sm:pt-48 pb-16 sm:pb-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00CBDB] animate-pulse" />
          <span className="text-[#00CBDB] text-[11px] font-semibold tracking-[0.2em] uppercase">
            Tutto per la tua Trasformazione Fisica
          </span>
        </div>

        {/* Nome */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none whitespace-nowrap uppercase" style={{ letterSpacing: '0.18em', fontWeight: 600 }}>
          Dave Gamba
        </h1>

        {/* Subtitle */}
        <p className="text-[#cccccc] text-lg sm:text-xl md:text-2xl leading-snug max-w-xl font-light">
          Il Metodo Breve-Intenso-Mirato<br />
          per un Fisico Atletico, Asciutto e Scolpito
        </p>

        {/* CTA Quiz */}
        <style>{`
          @keyframes shimmer-sweep {
            0% { transform: translateX(-150%) skewX(-15deg); }
            100% { transform: translateX(350%) skewX(-15deg); }
          }
          .btn-quiz-hero {
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%);
            color: #fff;
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 0.04em;
            border-radius: 14px;
            padding: 18px 80px;
            text-decoration: none;
            transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
            box-shadow: 0 4px 18px rgba(0,203,219,0.25);
          }
          .btn-quiz-hero:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 16px 40px rgba(0,119,204,0.45), 0 6px 16px rgba(0,203,219,0.35);
          }
          .btn-quiz-hero:active {
            transform: translateY(-1px) scale(0.98);
            box-shadow: 0 4px 12px rgba(0,203,219,0.3);
          }
          .btn-quiz-hero::after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 35%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
            transform: translateX(-150%) skewX(-15deg);
          }
          .btn-quiz-hero:hover::after {
            animation: shimmer-sweep 0.65s ease forwards;
          }
        `}</style>
        <div className="mt-2">
          <Link href="/quiz" className="btn-quiz-hero">
            Scopri il tuo Profilo Fisico <ArrowRight size={18} />
          </Link>
        </div>

        {/* Micro label */}
        <p className="text-white/35 text-xs tracking-wide">
          Scopri il tuo profilo fisico gratuitamente — 2 minuti
        </p>

        {/* STATS — inline con il contenuto */}
        <div className="w-full mt-4 flex items-center justify-center divide-x divide-white/30">
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
