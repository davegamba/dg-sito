import { groq } from "next-sanity";

// Lista articoli (anteprima)
export const postsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    readTime,
    coverImage {
      asset->,
      alt
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// Singolo articolo per slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    readTime,
    coverImage {
      asset->,
      alt
    },
    body,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset-> }
    }
  }
`;

// Tutti gli slug (per generateStaticParams)
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;
