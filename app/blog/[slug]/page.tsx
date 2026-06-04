import type { ReactNode } from "react";
import { getPostBySlug, getAllSlugs, getRelatedPosts, splitContent } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import type { Metadata } from "next";

// H2 bicolore: prima parte ciano, seconda parte nera
// Eccezione: "Riferimenti Scientifici" → h3 nero con emoji 🔬
function CustomH2({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return <h2>{children}</h2>;
  if (children.trim().toLowerCase().includes("riferimenti")) {
    return (
      <h3 style={{ fontSize: "1.1rem", color: "#111", fontWeight: 700, borderTop: "1px solid #e8e0d4", paddingTop: "1.5rem", marginTop: "2.5rem", marginBottom: "0.75rem" }}>
        🔬 {children}
      </h3>
    );
  }
  const match = children.match(/^(.+?)\s*(—|:)\s*(.+)$/);
  if (match) {
    const sep = match[2] === "—" ? " — " : ": ";
    return (
      <h2>
        <span style={{ color: "#00CBDB" }}>{match[1]}</span>
        <span style={{ color: "#1a1a1a" }}>{sep}{match[3]}</span>
      </h2>
    );
  }
  return <h2>{children}</h2>;
}

const mdxComponents = { h2: CustomH2 };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dave Gamba`,
    description: post.excerpt.slice(0, 155),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 155),
      type: "article",
      publishedTime: post.date,
      authors: ["Dave Gamba"],
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category);
  const { succo, body } = splitContent(post.content);
  const pageUrl = `https://davegamba.com/blog/${slug}`;
  const titleEncoded = encodeURIComponent(post.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt.slice(0, 155),
    author: {
      "@type": "Person",
      name: "Dave Gamba",
      url: "https://davegamba.com",
      sameAs: [
        "https://www.instagram.com/davegamba_fit/",
        "https://www.youtube.com/@DaveGamba",
        "https://davegamba.com",
      ],
      jobTitle: "Personal Trainer Online",
      description: "Personal trainer online dal 2009, fondatore del Metodo BIM — Breve, Intenso, Mirato. Oltre 3.000 clienti seguiti.",
    },
    publisher: {
      "@type": "Organization",
      name: "DaveGamba.com",
      logo: { "@type": "ImageObject", url: "https://davegamba.com/logo.png" },
    },
    datePublished: post.date,
    image: post.image,
    mainEntityOfPage: pageUrl,
  };

  return (
    <>
      <Header />
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-16 bg-black">
        <article>
          {/* Hero image */}
          {post.image && (
            <div className="relative w-full h-[40vh] sm:h-[55vh] bg-[#111]">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #000000 100%)" }} />
            </div>
          )}

          {/* Header dark */}
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className={post.image ? "-mt-20 relative z-10" : "pt-16"}>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-[11px] text-[#666] mb-4">
                <Link href="/" className="hover:text-[#00CBDB] transition-colors">Home</Link>
                <span className="text-[#444]">›</span>
                <Link href="/blog" className="hover:text-[#00CBDB] transition-colors">Blog</Link>
                <span className="text-[#444]">›</span>
                <span className="text-[#777] truncate max-w-[180px]">{post.title}</span>
              </nav>

              {/* Categoria */}
              {post.category && (
                <span className="inline-block mb-4 text-[10px] font-semibold tracking-widest uppercase text-[#00CBDB] bg-[#00cbdb0f] border border-[#00cbdb22] px-3 py-1 rounded-full">
                  {post.category}
                </span>
              )}

              {/* Titolo */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
                {post.title}
              </h1>

              {/* Autore + data + tempo lettura */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1a1a1a]">
                <div className="w-9 h-9 rounded-full bg-[#00cbdb18] flex items-center justify-center text-[#00CBDB] text-sm font-bold flex-shrink-0">
                  D
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold">Dave Gamba</div>
                  <div className="text-[#00CBDB] text-[10px] mb-0.5">Personal trainer online dal 2009 · Metodo BIM</div>
                  <div className="flex items-center gap-2 text-[#555] text-xs mt-0.5">
                    <time>{new Date(post.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}</time>
                    <span>·</span>
                    <span>{post.readingTime} min di lettura</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Corpo articolo — sfondo sabbia */}
          <div className="bg-[#fdf9f2] rounded-t-[28px] mt-2">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-4">

              {/* 1. SUCCO DELLA GUIDA */}
              {succo && (
                <div className="mdx-content">
                  <MDXRemote source={succo} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
                </div>
              )}

              {/* 2. INDICE — dopo il succo, prima del corpo */}
              {post.toc.length > 5 && (
                <div className="bg-white border border-[#e8e0d4] rounded-[16px] p-5 mb-8">
                  <h3 className="text-base font-bold text-[#111] mb-3">In questo articolo</h3>
                  <ol className="space-y-1.5">
                    {post.toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="text-sm text-[#444] hover:text-[#00CBDB] transition-colors leading-snug flex items-center gap-1.5 group">
                          <span className="text-[#00CBDB] text-sm">›</span>
                          <span className="group-hover:text-[#00CBDB] transition-colors">{item.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* 3. CORPO ARTICOLO */}
              <div className="mdx-content">
                <MDXRemote source={body || post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
              </div>
            </div>

            {/* Condivisione social */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
              <p className="text-base font-bold text-[#111] mb-3">Condividi l&apos;articolo</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/?text=${titleEncoded}%20${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1877F2] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Articoli correlati */}
            {related.length > 0 && (
              <div className="border-t border-[#e8e0d4] pt-12 pb-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                  <h2 className="text-xl font-bold text-[#111] mb-6">Potrebbe interessarti</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group flex flex-col bg-white border border-[#e8e0d4] rounded-[16px] overflow-hidden hover:border-[#00CBDB] transition-colors duration-200"
                      >
                        {r.image && (
                          <div className="relative w-full aspect-[16/9] bg-[#f0f0f0]">
                            <Image src={r.image} alt={r.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                          </div>
                        )}
                        <div className="p-4 flex-1">
                          <p className="text-[9px] font-semibold tracking-widest uppercase text-[#00CBDB] mb-1">{r.category}</p>
                          <h3 className="text-sm font-semibold text-[#111] leading-snug group-hover:text-[#00CBDB] transition-colors line-clamp-3">
                            {r.title}
                          </h3>
                          <p className="text-[11px] text-[#aaa] mt-2">{r.readingTime} min</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>{/* fine bg-sabbia */}
        </article>

        {/* CTA — Quiz Profilo Fisico */}
        <section className="bg-[#0d0d0d] border-t border-[#1a1a1a] py-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
            <div className="text-3xl mb-4">💪</div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">
              Scopri il tuo Profilo Fisico
            </h2>
            <p className="text-[#888] text-sm mb-8">
              7 domande per capire dove sei adesso e qual è il piano giusto per il tuo fisico. Gratuito.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-[#00CBDB] text-black font-semibold px-8 py-4 rounded-[12px] hover:bg-[#00b8c7] transition-colors duration-200 text-base"
            >
              Fai il quiz gratuito →
            </Link>
            <p className="text-[#444] text-xs mt-4">2 minuti · Nessuno spam · Risultati personalizzati</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
