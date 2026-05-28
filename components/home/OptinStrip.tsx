"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OptinStrip() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: collegare a servizio email (ConvertKit / Brevo / ecc.)
    setSent(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0f0f1a]/60 border-y border-[#1e1e2e]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">
          Gratis
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#F0F0F0] mb-4">
          Scarica la guida agli{" "}
          <em className="not-italic text-[#00CBDB]">addominali</em> veri
        </h2>

        <p className="text-[#888888] text-base mb-8 max-w-md mx-auto">
          La guida che ha già aiutato 15.000+ persone a capire cosa funziona davvero — e cosa è solo marketing.
        </p>

        {sent ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 size={40} className="text-[#00CBDB]" />
            <p className="text-[#F0F0F0] font-semibold">
              Ottimo! Controlla la tua email.
            </p>
            <p className="text-[#888888] text-sm">
              La guida è in arrivo. Guarda anche nello spam se non la vedi subito.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-[10px] bg-[#080810] border border-[#1e1e2e] text-[#F0F0F0] placeholder-[#444444] text-sm focus:outline-none focus:border-[#00CBDB] transition-colors duration-200"
            />
            <Button variant="primary" size="md" type="submit" className="group shrink-0">
              Inviami la guida
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </form>
        )}

        <p className="text-[#444444] text-xs mt-4">
          Niente spam. Niente condivisione dati. Cancellati quando vuoi.
        </p>

      </div>
    </section>
  );
}
