import type { Metadata } from "next";
import LezioneView from "./LezioneView";
import { LEZIONI } from "@/lib/lezioni";

// noindex finche' i video sono segnaposto: si toglie quando ci sono le prime lezioni.
export const metadata: Metadata = {
  title: "Riparti in 7 lezioni | Dave Gamba",
  description: "Il metodo Breve-Intenso-Mirato con Dave Gamba, in 7 lezioni gratuite.",
  robots: { index: false, follow: false },
};

export default function CorsoStartPage() {
  return <LezioneView lezione={LEZIONI[0]} />;
}
