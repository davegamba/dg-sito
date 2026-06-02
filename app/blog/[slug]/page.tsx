import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt.slice(0, 155),
    author: {
      "@type": "Person",
      name: "Dave Gamba",
      url: "https://davegamba.com",
    },
    publisher: {
      "@type": "Organization",
      name: "DaveGamba.com",
      logo: { "@type": "ImageObject", url: "https://davegamba.com/logo.png" },
    },
    datePublished: post.date,
    image: post.image,
    mainEntityOfPage: `https://davegamba.com/blog/${slug}`,
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-16 bg-black">
        <article>
          {post.image && (
            <div className="relative w-full h-[40vh] sm:h-[55vh] bg-[#111]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 40%, #000000 100%)" }}
              />
            </div>
          )}

          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className={post.image ? "-mt-20 relative z-10" : "pt-16"}>

              {post.category && (
                <span className="inline-block mb-4 text-[10px] font-semibold tracking-widest uppercase text-[#00CBDB] bg-[#00cbdb0f] border border-[#00cbdb22] px-3 py-1 rounded-full">
                  {post.category}
                </span>
              )}

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#1a1a1a]">
                <div className="w-9 h-9 rounded-full bg-[#00cbdb18] flex items-center justify-center text-[#00CBDB] text-sm font-bold">
                  D
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Dave Gamba</div>
                  <time className="text-[#444] text-xs">
                    {new Date(post.date).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {post.excerpt && (
                <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-[16px] p-5 mb-10">
                  <div className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-2">
                    TL;DR
                  </div>
                  <p className="text-[#aaa] text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              )}
            </div>

          </div>

          {/* Corpo articolo — sfondo chiaro */}
          <div className="bg-[#f7f7f5] rounded-t-[28px] mt-2">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-4">
              <div className="mdx-content">
                <MDXRemote source={post.content} />
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
              <div className="border-t border-[#e0e0e0] pt-8">
                <p className="text-[#00CBDB] font-semibold">Sali di livello, Dave</p>
                <p className="text-[#888] text-sm mt-1">Personal Trainer Online dal 2009</p>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-[#0d0d0d] border-t border-[#1a1a1a] py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-white mb-4">
              Metti in pratica quello che hai letto
            </h2>
            <p className="text-[#666] text-base mb-8">
              Il Metodo BIM — 21 minuti, 3 volte a settimana. Inizia gratis.
            </p>
            <Link
              href="/optin/sfida"
              className="inline-flex items-center gap-2 bg-[#00CBDB] text-black font-semibold px-8 py-4 rounded-[12px] hover:bg-[#00b8c7] transition-colors duration-200"
            >
              Inizia gratis ora
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
