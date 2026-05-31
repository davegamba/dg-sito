"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const SUPABASE_URL = "https://nkojjrvndjyivsjvrqds.supabase.co";
const SUPABASE_KEY = "sb_publishable_4WlxUEDHRnR0BGxCViP4NA_QVYLUwtg";
const QUIZ_URL = "https://club.davegamba.com/optin-quiz.html";

export default function OptinStrip() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim().toLowerCase();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return;
    setLoading(true);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates",
        },
        body: JSON.stringify({ name: "", email: val, source: "optin-strip" }),
      });
    } catch {}
    setSent(true);
    setTimeout(() => {
      window.location.href = `${QUIZ_URL}?email=${encodeURIComponent(val)}`;
    }, 800);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0f0f1a]/60 border-y border-[#1e1e2e]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">
          Gratis
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#F0F0F0] mb-4">
          Scopri il tuo{" "}
          <em className="not-italic text-[#00CBDB]">Tipo Metabolico</em>
        </h2>

        <p className="text-[#888888] text-base mb-8 max-w-md mx-auto">
          Un quiz gratuito in 2 minuti per capire perché non riesci a dimagrire — e cosa fare davvero.
        </p>

        {sent ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 size={40} className="text-[#00CBDB]" />
            <p className="text-[#F0F0F0] font-semibold">Perfetto — ti porto al quiz...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-[10px] bg-[#080810] border border-[#1e1e2e] text-[#F0F0F0] placeholder-[#444444] text-sm focus:outline-none focus:border-[#00CBDB] transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 flex items-center justify-center gap-2 bg-[#00CBDB] hover:bg-[#00b8c6] disabled:bg-[#006f78] text-black font-bold text-sm rounded-[10px] px-6 py-3 transition-colors"
            >
              {loading ? "..." : <><ArrowRight size={16} /> Fai il quiz</>}
            </button>
          </form>
        )}

        <p className="text-[#444444] text-xs mt-4">
          Niente spam. Cancellati quando vuoi.
        </p>
      </div>
    </section>
  );
}
