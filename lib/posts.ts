import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string | null;
  published: boolean;
  content: string;
  readingTime: number;
  toc: { id: string; text: string }[];
};

export type PostMeta = Omit<Post, "content" | "toc">;

function getFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

function isPublished(data: Record<string, unknown>): boolean {
  // Compatibilità con il vecchio campo booleano "published"
  if (data.published === false) return false;

  const status = data.status;
  if (status === "bozza") return false;

  // "programmato" (e il vecchio formato senza "status") diventano visibili
  // automaticamente quando la data di pubblicazione arriva
  if (data.date) {
    const postDate = new Date(String(data.date));
    if (postDate > new Date()) return false;
  }
  return true;
}

/** Calcola minuti di lettura (200 parole/min) */
export function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Estrae H2 dal contenuto MDX per il sommario.
 *  Esclude gli H2 dentro <div className="succo-box"> (non vanno nel TOC). */
export function extractToc(content: string): { id: string; text: string }[] {
  // Rimuove i blocchi succo-box prima di cercare gli H2
  const stripped = content.replace(/<div[^>]*className="succo-box"[^>]*>[\s\S]*?<\/div>/g, "");
  const matches = stripped.matchAll(/^## (.+)$/gm);
  return Array.from(matches).map((m) => {
    const text = m[1].replace(/\*\*/g, "").replace(/[_`]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-àèéìòùáíóú]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return { id, text };
  });
}

export function getAllPosts(): PostMeta[] {
  return getFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "",
        date: data.date ? String(data.date) : "",
        category: data.category ?? "",
        excerpt: data.excerpt ?? "",
        image: data.image ?? null,
        published: isPublished(data),
        readingTime: calcReadingTime(content),
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  if (!isPublished(data)) return null;
  return {
    slug,
    title: data.title ?? "",
    date: data.date ? String(data.date) : "",
    category: data.category ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image ?? null,
    published: true,
    content,
    readingTime: calcReadingTime(content),
    toc: extractToc(content),
  };
}

/** Divide il contenuto in succo (prima parte) e corpo (resto).
 *  Il succo è il blocco <div className="succo-box">...</div> iniziale. */
export function splitContent(content: string): { succo: string; body: string } {
  if (!content.trimStart().startsWith("<div")) {
    return { succo: "", body: content };
  }
  // Trova la chiusura del div esterno tenendo conto dei div annidati
  let depth = 0;
  let i = 0;
  while (i < content.length) {
    if (content.startsWith("<div", i)) {
      depth++;
      i += 4;
    } else if (content.startsWith("</div>", i)) {
      depth--;
      if (depth === 0) {
        const succo = content.slice(0, i + 6).trim();
        const body = content.slice(i + 6).trim();
        return { succo, body };
      }
      i += 6;
    } else {
      i++;
    }
  }
  return { succo: "", body: content };
}

/** Articoli correlati: stessa categoria, escluso quello corrente */
export function getRelatedPosts(slug: string, category: string, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}
