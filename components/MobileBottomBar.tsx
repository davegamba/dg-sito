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
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
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
        background: "radial-gradient(ellipse at 50% 50%, #80F0FA 0%, #00CBDB 60%, #00CBDB 100%)",
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
            <span className="text-white text-[11px] font-bold tracking-wide uppercase">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
