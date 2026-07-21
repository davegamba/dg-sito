"use client";

const photos = [
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_07.jpeg", alt: "Trasformazione" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/alessandra-pilo-testimonianze-davegamba.jpg", alt: "Alessandra Pilo" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_08.jpeg", alt: "Trasformazione" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/emiliano-testimonianze-dave-gamba.jpeg", alt: "Emiliano" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_09.jpeg", alt: "Trasformazione" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/gloria-testimonianze-dave-gamba.jpeg", alt: "Gloria" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/gus-recensioni-davegamba.jpg", alt: "Gus" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/marco-iacovalessandra-pilo-testimonianze-davegamba.jpeg", alt: "Marco" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/marta-marranzano.png", alt: "Marta" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/valerya-testimonianze-dave-gamba.jpeg", alt: "Valerya" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/veronica-gonz-testimonianze-dave-gamba.jpeg", alt: "Veronica" },
];

function PhotoMarquee() {
  const doubled = [...photos, ...photos];
  return (
    <div className="overflow-hidden w-full mb-12">
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          animation: "marqueeScroll 40s linear infinite",
        }}
      >
        {doubled.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt={p.alt}
            loading="lazy"
            className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] object-cover object-center rounded-[16px] flex-shrink-0"
          />
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const testimonials = [
  {
    name: "Marco B.",
    age: 42,
    job: "Avvocato, Milano",
    text: "In 3 mesi ho perso 11 kg e trovato un metodo che riesco a mantenere. Con il mio calendario da avvocato pensavo fosse impossibile. 21 minuti si trovano.",
    result: "−11 kg in 3 mesi",
  },
  {
    name: "Luca F.",
    age: 38,
    job: "Manager, Roma",
    text: "Ho provato palestra, personal trainer di persona, app. Niente funzionava a lungo. Con Dave ho capito che il problema non era la motivazione — era il metodo.",
    result: "−8 kg, continuità mantenuta",
  },
  {
    name: "Stefano M.",
    age: 46,
    job: "Imprenditore, Torino",
    text: "Ero scettico sul 'personal training online'. Sbagliavo. La qualità degli allenamenti e il supporto sono superiori a qualsiasi palestra che ho frequentato.",
    result: "+6 kg di massa muscolare",
  },
  {
    name: "Andrea C.",
    age: 51,
    job: "Medico, Napoli",
    text: "Come medico apprezzo che ogni scelta sia supportata da ricerca scientifica. Dave non vende miracoli — spiega il meccanismo. E funziona.",
    result: "Tornato in forma a 51 anni",
  },
  {
    name: "Roberto V.",
    age: 44,
    job: "Architetto, Bologna",
    text: "3 volte a settimana, 21 minuti. All'inizio pensavo fosse troppo poco. Dopo 6 settimane mi sono dovuto ricredere. I risultati parlano.",
    result: "−6 kg, addominali visibili",
  },
  {
    name: "Giorgio T.",
    age: 39,
    job: "Consulente, Firenze",
    text: "Il valore vero non sono solo gli allenamenti. È il cambio di mentalità. Dave ti insegna a vedere il fitness come un investimento, non un sacrificio.",
    result: "−9 kg, continua da 1 anno",
  },
];

function TestimonialCard({ t, dark }: { t: typeof testimonials[0]; dark?: boolean }) {
  return (
    <div
      className="flex-none w-[290px] sm:w-[320px] flex flex-col gap-4 p-6 rounded-[20px]"
      style={
        dark
          ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }
          : { background: "#fff", border: "1px solid #e5ddd0" }
      }
    >
      <span className="inline-flex items-center w-fit px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#00cbdb0f] border border-[#00cbdb33] text-[#00CBDB]">
        {t.result}
      </span>
      <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-white/70" : "text-[#5a5248]"}`}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div className={`flex items-center gap-3 pt-3 border-t ${dark ? "border-white/10" : "border-[#e5ddd0]"}`}>
        <div className="w-9 h-9 rounded-full bg-[#00cbdb18] flex items-center justify-center text-[#00CBDB] text-sm font-bold shrink-0">
          {t.name[0]}
        </div>
        <div>
          <div className={`text-xs font-semibold ${dark ? "text-white" : "text-[#0A1A20]"}`}>{t.name}, {t.age} anni</div>
          <div className={`text-xs ${dark ? "text-white/40" : "text-[#9a9184]"}`}>{t.job}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ variant = "light" }: { variant?: "light" | "dark" }) {
  const doubled = [...testimonials, ...testimonials];
  const dark = variant === "dark";

  return (
    <section className="py-12 sm:py-16 overflow-hidden gsap-fade" style={dark ? { background: "#101013", borderTop: "1px solid rgba(255,255,255,0.05)" } : { background: "#F5F1EB" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
          Risultati reali
        </span>
        <h2 className={`font-serif text-3xl sm:text-4xl ${dark ? "text-white" : "text-[#0A1A20]"}`}>
          Cosa dicono i clienti
        </h2>
      </div>

      {/* Strip foto — scorre verso sinistra */}
      <PhotoMarquee />

      {/* Card testo — scorre verso destra (direzione inversa) */}
      <div className="overflow-hidden w-full mt-6">
        <div
          className="flex gap-4 items-stretch"
          style={{
            width: "max-content",
            animation: "marqueeScrollReverse 50s linear infinite",
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} dark={dark} />
          ))}
        </div>
        <style>{`
          @keyframes marqueeScrollReverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
