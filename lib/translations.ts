import { BASE_URL } from "@/lib/site";
import { LOCALES, isForeignPath, type LangCode } from "@/lib/locales";

// Gruppi di articoli tradotti: unica fonte per l'hreflang di tutte le
// versioni. Una riga qui = hreflang reciproco garantito (se manca il ritorno
// Google ignora la coppia). Sta nel codice e non nel frontmatter perché
// TinaCMS valida i campi dei post di content/blog.
// Ogni riga ha l'italiano e una o più traduzioni (es, pt).
//
// Regole complete: references/regole_sito_multilingua.md (sezione C).
export type TranslationGroup = { it: string } & Partial<Record<LangCode, string>>;

const PAIRS: TranslationGroup[] = [
  { it: "yogurt-greco-proprieta-valori", es: "yogur-griego-beneficios-contraindicaciones", pt: "iogurte-grego-beneficios-faz-mal-engorda" },
  { it: "burro-chiarificato-proprieta", es: "ghee-mantequilla-clarificada" },
  { it: "creatina-a-cosa-serve", es: "creatina-para-que-sirve" },
  // La versione spagnola unisce colazione-proteica e pancake-proteici (ricetta 3):
  // un URL ha una sola gemella per lingua, l'hreflang va sulla colazione.
  { it: "colazione-proteica-cosa-mangiare", es: "desayuno-proteico-tortitas-avena" },
];

/** true per /es e /es/<qualsiasi>: le pagine in spagnolo. Non usare
 *  startsWith("/es"), che prenderebbe anche un futuro /esercizi. */
export const isSpanishPath = (pathname: string) =>
  pathname === "/es" || pathname.startsWith("/es/");

export { isForeignPath };

export const itUrl = (slug: string) => `${BASE_URL}/blog/${slug}`;
export const langUrl = (lang: LangCode, slug: string) => `${BASE_URL}${LOCALES[lang].base}/${slug}`;
export const esUrl = (slug: string) => langUrl("es", slug);

/** Gruppo di traduzioni di un articolo, cercato dal suo slug in una lingua */
export function groupFor(lang: "it" | LangCode, slug: string): TranslationGroup | null {
  return PAIRS.find((p) => p[lang] === slug) ?? null;
}

export function esSlugFor(itSlug: string): string | null {
  return groupFor("it", itSlug)?.es ?? null;
}

export function itSlugFor(esSlug: string): string | null {
  return groupFor("es", esSlug)?.it ?? null;
}

/** Traduzioni presenti nel gruppo, nell'ordine di LOCALES (es, pt) */
export function translationsOf(group: TranslationGroup): { lang: LangCode; slug: string }[] {
  return (Object.keys(LOCALES) as LangCode[]).flatMap((lang) =>
    group[lang] ? [{ lang, slug: group[lang]! }] : []
  );
}

/** hreflang del gruppo, uguale su tutte le pagine: ognuna elenca se stessa e
 *  le altre. x-default sull'italiano, la lingua principale del sito. */
export function languageAlternates(group: TranslationGroup) {
  const out: Record<string, string> = { it: itUrl(group.it) };
  for (const { lang, slug } of translationsOf(group)) out[LOCALES[lang].hreflang] = langUrl(lang, slug);
  out["x-default"] = itUrl(group.it);
  return out;
}
