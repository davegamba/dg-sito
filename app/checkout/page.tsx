import { redirect } from "next/navigation";

// Il vecchio /checkout è ora gestito dal sistema dinamico /checkout/[prodotto].
// Puntava a /checkout/sfida-estiva, offerta chiusa: manda al Club, che è il
// prodotto attivo.
export default function CheckoutRedirect() {
  redirect("/checkout/club-mensile");
}
