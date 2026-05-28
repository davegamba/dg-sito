import Link from "next/link";
import { Mail } from "lucide-react";

// Inline SVGs per le icone social non presenti in lucide-react
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

const footerLinks = {
  Metodo: [
    { href: "/metodo", label: "Il Metodo BIM" },
    { href: "/blog", label: "Blog" },
    { href: "/prodotti", label: "Tutti i prodotti" },
  ],
  Prodotti: [
    { href: "/prodotti/sfida-28-giorni", label: "Sfida 28 Giorni" },
    { href: "/prodotti/sfida-estiva", label: "Sfida Estiva 21gg" },
    { href: "/prodotti/club", label: "DG Athletic Club" },
    { href: "/prodotti/consulenza", label: "Consulenza 1:1" },
  ],
  Account: [
    { href: "/login", label: "Accedi" },
    { href: "/hub", label: "Area personale" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#080810]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl text-[#F0F0F0]">Dave</span>
              <span className="font-serif text-2xl italic text-[#00CBDB]"> Gamba</span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed mb-4">
              Personal trainer online dal 2009.<br />
              3.000+ clienti. Metodo BIM.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/davegamba"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e1e2e] text-[#888888] hover:text-[#00CBDB] hover:border-[#00CBDB] transition-all duration-200"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href="https://youtube.com/@davegamba"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e1e2e] text-[#888888] hover:text-[#00CBDB] hover:border-[#00CBDB] transition-all duration-200"
                aria-label="YouTube"
              >
                <IconYoutube />
              </a>
              <a
                href="mailto:dave@davegamba.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e1e2e] text-[#888888] hover:text-[#00CBDB] hover:border-[#00CBDB] transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[#F0F0F0] text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[#888888] text-sm hover:text-[#00CBDB] transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#1e1e2e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#444444] text-xs">
            © {new Date().getFullYear()} Dave Gamba. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[#444444] text-xs hover:text-[#888888] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termini" className="text-[#444444] text-xs hover:text-[#888888] transition-colors">
              Termini
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
