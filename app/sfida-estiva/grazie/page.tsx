import { redirect } from "next/navigation";

// La pagina di ringraziamento è ora generica: /grazie?p=<prodotto>.
// Questo vecchio indirizzo reindirizza lì, conservando i parametri di Stripe
// (redirect_status, payment_intent, bump) per non rompere i pagamenti in corso.
export default async function SfidaGrazieRedirect(
  { searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }
) {
  const sp = await searchParams;
  const qs = new URLSearchParams({ p: "sfida-estiva" });
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") qs.set(key, value);
  }
  redirect(`/grazie?${qs.toString()}`);
}
