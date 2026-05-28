"use client";

import { useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

// Video placeholder — sostituire con ID reali YouTube di Dave
const videos = [
  {
    id: "dQw4w9WgXcQ", // placeholder
    title: "Come perdere grasso senza cardio (la verità scientifica)",
    views: "128K visualizzazioni",
    duration: "12:34",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Il Metodo BIM spiegato in 10 minuti",
    views: "89K visualizzazioni",
    duration: "10:02",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Proteine: quante ne servono davvero?",
    views: "214K visualizzazioni",
    duration: "15:21",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Addominali: smetti di fare sit-up",
    views: "340K visualizzazioni",
    duration: "8:47",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Testosterone dopo i 40: cosa funziona",
    views: "176K visualizzazioni",
    duration: "18:05",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "L'allenamento perfetto per chi lavora tutto il giorno",
    views: "95K visualizzazioni",
    duration: "11:18",
  },
];

export default function YoutubeScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header row */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
              YouTube · 26K iscritti
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Video gratuiti
            </h2>
          </div>

          {/* Arrow controls */}
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

      {/* Scroll track — va oltre i bordi del container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{
          paddingLeft: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          paddingRight: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {videos.map((v, i) => (
          <a
            key={i}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-none w-[300px] sm:w-[320px]"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video rounded-[14px] overflow-hidden bg-[#111] mb-3">
              <img
                src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                alt={v.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay play */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-[#00CBDB]/20 group-hover:border-[#00CBDB]/50 transition-all duration-300">
                  <Play size={22} fill="white" className="text-white ml-1" />
                </div>
              </div>
              {/* Duration badge */}
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-0.5 rounded">
                {v.duration}
              </span>
            </div>

            {/* Info */}
            <h3 className="text-white text-sm font-medium leading-snug mb-1 group-hover:text-[#00CBDB] transition-colors duration-200 line-clamp-2">
              {v.title}
            </h3>
            <p className="text-[#555] text-xs">{v.views}</p>
          </a>
        ))}
      </div>

      {/* CTA canale */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <a
          href="https://youtube.com/@davegamba"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#00CBDB] text-sm font-medium hover:gap-3 transition-all duration-200"
        >
          Vai al canale YouTube
          <ChevronRight size={16} />
        </a>
      </div>
    </section>
  );
}
