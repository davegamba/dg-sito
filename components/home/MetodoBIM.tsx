const steps = [
  {
    letter: "B",
    word: "Breve",
    color: "#00CBDB",
    title: "21 minuti, non un secondo di più",
    body: "Il corpo risponde meglio a stimoli brevi e intensi. Oltre quel limite, l'ormone dello stress sale e i progressi calano. La scienza lo conferma — io lo ho verificato su 3.000 clienti.",
  },
  {
    letter: "I",
    word: "Intenso",
    color: "#00CBDB",
    title: "Qualità sopra quantità, sempre",
    body: "Non conta quante ore passi in palestra. Conta quanto ci sei dentro. L'intensità è la variabile che separa chi trasforma il corpo da chi si illude di farlo.",
  },
  {
    letter: "M",
    word: "Mirato",
    color: "#F0C040",
    title: "Il piano giusto per l'uomo 35–50",
    body: "A 40 anni il corpo non è quello di 20. Il recupero cambia, gli ormoni cambiano. Il Metodo BIM è costruito per queste variabili — non adattato, costruito.",
  },
];

export default function MetodoBIM() {
  return (
    <section className="py-20 sm:py-28 bg-[#0f0f1a]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-14">
          <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
            Il Metodo
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F0F0F0] max-w-md">
              Perché il Metodo{" "}
              <em className="not-italic text-[#00CBDB]">BIM</em> funziona
            </h2>
            <p className="text-[#888888] text-base max-w-sm">
              Tre principi. Derivati dalla scienza.
              Validati su migliaia di persone reali.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.letter}
              className="relative flex flex-col gap-5 p-7 rounded-[20px] bg-[#080810] border border-[#1e1e2e] overflow-hidden"
            >
              {/* Step number */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[#080810] font-serif text-2xl font-bold"
                  style={{ background: s.color }}
                >
                  {s.letter}
                </div>
                <span className="text-[#888888] text-xs font-semibold tracking-widest uppercase">
                  {s.word}
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#F0F0F0] leading-snug">
                {s.title}
              </h3>

              <p className="text-[#888888] text-sm leading-relaxed">
                {s.body}
              </p>

              {/* Big letter background */}
              <div
                aria-hidden
                className="absolute -right-4 -bottom-6 font-serif text-[120px] leading-none font-bold opacity-[0.04] select-none pointer-events-none"
                style={{ color: s.color }}
              >
                {s.letter}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
