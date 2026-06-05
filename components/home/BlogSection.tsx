import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const categoryColors: Record<string, string> = {
  Dimagrimento:  "#00CBDB",
  Testosterone:  "#F0C040",
  Allenamento:   "#00CBDB",
  Nutrizione:    "#F0C040",
  Longevità:     "#00CBDB",
  Salute:        "#F0C040",
  Benessere:     "#00CBDB",
};

export default function BlogSection() {
  const articles = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-black gsap-fade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Dal blog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Il metodo, spiegato
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[#00CBDB] text-sm font-medium hover:underline shrink-0"
          >
            Tutti gli articoli →
          </Link>
        </div>


        {/* Lista articoli reali */}
        <div className="flex flex-col">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="flex items-center gap-5 py-3 sm:py-5 border-t border-[#1a1a1a] hover:border-[#333] group transition-colors last:border-b"
            >
              {/* Thumbnail */}
              <div className="flex-none w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-[10px] overflow-hidden bg-[#111] relative shrink-0">
                {a.image ? (
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 100%)" }}
                  >
                    <span className="font-serif text-2xl text-[#333]">{i + 1}</span>
                  </div>
                )}
              </div>

              {/* Testo */}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: categoryColors[a.category] ?? "#00CBDB" }}
                >
                  {a.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-white leading-snug group-hover:text-[#00CBDB] transition-colors duration-200 line-clamp-2">
                  {a.title}
                </h3>
              </div>

              {/* Freccia */}
              <span className="text-[#333] group-hover:text-[#00CBDB] transition-colors shrink-0 text-lg">→</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
