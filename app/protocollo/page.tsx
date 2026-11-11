import type { Metadata } from "next";
import LezioneView from "./LezioneView";
import { LEZIONI } from "@/lib/lezioni";

// noindex finche' i video sono segnaposto: si toglie quando ci sono le prime lezioni.
export const metadata: Metadata = {
  title: "Protocollo Dimagrimento con Dave Gamba",
  description: "Il metodo Breve-Intenso-Mirato con Dave Gamba, in 7 step gratuiti.",
  robots: { index: false, follow: false },
};

export default function CorsoStartPage() {
  return <LezioneView lezione={LEZIONI[0]} />;
}
