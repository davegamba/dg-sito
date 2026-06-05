import Link from "next/link";

export const metadata = {
  title: "In arrivo — Dave Gamba",
  description: "Stiamo costruendo qualcosa di speciale. Torna presto.",
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-black px-4 text-center">

      {/* Pulsino ciano animato */}
      <div className="flex items-center gap-2 mb-8">
        <span className="h-2 w-2 rounded-full bg-[#00CBDB] animate-pulse" />
        <span className="text-[#00CBDB] text-xs font-semibold tracking-[0.2em] uppercase">
          In costruzione
        </span>
      </div>

      {/* Logo */}
      <Link href="/" className="font-serif text-3xl mb-10">
        <span className="text-white">Dave</span>
        <span className="text-[#00CBDB]">Gamba</span>
      </Link>

      {/* Titolo */}
      <h1 className="font-serif text-5xl sm:text-6xl text-white leading-tight mb-6">
        Sarà presto disponibile
      </h1>

      <p className="text-white/50 text-lg max-w-md leading-relaxed mb-12">
        Stiamo costruendo qualcosa di speciale per te.
        Torna tra qualche giorno — ne varrà la pena.
      </p>

      {/* Torna alla home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-white/20 hover:border-[#00CBDB]/60 text-white/70 hover:text-white rounded-xl px-6 py-3 text-sm transition-all duration-200"
      >
        ← Torna alla home
      </Link>

    </div>
  );
}
