import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

// ── TIPI ─────────────────────────────────────────────────────────────
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  category: string;
  readTime: number;
  coverImage?: { asset: { url: string; _id: string }; alt: string };
  body: unknown[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { url: string } };
    noIndex?: boolean;
  };
};

// ── STATIC PARAMS ─────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(postSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

// ── METADATA DINAMICI ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return {};

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${title} — Dave Gamba`,
    description,
    robots: post.seo?.noIndex ? "noindex" : "index, follow",
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Dave Gamba"],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}

// ── RICH TEXT COMPONENTS ──────────────────────────────────────────────
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#ccc] text-base sm:text-lg leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl sm:text-3xl text-white mt-12 mb-5 leading-snug">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl sm:text-2xl text-white mt-8 mb-4 leading-snug">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-lg text-white font-semibold mt-6 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#00CBDB] pl-5 my-6 text-[#888] italic text-base sm:text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-2 mb-5 ml-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-[#ccc] text-base">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2 text-[#ccc] text-base">
        <span className="text-[#00CBDB] mt-1 shrink-0">▸</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-[#00CBDB] not-italic">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-[#00CBDB] underline underline-offset-2 hover:text-white transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <div className="relative w-full aspect-video rounded-[14px] overflow-hidden bg-[#111]">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-[#444] text-sm mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: ({ value }) => {
      const colors = {
        info: "border-[#00CBDB] bg-[#00cbdb0a] text-[#00CBDB]",
        warning: "border-[#F0C040] bg-[#f0c0400a] text-[#F0C040]",
        science: "border-[#4ade80] bg-[#4ade800a] text-[#4ade80]",
      };
      const cls = colors[value.type as keyof typeof colors] ?? colors.info;
      return (
        <div className={`border-l-4 rounded-r-[12px] p-4 my-6 ${cls}`}>
          <p className="text-sm leading-relaxed text-[#ddd]">{value.text}</p>
        </div>
      );
    },
  },
};

// ── PAGINA ────────────────────────────────────────────────────────────
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  // JSON-LD structured data per Google e AI Overview
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
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
    datePublished: post.publishedAt,
    image: post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined,
    mainEntityOfPage: `https://davegamba.com/blog/${post.slug.current}`,
  };

  return (
    <>
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-16 bg-black">

        {/* Hero articolo */}
        <article>
          {/* Cover image full-width */}
          {post.coverImage && (
            <div className="relative w-full h-[40vh] sm:h-[55vh] bg-[#111]">
              <Image
                src={urlFor(post.coverImage).width(1400).height(700).url()}
                alt={post.coverImage.alt ?? post.title}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 40%, #000000 100%)",
                }}
              />
            </div>
          )}

          {/* Header articolo */}
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className={post.coverImage ? "-mt-20 relative z-10" : "pt-16"}>

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

              {/* Meta */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#1a1a1a]">
                <div className="w-9 h-9 rounded-full bg-[#00cbdb18] flex items-center justify-center text-[#00CBDB] text-sm font-bold">
                  D
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Dave Gamba</div>
                  <div className="text-[#444] text-xs flex gap-2">
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    {post.readTime && (
                      <>
                        <span>·</span>
                        <span>{post.readTime} min di lettura</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* TL;DR */}
              {post.excerpt && (
                <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-[16px] p-5 mb-10">
                  <div className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-2">
                    TL;DR
                  </div>
                  <p className="text-[#aaa] text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="pb-16">
              {post.body && <PortableText value={post.body as never} components={ptComponents} />}
            </div>

            {/* Firma */}
            <div className="border-t border-[#1a1a1a] pt-8 pb-16">
              <p className="text-[#00CBDB] font-semibold">Sali di livello, Dave</p>
              <p className="text-[#444] text-sm mt-1">Personal Trainer Online dal 2009</p>
            </div>
          </div>
        </article>

        {/* CTA finale */}
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
