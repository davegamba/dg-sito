import Link from "next/link";
import Image from "next/image";
import LangNav, { type LangNavItem } from "@/components/lang/LangNav";
import { getAllPosts, postsDirFor, type PostMeta } from "@/lib/posts";
import { LOCALES, categoryAnchor, type LocaleConfig } from "@/lib/locales";
import { itUrl, langUrl, translationsOf, type TranslationGroup } from "@/lib/translations";

// Testata e piè di pagina delle pagine in lingua straniera (/es, /pt e i loro
// articoli). Il menu e il footer del sito portano a pagine italiane: qui non si usano.
// Regole: references/regole_sito_multilingua.md

export type LangLink = { href: string; hrefLang: string; lang: string; flag: string; name: string; long: string };

const IT_LINK = (slug: string): LangLink => ({
  href: itUrl(slug), hrefLang: "it", lang: "it", flag: "🇮🇹", name: "Italiano", long: "Versione in italiano",
});

/** Le altre versioni di un articolo, vista da `current` ("it" o una lingua straniera) */
export function otherVersions(group: TranslationGroup | null, current: "it" | LocaleConfig["code"]): LangLink[] {
  if (!group) return [];
  const links: LangLink[] = current === "it" ? [] : [IT_LINK(group.it)];
  for (const { lang, slug } of translationsOf(group)) {
    if (lang === current) continue;
    const l = LOCALES[lang];
    links.push({ href: langUrl(lang, slug), hrefLang: l.hreflang, lang: l.hreflang, flag: l.flag, name: l.name, long: l.versionLabel });
  }
  return links;
}

/** Link di cambio lingua, in alto a destra su tutte le versioni (regola 10a),
 *  ognuno scritto nella propria lingua. Una sola alternativa: testo intero
 *  ("Versión en español"); più di una: nomi brevi, così stanno in una riga
 *  anche da telefono. <a> e non <Link>: cambia la lingua del documento. */
export function LangSwitch({ links, className = "" }: { links: LangLink[]; className?: string }) {
  if (links.length === 0) return null;
  const linkClass = "hover:text-[#00CBDB] transition-colors";
  if (links.length === 1) {
    const l = links[0];
    return (
      <a href={l.href} hrefLang={l.hrefLang} lang={l.lang} className={`${className ? `${className} ` : ""}text-xs text-white/70 ${linkClass}`}>
        {`${l.flag} ${l.long}`}
      </a>
    );
  }
  return (
    <span className={`${className ? `${className} ` : ""}text-xs text-white/70`}>
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <a href={l.href} hrefLang={l.hrefLang} lang={l.lang} className={linkClass}>
            {`${l.flag} ${l.name}`}
          </a>
        </span>
      ))}
    </span>
  );
}

// Il canale ha anche l'audio in spagnolo e portoghese: Dave, 19/11/2026.
const YOUTUBE = "https://www.youtube.com/@DaveGambaFitness";

/** Categorie degli articoli, dalla più usata: voci del menu e sezioni dell'indice */
export function categoriesOf(posts: PostMeta[]): string[] {
  const count = new Map<string, number>();
  for (const p of posts) if (p.category) count.set(p.category, (count.get(p.category) ?? 0) + 1);
  return [...count.keys()].sort((a, b) => count.get(b)! - count.get(a)! || a.localeCompare(b));
}

/** Testata: freebie (solo se esiste la landing nella lingua), articoli, categorie
 *  (se più di una), YouTube; a destra i link alle altre versioni dell'articolo. */
export function LangHeader({ locale, links = [] }: { locale: LocaleConfig; links?: LangLink[] }) {
  const categories = categoriesOf(getAllPosts(postsDirFor(locale)));
  const items: LangNavItem[] = [
    ...(locale.freebieUrl ? [{ href: locale.freebieUrl, label: locale.t.nav.freebie, highlight: true }] : []),
    { href: locale.base, label: locale.t.nav.articles },
    ...(categories.length > 1
      ? categories.map((c) => ({ href: `${locale.base}#${categoryAnchor(c)}`, label: c }))
      : []),
    { href: YOUTUBE, label: "YouTube", external: true },
  ];
  return (
    <LangNav
      home={locale.base}
      items={items}
      menuLabel={locale.t.nav.menu}
      langSwitch={links.length > 0 ? <LangSwitch links={links} /> : null}
    />
  );
}

/** Piè di pagina minimo. La privacy policy esiste solo in italiano: si dice. */
export function LangFooter({ locale }: { locale: LocaleConfig }) {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0b0d1a]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-xs text-[#888] flex flex-wrap gap-x-4 gap-y-2 justify-between">
        <Link href={locale.base} className="hover:text-[#00CBDB] transition-colors">
          {`© Dave Gamba · ${locale.t.footerArticles}`}
        </Link>
        <a href="/privacy" lang="it" hrefLang="it" className="hover:text-[#00CBDB] transition-colors">
          {locale.t.privacy}
        </a>
      </div>
    </footer>
  );
}

/** Scheda di un articolo: usata dall'indice e da "Más artículos" / "Mais artigos". */
export function LangPostCard({ post, locale }: { post: PostMeta; locale: LocaleConfig }) {
  return (
    <Link
      href={`${locale.base}/${post.slug}`}
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
        <p className="text-[11px] text-[#888] mt-2">{post.readingTime}{` ${locale.t.readingTime}`}</p>
      </div>
    </Link>
  );
}
