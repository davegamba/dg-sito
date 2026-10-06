"use client";

import { useEffect } from "react";

// Il layout radice scrive <html lang="it"> per tutto il sito. Per una pagina in
// un'altra lingua qui lo cambiamo nel browser, e lo rimettiamo com'era quando
// si lascia la pagina.
//
// È la "strada leggera" scelta per il test spagnolo (06/10/2026): l'HTML del
// server resta lang="it", il documento diventa lang="es" appena caricato.
// Google riconosce la lingua dal testo visibile, non da questo attributo; lo
// usano screen reader e traduttore del browser, che leggono il DOM vivo.
// La soluzione pulita (due layout radice) si fa solo se il test funziona.
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = lang;
    return () => {
      el.lang = prev;
    };
  }, [lang]);
  return null;
}
