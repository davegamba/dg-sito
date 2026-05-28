import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const bullets = [
  "21 minuti, 3 volte a settimana",
  "Metodo basato su evidenze PubMed",
  "3.000+ clienti trasformati dal 2009",
];

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-end md:items-center overflow-hidden bg-black">

      {/* ── FOTO FULL-BLEED ──────────────────────────────── */}
      {/* Desktop: riempie metà destra. Mobile: riempie tutto lo sfondo */}
      <div className="absolute inset-0 md:left-[42%] pointer-events-none">
        <Image
          src="/images/dave.jpg"
          alt="Dave Gamba — Personal Trainer"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        {/* Gradiente sinistra → nero (desktop) */}
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, #000000 15%, #00000099 45%, transparent 100%)",
          }}
        />
        {/* Gradiente top → nero sottile (mobile + desktop) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(to bottom, #000000 0%, transparent 100%)" }}
        />
        {/* Gradiente bottom → nero (mobile: copre bene il testo) */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 md:hidden"
          style={{
            height: "75%",
            background: "linear-gradient(to top, #000000 50%, transparent 100%)",
          }}
        />
        {/* Gradiente bottom desktop — sfuma foto in basso */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 hidden md:block h-48"
          style={{ background: "linear-gradient(to top, #000000 0%, transparent 100%)" }}
        />
      </div>

      {/* ── CONTENUTO ────────────────────────────────────── */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 md:py-32">
        <div className="max-w-xl flex flex-col gap-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 w-fit">
            <span className="h-2 w-2 rounded-full bg-[#00CBDB] animate-pulse" />
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase">
              Personal Trainer Online dal 2009
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-white">
            Torna in forma{" "}
            <em className="not-italic text-[#00CBDB]">senza</em>{" "}
            perdere ore in palestra
          </h1>

          {/* Subheadline */}
          <p className="text-[#aaaaaa] text-lg leading-relaxed">
            Il Metodo BIM — Breve, Intenso, Mirato — per professionisti
            35–50 anni che vogliono risultati reali con il tempo che hanno.
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white text-sm">
                <CheckCircle2 size={16} className="text-[#00CBDB] shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="primary" size="lg" className="group">
              <Link href="/optin/sfida" className="flex items-center gap-2">
                Inizia gratis ora
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg">
              <Link href="/metodo">Scopri il metodo</Link>
            </Button>
          </div>

          {/* Social proof micro */}
          <p className="text-[#555555] text-xs">
            Già con{" "}
            <span className="text-[#888888] font-semibold">15.000+ professionisti</span>
          </p>
        </div>

        {/* Badge float — visibili solo desktop */}
        <div className="hidden md:flex absolute right-8 bottom-16 gap-4">
          <div className="bg-black/70 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
            <span className="font-serif text-3xl text-[#00CBDB] leading-none">15+</span>
            <div>
              <div className="text-white text-xs font-semibold">anni</div>
              <div className="text-[#666] text-xs">online</div>
            </div>
          </div>
          <div className="bg-black/70 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
            <span className="font-serif text-3xl text-[#F0C040] leading-none">3K+</span>
            <div>
              <div className="text-white text-xs font-semibold">clienti</div>
              <div className="text-[#666] text-xs">trasformati</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
