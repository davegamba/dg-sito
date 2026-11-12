import type { Metadata } from "next";
import LezioneView from "./LezioneView";
import { LEZIONI } from "@/lib/lezioni";

export const metadata: Metadata = {
  title: "Protocollo Dimagrimento con Dave Gamba",
  description: "Il metodo Breve-Intenso-Mirato con Dave Gamba, in 7 step gratuiti.",
  // Il canonical va scritto: senza, la pagina eredita quello della home (/) e Google la scarta come duplicato.
  alternates: { canonical: "/protocollo" },
  robots: { index: true, follow: true },
};

export default function CorsoStartPage() {
  return <LezioneView lezione={LEZIONI[0]} />;
}
