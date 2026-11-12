import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LezioneView from "../LezioneView";
import { LEZIONI, lezioneDaSlug } from "@/lib/lezioni";

export const dynamicParams = false;

export async function generateStaticParams() {
  return LEZIONI.filter((l) => l.numero > 0).map((l) => ({ lezione: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lezione: string }> }): Promise<Metadata> {
  const { lezione: slug } = await params;
  const lezione = lezioneDaSlug(slug);
  if (!lezione) return {};
  return {
    title: `${lezione.titolo} | Protocollo Dimagrimento`,
    description: lezione.descrizione,
    alternates: { canonical: `/protocollo/${lezione.slug}` },
    // Una lezione senza video e' una pagina quasi vuota: resta noindex finche' non c'e' l'ID YouTube.
    robots: lezione.youtubeId ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function LezionePage({ params }: { params: Promise<{ lezione: string }> }) {
  const { lezione: slug } = await params;
  const lezione = lezioneDaSlug(slug);
  if (!lezione || lezione.numero === 0) notFound();
  return <LezioneView lezione={lezione} />;
}
