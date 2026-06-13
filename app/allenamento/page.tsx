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
    titolo: "Petto",
    label: "Pettorali",
    descrizione: "Panca, croci e push-up: tecnica corretta per pettorali sviluppati senza distruggere le spalle.",
    emoji: "💪",
    colore: "#00CBDB",
  },
  {
    slug: "esercizi-dorsali",
    titolo: "Schiena",
    label: "Dorsali",
    descrizione: "Trazioni, rematori e lat machine: il sistema per costruire dorsali larghi e postura corretta.",
    emoji: "🔙",
    colore: "#00CBDB",
  },
  {
    slug: "esercizi-spalle",
    titolo: "Spalle",
    label: "Deltoidi",
    descrizione: "Military press, alzate laterali e deltoide posteriore: spalle larghe e articolazione sana.",
    emoji: "🏋️",
    colore: "#00CBDB",
  },
  {
    slug: "esercizi-braccia",
    titolo: "Braccia",
    label: "Bicipiti & Tricipiti",
    descrizione: "I tricipiti sono i due terzi del braccio. Il sistema completo per bicipiti e tricipiti in superserie.",
    emoji: "💪",
    colore: "#00CBDB",
  },
  {
    slug: "esercizi-addominali",
    titolo: "Core",
    label: "Addominali",
    descrizione: "Addominali forti senza distruggere la schiena: plank, hollow body e stabilizzazione reale.",
    emoji: "⚡",
    colore: "#00CBDB",
  },
  {
    slug: "esercizi-gambe",
    titolo: "Gambe",
    label: "Quadricipiti & Femorali",
    descrizione: "Squat, stacchi e affondi: il sistema per gambe forti e ginocchia sane a qualsiasi età.",
    emoji: "🦵",
    colore: "#00CBDB",
  },
  {
    slug: "esercizi-glutei",
    titolo: "Glutei",
    label: "Glutei",
    descrizione: "Hip thrust, abduzioni e attivazione pre-sessione: glutei alti e sodi senza ingrossare le gambe.",
    emoji: "🎯",
    colore: "#00CBDB",
  },
];

export default function AllenamentoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative py-16 sm:py-24 bg-black border-b border-[#1a1a1a]">
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #000 0%, #0a1a1a 50%, #000 100%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">
              Metodo BIM — Guide Complete
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4">
              Allenamento per Zona Muscolare
            </h1>
            <p className="text-[#e5e5e5] text-lg max-w-xl">
              Tecnica corretta, errori comuni e schema pratico per ogni gruppo muscolare.
              Ogni guida include livello base, intermedio e avanzato — per palestra e casa.
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
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{zona.emoji}</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#00CBDB] bg-[#00CBDB]/10 px-3 py-1 rounded-full">
                      {zona.label}
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
