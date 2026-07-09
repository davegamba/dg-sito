import { ArticleCta } from "./ArticleCta";

// CTA standard del DG Athletic Club — copy fissa, da usare in fondo a ogni articolo.
// Per aggiornare il messaggio del Club ovunque, modifica solo questo file.
export function ClubCta() {
  return (
    <ArticleCta
      kicker="DG Athletic Club"
      title="Lo Strumento Definitivo per la Tua Trasformazione Fisica"
      description="Nel DG Athletic Club hai un percorso progressivo, i Corsi Focus divisi per obiettivi, i pasti personali di Dave già calcolati, una community con cui condividere e tanto altro. Inizia ad allenarti Breve-Intenso-Mirato insieme a Dave. Con 14 giorni di garanzia."
      href="https://club.davegamba.com/entra-nel-club"
      cta="Scopri il Club"
    />
  );
}
