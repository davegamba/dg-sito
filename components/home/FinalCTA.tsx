import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden gsap-fade">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, #00cbdb0a 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">

        <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">
          Smetti di aspettare
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F0F0F0] mb-6 leading-[1.1]">
          Il momento giusto{" "}
          <em className="not-italic text-[#00CBDB]">è adesso.</em>
        </h2>

        <p className="text-[#888888] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Tra 28 giorni potresti essere una persona diversa — o stare ancora a pensarci.
          La scelta è semplice.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" className="group">
            <Link href="https://quiz.davegamba.com" className="flex items-center gap-2">
              Inizia gratis ora
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg">
            <Link href="https://club.davegamba.com/coaching.html">Parla con Dave</Link>
          </Button>
        </div>

        <p className="text-[#444444] text-xs mt-8">
          Nessuna carta di credito per iniziare. Nessun impegno.
        </p>
      </div>
    </section>
  );
}
