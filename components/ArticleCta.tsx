import Link from "next/link";

interface ArticleCtaProps {
  title?: string;
  description?: string;
  href: string;
  cta?: string;
  photo?: string;
  kicker?: string;
  compact?: boolean;
}

// Layer ciano: quasi pieno sulla destra (sfondo per il testo), sfuma solo
// nell'ultimo tratto a sinistra per lasciar vedere il soggetto della foto.
const CYAN =
  "linear-gradient(to right, rgba(0,203,219,0) 0%, rgba(0,203,219,0.12) 22%, rgba(0,203,219,0.8) 44%, #00CBDB 60%)";

export function ArticleCta({
  title,
  description,
  href,
  cta = "Scopri di più",
  photo = "/images/blog/cappello-arancione-davegamba.jpeg",
  kicker = "Protocollo Dave Gamba",
  compact = false,
}: ArticleCtaProps) {
  return (
    <div
      className={`article-cta my-10 rounded-[20px] overflow-hidden relative flex items-center not-prose ${
        compact ? "min-h-[132px]" : "min-h-[220px]"
      }`}
    >
      {/* Foto di sfondo, soggetto verso sinistra */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${photo})`,
          backgroundPosition: "center",
          transform: "scaleX(-1)",
        }}
      />
      {/* Layer ciano */}
      <div className="absolute inset-0" style={{ background: CYAN }} />

      {/* Contenuto — allineato a destra */}
      <div
        className={`relative z-10 ml-auto w-[66%] sm:w-[62%] ${
          compact ? "px-6 py-6" : "px-6 py-8"
        }`}
      >
        <p
          style={{
            color: "rgba(0,0,0,0.68)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}
        >
          {kicker}
        </p>
        {title && (
          <h3
            className="font-serif"
            style={{
              color: "#ffffff",
              fontSize: compact ? "1.15rem" : "1.55rem",
              fontWeight: 800,
              lineHeight: 1.12,
              margin: "0 0 10px",
              padding: 0,
              border: "none",
            }}
          >
            {title}
          </h3>
        )}
        {!compact && description && (
          <p style={{ color: "#111111", fontSize: "0.82rem", lineHeight: 1.35, margin: "0 0 20px" }}>
            {description}
          </p>
        )}
        <Link
          href={href}
          style={{ color: "#111111" }}
          className={`inline-block bg-gradient-to-r from-[#FFD84D] to-[#FFA71A] hover:from-[#FFE066] hover:to-[#FFB733] font-extrabold rounded-[14px] shadow-lg transition-colors duration-200 ${
            compact ? "text-sm px-6 py-3 mt-1" : "text-base sm:text-lg px-8 py-4"
          }`}
        >
          {cta} →
        </Link>
      </div>
    </div>
  );
}
