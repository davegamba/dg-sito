import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Dave Gamba — Personal Trainer Online dal 2009 | Chi Sono",
  description:
    "Dave Gamba è il primo personal trainer online italiano, attivo dal 2009. Fondatore del Metodo BIM, oltre 3.000 clienti seguiti. ISSA certificato. Milano, Italia.",
  alternates: { canonical: "https://www.davegamba.com/autore/dave-gamba" },
  openGraph: {
    title: "Dave Gamba — Personal Trainer Online dal 2009",
    description:
      "Primo personal trainer online italiano. Fondatore del Metodo BIM — Breve, Intenso, Mirato. Oltre 3.000 clienti trasformati in 15+ anni.",
    url: "https://www.davegamba.com/autore/dave-gamba",
    type: "profile",
    images: [
      {
        url: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const authorJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.davegamba.com/#person",
  name: "Dave Gamba",
  url: "https://www.davegamba.com/autore/dave-gamba",
  image:
    "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg",
  jobTitle: "Personal Trainer Online",
  description:
    "Personal trainer online dal 2009, fondatore del Metodo BIM — Breve, Intenso, Mirato. Oltre 3.000 clienti seguiti in 15+ anni di attività. Certificazione ISSA.",
  birthDate: "1984-11-23",
  nationality: "IT",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Milano",
    addressCountry: "IT",
  },
  sameAs: [
    "https://www.instagram.com/davegamba_fit/",
    "https://www.youtube.com/@DaveGambaFitness",
  ],
  knowsAbout: [
    "Allenamento funzionale",
    "Nutrizione sportiva",
    "Ipertrofia muscolare",
    "Longevità e anti-aging",
    "Personal training online",
    "Metodo BIM",
    "Allenamento uomo over 40",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Certificazione",
    recognizedBy: { "@type": "Organization", name: "ISSA — International Sports Sciences Association" },
  },
  worksFor: {
    "@type": "Organization",
    name: "DaveGamba.com",
    url: "https://www.davegamba.com",
  },
};

const MEDIA_MENTIONS = [
  "Corriere della Sera",
  "La Repubblica",
  "Vanity Fair",
  "Rai Radio 2",
];

const CREDENTIALS = [
  { label: "Attivo online dal", value: "2009" },
  { label: "Clienti seguiti", value: "3.000+" },
  { label: "Lettori blog", value: "2M+" },
  { label: "Follower Instagram", value: "56K+" },
  { label: "Iscritti YouTube", value: "26K+" },
  { label: "Email list", value: "15.000+" },
];

export default function AutorePage() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <Header />
      <main className="flex-1 pt-16 bg-[#fdf9f2] min-h-screen">

        {/* Hero autore */}
        <section className="bg-black text-white py-20 px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10">
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-[#00CBDB]/30">
              <Image
                src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg"
                alt="Dave Gamba — Personal Trainer Online"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <p className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-2">
                Personal Trainer Online dal 2009
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">Dave Gamba</h1>
              <p className="text-white/70 text-base leading-relaxed max-w-lg">
                Primo personal trainer online italiano. Fondatore del Metodo BIM —
                Breve, Intenso, Mirato. Certificazione ISSA. Milano.
              </p>
              <div className="flex gap-4 mt-5">
                <a
                  href="https://www.instagram.com/davegamba_fit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CBDB] text-sm font-semibold hover:underline"
                >
                  Instagram →
                </a>
                <a
                  href="https://www.youtube.com/@DaveGambaFitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CBDB] text-sm font-semibold hover:underline"
                >
                  YouTube →
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-14">

          {/* Numeri */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CREDENTIALS.map(({ label, value }) => (
                <div key={label} className="bg-white rounded-[16px] p-5 border border-[#e8e0d4]">
                  <div className="font-serif text-3xl text-[#00CBDB] font-bold">{value}</div>
                  <div className="text-[#666] text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Bio */}
          <section className="prose prose-stone max-w-none">
            <h2 className="font-serif text-2xl font-bold text-[#111] mb-4">Chi è Dave Gamba</h2>
            <p className="text-[#444] leading-relaxed">
              Dave Gamba è il primo personal trainer online italiano, attivo dal 2009 — prima che il coaching online diventasse una categoria riconosciuta nel fitness.
              In oltre 15 anni ha seguito più di 3.000 clienti, prevalentemente uomini professionisti tra i 35 e i 50 anni: manager, imprenditori, medici, avvocati.
            </p>
            <p className="text-[#444] leading-relaxed mt-4">
              Ha sviluppato il <strong>Metodo BIM — Breve, Intenso, Mirato</strong>: allenamento in 21 minuti, 3 volte a settimana,
              basato su evidenza scientifica e progettato per chi non può permettersi di sprecare tempo. Il mantra è semplice:
              semplicità + continuità = risultati.
            </p>
            <p className="text-[#444] leading-relaxed mt-4">
              Il suo blog DaveGamba.com conta oltre 2 milioni di lettori. Ogni articolo cita fonti PubMed inline —
              non a piè di pagina — perché la scienza deve essere parte del ragionamento, non un ornamento.
              Certificazione ISSA — International Sports Sciences Association.
            </p>
          </section>

          {/* Metodo BIM */}
          <section className="bg-black text-white rounded-[24px] p-8">
            <h2 className="font-serif text-2xl font-bold mb-3">Il Metodo BIM</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Breve, Intenso, Mirato. Tre aggettivi che definiscono ogni sessione di allenamento:
              21 minuti di lavoro ad alta intensità, 3 volte a settimana, con esercizi scelti per massimizzare
              il segnale muscolare in meno tempo possibile.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { letter: "B", word: "Breve", desc: "21 minuti per sessione" },
                { letter: "I", word: "Intenso", desc: "Stimolo massimale" },
                { letter: "M", word: "Mirato", desc: "Zero dispersione" },
              ].map(({ letter, word, desc }) => (
                <div key={letter}>
                  <div className="font-serif text-4xl text-[#00CBDB] font-bold">{letter}</div>
                  <div className="font-semibold text-white mt-1">{word}</div>
                  <div className="text-white/50 text-xs mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Media */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#111] mb-5">Citato da</h2>
            <div className="flex flex-wrap gap-3">
              {MEDIA_MENTIONS.map((media) => (
                <span
                  key={media}
                  className="bg-white border border-[#e8e0d4] text-[#444] text-sm font-medium px-4 py-2 rounded-full"
                >
                  {media}
                </span>
              ))}
            </div>
          </section>

          {/* Ultimi articoli */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#111] mb-5">Articoli recenti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-[#e8e0d4] rounded-[16px] p-5 hover:border-[#00CBDB] transition-colors group"
                >
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-[#00CBDB] mb-2">
                    {post.category}
                  </p>
                  <h3 className="text-sm font-semibold text-[#111] leading-snug group-hover:text-[#00CBDB] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#aaa] mt-2">{post.readingTime} min di lettura</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/blog"
                className="inline-block text-sm font-semibold text-[#00CBDB] hover:underline"
              >
                Tutti gli articoli →
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8 border-t border-[#e8e0d4]">
            <p className="text-[#666] text-sm mb-4">Vuoi lavorare direttamente con Dave?</p>
            <Link
              href="/coaching"
              className="inline-block bg-[#00CBDB] text-white font-bold px-8 py-4 rounded-[12px] hover:bg-[#00aecf] transition-colors"
            >
              Scopri il coaching →
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
