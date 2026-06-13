"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/quiz-fisico", label: "Quiz Fisico Gratuito", chip: true },
  { href: "/allenamento", label: "Allenamento" },
  { href: "/blog", label: "Blog" },
  { href: "https://www.youtube.com/@DaveGambaFitness", label: "YouTube" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Backdrop blur bar */}
      <div
        className={cn(
          "transition-all duration-400 border-b border-white/20",
          scrolled
            ? "backdrop-blur-xl"
            : "bg-transparent backdrop-blur-none"
        )}
        style={scrolled ? {
          background: "linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%)",
        } : undefined}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none shrink-0" style={{
            background: "linear-gradient(105deg, #fff 0%, #fff 38%, #e8f8ff 50%, #fff 62%, #fff 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 4s linear infinite",
          }}>
            <span className="font-serif text-2xl" style={{ fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Dave{" "}</span>
            <span className="font-serif text-2xl" style={{ fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Gamba</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) =>
              l.chip ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-bold text-white rounded-xl px-4 py-1.5 transition-all duration-200 hover:bg-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  style={{ border: "1.5px solid rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)" }}
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-white hover:text-[#00CBDB] text-base font-semibold transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              href="/club"
              className="text-sm font-bold text-black px-5 py-1.5 rounded-full transition-all duration-200 hover:opacity-85 shrink-0"
              style={{ background: "linear-gradient(135deg, #00CBDB, #00AECF)" }}
            >
              Athletic Club
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white hover:text-[#00CBDB] transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-[#080810]/95 backdrop-blur-xl border-b border-[#1e1e2e] transition-all duration-300 overflow-hidden",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) =>
            l.chip ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-bold text-white py-2.5 px-4 rounded-xl border border-white/30 text-center mb-2"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#F0F0F0] text-base font-semibold py-3 border-b border-[#1e1e2e]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            )
          )}
          <div className="pt-3">
            <Link
              href="/club"
              onClick={() => setOpen(false)}
              className="w-full block text-center text-sm font-bold text-black py-3 rounded-full transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #00CBDB, #00AECF)" }}
            >
              Athletic Club
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
