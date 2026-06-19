import { redirect } from "next/navigation";

// Il vecchio /checkout è ora gestito dal sistema dinamico /checkout/[prodotto].
// Reindirizza alla Sfida Estiva per non rompere eventuali link esistenti.
export default function CheckoutRedirect() {
  redirect("/checkout/sfida-estiva");
}
