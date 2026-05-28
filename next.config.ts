import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esclude i pacchetti Sanity Studio dal bundle server-side
  // (lo Studio è client-only, caricato dinamicamente con ssr:false)
  serverExternalPackages: [
    "sanity",
    "@sanity/client",
    "@sanity/vision",
    "sanity-plugin-seo-pane",
    "yoastseo",
  ],
  images: {
    remotePatterns: [
      {
        // Immagini caricate su Sanity CDN
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
