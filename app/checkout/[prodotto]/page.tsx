import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOfferta } from "@/lib/offerte";
import CheckoutClient from "./CheckoutClient";
import CheckoutClientSub from "./CheckoutClientSub";

export async function generateMetadata(
  { params }: { params: Promise<{ prodotto: string }> }
): Promise<Metadata> {
  const { prodotto } = await params;
  const offerta = getOfferta(prodotto);
  return {
    title: offerta ? `Checkout — ${offerta.nome}` : "Checkout",
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutProdottoPage(
  { params }: { params: Promise<{ prodotto: string }> }
) {
  const { prodotto } = await params;
  const offerta = getOfferta(prodotto);
  if (!offerta) notFound();

  if (offerta.recurring) {
    return <CheckoutClientSub offerta={offerta} />;
  }
  return <CheckoutClient offerta={offerta} />;
}
