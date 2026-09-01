import { ArticleCta } from "./ArticleCta";

// CTA lead magnet per la POSIZIONE CENTRALE dell'articolo — copy fissa, variante compatta.
// Stessa destinazione di QuizCta (in fondo) ma angolo e testo diversi, per non
// ripetere due volte lo stesso banner identico nello stesso articolo.
// Creata il 2026-08-27 sostituendo gli ArticleCta che puntavano al Club.
// Per aggiornare il messaggio ovunque, modifica solo questo file.
export function QuizCtaMid() {
  return (
    <ArticleCta
      kicker="Quiz Gratuito · 2 Minuti"
      title="Da Dove Dovresti Ripartire Tu?"
      description="Sette domande e scopri il tuo profilo: cosa ti sta bloccando davvero e il percorso adatto al tuo punto di partenza."
      href="/quiz-fisico"
      cta="Fai il Quiz"
      compact
    />
  );
}
