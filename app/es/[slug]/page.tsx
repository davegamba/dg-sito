import type { Metadata } from "next";
import { LangPostPage, langPostMetadata, langStaticParams } from "@/components/lang/LangPostPage";

// Articoli in lingua straniera: tutto sta in components/lang/LangPostPage.tsx.

// Un /es/<slug> che non esiste è un 404, non una pagina generata al volo.
export const dynamicParams = false;

export async function generateStaticParams() {
  return langStaticParams("es");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return langPostMetadata("es", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <LangPostPage lang="es" slug={(await params).slug} />;
}
