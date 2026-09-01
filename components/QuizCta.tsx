import { ArticleCta } from "./ArticleCta";

// CTA lead magnet — copy fissa, da usare in fondo a ogni articolo.
// Sostituisce ClubCta dal 2026-08-25: il quiz cattura l'email e alla fine
// propone comunque Club e coaching, personalizzati per profilo (PROFILE_CTA
// in app/quiz-fisico/page.tsx). Non perdiamo la conversione al Club, ci
// mettiamo davanti uno scalino che il lettore freddo è disposto a salire.
// Per aggiornare il messaggio ovunque, modifica solo questo file.
export function QuizCta() {
  return (
    <ArticleCta
      kicker="Quiz Gratuito · 2 Minuti"
      title="Qual È la Cosa che Ti Sta Bloccando?"
      description="Sette domande, due minuti. Alla fine sai qual è il tuo profilo, cosa ti sta fermando davvero e da dove conviene ripartire — con il percorso giusto per il tuo punto di partenza. Gratis."
      href="/quiz-fisico"
      cta="Fai il Quiz"
    />
  );
}
