import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // /quiz → /quiz-fisico
      {
        source: "/quiz",
        destination: "/quiz-fisico",
        permanent: true,
      },
      // links.html → /links (URL pulito)
      {
        source: "/links.html",
        destination: "/links",
        permanent: true,
      },
      // Redirect da vecchi URL Podia → nuovi slug ottimizzati
      {
        source: "/blog/le-proteine-fanno-male-quante-come-quali",
        destination: "/blog/proteine-fanno-male-ai-reni",
        permanent: true,
      },
      // Redirect da slug rinominati nel tempo (trovati in Search Console come 404)
      { source: "/blog/cortisolo-alto-grasso-addominale", destination: "/blog/cortisolo-alto", permanent: true },
      { source: "/blog/cortisolo-e-grasso-addominale", destination: "/blog/cortisolo-alto", permanent: true },
      { source: "/blog/creatina-guida-scientifica", destination: "/blog/creatina-a-cosa-serve", permanent: true },
      { source: "/blog/creatina-benefici-dosi", destination: "/blog/creatina-a-cosa-serve", permanent: true },
      { source: "/blog/osteoporosi-e-osteopenia", destination: "/blog/osteoporosi-sintomi", permanent: true },
      { source: "/blog/osteoporosi-sintomi-cure", destination: "/blog/osteoporosi-sintomi", permanent: true },
      { source: "/blog/come-dimagrire-estate-protocollo", destination: "/blog/come-dimagrire-velocemente", permanent: true },
      { source: "/blog/come-dimagrire", destination: "/blog/come-dimagrire-velocemente", permanent: true },
      { source: "/blog/perdere-peso-velocemente", destination: "/blog/come-dimagrire-velocemente", permanent: true },
      { source: "/blog/allenarsi-stomaco-vuoto", destination: "/blog/allenarsi-a-digiuno", permanent: true },
      { source: "/blog/cardio-o-pesi", destination: "/blog/cardio-o-pesi-per-dimagrire", permanent: true },
      { source: "/blog/testosterone-naturale-dopo-i-40", destination: "/blog/come-aumentare-testosterone", permanent: true },
      { source: "/blog/sonno-benefici-ormoni", destination: "/blog/come-dormire-meglio", permanent: true },
      { source: "/blog/alimentazione-post-allenamento", destination: "/blog/cosa-mangiare-dopo-allenamento", permanent: true },
      { source: "/blog/esercizi-respirazione-benefici", destination: "/blog/esercizi-respirazione", permanent: true },
      { source: "/blog/quante-uova-a-settimana", destination: "/blog/quante-uova-al-giorno", permanent: true },
      { source: "/blog/benefici-camminata-quanti-passi", destination: "/blog/quanti-passi-al-giorno", permanent: true },
      { source: "/blog/stretching-benefici-mobilita", destination: "/blog/stretching-benefici", permanent: true },
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
