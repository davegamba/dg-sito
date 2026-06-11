"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STANDALONE_PAGES = ["/links"];
const STANDALONE_PREFIXES = ["/club", "/login", "/auth"];

const items = [
  {
    label: "Quiz",
    href: "/coming-soon",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6l-.7.5V17H9v-1.5l-.7-.5A7 7 0 0 1 12 2zm-2 17h4v1a2 2 0 0 1-4 0v-1z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "Protocolli",
    href: "https://club.davegamba.com/club.html",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z"/>
      </svg>
    ),
  },
  {
    label: "Coaching 1-1",
    href: "/coaching#candidati",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
        <path d="M12 2l2.9 6.3 6.8.6-5 4.7 1.5 6.7L12 17l-6.2 3.3 1.5-6.7-5-4.7 6.8-.6z"/>
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
        width: "max-content",
        maxWidth: "calc(100vw - 32px)",
        borderRadius: 9999,
        background: "rgba(0, 18, 22, 0.55)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        border: "1px solid rgba(0, 203, 219, 0.22)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(0,203,219,0.1) inset",
      }}
    >
      <div className="flex items-center px-2">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-[3px] px-4 py-3 transition-opacity active:opacity-60"
              style={{ minWidth: 56 }}
            >
              <span
                style={{
                  opacity: active ? 1 : 0.55,
                  filter: active ? "drop-shadow(0 0 6px rgba(0,203,219,0.8))" : "none",
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
                  color: active ? "#00CBDB" : "rgba(255,255,255,0.45)",
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
