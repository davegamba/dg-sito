import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

// Testata e piè di pagina delle pagine in spagnolo (/es e /es/<slug>).
// Il menu e il footer del sito portano a pagine italiane: qui non si usano.
// Regole: references/regole_sito_multilingua.md

/** Testata minima. Il nome porta all'indice /es; a destra, se esiste, il
 *  link alla versione italiana (stessa posizione su tutte le versioni,
 *  scritto nella lingua di arrivo: regola 10a). */
export function EsHeader({ itHref }: { itHref?: string | null }) {
  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/es"
          className="font-serif text-xl font-bold select-none"
          style={{
            background: "linear-gradient(90deg, #00E5F5 0%, #00CBDB 40%, #00AECF 68%, #0077CC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dave Gamba
        </Link>
        {itHref && (
          <a
            href={itHref}
            hrefLang="it"
            lang="it"
            className="text-xs text-white/70 hover:text-[#00CBDB] transition-colors"
          >
            🇮🇹 Versione in italiano
          </a>
        )}
      </div>
    </header>
  );
}

/** Pie mínimo. La política de privacidad existe solo en italiano: se dice. */
export function EsFooter() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0b0d1a]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-xs text-[#888] flex flex-wrap gap-x-4 gap-y-2 justify-between">
        <Link href="/es" className="hover:text-[#00CBDB] transition-colors">
          © Dave Gamba · Artículos en español
        </Link>
        <a href="/privacy" lang="it" hrefLang="it" className="hover:text-[#00CBDB] transition-colors">
          Privacidad (en italiano)
        </a>
      </div>
    </footer>
  );
}

/** Scheda di un articolo spagnolo: usata dall'indice e da "Más artículos". */
export function EsPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/es/${post.slug}`}
      className="group flex flex-col bg-[#f5f0e8] rounded-[16px] overflow-hidden hover:scale-[1.02] transition-transform duration-200"
    >
      {post.image && (
        <div className="relative w-full aspect-[16/9] bg-[#f0f0f0]">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-4 flex-1">
        <p className="text-[9px] font-semibold tracking-widest uppercase text-[#00CBDB] mb-1">{post.category}</p>
        <h3 className="text-sm font-semibold text-[#111] leading-snug group-hover:text-[#00CBDB] transition-colors">
          {post.title}
        </h3>
        <p className="text-[11px] text-[#888] mt-2">{post.readingTime} min de lectura</p>
      </div>
    </Link>
  );
}
