import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/club/"],
    },
    sitemap: "https://davegamba.com/sitemap.xml",
  };
}
