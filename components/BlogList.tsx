"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Fuse from "fuse.js";
import type { PostMeta } from "@/lib/posts";

const CATEGORIE = ["Tutti", "Allenamento", "Nutrizione", "Dimagrimento", "Longevità", "Testosterone"];

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [cat, setCat] = useState("Tutti");
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () => new Fuse(posts, { keys: ["title", "excerpt", "category"], threshold: 0.35 }),
    [posts]
  );

  const bySearch = query.trim()
    ? fuse.search(query.trim()).map((r) => r.item)
    : posts;

  const filtered = cat === "Tutti" ? bySearch : bySearch.filter((p) => p.category === cat);

  return (
    <>
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca nel blog..."
          className="w-full bg-[#0a0a12] text-white placeholder-[#777] border-2 border-[#00CBDB99] focus:border-[#00CBDB] focus:outline-none rounded-xl px-5 py-3 text-sm transition-colors duration-200"
        />
      </div>

      {/* Filtri categoria */}
      <div className="flex flex-wrap gap-2 mb-4 pt-2">
        {CATEGORIE.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-[11px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 ${
              cat === c
                ? "bg-[#00CBDB] text-black"
                : "bg-[#00CBDB0D] text-[#00CBDB] border border-[#00CBDB55] hover:bg-[#00CBDB22] hover:border-[#00CBDB]"
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
              className="group flex flex-col bg-[#F5F1EB] border border-[#e0dbd3] rounded-[20px] overflow-hidden hover:border-[#00CBDB] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[2/1] sm:aspect-[16/9] bg-[#111] overflow-hidden">
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

              <div className="flex flex-col gap-2 p-3 sm:p-5 flex-1">
                {post.category && (
                  <span className="text-[9px] font-semibold tracking-wider uppercase text-[#00CBDB] bg-[#00cbdb0f] border border-[#00cbdb22] px-2 py-0.5 rounded-full w-fit">
                    {post.category}
                  </span>
                )}
                <h2 className="font-serif text-lg text-[#0a0a12] leading-snug group-hover:text-[#00CBDB] transition-colors duration-200 flex-1">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[#666] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-2 text-[#999] text-xs">
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
