"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

const CATEGORIE = ["Tutti", "Allenamento", "Nutrizione", "Dimagrimento", "Longevità", "Metodo BIM", "Mindset", "Testosterone"];

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [cat, setCat] = useState("Tutti");

  const filtered = cat === "Tutti" ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      {/* Filtri categoria */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIE.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-[11px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 ${
              cat === c
                ? "bg-[#00CBDB] text-black"
                : "bg-[#111] text-[#666] hover:text-[#00CBDB] hover:border-[#00CBDB] border border-[#222]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Griglia articoli */}
      {filtered.length === 0 ? (
        <p className="text-[#444] text-center py-16">Nessun articolo in questa categoria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-[#0d0d0d] border border-[#1a1a1a] rounded-[20px] overflow-hidden hover:border-[#333] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[16/9] bg-[#111] overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
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

              <div className="flex flex-col gap-2 p-5 flex-1">
                {post.category && (
                  <span className="text-[9px] font-semibold tracking-wider uppercase text-[#00CBDB] bg-[#00cbdb0f] border border-[#00cbdb22] px-2 py-0.5 rounded-full w-fit">
                    {post.category}
                  </span>
                )}
                <h2 className="font-serif text-lg text-white leading-snug group-hover:text-[#00CBDB] transition-colors duration-200 flex-1">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[#555] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-2 text-[#333] text-xs">
                  <time>{new Date(post.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}</time>
                  <span>·</span>
                  <span>{post.readingTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
