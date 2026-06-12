"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STANDALONE_PAGES = ["/links"];
const STANDALONE_PREFIXES = ["/club", "/login", "/auth", "/quiz", "/sfida-estiva"];

const WA_NUMBER = "393520433445";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Ciao Dave, ho visto il tuo sito e volevo scriverti 👋")}`;

const items = [
  {
    label: "Quiz",
    href: "/quiz",
    color: "white",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0-10c-1.9 0-3.5 1.6-3.5 3.5h2C10.5 9.7 11.2 9 12 9s1.5.7 1.5 1.5c0 .6-.3 1-.8 1.4L11.5 13c-.3.3-.5.8-.5 1.5h2c0-.4.1-.6.3-.8l1.2-1.1c.9-.8 1.5-1.8 1.5-3.1C16 7.6 14.2 7 12 7z"/>
      </svg>
    ),
  },
  {
    label: "Protocolli",
    href: "/club",
    color: "white",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    color: "white",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z"/>
      </svg>
    ),
  },
  {
    label: "Coaching",
    href: "/coaching",
    color: "white",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M12 2l2.9 6.3 6.8.6-5 4.7 1.5 6.7L12 17l-6.2 3.3 1.5-6.7-5-4.7 6.8-.6z"/>
      </svg>
    ),
  },
  {
    label: "Scrivimi",
    href: WA_URL,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="#25D366" width="22" height="22">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  if (STANDALONE_PAGES.includes(pathname)) return null;
  if (STANDALONE_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const isActive = (href: string) => {
    if (href.startsWith("http")) return false;
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  return (
    <nav
      className="sm:hidden fixed z-40"
      style={{
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100vw - 32px)",
        maxWidth: 480,
        borderRadius: 9999,
        background: "rgba(0, 18, 22, 0.38)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        border: "1.5px solid rgba(0, 203, 219, 0.45)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(0,203,219,0.1) inset",
      }}
    >
      <div className="flex items-center w-full">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-[3px] py-3 transition-opacity active:opacity-60"
            >
              <span
                style={{
                  opacity: active ? 1 : 0.55,
                  filter: active ? `drop-shadow(0 0 6px ${item.color}cc)` : "none",
                  transition: "opacity 0.2s, filter 0.2s",
                  display: "flex",
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: active ? item.color : item.color === "#25D366" ? "rgba(37,211,102,0.6)" : "rgba(255,255,255,0.45)",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
