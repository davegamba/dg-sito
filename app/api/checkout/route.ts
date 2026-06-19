import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getOfferta } from "@/lib/offerte";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY mancante nelle variabili d'ambiente");
    return NextResponse.json(
      { error: "Pagamenti non configurati. Manca STRIPE_SECRET_KEY su Vercel." },
      { status: 500 }
    );
  }

  try {
    const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });
    const { prodotto, bump, email, paymentIntentId } = await req.json();

    // Retrocompatibilità: se non arriva "prodotto", usa la Sfida Estiva
    const slug = typeof prodotto === "string" && prodotto ? prodotto : "sfida-estiva";
    const offerta = getOfferta(slug);
    if (!offerta) {
      return NextResponse.json({ error: `Offerta sconosciuta: ${slug}` }, { status: 400 });
    }

    const useBump = Boolean(bump) && Boolean(offerta.bump);
    const amount = useBump ? offerta.bump!.amountBundle : offerta.amount;
    const product_id = useBump ? offerta.bump!.productIdBundle : offerta.productId;

    const cleanEmail =
      typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;

    const metadata: Record<string, string> = { product_id, offerta: slug };
    if (cleanEmail) metadata.email = cleanEmail;

    // Aggiorna un intent già esistente — usato al submit per agganciare l'email
    // prima della conferma del pagamento (così webhook e ricevuta hanno l'email).
    if (paymentIntentId) {
      const pi = await stripe.paymentIntents.update(paymentIntentId, {
        amount,
        metadata,
        ...(cleanEmail ? { receipt_email: cleanEmail } : {}),
      });
      return NextResponse.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata,
      ...(cleanEmail ? { receipt_email: cleanEmail } : {}),
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    console.error("Errore creazione PaymentIntent:", message);
    return NextResponse.json({ error: `Stripe: ${message}` }, { status: 500 });
  }
}
