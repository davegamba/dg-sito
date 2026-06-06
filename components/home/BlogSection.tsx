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
    <section className="py-12 sm:py-16 gsap-fade" style={{ background: "#F5F1EB" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#00CBDB] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Le Guide del Blog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0a0a12]">
              Tutto quello che devi sapere
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
              className="flex items-center gap-5 py-3 sm:py-5 border-t border-[#ddd8d0] hover:border-[#00CBDB] group transition-colors last:border-b"
            >
              {/* Thumbnail */}
              <div className="flex-none w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-[10px] overflow-hidden bg-[#111] relative shrink-0">
                {a.image ? (
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #e8e3dc 0%, #ddd8d0 100%)" }}
                  >
                    <span className="font-serif text-2xl text-[#bbb5ad]">{i + 1}</span>
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
                <h3 className="font-serif text-lg sm:text-xl text-[#0a0a12] leading-snug group-hover:text-[#00CBDB] transition-colors duration-200 line-clamp-2">
                  {a.title}
                </h3>
              </div>

              {/* Freccia */}
              <span className="text-[#aaa8a3] group-hover:text-[#00CBDB] transition-colors shrink-0 text-lg">→</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
