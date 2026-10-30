import { getAllPosts, postsDirFor } from "@/lib/posts";
import { LOCALES } from "@/lib/locales";
import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/coaching`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/quiz-fisico`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/piani-coaching`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/addominali`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/autore/dave-gamba`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE_URL}/termini`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Articoli in lingua straniera (es, pt): indice + articoli, solo se la
  // cartella ne ha. L'hreflang sta nei <link> delle pagine, non qui:
  // un solo metodo, per non rischiare due versioni in contraddizione.
  const foreign = Object.values(LOCALES).flatMap((locale) => {
    const items = getAllPosts(postsDirFor(locale)).map((post) => ({
      url: `${BASE_URL}${locale.base}/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return items.length
      ? [{ url: `${BASE_URL}${locale.base}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 }, ...items]
      : [];
  });

  return [...STATIC_PAGES, ...posts, ...foreign];
}
