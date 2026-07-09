import Link from "next/link";

interface ArticleCtaProps {
  title: string;
  description: string;
  href: string;
  cta?: string;
  photo?: string;
  kicker?: string;
}

export function ArticleCta({
  title,
  description,
  href,
  cta = "Scopri di più",
  photo = "/images/blog/cappello-arancione-davegamba.jpeg",
  kicker = "Protocollo Dave Gamba",
}: ArticleCtaProps) {
  return (
    <div className="article-cta my-10 rounded-[20px] overflow-hidden relative min-h-[200px] flex items-center not-prose">
      {/* Foto di sfondo */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${photo})`, backgroundPosition: "right center" }}
      />
      {/* Layer ciano: pieno a destra (testo leggibile), sfuma a sinistra (foto visibile) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00CBDB]/65 to-[#00CBDB]" />

      {/* Contenuto — allineato a destra */}
      <div className="relative z-10 ml-auto w-[64%] sm:w-[58%] px-6 py-8">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-black/70 mb-1.5">
          {kicker}
        </p>
        <h3 className="text-[#0c1618] font-extrabold text-2xl sm:text-3xl leading-tight mb-2.5">
          {title}
        </h3>
        <p className="text-black text-[0.78rem] sm:text-[0.82rem] leading-snug mb-6">
          {description}
        </p>
        <Link
          href={href}
          style={{ color: "#111111" }}
          className="inline-block bg-gradient-to-r from-[#FFD84D] to-[#FFA71A] hover:from-[#FFE066] hover:to-[#FFB733] font-extrabold text-base sm:text-lg px-8 py-4 rounded-[14px] shadow-lg transition-colors duration-200"
        >
          {cta} →
        </Link>
      </div>
    </div>
  );
}
