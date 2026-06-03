"use client";

import { useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { id: "hGA0z6hRihk" },
  { id: "Dv8NRpmSXE0" },
  { id: "WCLaVNUxjfU" },
  { id: "VLaos7K2jMQ" },
  { id: "oAxIWT0hK5U" },
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
                alt="Video"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay play */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-[#00CBDB]/20 group-hover:border-[#00CBDB]/50 transition-all duration-300">
                  <Play size={22} fill="white" className="text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Info */}
            <h3 className="text-white text-sm font-medium leading-snug mb-1 group-hover:text-[#00CBDB] transition-colors duration-200 line-clamp-2">
              {v.title}
            </h3>
          </a>
        ))}
      </div>

      {/* CTA canale */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <a
          href="https://www.youtube.com/@DaveGambaFitness"
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
