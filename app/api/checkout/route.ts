import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_SFIDA = "price_1TbEFWIyNONJea71jucLKRSE";
const PRICE_BUNDLE = "price_1TjOmSIyNONJea71Fi7KSrBl";

const AMOUNT_SFIDA = 3300;   // €33 in centesimi
const AMOUNT_BUNDLE = 4200;  // €42 in centesimi

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
  const { bump } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: bump ? AMOUNT_BUNDLE : AMOUNT_SFIDA,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
    metadata: {
      product: bump ? "sfida+addominali" : "sfida",
      price_id: bump ? PRICE_BUNDLE : PRICE_SFIDA,
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
