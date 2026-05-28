const stats = [
  { value: "21", unit: "min", label: "per allenamento" },
  { value: "3", unit: "×/sett", label: "frequenza ottimale" },
  { value: "3.000+", unit: "", label: "clienti trasformati" },
  { value: "15+", unit: "anni", label: "esperienza online" },
];

export default function Stats() {
  return (
    <section className="border-y border-[#1a1a1a] bg-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#1a1a1a]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center px-4 py-2">
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#00CBDB] leading-none">
                  {s.value}
                </span>
                {s.unit && (
                  <span className="text-[#888888] text-sm font-medium mb-1">{s.unit}</span>
                )}
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
