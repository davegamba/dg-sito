import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allenamento per Zona Muscolare — Dave Gamba",
  description: "Guide complete su come allenare ogni zona muscolare: tecnica corretta, errori comuni e schema Breve-Intenso-Mirato. Dorsali, gambe, spalle, braccia, glutei, petto e core.",
};

const zone = [
  {
    slug: "esercizi-pettorali",
    titolo: "Pettorali",
    descrizione: "Panca, croci e push-up: tecnica corretta per pettorali sviluppati senza distruggere le spalle.",
  },
  {
    slug: "esercizi-addominali",
    titolo: "Addominali",
    descrizione: "Addominali forti senza distruggere la schiena: plank, hollow body e stabilizzazione reale.",
  },
  {
    slug: "esercizi-glutei",
    titolo: "Glutei",
    descrizione: "Hip thrust, abduzioni e attivazione pre-sessione: glutei alti e sodi senza ingrossare le gambe.",
  },
  {
    slug: "esercizi-braccia",
    titolo: "Braccia",
    descrizione: "I tricipiti sono i due terzi del braccio. Il sistema completo per bicipiti e tricipiti in superserie.",
  },
  {
    slug: "esercizi-spalle",
    titolo: "Spalle",
    descrizione: "Military press, alzate laterali e deltoide posteriore: spalle larghe e articolazione sana.",
  },
  {
    slug: "esercizi-gambe",
    titolo: "Gambe",
    descrizione: "Squat, stacchi e affondi: il sistema per gambe forti e ginocchia sane a qualsiasi età.",
  },
  {
    slug: "esercizi-dorsali",
    titolo: "Dorsali",
    descrizione: "Trazioni, rematori e lat machine: il sistema per costruire dorsali larghi e postura corretta.",
  },
];

export default function AllenamentoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative py-24 sm:py-36 border-b border-[#1a1a1a] overflow-hidden">
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #0a0a0a 0%, #0d1a1a 40%, #091414 70%, #050505 100%)",
            }}
          />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#00CBDB 1px, transparent 1px), linear-gradient(90deg, #00CBDB 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-5 block">
              DaveGamba.com
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl text-white mb-6 tracking-tight">
              Area Allenamento
            </h1>
            <p className="text-[#888] text-lg max-w-xl mx-auto">
              Guide complete per ogni zona muscolare. Tecnica, errori comuni e schema BIM —
              dal livello base all'avanzato, per palestra e casa.
            </p>
          </div>
        </section>

        {/* Griglia zone */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {zone.map((zona) => (
                <Link
                  key={zona.slug}
                  href={`/blog/${zona.slug}`}
                  className="group block bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#222] rounded-[20px] p-7 hover:border-[#00CBDB]/40 hover:from-[#111] hover:to-[#0d1f1f] transition-all duration-300"
                >
                  <div className="flex items-start justify-end mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#00CBDB] bg-[#00CBDB]/10 px-3 py-1 rounded-full">
                      Guida Completa
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-2xl mb-2 group-hover:text-[#00CBDB] transition-colors duration-200">
                    {zona.titolo}
                  </h2>
                  <p className="text-[#888] text-sm leading-relaxed mb-5">
                    {zona.descrizione}
                  </p>
                  <span className="text-[#00CBDB] text-sm font-semibold group-hover:translate-x-1 inline-block transition-transform duration-200">
                    Leggi la guida →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#050505] border-t border-[#1a1a1a]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4">
              ⚡ Metodo BIM
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
              21 minuti. 3 volte a settimana.
            </h2>
            <p className="text-[#888] text-base mb-8 max-w-lg mx-auto">
              Scopri il tuo profilo fisico e ricevi il programma giusto per te — con la tecnica corretta per ogni zona muscolare.
            </p>
            <Link
              href="/quiz-fisico"
              className="inline-block font-bold text-black px-8 py-3 rounded-[12px] transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00CBDB, #00AECF)" }}
            >
              Scopri il tuo Profilo Fisico →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
