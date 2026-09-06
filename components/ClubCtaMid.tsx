import { ArticleCta } from "./ArticleCta";

// CTA verso il Club per la POSIZIONE CENTRALE delle guide di allenamento.
//
// Perché esiste, dopo che il 2026-08-27 tutti i banner Club erano stati
// sostituiti dal quiz: nelle guide esercizi il quiz è il banner sbagliato.
// Chi ha appena letto 4.000 parole su come allenare le gambe NON è freddo
// sull'allenamento — ha già deciso. Quello che gli manca è l'ordine, e
// l'ordine è esattamente il prodotto. Il quiz resta in fondo per chi non
// morde qui.
//
// Non è `compact` di proposito: "fai il quiz" si spiega da solo, "entra nel
// Club" no — senza la frase che dice cosa ci trova, il banner è una pitch nuda.
//
// `focus` va passato SOLO per le aree che hanno davvero un percorso Focus nel
// Club (addominali, braccia, glutei, schiena, spalle — 6 livelli ciascuno,
// verificati in dgclub/). Per tutto il resto si omette e parte la copy generica.
// Per aggiornare il messaggio su tutte le guide, modifica solo questo file.

interface ClubCtaMidProps {
  focus?: "Addominali" | "Braccia" | "Glutei" | "Schiena" | "Spalle";
}

export function ClubCtaMid({ focus }: ClubCtaMidProps) {
  const description = focus
    ? `Sapere quali esercizi fare è metà del lavoro. L'altra metà è in che ordine, quante volte, con che progressione. Nel Club c'è il percorso Focus ${focus}: sei livelli, uno dopo l'altro, senza doverti inventare niente.`
    : "Sapere quali esercizi fare è metà del lavoro. L'altra metà è in che ordine, quante volte, con che progressione. Nel Club le schede sono già montate, settimana per settimana: tu devi solo presentarti.";

  return (
    <ArticleCta
      kicker="DG Athletic Club"
      title="Gli Esercizi Li Hai. Manca la Sequenza."
      description={description}
      href="https://club.davegamba.com/entra-nel-club"
      cta="Scopri il Club"
    />
  );
}
