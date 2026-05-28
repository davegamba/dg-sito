const WP_API = "https://public-api.wordpress.com/wp/v2/sites/davegambapt.wordpress.com";

export type WPPost = {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
};

export async function getPosts(): Promise<WPPost[]> {
  const res = await fetch(`${WP_API}/posts?_embed&per_page=100&status=publish`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const res = await fetch(`${WP_API}/posts?per_page=100&fields=slug`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const posts: { slug: string }[] = await res.json();
  return posts.map((p) => p.slug);
}

export function getFeaturedImage(post: WPPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return media ? { url: media.source_url, alt: media.alt_text } : null;
}

export function getCategoryName(post: WPPost): string {
  return post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "";
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#[0-9]+;/g, "")
    .trim();
}
