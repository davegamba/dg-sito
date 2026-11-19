"use client";

import Link from "next/link";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Testata delle pagine in lingua straniera: stesso aspetto di components/Header.tsx,
// ma solo voci che portano a pagine in quella lingua (regole 26-27 di
// references/regole_sito_multilingua.md). Dati e testi arrivano da LangHeader.

export type LangNavItem = { href: string; label: string; external?: boolean; highlight?: boolean };

export default function LangNav({
  home,
  items,
  menuLabel,
  langSwitch,
}: {
  home: string;
  items: LangNavItem[];
  menuLabel: string;
  langSwitch: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const itemProps = (item: LangNavItem) =>
    item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={cn(
          "transition-all duration-400",
          scrolled || open
            ? "backdrop-blur-xl border-b border-white/10"
            : "bg-transparent backdrop-blur-none border-b border-white/20"
        )}
        style={scrolled || open ? {
          background: "linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 100%)",
        } : undefined}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo: porta all'indice della lingua */}
          <Link href={home} className="flex items-center select-none shrink-0" style={{
            background: "linear-gradient(90deg, #00E5F5 0%, #00CBDB 40%, #00AECF 68%, #0077CC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            <span className="font-serif text-xl sm:text-2xl" style={{ fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Dave Gamba</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {items.map((item) =>
              item.highlight ? (
                <a
                  key={item.href}
                  href={item.href}
                  {...itemProps(item)}
                  className="text-sm font-bold text-white px-5 py-1.5 rounded-full transition-all duration-200 hover:opacity-85 shrink-0"
                  style={{ background: "linear-gradient(135deg, #00C8DB, #00AECF)" }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  {...itemProps(item)}
                  className="text-white hover:text-[#00C8DB] text-base font-semibold transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  {item.label}
                </Link>
              )
            )}
            {langSwitch}
          </div>

          {/* Telefono */}
          <button
            className="lg:hidden text-white hover:text-[#00C8DB] transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={menuLabel}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Cambio lingua da telefono: sotto la barra, sempre in alto a destra (regola 10a) */}
        {!open && langSwitch && (
          <div className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 pb-2 -mt-1 flex justify-end drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {langSwitch}
          </div>
        )}
      </div>

      {/* Menu da telefono */}
      <div
        className={cn(
          "lg:hidden bg-[#080810]/95 backdrop-blur-xl border-b border-[#1e1e2e] transition-all duration-300 overflow-hidden",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          {items.filter((i) => i.highlight).map((item) => (
            <div key={item.href} className="pb-3">
              <a
                href={item.href}
                {...itemProps(item)}
                onClick={() => setOpen(false)}
                className="w-full block text-center text-sm font-bold text-white py-3 rounded-full transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #00C8DB, #00AECF)" }}
              >
                {item.label}
              </a>
            </div>
          ))}
          {items.filter((i) => !i.highlight).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...itemProps(item)}
              className="text-[#F0F0F0] text-base font-semibold py-3 border-b border-[#1e1e2e]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {langSwitch && <div className="pt-4">{langSwitch}</div>}
        </div>
      </div>
    </header>
  );
}
