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
};

export type PostMeta = Omit<Post, "content">;

function getFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

function isPublished(data: Record<string, unknown>): boolean {
  // Se published è esplicitamente false → bozza
  if (data.published === false) return false;
  // Se ha una data futura → non ancora visibile
  if (data.date) {
    const postDate = new Date(String(data.date));
    if (postDate > new Date()) return false;
  }
  // Default: visibile
  return true;
}

export function getAllPosts(): PostMeta[] {
  return getFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? "",
        date: data.date ? String(data.date) : "",
        category: data.category ?? "",
        excerpt: data.excerpt ?? "",
        image: data.image ?? null,
        published: isPublished(data),
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  // Genera le pagine solo per gli articoli pubblicati
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
  };
}
