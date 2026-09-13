export function determineProfile(answers: Record<string, string | string[]>): string {
  const livello = answers["livello"] as string;
  const tempo = answers["tempo"] as string;
  const blocchi = (answers["blocchi"] as string[]) || [];
  // Poco tempo ha priorità: è il profilo Breve-Intenso-Mirato e vale anche per gli avanzati.
  //
  // ATTENZIONE al valore: la fascia più corta ha etichetta "20–30 minuti" ma
  // valore "30" (le opzioni valgono "30" | "45" | "60", vedi STEPS in
  // app/quiz-fisico/page.tsx). Qui c'era scritto "20", preso dall'etichetta:
  // un confronto che non era mai vero, quindi chi sceglieva la fascia più corta
  // non arrivava mai a questo profilo. Se cambi le opzioni, aggiorna anche qui.
  if (blocchi.includes("tempo") || tempo === "30") return "tempo";
  if (livello === "avanzato") return "salto";
  if (livello === "principiante") return "zero";
  return "stallo";
}
