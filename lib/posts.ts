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
  if (data.published === false) return false;
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

/** Estrae H2 dal contenuto MDX per il sommario */
export function extractToc(content: string): { id: string; text: string }[] {
  const matches = content.matchAll(/^## (.+)$/gm);
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
  return getFiles()
    .filter((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return isPublished(data);
    })
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    date: data.date ? String(data.date) : "",
    category: data.category ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image ?? null,
    published: isPublished(data),
    content,
    readingTime: calcReadingTime(content),
    toc: extractToc(content),
  };
}

/** Articoli correlati: stessa categoria, escluso quello corrente */
export function getRelatedPosts(slug: string, category: string, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}
