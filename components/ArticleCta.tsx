import Link from "next/link";

interface ArticleCtaProps {
  title: string;
  description: string;
  href: string;
  cta?: string;
  photo?: string;
}

export function ArticleCta({
  title,
  description,
  href,
  cta = "Scopri di più",
  photo = "/images/blog/cappello-arancione-davegamba.jpeg",
}: ArticleCtaProps) {
  return (
    <div className="my-10 rounded-[20px] overflow-hidden relative min-h-[180px] flex items-center not-prose">
      {/* Foto di sfondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${photo})` }}
      />
      {/* Overlay: scuro a destra, trasparente a sinistra */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/60 to-black/90" />

      {/* Contenuto — allineato a destra */}
      <div className="relative z-10 ml-auto w-[60%] sm:w-[55%] px-6 py-8">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#00CBDB] mb-2">
          Protocollo Dave Gamba
        </p>
        <h3 className="text-white font-bold text-lg sm:text-xl leading-snug mb-2">
          {title}
        </h3>
        <p className="text-white/75 text-sm leading-relaxed mb-5">
          {description}
        </p>
        <Link
          href={href}
          className="inline-block bg-[#00CBDB] hover:bg-[#00b8c7] text-black font-bold text-sm px-5 py-2.5 rounded-[10px] transition-colors duration-200"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
