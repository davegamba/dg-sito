import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OptinStrip() {
  return (
    <section className="py-12 sm:py-16" style={{ background: "#0a0a12" }}>
      <style>{`
        @keyframes shimmer-sweep-optin {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(350%) skewX(-15deg); }
        }
        .btn-quiz-optin {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%);
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          border-radius: 14px;
          padding: 16px 72px;
          text-decoration: none;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          box-shadow: 0 4px 18px rgba(0,203,219,0.2);
        }
        .btn-quiz-optin:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 16px 40px rgba(0,119,204,0.45), 0 6px 16px rgba(0,203,219,0.35);
        }
        .btn-quiz-optin:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow: 0 4px 12px rgba(0,203,219,0.3);
        }
        .btn-quiz-optin::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 35%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: translateX(-150%) skewX(-15deg);
        }
        .btn-quiz-optin:hover::after {
          animation: shimmer-sweep-optin 0.65s ease forwards;
        }
      `}</style>
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

        <Link href="/quiz" className="btn-quiz-optin">
          <ArrowRight size={16} /> Fai il quiz
        </Link>

        <p className="text-[#444444] text-xs mt-4">
          Gratuito · 2 minuti · Risultati personalizzati
        </p>
      </div>
    </section>
  );
}
