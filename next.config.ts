import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Articoli spagnoli veri (content/es/*.mdx). Vanno esclusi dal redirect dei
// vecchi URL Podia /es/... qui sotto: i redirect girano PRIMA delle pagine, e
// senza questa esclusione /es/<slug> finirebbe sulla home.
const ES_SLUGS = (() => {
  const dir = path.join(process.cwd(), "content/es");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
})();
const ES_REDIRECT_SOURCE = ES_SLUGS.length
  ? `/es/:path((?!(?:${ES_SLUGS.join("|")})$).*)`
  : "/es/:path*";

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
      // Pagine in spagnolo: il layout radice scrive <html lang="it"> lato
      // server (strada leggera del test, vedi components/HtmlLang.tsx).
      // Questa intestazione dichiara la lingua giusta già nella risposta HTTP,
      // per i motori che la leggono (Bing); Google guarda il testo visibile.
      {
        source: "/es/:path*",
        headers: [{ key: "Content-Language", value: "es" }],
      },
    ];
  },
  async redirects() {
    return [
      // Sfida Estiva chiusa il 04/08/2026 — la landing non esiste più.
      // 302 e non 301: se un domani riapri l'offerta stagionale non vuoi che
      // Google si sia già mangiato l'URL come permanente.
      { source: "/sfida-estiva", destination: "/", permanent: false },
      { source: "/sfida-estiva/:path*", destination: "/", permanent: false },
      { source: "/checkout/sfida-estiva", destination: "/", permanent: false },
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
      // protocollo-integratori → quali-integratori-prendere: rinominato il 2026-08-19
      // per intercettare la query reale ("quali integratori prendere"), che il vecchio
      // titolo brandizzato non copriva.
      { source: "/blog/protocollo-integratori", destination: "/blog/quali-integratori-prendere", permanent: true },
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
      // Redirect da vecchi URL flat Podia (senza prefisso /blog) → struttura attuale
      { source: "/stare-seduti-fa-male", destination: "/blog/stare-seduti-fa-male", permanent: true },
      // Backlink reale da grey-panthers.it (maggio 2025) verso l'indirizzo dei tempi di WordPress: era un 404
      { source: "/esercizi-spalle-allenamento", destination: "/blog/esercizi-spalle", permanent: true },
      // Altri backlink reali verso indirizzi del vecchio sito, trovati nell'export Link di Search Console (07/10/2026)
      { source: "/allenamento-aerobico-dimagrire", destination: "/blog/cardio-o-pesi-per-dimagrire", permanent: true }, // dcomedieta.com
      { source: "/ripetute-scatti-benefici", destination: "/blog/allenarsi-20-minuti", permanent: true }, // progettofelice.wordpress.com
      { source: "/tag/lattosio", destination: "/blog/latte-fa-male", permanent: true }, // thetalentbay.com
      { source: "/glutine", destination: "/blog", permanent: true }, // thetalentbay.com — nessun articolo equivalente
      { source: "/malattie-autoimmuni", destination: "/blog", permanent: true }, // thetalentbay.com — nessun articolo equivalente
      { source: "/solo-membri", destination: "https://club.davegamba.com/entra-nel-club", permanent: true }, // dcomedieta.com, area membri del vecchio sito
      { source: "/latte-fa-male", destination: "/blog/latte-fa-male", permanent: true },
      { source: "/allenamento-a-casa", destination: "/blog/allenamento-a-casa", permanent: true },
      { source: "/cardio-per-dimagrire", destination: "/blog/cardio-o-pesi-per-dimagrire", permanent: true },
      // Altri slug Podia con varianti diverse, trovati nel drilldown Search Console del 2026-07-04
      { source: "/blog/osteoporosi-osteopenia-cose-cure-rimedi", destination: "/blog/osteoporosi-sintomi", permanent: true },
      { source: "/blog/creatina-cosa-e-benefici-effetti-collaterali", destination: "/blog/creatina-a-cosa-serve", permanent: true },
      { source: "/blog/dimagrimento-deficit-calorico", destination: "/blog/deficit-calorico", permanent: true },
      { source: "/blog/digiuno-contro-deficit-calorico", destination: "/blog/deficit-calorico", permanent: true },
      // Pagine Podia sostituite da equivalenti nel nuovo sito
      { source: "/coaching-personal-trainer-online", destination: "/coaching", permanent: true },
      { source: "/cookie-policy", destination: "/privacy", permanent: true },
      { source: "/Instagram", destination: "https://www.instagram.com/davegamba_fit/", permanent: true },
      // === RECUPERO URL PODIA MORTI (2026-08-25) ===
      // Diagnosi via Search Console API: 41 vecchi URL Podia rispondevano 404
      // pur ricevendo ancora 3.429 impressioni nel periodo 1 apr - 22 ago.
      // Ogni 404 disperde i link esterni accumulati negli anni e peggiora i
      // segnali di qualità del dominio. Destinazione = articolo attuale più
      // vicino per intento di ricerca; dove non esiste un equivalente si manda
      // all'indice del blog (redirect di categoria, non soft-404 sulla home).
      { source: "/blog/latte-sonno", destination: "/blog/come-dormire-meglio", permanent: true },
      { source: "/blog/pistole-massaggianti-recupero-muscolare", destination: "/blog/stretching-benefici", permanent: true },
      { source: "/blog/miochine-tumore-allenamento", destination: "/blog/quante-volte-allenarsi-a-settimana", permanent: true },
      { source: "/blog/dimagrimento-hit-pesi", destination: "/blog/cardio-o-pesi-per-dimagrire", permanent: true },
      { source: "/blog/benefici-sole-mattino", destination: "/blog/crema-solare-fa-male", permanent: true },
      { source: "/blog/fegato-grasso-arancia", destination: "/blog/dieta-detox", permanent: true },
      { source: "/blog/magnesio-post-allenamento", destination: "/blog/quali-integratori-prendere", permanent: true },
      { source: "/blog/creatina-alzheimer", destination: "/blog/creatina-a-cosa-serve", permanent: true },
      { source: "/blog/bruciare-calorie-camminando", destination: "/blog/quanti-passi-al-giorno", permanent: true },
      { source: "/blog/variare-esercizi-allenamento-massa", destination: "/blog/quante-volte-allenarsi-a-settimana", permanent: true },
      { source: "/blog/creatina-donne", destination: "/blog/creatina-a-cosa-serve", permanent: true },
      { source: "/blog/benefici-nicotinammide-nad-nr-nmn", destination: "/blog/quali-integratori-prendere", permanent: true },
      { source: "/blog/camminata-dimagrire-perdere-grasso", destination: "/blog/quanti-passi-al-giorno", permanent: true },
      { source: "/blog/maggiore-di-zero", destination: "/blog/stato-di-flow", permanent: true },
      { source: "/blog/allenamento-breveintenso-un-minuto", destination: "/blog/allenarsi-20-minuti", permanent: true },
      { source: "/blog/power-nap-riposo-pomeridiano", destination: "/blog/come-dormire-meglio", permanent: true },
      { source: "/blog/sistema-immunitario-emozioni", destination: "/blog/cortisolo-alto", permanent: true },
      { source: "/blog/allenamento-corpo-giovane", destination: "/blog/sarcopenia-perdita-massa-muscolare", permanent: true },
      { source: "/blog/2-min-camminata", destination: "/blog/quanti-passi-al-giorno", permanent: true },
      { source: "/blog/ansia-staticita", destination: "/blog/stare-seduti-fa-male", permanent: true },
      { source: "/blog/dimagrimento-sonno", destination: "/blog/come-dormire-meglio", permanent: true },
      { source: "/blog/rallentare-invecchiamento-dna", destination: "/blog/quante-volte-allenarsi-a-settimana", permanent: true },
      { source: "/blog/dimagrimento-proteine", destination: "/blog/deficit-calorico", permanent: true },
      { source: "/blog/allenamento-forza-per-corsa", destination: "/blog/quante-volte-allenarsi-a-settimana", permanent: true },
      { source: "/blog/magnetismo-miglioramento", destination: "/blog/stato-di-flow", permanent: true },
      { source: "/blog/flessibilita-longevita", destination: "/blog/stretching-benefici", permanent: true },
      { source: "/blog/la-mente-tiene-il-punteggio", destination: "/blog/stato-di-flow", permanent: true },
      { source: "/blog/dormire-meglio-insonnia-allenamento", destination: "/blog/come-dormire-meglio", permanent: true },
      { source: "/blog/gonfiore-stanchezza-estate-caldo-soluzioni", destination: "/blog/gonfiore-addominale-estate", permanent: true },
      { source: "/blog/mindfulness-dimagrimento", destination: "/blog/stato-di-flow", permanent: true },
      { source: "/blog/segreto-longevita-forza", destination: "/blog/sarcopenia-perdita-massa-muscolare", permanent: true },
      { source: "/blog/stile-di-dieta-dimagrimento", destination: "/blog/deficit-calorico", permanent: true },
      // Senza equivalente nel nuovo blog → indice blog
      { source: "/blog/dolore-articolazioni-cannabis", destination: "/blog/dolori-articolari", permanent: true },
      { source: "/blog/attacchi-fame-ciclo-preciclo", destination: "/blog", permanent: true },
      { source: "/blog/danni-benefici-cipolla", destination: "/blog", permanent: true },
      { source: "/blog/esercizi-kegel-benefici", destination: "/blog", permanent: true },
      { source: "/blog/allenamento-in-gravidanza", destination: "/blog", permanent: true },
      { source: "/blog/cibo-intelligenza-mirtilli", destination: "/blog", permanent: true },
      { source: "/blog/maldischiena-gambe", destination: "/blog/mal-di-schiena", permanent: true },
      { source: "/blog/olio-oliva-salute-longevita", destination: "/blog", permanent: true },
      { source: "/blog/calze-maniche-compressione-recupero", destination: "/blog", permanent: true },
      // Endpoint di sistema Podia ancora indicizzati
      { source: "/posts/:id*", destination: "/blog", permanent: true },
      { source: "/registration/new", destination: "/", permanent: true },
      // Locale EN/ES di Podia, mai esistite nel nuovo sito → homepage.
      // Eccezione: gli articoli spagnoli di content/es (test dal 06/10/2026).
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
      { source: "/es", destination: "/", permanent: true },
      { source: ES_REDIRECT_SOURCE, destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // Immagini Podia (legacy durante migrazione)
      { protocol: "https", hostname: "**.podia.com" },
      { protocol: "https", hostname: "**.podiausercontent.com" },
      // Cloudflare R2 — solo il NOSTRO bucket. Con "**.r2.dev" l'ottimizzatore
      // immagini di Next accettava qualsiasi bucket R2 pubblico del mondo,
      // diventando un proxy aperto a nostre spese di banda.
      { protocol: "https", hostname: "pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev" },
    ],
  },
};

export default nextConfig;
