import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

// Unica fonte del robots.txt servito.
//
// Prima c'erano tre generatori per lo stesso file: questo, `public/robots.txt`
// e next-sitemap nel postbuild. In App Router vince il route handler, quindi
// gli allow per i crawler AI scritti in public/robots.txt non venivano MAI
// serviti (verificato in produzione). Qui sotto sono stati riportati.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/club/", "/admin", "/checkout/"],
      },
      // Crawler AI: allow esplicito per AI Overviews, ChatGPT, Perplexity, Claude
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
