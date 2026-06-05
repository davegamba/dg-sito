import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OptinStrip() {
  return (
    <section className="py-12 sm:py-16" style={{ background: "#0a0a12" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">
          Smetti di aspettare<br />Inizia dal tuo piano gratuito basato sulle tue caratteristiche
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#F0F0F0] mb-4">
          Scopri il tuo{" "}
          <em className="not-italic text-[#00CBDB]">Profilo Fisico</em>
        </h2>

        <p className="text-[#888888] text-base mb-8 max-w-md mx-auto">
          Un quiz gratuito in 2 minuti per capire qual è il piano giusto per il tuo fisico.
        </p>

        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 bg-[#00CBDB] hover:bg-[#00b8c6] text-black font-bold text-sm rounded-[10px] px-8 py-4 transition-colors"
        >
          <ArrowRight size={16} /> Fai il quiz
        </Link>

        <p className="text-[#444444] text-xs mt-4">
          Gratuito · 2 minuti · Risultati personalizzati
        </p>
      </div>
    </section>
  );
}
