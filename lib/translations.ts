import { BASE_URL } from "@/lib/site";

// Coppie di articoli tradotti: unica fonte per l'hreflang di entrambe le
// versioni. Una riga qui = hreflang reciproco garantito (se manca il ritorno
// Google ignora la coppia). Sta nel codice e non nel frontmatter perché
// TinaCMS valida i campi dei post di content/blog.
//
// Regole complete: references/regole_sito_multilingua.md (sezione C).
const PAIRS: { it: string; es: string }[] = [
  { it: "yogurt-greco-proprieta-valori", es: "yogur-griego-beneficios-contraindicaciones" },
];

export const itUrl = (slug: string) => `${BASE_URL}/blog/${slug}`;
export const esUrl = (slug: string) => `${BASE_URL}/es/${slug}`;

export function esSlugFor(itSlug: string): string | null {
  return PAIRS.find((p) => p.it === itSlug)?.es ?? null;
}

export function itSlugFor(esSlug: string): string | null {
  return PAIRS.find((p) => p.es === esSlug)?.it ?? null;
}

/** hreflang della coppia, uguale su tutte e due le pagine: ognuna elenca se
 *  stessa e l'altra. x-default sull'italiano, la lingua principale del sito. */
export function languageAlternates(pair: { it: string; es: string }) {
  return {
    it: itUrl(pair.it),
    es: esUrl(pair.es),
    "x-default": itUrl(pair.it),
  };
}
