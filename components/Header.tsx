"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "https://club.davegamba.com", label: "Protocolli" },
  { href: "/blog", label: "Blog" },
  { href: "https://www.youtube.com/@davegamba", label: "Canale YouTube" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Backdrop blur bar */}
      <div className="bg-[#080810]/80 backdrop-blur-xl border-b border-[#1e1e2e]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <span className="font-serif text-xl text-[#F0F0F0]">Dave</span>
            <span className="font-serif text-xl text-[#00CBDB]">Gamba</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#888888] hover:text-[#F0F0F0] text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://club.davegamba.com"
              className="text-sm font-bold text-black rounded-xl px-5 py-2 transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #00CBDB, #00e0a0)" }}
            >
              Accedi al Club
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#888888] hover:text-[#F0F0F0] transition-colors"
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
              className="text-[#F0F0F0] text-base font-medium py-2 border-b border-[#1e1e2e]"
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
