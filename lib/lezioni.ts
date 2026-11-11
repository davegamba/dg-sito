// Le lezioni del corso gratuito "Riparti in 7 lezioni" (pagine /piano-start).
// I nomeBreve sono provvisori: Dave ne dara' i nomi definitivi.
// Per cambiare un titolo o una descrizione: modifica qui, in un solo punto.
// Per mettere un video: incolla l'ID YouTube in `youtubeId` (la parte dopo
// "watch?v="). Finche' e' null la pagina mostra "Video in arrivo".
// La lezione 0 sta su /piano-start, le altre su /piano-start/<slug>.

export interface Lezione {
  numero: number;
  slug: string;
  titolo: string;
  nomeBreve: string; // nel sopratitolo della testata: "#<numero> <nomeBreve>"
  descrizione: string;
  youtubeId: string | null;
}

export const BASE_CORSO = "/piano-start";
export const DESTINAZIONE_FINALE = "https://club.davegamba.com/7-giorni";

export const LEZIONI: Lezione[] = [
  {
    numero: 0,
    slug: "inizia-qui",
    nomeBreve: "Iniziamo",
    titolo: "Inizia qui",
    descrizione: "Come funziona il corso e cosa ti aspetta nelle prossime lezioni.",
    youtubeId: null,
  },
  {
    numero: 1,
    slug: "perche-hai-mollato",
    nomeBreve: "Perché hai mollato",
    titolo: "Perché hai mollato le altre volte (e non era colpa tua)",
    descrizione: "Il motivo per cui i percorsi precedenti si sono fermati e cosa cambiare questa volta.",
    youtubeId: null,
  },
  {
    numero: 2,
    slug: "dimagrire-senza-contare-tutto",
    nomeBreve: "Le 3 regole",
    titolo: "Dimagrire senza contare tutto: le 3 regole che uso io",
    descrizione: "Tre regole semplici per dimagrire senza pesare ogni cosa che mangi.",
    youtubeId: null,
  },
  {
    numero: 3,
    slug: "proteine-a-ogni-pasto",
    nomeBreve: "Le proteine",
    titolo: "Le proteine a ogni pasto: quanto e come",
    descrizione: "Quante proteine servono davvero e come metterle in ogni pasto.",
    youtubeId: null,
  },
  {
    numero: 4,
    slug: "i-passi",
    nomeBreve: "I passi",
    titolo: "I passi: la cosa più sottovalutata",
    descrizione: "Perché camminare di più conta più di quanto pensi, e come farlo entrare nella giornata.",
    youtubeId: null,
  },
  {
    numero: 5,
    slug: "come-ti-alleni",
    nomeBreve: "Come ti alleni",
    titolo: "Conta come ti alleni, non quanto",
    descrizione: "Cosa rende efficace un allenamento breve e mirato.",
    youtubeId: null,
  },
  {
    numero: 6,
    slug: "weekend-cene-alcol",
    nomeBreve: "Weekend e cene",
    titolo: "Weekend, cene fuori, alcol: come non rovinare la settimana",
    descrizione: "Come gestire le occasioni sociali senza perdere il filo del percorso.",
    youtubeId: null,
  },
  {
    numero: 7,
    slug: "dopo-i-6-mesi",
    nomeBreve: "Dopo i 6 mesi",
    titolo: "Cosa succede dopo: la progressione dei 6 mesi",
    descrizione: "Come si sviluppa il percorso mese dopo mese e come restare costanti.",
    youtubeId: null,
  },
];

export function lezioneDaSlug(slug: string): Lezione | undefined {
  return LEZIONI.find((l) => l.slug === slug);
}

export function hrefLezione(l: Lezione): string {
  return l.numero === 0 ? BASE_CORSO : `${BASE_CORSO}/${l.slug}`;
}

export function lezioneSuccessiva(l: Lezione): Lezione | undefined {
  return LEZIONI[l.numero + 1];
}
