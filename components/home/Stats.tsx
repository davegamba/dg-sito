const stats = [
  { target: 3000, suffix: "+", label: "clienti trasformati" },
  { target: 15, suffix: "+ anni", label: "esperienza online" },
  { target: 56, suffix: "K", label: "follower Instagram" },
  { target: 26, suffix: "K", label: "iscritti YouTube" },
];

export default function Stats() {
  return (
    <section className="border-y border-[#1a1a1a] bg-[#080808] gsap-fade">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#1a1a1a]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center px-4 py-2">
              <div className="flex items-end gap-1 mb-1">
                <span
                  className="gsap-counter font-serif text-3xl sm:text-4xl text-[#00CBDB] leading-none"
                  data-target={s.target}
                  data-suffix={s.suffix}
                >
                  {s.target}{s.suffix}
                </span>
              </div>
              <span className="text-[#888888] text-xs uppercase tracking-wider font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
