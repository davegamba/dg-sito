import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Dave Gamba | Allenamento, Nutrizione, Metodo BIM",
  description: "Articoli scientifici su allenamento, nutrizione e longevità. Dati reali, niente fuffa.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        <section className="py-16 sm:py-24 bg-black border-b border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-4 block">Blog</span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4">
              Niente fuffa.{" "}
              <em className="not-italic text-[#00CBDB]">Solo risultati.</em>
            </h1>
            <p className="text-[#666] text-lg max-w-xl">
              Articoli basati su evidenze PubMed. Scritti per chi vuole capire, non solo seguire.
            </p>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {posts.length === 0 ? (
              <p className="text-[#444] text-lg text-center py-16">Nessun articolo ancora. Torna presto.</p>
            ) : (
              <BlogList posts={posts} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
