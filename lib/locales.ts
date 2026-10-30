// Lingue straniere del blog (/es dal 06/10/2026, /pt dal 27/10/2026).
// Tutto quello che cambia da una lingua all'altra sta qui: le pagine di
// app/es e app/pt usano gli stessi componenti (components/lang/).
// Regole: references/regole_sito_multilingua.md

export type LangCode = "es" | "pt";

export type LocaleConfig = {
  code: LangCode;
  /** Prefisso degli URL: /es, /pt */
  base: string;
  /** Cartella dei .mdx, relativa alla radice del progetto (niente "path":
   *  questo file lo importano anche componenti client) */
  contentDir: string;
  /** Valore di hreflang, <html lang> e Content-Language */
  hreflang: string;
  ogLocale: string;
  dateLocale: string;
  /** Nome della lingua scritto in quella lingua, per i link di cambio lingua */
  name: string;
  flag: string;
  /** Link di cambio lingua quando è l'unica alternativa (regola 10a) */
  versionLabel: string;
  /** Titolo dell'H2 delle fonti (diventa un H3 piccolo) */
  references: string;
  /** keywords degli articoli senza "keywords" nel frontmatter */
  defaultKeywords: string[];
  t: {
    toc: string;
    readingTime: string;
    share: string;
    moreArticles: string;
    footerArticles: string;
    privacy: string;
    jobTitle: string;
    authorDescription: string;
    index: { title: string; h1: string; description: string; intro: string; keywords: string[] };
  };
};

export const LOCALES: Record<LangCode, LocaleConfig> = {
  es: {
    code: "es",
    base: "/es",
    contentDir: "content/es",
    hreflang: "es",
    ogLocale: "es_ES",
    dateLocale: "es-ES",
    name: "Español",
    flag: "🇪🇸",
    versionLabel: "Versión en español",
    references: "referencias",
    // Storico: fisse sullo yogurt per tutti gli articoli spagnoli (Google ignora
    // questo meta). Lasciate così per non cambiare le pagine già pubblicate.
    defaultKeywords: ["yogur griego", "yogur griego beneficios y contraindicaciones", "yogur griego engorda", "yogur griego estreñimiento"],
    t: {
      toc: "Índice",
      readingTime: "min de lectura",
      share: "Comparte el artículo",
      moreArticles: "Más artículos",
      footerArticles: "Artículos en español",
      privacy: "Privacidad (en italiano)",
      jobTitle: "Entrenador personal online",
      authorDescription:
        "Entrenador personal online desde 2009, creador del método Breve-Intenso-Específico. Más de 3.000 clientes.",
      index: {
        title: "Artículos en español",
        h1: "Artículos de Dave Gamba en español",
        description:
          "Nutrición y entrenamiento con estudios, sin mitos: qué dice la ciencia sobre los alimentos y suplementos que más se buscan.",
        intro:
          "Entreno a personas online desde 2009. Aquí respondo con estudios a las preguntas que más se buscan sobre alimentación y suplementos: qué funciona, qué no y para quién.",
        keywords: ["Dave Gamba", "nutrición", "entrenamiento", "artículos en español"],
      },
    },
  },
  pt: {
    code: "pt",
    base: "/pt",
    contentDir: "content/pt",
    hreflang: "pt-BR",
    ogLocale: "pt_BR",
    dateLocale: "pt-BR",
    name: "Português",
    flag: "🇧🇷",
    versionLabel: "Versão em português",
    references: "referências",
    defaultKeywords: [],
    t: {
      toc: "Índice",
      readingTime: "min de leitura",
      share: "Compartilhe o artigo",
      moreArticles: "Mais artigos",
      footerArticles: "Artigos em português",
      privacy: "Privacidade (em italiano)",
      jobTitle: "Personal trainer online",
      authorDescription:
        "Personal trainer online desde 2009, criador do método Breve-Intenso-Específico. Mais de 3.000 clientes.",
      index: {
        title: "Artigos em português",
        h1: "Artigos de Dave Gamba em português",
        description:
          "Nutrição e treino com estudos, sem mitos: o que a ciência diz sobre os alimentos e suplementos mais pesquisados.",
        intro:
          "Treino pessoas online desde 2009. Aqui respondo com estudos às perguntas mais pesquisadas sobre alimentação e suplementos: o que funciona, o que não funciona e para quem.",
        keywords: ["Dave Gamba", "nutrição", "treino", "artigos em português"],
      },
    },
  },
};

/** true per /es, /es/<...>, /pt, /pt/<...>: le pagine in lingua straniera.
 *  Confronto esatto sul prefisso: startsWith("/pt") prenderebbe anche il
 *  redirect /pt-virtuale, startsWith("/es") gli /esercizi-*. */
export const isForeignPath = (pathname: string) =>
  Object.values(LOCALES).some((l) => pathname === l.base || pathname.startsWith(`${l.base}/`));

/** Ancora di un titolo: stessa regola in extractToc (lib/posts.ts) e nelle
 *  pagine, o i link dell'indice non trovano il titolo. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-àèéìòùáíóúñüãõâêôç]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
