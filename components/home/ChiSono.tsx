"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Foto della storia di Dave — sostituire con percorsi reali
// Metti le foto in /public/images/storia/
const storyPhotos = [
  { src: "/images/storia/dave-01.jpg", caption: "2009 — I primi clienti online" },
  { src: "/images/storia/dave-02.jpg", caption: "Le prime trasformazioni" },
  { src: "/images/storia/dave-03.jpg", caption: "DaveGamba.com, 2M+ lettori" },
  { src: "/images/storia/dave-04.jpg", caption: "Il Metodo BIM prende forma" },
  { src: "/images/storia/dave-05.jpg", caption: "3.000+ clienti trasformati" },
];

export default function ChiSono() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Layout: testo sopra su mobile, side-by-side su desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── TESTO ───────────────────────── */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
                Chi sono
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
                15 anni a fare una sola cosa,{" "}
                <em className="not-italic text-[#00CBDB]">bene.</em>
              </h2>
            </div>

            <p className="text-[#888] text-base leading-relaxed">
              Sono Dave Gamba, personal trainer online dal 2009 — quando il concetto di
              "fitness online" non esisteva ancora. Ho iniziato da zero, senza followers,
              senza budget, con solo un metodo che funzionava.
            </p>

            <p className="text-[#888] text-base leading-relaxed">
              Negli anni ho seguito più di 3.000 clienti: manager, medici, avvocati,
              imprenditori. Persone con poco tempo e grandi aspettative.
              Ho capito che il problema non è mai la motivazione — è sempre il metodo.
            </p>

            <p className="text-[#888] text-base leading-relaxed">
              Il Metodo BIM è nato da questa osservazione: chi ottiene risultati duraturi
              non si allena di più. Si allena <em>meglio</em>. Breve, Intenso, Mirato.
              21 minuti, tre volte a settimana. Niente di più, niente di meno.
            </p>

            {/* Numeri inline */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#111]">
              {[
                { n: "2009", label: "anno di inizio" },
                { n: "3K+", label: "clienti" },
                { n: "2M+", label: "lettori blog" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-2xl text-[#00CBDB] mb-0.5">{s.n}</div>
                  <div className="text-[#555] text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/metodo"
              className="inline-flex items-center gap-2 text-[#00CBDB] text-sm font-medium hover:gap-3 transition-all duration-200 w-fit"
            >
              Scopri il metodo completo
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* ── FOTO SCORREVOLI ─────────────── */}
          <div className="flex flex-col gap-4">
            {/* Arrows */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-[#222] flex items-center justify-center text-[#555] hover:text-white hover:border-[#00CBDB] transition-all duration-200"
                aria-label="Precedente"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-[#222] flex items-center justify-center text-[#555] hover:text-white hover:border-[#00CBDB] transition-all duration-200"
                aria-label="Successivo"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Photo strip */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {storyPhotos.map((p, i) => (
                <div key={i} className="flex-none w-[220px] sm:w-[240px]">
                  <div className="w-full aspect-[3/4] rounded-[14px] overflow-hidden bg-[#111] mb-2 relative">
                    {/* Placeholder finché non ci sono le foto */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                      <span className="text-[#333] text-4xl font-serif">{i + 1}</span>
                    </div>
                    <img
                      src={p.src}
                      alt={p.caption}
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <p className="text-[#555] text-xs leading-snug">{p.caption}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
