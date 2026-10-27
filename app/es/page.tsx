import type { Metadata } from "next";
import HtmlLang from "@/components/HtmlLang";
import { EsFooter, EsHeader, EsPostCard } from "@/components/es/EsChrome";
import { ES_POSTS_DIR, getAllPosts } from "@/lib/posts";
import { BASE_URL } from "@/lib/site";

// Indice degli articoli in spagnolo. Elenco automatico da content/es.
// Nessun hreflang verso /blog: i due elenchi non hanno lo stesso contenuto.

const TITLE = "Artículos en español";
const H1 = "Artículos de Dave Gamba en español";
const DESCRIPTION =
  "Nutrición y entrenamiento con estudios, sin mitos: qué dice la ciencia sobre los alimentos y suplementos que más se buscan.";

export const metadata: Metadata = {
  title: `${TITLE} | Dave Gamba`,
  description: DESCRIPTION,
  keywords: ["Dave Gamba", "nutrición", "entrenamiento", "artículos en español"],
  alternates: { canonical: `${BASE_URL}/es` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/es`,
    siteName: "Dave Gamba",
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function EsIndexPage() {
  const posts = getAllPosts(ES_POSTS_DIR);

  return (
    <>
      <HtmlLang lang="es" />
      <EsHeader />

      <main className="flex-1 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5">
            {H1}
          </h1>
          <p className="text-[#e0e0e0] text-base leading-relaxed">
            Entreno a personas online desde 2009. Aquí respondo con estudios a las preguntas que más se buscan sobre
            alimentación y suplementos: qué funciona, qué no y para quién.
          </p>
        </div>

        <div className="bg-[#fdf9f2] rounded-t-[28px]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posts.map((p) => (
                <EsPostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <EsFooter />
    </>
  );
}
