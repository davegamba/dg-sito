import Link from "next/link";
import { Mail } from "lucide-react";

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

const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const footerLinks = {
  Contenuti: [
    { href: "/blog", label: "Blog & Guide" },
    { href: "https://www.youtube.com/@DaveGambaFitness", label: "Canale YouTube", external: true },
  ],
  Prodotti: [
    { href: "/coming-soon", label: "Quiz Profilo Fisico" },
    { href: "/coming-soon", label: "Sfida Estiva 21gg" },
    { href: "/coming-soon", label: "Coaching" },
  ],
  Legale: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/termini", label: "Termini e Condizioni" },
    { href: "/coming-soon", label: "Cookie Policy" },
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
            <div className="mb-3">
              <span className="font-serif text-2xl text-[#F0F0F0]">Dave</span>
              <span className="font-serif text-2xl text-[#00CBDB]">Gamba</span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed mb-2">
              Il Metodo Breve, Intenso, Mirato<br />
              per un Fisico Atletico, Asciutto e Scolpito
            </p>
            <a
              href="mailto:info@davegamba.com"
              className="text-[#555] text-xs hover:text-[#00CBDB] transition-colors duration-200 mb-4 inline-block"
            >
              info@davegamba.com
            </a>

            {/* Social */}
            <div className="flex gap-3 mt-4">
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
                href="https://www.youtube.com/@DaveGambaFitness"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e1e2e] text-[#888888] hover:text-[#00CBDB] hover:border-[#00CBDB] transition-all duration-200"
                aria-label="YouTube"
              >
                <IconYoutube />
              </a>
              <a
                href="https://www.facebook.com/davegambafitness/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e1e2e] text-[#888888] hover:text-[#00CBDB] hover:border-[#00CBDB] transition-all duration-200"
                aria-label="Facebook"
              >
                <IconFacebook />
              </a>
              <a
                href="mailto:info@davegamba.com"
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
                  <li key={l.href + l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888888] text-sm hover:text-[#00CBDB] transition-colors duration-200"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[#888888] text-sm hover:text-[#00CBDB] transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#1e1e2e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#444444] text-xs">
            © {new Date().getFullYear()} Dave Gamba — P.IVA 09230900962 — Tutti i diritti riservati.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[#555555] text-xs hover:text-[#888888] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termini" className="text-[#555555] text-xs hover:text-[#888888] transition-colors">
              Termini
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
