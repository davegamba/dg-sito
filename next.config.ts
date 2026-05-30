import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
