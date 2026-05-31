import Link from "next/link";

const articles = [
  {
    slug: "come-dimagrire-velocemente",
    title: "Come dimagrire velocemente senza perdere muscolo (la verità scientifica)",
    category: "Dimagrimento",
    image: null,
  },
  {
    slug: "testosterone-dopo-i-40",
    title: "Testosterone dopo i 40: cosa funziona davvero e cosa è solo marketing",
    category: "Testosterone",
    image: null,
  },
  {
    slug: "addominali-smetti-di-fare-sit-up",
    title: "Addominali: smetti di fare sit-up. Ecco perché non servono",
    category: "Allenamento",
    image: null,
  },
  {
    slug: "proteine-quante-ne-servono",
    title: "Proteine: quante ne servono davvero? La risposta che nessuno ti dà",
    category: "Nutrizione",
    image: null,
  },
];

const categoryColors: Record<string, string> = {
  Dimagrimento: "#00CBDB",
  Testosterone: "#F0C040",
  Allenamento: "#00CBDB",
  Nutrizione: "#F0C040",
};

export default function BlogSection() {
  return (
    <section className="py-20 sm:py-28 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Dal blog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Il metodo, spiegato
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[#00CBDB] text-sm font-medium hover:underline shrink-0"
          >
            Tutti gli articoli →
          </Link>
        </div>

        {/* Intro metodo */}
        <div className="mb-10 flex flex-col gap-6">
          <p className="text-white text-lg sm:text-xl leading-snug max-w-xl">
            La maggior parte delle persone si allena troppo, male, e si chiede perché non vede risultati.
            Il Metodo BIM funziona al contrario:{" "}
            <strong className="text-[#00CBDB]">meno ore, più intensità, zero esercizi inutili.</strong>
          </p>

          {/* 3 pill BIM */}
          <div className="flex flex-col sm:flex-row gap-3">
            {[
              { letter: "B", word: "Breve", desc: "21 minuti. Il corpo risponde meglio a stimoli brevi e intensi." },
              { letter: "I", word: "Intenso", desc: "La qualità del lavoro batte sempre la quantità delle ore." },
              { letter: "M", word: "Mirato", desc: "Ogni esercizio ha uno scopo preciso. Niente fatica a vuoto." },
            ].map((p) => (
              <div
                key={p.letter}
                className="flex items-start gap-3 flex-1 p-4 rounded-[14px] border border-[#1a1a1a] bg-[#0d0d0d]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00CBDB] flex items-center justify-center text-black font-serif font-bold text-sm shrink-0">
                  {p.letter}
                </div>
                <div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase mb-1">{p.word}</div>
                  <div className="text-[#666] text-xs leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Frase ponte */}
          <p className="text-[#666] text-sm leading-relaxed border-t border-[#1a1a1a] pt-6">
            Ho scritto oltre 200 articoli per smontare i luoghi comuni e spiegare cosa dice davvero la scienza sull'allenamento, la nutrizione e il testosterone. Inizia da qui:
          </p>
        </div>

        {/* Lista articoli */}
        <div className="flex flex-col">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="flex items-center gap-5 py-5 border-t border-[#1a1a1a] hover:border-[#333] group transition-colors last:border-b"
            >
              {/* Thumbnail */}
              <div className="flex-none w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-[10px] overflow-hidden bg-[#111] relative shrink-0">
                {a.image ? (
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 100%)" }}
                  >
                    <span className="font-serif text-2xl text-[#333]">{i + 1}</span>
                  </div>
                )}
              </div>

              {/* Testo */}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: categoryColors[a.category] }}
                >
                  {a.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-white leading-snug group-hover:text-[#00CBDB] transition-colors duration-200 line-clamp-2">
                  {a.title}
                </h3>
              </div>

              {/* Freccia */}
              <span className="text-[#333] group-hover:text-[#00CBDB] transition-colors shrink-0 text-lg">→</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
