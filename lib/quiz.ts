export function determineProfile(answers: Record<string, string | string[]>): string {
  const livello = answers["livello"] as string;
  const tempo = answers["tempo"] as string;
  const blocchi = (answers["blocchi"] as string[]) || [];
  // Poco tempo ha priorità: è il profilo BIM (21 min) e vale anche per gli avanzati
  if (blocchi.includes("tempo") || tempo === "20") return "tempo";
  if (livello === "avanzato") return "salto";
  if (livello === "principiante") return "zero";
  return "stallo";
}
