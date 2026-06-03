import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect da vecchi URL Podia → nuovi slug ottimizzati
      {
        source: "/blog/le-proteine-fanno-male-quante-come-quali",
        destination: "/blog/proteine-fanno-male-ai-reni",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // Immagini Podia (legacy durante migrazione)
      { protocol: "https", hostname: "**.podia.com" },
      { protocol: "https", hostname: "**.podiausercontent.com" },
      // Cloudflare R2
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "pub-**.r2.dev" },
    ],
  },
};

export default nextConfig;
