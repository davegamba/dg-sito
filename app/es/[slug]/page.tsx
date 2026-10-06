import type { ReactNode } from "react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import HtmlLang from "@/components/HtmlLang";
import { ES_POSTS_DIR, getAllSlugs, getPostBySlug, splitContent } from "@/lib/posts";
import { BASE_URL } from "@/lib/site";
import { esUrl, itSlugFor, itUrl, languageAlternates } from "@/lib/translations";

// Articoli in spagnolo — test del 06/10/2026 (un solo articolo, yogurt greco).
//
// Pagina separata da app/blog/[slug] di proposito: su questa pagina NON deve
// comparire niente in italiano. Niente Header/Footer del sito, niente quiz,
// niente Club, niente articoli correlati (sono tutti in italiano). Popup di
// uscita, barra mobile e cookie banner si nascondono da soli su /es/.
// Senza banner non parte nessun tracciamento: GA e Pixel aspettano il consenso.
//
// Regole: references/regole_sito_multilingua.md

// Un /es/<slug> che non esiste è un 404, non una pagina generata al volo.
// (In pratica non ci si arriva: next.config.ts manda gli /es/ sconosciuti,
// vecchi URL Podia, alla home.)
export const dynamicParams = false;

// Stessa regola di extractToc() in lib/posts.ts: devono restare identiche o
// i link dell'indice non trovano il titolo.
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-àèéìòùáíóúñü]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function CustomH2({ children }: { children: ReactNode }) {
  const raw = typeof children === "string" ? children : "";
  if (raw.trim().toLowerCase().includes("referencias")) {
    return (
      <h3 style={{ fontSize: "1.1rem", color: "#14181a", fontWeight: 700, borderTop: "1px solid #e8e0d4", paddingTop: "1.5rem", marginTop: "2.5rem", marginBottom: "0.75rem" }}>
        🔬 {children}
      </h3>
    );
  }
  const cleaned = raw.replace(/\*\*/g, "").replace(/[_`]/g, "").trim();
  const id = cleaned ? slugifyHeading(cleaned) : undefined;
  return (
    <h2 id={id} className="font-serif" style={{ scrollMarginTop: "5rem" }}>
      {children}
    </h2>
  );
}

function ScrollableTable({ children }: { children: ReactNode }) {
  return (
    <div className="mdx-table-scroll">
      <table>{children}</table>
    </div>
  );
}

// Solo componenti neutri: le CTA (quiz, Club, calcolatore) portano a pagine in
// italiano e qui non esistono. Se un .mdx spagnolo le usa, la build fallisce.
const mdxComponents = { h2: CustomH2, table: ScrollableTable };

const AUTHOR_IMAGE = "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg";

function absoluteImageFor(image: string | null) {
  if (!image) return undefined;
  return image.startsWith("http") ? image : `${BASE_URL}${image}`;
}

export async function generateStaticParams() {
  return getAllSlugs(ES_POSTS_DIR).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, ES_POSTS_DIR);
  if (!post) return {};
  const pageUrl = esUrl(slug);
  const itSlug = itSlugFor(slug);
  const image = absoluteImageFor(post.image);
  const description = post.excerpt.slice(0, 155);
  return {
    title: `${post.title} | Dave Gamba`,
    description,
    // Il layout radice ha keywords in italiano: qui vanno sovrascritte.
    keywords: ["yogur griego", "yogur griego beneficios y contraindicaciones", "yogur griego engorda", "yogur griego estreñimiento"],
    // Canonical sempre a se stessa: mai verso la versione italiana.
    alternates: {
      canonical: pageUrl,
      ...(itSlug ? { languages: languageAlternates({ it: itSlug, es: slug }) } : {}),
    },
    openGraph: {
      title: post.title,
      description,
      url: pageUrl,
      siteName: "Dave Gamba",
      locale: "es_ES",
      ...(itSlug ? { alternateLocale: ["it_IT"] } : {}),
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Dave Gamba"],
      images: image ? [{ url: image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function EsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, ES_POSTS_DIR);
  if (!post) notFound();

  const { succo, body } = splitContent(post.content);
  const pageUrl = esUrl(slug);
  const itSlug = itSlugFor(slug);
  const titleEncoded = encodeURIComponent(post.title);
  const image = absoluteImageFor(post.image);
  const dateIso = new Date(post.date).toISOString();
  const wordCount = post.content.split(/\s+/).length;

  const faqJsonLd = post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "es",
        mainEntity: post.faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;

  // Niente BreadcrumbList: Home e Blog sono pagine italiane.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.excerpt.slice(0, 155),
    author: {
      "@type": "Person",
      name: "Dave Gamba",
      url: `${BASE_URL}/autore/dave-gamba`,
      image: AUTHOR_IMAGE,
      sameAs: [
        "https://www.instagram.com/davegamba_fit/",
        "https://www.youtube.com/@DaveGambaFitness",
      ],
      jobTitle: "Entrenador personal online",
      description: "Entrenador personal online desde 2009, creador del método Breve-Intenso-Específico. Más de 3.000 clientes.",
    },
    publisher: {
      "@type": "Organization",
      name: "DaveGamba.com",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo.png` },
    },
    datePublished: dateIso,
    dateModified: dateIso,
    ...(image ? { image } : {}),
    mainEntityOfPage: pageUrl,
    inLanguage: "es",
    wordCount,
    ...(itSlug ? { translationOfWork: { "@id": `${itUrl(itSlug)}#article` } } : {}),
  };

  const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

  return (
    <>
      <HtmlLang lang="es" />
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Testata minima: il menu del sito porta tutto a pagine italiane */}
      <header className="absolute top-0 inset-x-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span
            className="font-serif text-xl font-bold select-none"
            style={{
              background: "linear-gradient(90deg, #00E5F5 0%, #00CBDB 40%, #00AECF 68%, #0077CC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dave Gamba
          </span>
          {itSlug && (
            <a
              href={itUrl(itSlug)}
              hrefLang="it"
              lang="it"
              className="text-xs text-white/70 hover:text-[#00CBDB] transition-colors"
            >
              🇮🇹 Versione in italiano
            </a>
          )}
        </div>
      </header>

      <main className="flex-1 bg-black">
        <article>
          {post.image && (
            <div className="relative w-full h-[40vh] sm:h-[55vh] bg-[#111]">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #000000 100%)" }} />
            </div>
          )}

          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className={post.image ? "-mt-20 relative z-10" : "pt-24"}>
              {post.category && (
                <span className="inline-block mb-4 text-[10px] font-semibold tracking-widest uppercase text-[#00CBDB] bg-[#00cbdb0f] border border-[#00cbdb22] px-3 py-1 rounded-full">
                  {post.category}
                </span>
              )}

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1a1a1a]">
                <div className="w-9 h-9 rounded-full bg-[#00cbdb18] flex items-center justify-center text-[#00CBDB] text-sm font-bold flex-shrink-0">
                  D
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold">Dave Gamba</div>
                  <div className="flex items-center gap-2 text-[#e0e0e0] text-xs mt-0.5">
                    <time dateTime={dateIso}>{new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</time>
                    <span>·</span>
                    <span>{post.readingTime} min de lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fdf9f2] rounded-t-[28px] mt-2">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-4">
              {succo && (
                <div className="mdx-content">
                  <MDXRemote source={succo} components={mdxComponents} options={mdxOptions} />
                </div>
              )}

              {post.toc.length > 5 && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-[#8a8175] tracking-[0.18em] uppercase mb-3">Índice</h3>
                  <ol className="space-y-1.5">
                    {post.toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="text-sm text-[#444] hover:text-[#00CBDB] transition-colors leading-snug flex items-center gap-1.5 group">
                          <span className="text-[#00CBDB] text-lg font-bold leading-none">›</span>
                          <span className="group-hover:text-[#00CBDB] transition-colors">{item.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mdx-content">
                <MDXRemote source={body || post.content} components={mdxComponents} options={mdxOptions} />
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
              <p className="text-base font-bold text-[#111] mb-3">Comparte el artículo</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/?text=${titleEncoded}%20${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1877F2] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Pie mínimo. La política de privacidad existe solo en italiano: se dice. */}
      <footer className="border-t border-[#1e1e2e] bg-[#0b0d1a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-xs text-[#888] flex flex-wrap gap-x-4 gap-y-2 justify-between">
          <span>© Dave Gamba · davegamba.com</span>
          <a href="/privacy" lang="it" hrefLang="it" className="hover:text-[#00CBDB] transition-colors">
            Privacidad (en italiano)
          </a>
        </div>
      </footer>
    </>
  );
}
