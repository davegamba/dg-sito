import Link from "next/link";
import { ChevronRight } from "lucide-react";

const FOTO = "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/heroBg.jpeg";

export default function ChiSono() {
  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-row gap-4 sm:gap-8 items-start">

          {/* ── FOTO ── */}
          <div className="flex-none w-[160px] sm:w-[300px] md:w-[360px]">
            <div className="w-full aspect-[3/4] rounded-[16px] sm:rounded-[24px] overflow-hidden">
              <img
                src={FOTO}
                alt="Dave Gamba — Personal Trainer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* ── TESTO ── */}
          <div className="flex flex-col gap-4 sm:gap-6 flex-1 min-w-0">
            <div>
              <span className="text-[#00CBDB] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-2 sm:mb-3 block">
                Chi sono
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                15 anni a fare una sola cosa,{" "}
                <em className="not-italic text-[#00CBDB]">bene.</em>
              </h2>
            </div>

            <p className="text-[#888] text-sm sm:text-base leading-relaxed">
              Sono Dave Gamba, personal trainer online dal 2009 — quando il concetto di "fitness online" non esisteva ancora.
              Ho iniziato da zero, senza followers, senza budget, con solo un metodo che funzionava.
            </p>

            <p className="text-[#888] text-sm sm:text-base leading-relaxed hidden sm:block">
              Negli anni ho seguito più di 3.000 clienti: manager, medici, avvocati, imprenditori.
              Ho capito che il problema non è mai la motivazione — è sempre il metodo.
            </p>

            <p className="text-[#888] text-sm sm:text-base leading-relaxed hidden sm:block">
              Il Metodo BIM è nato da questa osservazione: chi ottiene risultati duraturi
              non si allena di più. Si allena <em>meglio</em>. 21 minuti, tre volte a settimana.
            </p>

            <Link
              href="/metodo"
              className="inline-flex items-center gap-2 text-[#00CBDB] text-xs sm:text-sm font-medium hover:gap-3 transition-all duration-200 w-fit"
            >
              Scopri il metodo
              <ChevronRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
