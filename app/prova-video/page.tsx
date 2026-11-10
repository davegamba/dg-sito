import { notFound } from "next/navigation";
import { VideoYoutube } from "@/components/VideoYoutube";

// Pagina di prova del componente VideoYoutube. Esiste solo in locale
// (npm run dev): sul sito pubblicato risponde 404.
export const metadata = {
  title: "Prova video",
  robots: { index: false, follow: false },
};

export default function ProvaVideoPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-white">
      <h1 className="mb-6 text-3xl font-bold">Prova video a guscio</h1>
      <VideoYoutube id="hGA0z6hRihk" titolo="Video di prova orizzontale" />
      <VideoYoutube id="Dv8NRpmSXE0" titolo="Secondo video di prova" ctaSopra="Ti è piaciuto?" ctaTesto="Fai il quiz gratuito" ctaLink="/quiz" />
    </main>
  );
}
