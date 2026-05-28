"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Trophy, Users, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    icon: Zap,
    badge: "Inizia da qui",
    badgeColor: "text-[#00CBDB] bg-[#00cbdb11] border-[#00cbdb22]",
    title: "Sfida 28 Giorni",
    description:
      "Il primo passo. 4 settimane di allenamenti BIM strutturati, guida nutrizionale base e accesso alla community.",
    price: "€28",
    priceNote: "pagamento unico",
    href: "/prodotti/sfida-28-giorni",
    featured: false,
    ctaLabel: "Inizia la sfida",
  },
  {
    icon: Trophy,
    badge: "Più venduto",
    badgeColor: "text-[#F0C040] bg-[#f0c04011] border-[#f0c04022]",
    title: "Sfida Estiva 21 Giorni",
    description:
      "21 giorni intensi per arrivare all'estate. Protocollo specifico corpo uomo + alimentazione pratica.",
    price: "€37",
    priceNote: "prezzo lancio — poi €47",
    href: "/prodotti/sfida-estiva",
    featured: true,
    ctaLabel: "Entra nella sfida",
  },
  {
    icon: Users,
    badge: "Membership",
    badgeColor: "text-[#00CBDB] bg-[#00cbdb11] border-[#00cbdb22]",
    title: "DG Athletic Club",
    description:
      "Allenamenti aggiornati ogni mese, libreria BIM completa, coaching di gruppo e accesso diretto a Dave.",
    price: "€17",
    priceNote: "al mese, disdici quando vuoi",
    href: "/prodotti/club",
    featured: false,
    ctaLabel: "Unisciti al club",
  },
  {
    icon: MessageCircle,
    badge: "Personalizzato",
    badgeColor: "text-[#888888] bg-[#88888811] border-[#88888822]",
    title: "Consulenza 1:1",
    description:
      "60 minuti con Dave. Analisi completa, piano personalizzato e risposta a tutte le tue domande.",
    price: "€197",
    priceNote: "sessione singola",
    href: "/prodotti/consulenza",
    featured: false,
    ctaLabel: "Prenota ora",
  },
];

export default function ProductCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header row */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Inizia da dove sei
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Scegli il tuo percorso
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-white hover:border-[#00CBDB] transition-all duration-200"
              aria-label="Precedente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-white hover:border-[#00CBDB] transition-all duration-200"
              aria-label="Successivo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll track — sborda dai bordi come YouTube */}
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
        {products.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.title}
              href={p.href}
              className={cn(
                "group flex-none w-[280px] sm:w-[300px] flex flex-col gap-4 p-6 rounded-[20px] border transition-all duration-300 hover:-translate-y-1",
                p.featured
                  ? "bg-[#0d0d0d] border-[#00CBDB] shadow-[0_0_40px_#00cbdb12]"
                  : "bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#333]"
              )}
            >
              {/* Badge */}
              <span
                className={cn(
                  "inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border",
                  p.badgeColor
                )}
              >
                {p.badge}
              </span>

              {/* Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  p.featured ? "bg-[#00cbdb18]" : "bg-[#ffffff06]"
                )}
              >
                <Icon
                  size={20}
                  className={p.featured ? "text-[#00CBDB]" : "text-[#666]"}
                />
              </div>

              {/* Title + description */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-serif text-lg text-white leading-snug">
                  {p.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed flex-1">
                  {p.description}
                </p>
              </div>

              {/* Price */}
              <div>
                <span
                  className={cn(
                    "font-serif text-2xl leading-none block mb-0.5",
                    p.featured ? "text-[#00CBDB]" : "text-white"
                  )}
                >
                  {p.price}
                </span>
                <span className="text-[#444] text-xs">{p.priceNote}</span>
              </div>

              {/* CTA */}
              <div
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-all duration-200",
                  p.featured
                    ? "text-[#00CBDB]"
                    : "text-[#555] group-hover:text-[#00CBDB]"
                )}
              >
                {p.ctaLabel}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
