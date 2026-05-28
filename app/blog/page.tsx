import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Dave Gamba | Allenamento, Nutrizione, Metodo BIM",
  description:
    "Articoli scientifici su allenamento, nutrizione e longevità. Dati reali, niente fuffa.",
};

export const revalidate = 60; // ISR: aggiorna ogni 60 secondi

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  category: string;
  readTime: number;
  coverImage?: { asset: { url: string }; alt: string };
};

const categoryLabels: Record<string, string> = {
  allenamento: "Allenamento",
  nutrizione: "Nutrizione",
  mentalita: "Mentalità",
  ormoni: "Testosterone & Ormoni",
  longevita: "Longevità",
  cardio: "Cardio",
};

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(postsQuery);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        {/* Hero blog */}
        <section className="py-16 sm:py-24 bg-black border-b border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">
              Blog
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4">
              Niente fuffa.{" "}
              <em className="not-italic text-[#00CBDB]">Solo risultati.</em>
            </h1>
            <p className="text-[#666] text-lg max-w-xl">
              Articoli basati su evidenze PubMed. Scritti per chi vuole capire,
              non solo seguire.
            </p>
          </div>
        </section>

        {/* Griglia articoli */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#444] text-lg">
                  Nessun articolo ancora. Torna presto.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group flex flex-col bg-[#0d0d0d] border border-[#1a1a1a] rounded-[20px] overflow-hidden hover:border-[#333] transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Cover */}
                    <div className="relative w-full aspect-[16/9] bg-[#111] overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage).width(640).height(360).url()}
                          alt={post.coverImage.alt ?? post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0a0a0a] flex items-center justify-center">
                          <span className="font-serif text-4xl text-[#222]">DG</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      {/* Category + read time */}
                      <div className="flex items-center gap-2">
                        {post.category && (
                          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#00CBDB] bg-[#00cbdb0f] border border-[#00cbdb22] px-2 py-0.5 rounded-full">
                            {categoryLabels[post.category] ?? post.category}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="text-[#444] text-xs">{post.readTime} min</span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-lg text-white leading-snug group-hover:text-[#00CBDB] transition-colors duration-200 flex-1">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-[#555] text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Date */}
                      <time className="text-[#333] text-xs">
                        {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
