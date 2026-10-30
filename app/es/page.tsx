import { LangIndexPage, langIndexMetadata } from "@/components/lang/LangIndexPage";

// Indice degli articoli in lingua straniera: tutto sta in components/lang/LangIndexPage.tsx.
export const metadata = langIndexMetadata("es");

export default function Page() {
  return <LangIndexPage lang="es" />;
}
