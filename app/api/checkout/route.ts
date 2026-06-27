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

    const cleanEmail =
      typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;

    // ── ABBONAMENTO ────────────────────────────────────────────────────────────
    if (offerta.recurring) {
      if (!cleanEmail) {
        return NextResponse.json({ error: "Email obbligatoria per l'abbonamento." }, { status: 400 });
      }
      const priceId = offerta.recurring.priceId;

      // Trova o crea il Customer per questa email
      const existing = await stripe.customers.list({ email: cleanEmail, limit: 1 });
      const customer =
        existing.data.length > 0
          ? existing.data[0]
          : await stripe.customers.create({
              email: cleanEmail,
              metadata: { source: "dg-athletic-club" },
            });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
        metadata: { product_id: offerta.productId, offerta: slug },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoice = subscription.latest_invoice as any;
      const clientSecret: string | null = invoice?.payment_intent?.client_secret ?? null;

      if (!clientSecret) {
        return NextResponse.json({ error: "Impossibile ottenere il client secret dell'abbonamento." }, { status: 500 });
      }

      return NextResponse.json({
        clientSecret,
        subscriptionId: subscription.id,
        mode: "subscription",
      });
    }

    // ── ONE-TIME (flusso esistente) ────────────────────────────────────────────
    const useBump = Boolean(bump) && Boolean(offerta.bump);
    const amount = useBump ? offerta.bump!.amountBundle : offerta.amount;
    const product_id = useBump ? offerta.bump!.productIdBundle : offerta.productId;

    const metadata: Record<string, string> = { product_id, offerta: slug };
    if (cleanEmail) metadata.email = cleanEmail;

    // Aggiorna un intent già esistente — usato al submit per agganciare l'email
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
