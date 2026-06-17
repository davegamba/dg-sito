import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_SFIDA = "price_1TbEFWIyNONJea71jucLKRSE";
const PRICE_BUNDLE = "price_1TjOmSIyNONJea71Fi7KSrBl";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
  const { bump } = await req.json();

  const priceId = bump ? PRICE_BUNDLE : PRICE_SFIDA;
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://davegamba.com";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/sfida-estiva/grazie?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    locale: "it",
  });

  return NextResponse.json({ url: session.url });
}
