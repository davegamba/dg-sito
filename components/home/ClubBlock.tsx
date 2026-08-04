import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClubBlock() {
  return (
    <section className="py-12 sm:py-16 gsap-fade" style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="relative rounded-[24px] overflow-hidden flex items-end sm:items-center"
          style={{ minHeight: "420px" }}
        >
          {/* Foto di sfondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/corso-focus-braccia.jpeg')",
            }}
          />
          {/* Overlay scuro per leggibilità */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Riquadro appoggiato sopra */}
          <div className="relative z-10 w-full sm:w-[440px] m-4 sm:m-8 rounded-2xl p-7 sm:p-8 flex flex-col gap-4"
            style={{
              background: "rgba(10,10,12,0.72)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="text-[#00CBDB] text-xs font-semibold tracking-[0.2em] uppercase">
              Membership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
              DG Athletic Club
            </h2>
            <p className="text-white/65 text-sm leading-relaxed">
              Il percorso progressivo di Dave: Corsi Focus divisi per obiettivo, i pasti personali di Dave già calcolati, una community con cui condividere. Allenati Breve-Intenso-Mirato, insieme a lui. Con 14 giorni di garanzia.
            </p>
            <Link
              href="https://club.davegamba.com/entra-nel-club"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm tracking-wide rounded-xl px-6 py-3 transition-colors duration-200 w-fit hover:bg-[rgba(0,203,219,0.12)]"
              style={{
                color: "#00CBDB",
                border: "1px solid rgba(0,203,219,0.55)",
                background: "rgba(0,203,219,0.06)",
              }}
            >
              Entra nel Club
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
