import type { Metadata } from "next";
import HtmlLang from "@/components/HtmlLang";
import { LangFooter, LangHeader, LangPostCard, categoriesOf } from "@/components/lang/LangChrome";
import { getAllPosts, postsDirFor } from "@/lib/posts";
import { BASE_URL } from "@/lib/site";
import { LOCALES, categoryAnchor, type LangCode } from "@/lib/locales";

// Indice degli articoli di una lingua (/es, /pt). Elenco automatico dalla
// cartella della lingua. Nessun hreflang verso /blog: gli elenchi non hanno
// lo stesso contenuto.

export function langIndexMetadata(lang: LangCode): Metadata {
  const locale = LOCALES[lang];
  const { title: TITLE, description: DESCRIPTION, keywords } = locale.t.index;
  return {
    title: `${TITLE} | Dave Gamba`,
    description: DESCRIPTION,
    keywords,
    alternates: { canonical: `${BASE_URL}${locale.base}` },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${BASE_URL}${locale.base}`,
      siteName: "Dave Gamba",
      locale: locale.ogLocale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

export function LangIndexPage({ lang }: { lang: LangCode }) {
  const locale = LOCALES[lang];
  const posts = getAllPosts(postsDirFor(locale));
  // Con più categorie, una sezione ciascuna: le voci del menu puntano qui (/es#nutricion)
  const categories = categoriesOf(posts);
  const groups = categories.length > 1
    ? [
        ...categories.map((c) => ({ title: c, posts: posts.filter((p) => p.category === c) })),
        { title: "", posts: posts.filter((p) => !p.category) },
      ].filter((g) => g.posts.length > 0)
    : [{ title: "", posts }];

  return (
    <>
      <HtmlLang lang={locale.hreflang} />
      <LangHeader locale={locale} />

      <main className="flex-1 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5">
            {locale.t.index.h1}
          </h1>
          <p className="text-[#e0e0e0] text-base leading-relaxed">
            {locale.t.index.intro}
          </p>
        </div>

        <div className="bg-[#fdf9f2] rounded-t-[28px]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-16">
            {groups.map((g) => (
              <section key={g.title} id={g.title ? categoryAnchor(g.title) : undefined} className="scroll-mt-24 mb-10 last:mb-0">
                {g.title && (
                  <h2 className="font-serif text-2xl font-bold text-[#111] mb-5">{g.title}</h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {g.posts.map((p) => (
                    <LangPostCard key={p.slug} post={p} locale={locale} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <LangFooter locale={locale} />
    </>
  );
}
