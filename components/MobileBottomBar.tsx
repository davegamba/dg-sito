import Link from "next/link";

const items = [
  {
    label: "Quiz",
    href: "https://club.davegamba.com/optin-quiz.html",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6l-.7.5V17H9v-1.5l-.7-.5A7 7 0 0 1 12 2zm-2 17h4v1a2 2 0 0 1-4 0v-1z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "Protocolli",
    href: "https://club.davegamba.com/club.html",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M7 2h10v2H7zM5 4h14v8a7 7 0 0 1-14 0V4zm7 14a9 9 0 0 0 6-2.3V21H6v-5.3A9 9 0 0 0 12 18zm-3 3h6v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1z"/>
        <path d="M3 7H5v4a7.1 7.1 0 0 1-.07-1H3V7zm16 0h2v3h-1.93A7.1 7.1 0 0 1 19 11V7z"/>
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z"/>
      </svg>
    ),
  },
  {
    label: "Coaching",
    href: "https://club.davegamba.com/coaching.html",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M12 2l2.9 6.3 6.8.6-5 4.7 1.5 6.7L12 17l-6.2 3.3 1.5-6.7-5-4.7 6.8-.6z"/>
      </svg>
    ),
  },
];

export default function MobileBottomBar() {
  return (
    <nav
      className="sm:hidden fixed bottom-3 left-3 right-3 z-40 rounded-2xl overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #00e5f5 0%, #00CBDB 45%, #009aaa 100%)",
        boxShadow: "0 4px 24px rgba(0,203,219,0.35)",
      }}
    >
      <div className="flex items-stretch">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 active:opacity-70 transition-opacity"
          >
            {item.icon}
            <span className="text-white text-[9px] font-bold tracking-wide uppercase">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
