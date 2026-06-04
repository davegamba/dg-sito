export function determineProfile(answers: Record<string, string | string[]>): string {
  const livello = answers["livello"] as string;
  const blocchi = (answers["blocchi"] as string[]) || [];
  if (livello === "avanzato") return "salto";
  if (blocchi.includes("tempo")) return "tempo";
  if (livello === "principiante") return "zero";
  return "stallo";
}
