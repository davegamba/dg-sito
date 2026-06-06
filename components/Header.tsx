"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "https://club.davegamba.com", label: "Protocolli" },
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
          "transition-all duration-400",
          scrolled
            ? "backdrop-blur-xl border-b border-[#00CBDB]/20"
            : "bg-transparent backdrop-blur-none"
        )}
        style={scrolled ? {
          background: "linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%)",
        } : undefined}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <span className={`font-serif text-2xl transition-colors duration-400 ${scrolled ? "text-white" : "text-[#F0F0F0]"}`}>Dave</span>
            <span className={`font-serif text-2xl transition-colors duration-400 ${scrolled ? "text-[#001E28]" : "text-[#00CBDB]"}`}>Gamba</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white hover:text-[#00CBDB] text-base font-semibold transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://club.davegamba.com"
              className="text-sm font-bold text-white rounded-xl px-5 py-2 transition-all duration-200 hover:bg-white/20"
              style={{ border: "1.5px solid rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)" }}
            >
              Accedi al Club
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
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#F0F0F0] text-base font-semibold py-2 border-b border-[#1e1e2e]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Button variant="primary" size="md" className="w-full">
              <Link href="https://club.davegamba.com" onClick={() => setOpen(false)}>
                Accedi alla tua area personale del Club
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
