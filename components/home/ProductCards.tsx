"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const R = "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/";
const FREE  = { background: "rgba(0,200,219,.18)", color: "#00C8DB", borderColor: "rgba(0,200,219,.4)" };
const GOLD  = { background: "#F0C040", color: "#000" };
const DIM   = { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)", cursor: "default" as const };
const WHITE = { background: "transparent", color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.5)" };

const products = [
  {
    image: R + "quiz-fisico-barcellona.jpg",
    imagePosition: "center",
    badge: "✓ GRATUITO",
    badgeStyle: FREE,
    title: "Quiz Profilo Fisico",
    desc: "Scopri il tuo tipo fisico e ricevi un piano personalizzato. 2 minuti.",
    price: null,
    cta: "Fai il quiz →",
    ctaStyle: GOLD,
    href: "/quiz-fisico",
  },
  {
    image: R + "Facetune_29-05-2026-20-47-56.jpg",
    imagePosition: "center 70%",
    badge: "✓ GRATUITO",
    badgeStyle: FREE,
    title: "App Conta-Calorie",
    desc: "Calcola i tuoi macro e traccia quello che mangi. Gratis.",
    price: null,
    cta: "Apri →",
    ctaStyle: GOLD,
    href: "https://www.davegamba.com/calorie/",
  },
  {
    image: R + "affondo-dave-intera.jpg",
    imagePosition: "center",
    badge: "✓ GRATUITO",
    badgeStyle: FREE,
    title: "Scheda Start",
    desc: "Il tuo primo allenamento BIM. 15 minuti. Corpo libero.",
    price: null,
    cta: "Inizia →",
    ctaStyle: GOLD,
    href: "https://club.davegamba.com/allenamento-start.html",
  },
  {
    image: R + "Facetune_25-03-2026-09-35-25.jpg",
    imagePosition: "center 65%",
    badge: "PIÙ VENDUTO",
    badgeStyle: WHITE,
    title: "Sfida Estiva 21 Giorni",
    desc: "21 giorni insieme per tornare in forma. Metodo BIM.",
    price: "€33",
    cta: "Scopri →",
    ctaStyle: GOLD,
    href: "https://sfidaestiva.davegamba.com",
  },
  {
    image: R + "card-quiz-metabolico.jpg",
    imagePosition: "center",
    badge: "✓ GRATUITO",
    badgeStyle: FREE,
    title: "Calcolatore Fabbisogno",
    desc: "Calcola le calorie e i macro ideali per il tuo obiettivo.",
    price: null,
    cta: "Calcola →",
    ctaStyle: GOLD,
    href: "https://club.davegamba.com/calcolatore-fabbisogno.html",
  },
  {
    image: R + "foto-sfida-estiva.jpg",
    imagePosition: "center",
    badge: "12 SESSIONI",
    badgeStyle: FREE,
    title: "Addominali & Pancia Piatta",
    desc: "4 settimane di allenamento core. Corpo libero, a casa.",
    price: "€21",
    cta: "Scopri →",
    ctaStyle: GOLD,
    href: "https://www.davegamba.com/addominali",
  },
  {
    image: R + "foto-sfida-estiva.jpg",
    imagePosition: "center",
    badge: "IN COSTRUZIONE",
    badgeStyle: { background: "transparent", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.2)" },
    title: "Da Zero a Fit",
    desc: "Il programma completo per chi parte da zero. In arrivo.",
    price: null,
    cta: "In arrivo",
    ctaStyle: DIM,
    href: null,
  },
  {
    image: R + "img_06.jpeg",
    imagePosition: "30% bottom",
    badge: "IN COSTRUZIONE",
    badgeStyle: { background: "transparent", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.2)" },
    title: "Glutei Alti & Sodi",
    desc: "6 settimane di protocollo specifico. In arrivo.",
    price: null,
    cta: "In arrivo",
    ctaStyle: DIM,
    href: null,
  },
  {
    image: R + "Facetune_25-03-2026-09-35-25.jpg",
    imagePosition: "center",
    badge: "IN COSTRUZIONE",
    badgeStyle: { background: "transparent", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.2)" },
    title: "Sollievo Mal di Schiena",
    desc: "Protocollo posturale e di rinforzo. In arrivo.",
    price: null,
    cta: "In arrivo",
    ctaStyle: DIM,
    href: null,
  },
  {
    image: R + "sfondo-links-1.jpeg",
    imagePosition: "center top",
    badge: "PERSONALIZZATO",
    badgeStyle: WHITE,
    title: "Premium Coaching 1-1",
    desc: "Il servizio personalizzato guidato direttamente da Dave.",
    price: null,
    cta: "Scopri di più →",
    ctaStyle: GOLD,
    href: "/coaching",
  },
];

export default function ProductCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#00C8DB] text-xs font-semibold tracking-widest uppercase mb-3 block">
              DG Athletic Club
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
              Gli strumenti per te
            </h2>
            <a
              href="https://club.davegamba.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-black px-5 py-2 rounded-full transition-all duration-200 hover:opacity-85"
              style={{ background: "linear-gradient(135deg, #00C8DB, #00AECF)" }}
            >
              Entra nel Club →
            </a>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-white hover:border-[#00C8DB] transition-all duration-200" aria-label="Precedente">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-white hover:border-[#00C8DB] transition-all duration-200" aria-label="Successivo">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          paddingLeft: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          paddingRight: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((p) => (
          <motion.div
            key={p.title}
            className="group flex-none w-[260px] sm:w-[280px] rounded-[20px] overflow-hidden relative cursor-pointer"
            style={{ height: "340px" }}
            onClick={() => p.href && window.open(p.href, "_self")}
            whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Foto di sfondo */}
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('${p.image}')`,
                backgroundSize: "cover",
                backgroundPosition: p.imagePosition,
              }}
            />
            {/* Overlay scuro */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)" }} />

            {/* Contenuto */}
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              {/* Badge */}
              <div>
                <span
                  className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={p.badgeStyle}
                >
                  {p.badge}
                </span>
              </div>

              {/* Testo + CTA in basso */}
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="font-serif text-2xl text-white leading-snug mb-1">{p.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  {p.price && <span className="font-serif text-2xl text-[#F0C040]">{p.price}</span>}
                  <a
                    href={p.href || undefined}
                    className="ml-auto text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200"
                    style={p.ctaStyle}
                    onClick={(e) => !p.href && e.preventDefault()}
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
