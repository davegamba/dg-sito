import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const CLUB_URL = "https://club.davegamba.com";
const PRODUCT_NAMES: Record<string, string> = {
  sfida: "Protocollo Estivo da 8 Settimane",
  addominali: "Protocollo Addominali Scolpiti",
  club: "DG Athletic Club",
};

async function notifyDave(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "DaveGamba.com <onboarding@resend.dev>",
      to: ["davept.info@gmail.com"],
      subject,
      text,
    }),
  });
}

// Email di accesso al cliente.
// NOTA: il mittente deve essere su un dominio VERIFICATO in Resend (es. davegamba.com),
// altrimenti Resend rifiuta l'invio verso email diverse dalla tua.
async function sendAccessEmail(email: string, products: string[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const sbloccati = products
    .map((p) => PRODUCT_NAMES[p])
    .filter(Boolean)
    .map((nome) => `<li style="margin-bottom:6px;color:#0a0a0a;font-weight:600">✅ ${nome}</li>`)
    .join("");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "Dave Gamba <info@davegamba.com>",
      to: [email],
      subject: "✅ Il tuo accesso è pronto",
      html: `<div style="background:#f7f4ef;padding:40px 24px;font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="font-size:22px;color:#0a0a0a;margin-bottom:4px">Grazie per l'acquisto</h2>
        <p style="font-size:14px;color:#666;margin-bottom:20px">Hai sbloccato:</p>
        <ul style="font-size:15px;line-height:1.6;padding-left:20px;margin:0 0 24px">${sbloccati}</ul>
        <div style="background:#fff;border:1px solid #e8e2d8;border-radius:14px;padding:20px;margin-bottom:24px">
          <p style="font-size:14px;color:#0a0a0a;margin:0 0 14px;font-weight:600">Come accedere:</p>
          <ol style="font-size:14px;color:#444;line-height:1.7;padding-left:18px;margin:0 0 18px">
            <li>Vai nella tua area personale</li>
            <li>Inserisci <strong>questa stessa email</strong> (${email})</li>
            <li>Apri il link che ti arriva e sei dentro — nessuna password</li>
          </ol>
          <a href="${CLUB_URL}" style="display:inline-block;background:#00CBDB;color:#000;font-weight:800;font-size:15px;padding:13px 26px;border-radius:12px;text-decoration:none">Entra nel Club →</a>
        </div>
        <p style="font-size:13px;color:#888;margin:0">Sali di livello,<br><strong>Dave</strong></p>
      </div>`,
    }),
  });
}

async function revokeAccess(email: string, product: string) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return fetch(
    `${SUPABASE_URL}/rest/v1/purchases?email=eq.${encodeURIComponent(email.toLowerCase())}&product=eq.${encodeURIComponent(product)}`,
    {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
}

async function recordPurchases(email: string, products: string[]) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const rows = products.map((product) => ({ email: email.toLowerCase(), product }));

  // `on_conflict=email,product` è obbligatorio: senza, PostgREST applica
  // resolution=ignore-duplicates solo alla PRIMARY KEY e il vincolo
  // purchases_email_product_unique esplode con un 23505 (→ 500 → Stripe
  // ritenta per giorni). Con il conflict target esplicito, riacquistare lo
  // stesso prodotto è idempotente.
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/purchases?on_conflict=email,product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "resolution=ignore-duplicates",
      },
      body: JSON.stringify(rows),
    }
  );
  return res;
}

const PRICE_TO_PRODUCT: Record<string, string> = {
  "price_1TbEFWIyNONJea71jucLKRSE": "sfida",
  "price_1TjOmSIyNONJea71Fi7KSrBl": "sfida+addominali",
  "price_1TjOl3IyNONJea717l3NmgVG": "addominali",
  "price_1Tlsa1IyNONJea71nFkbb0rQ": "club",
  "price_1Tlsa1IyNONJea71lCG65MZZ": "club",
};

// product_id metadata → lista prodotti da sbloccare in `purchases`.
// Lista vuota = prodotto non gestito da questo webhook (vedi CLUB sotto).
function productsFrom(productId: string): string[] {
  if (productId === "sfida+addominali") return ["sfida", "addominali"];
  if (productId === "addominali") return ["addominali"];
  if (productId === "club") return [];
  return ["sfida"];
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let email: string | null | undefined;
  let productId = "sfida";

  // Checkout embedded (PaymentIntent) — flusso /checkout attuale
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    email = pi.receipt_email ?? pi.metadata?.email;
    productId = pi.metadata?.product_id ?? "sfida";
  }

  // Stripe Checkout hosted / Payment Link
  else if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    email = session.customer_email ?? session.customer_details?.email;
    productId = session.metadata?.product_id ?? "";

    // Fallback: Payment Link non imposta metadata → recupera line items e mappa dal Price ID
    if (!productId) {
      try {
        const full = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items"],
        });
        const priceId = full.line_items?.data[0]?.price?.id ?? "";
        productId = PRICE_TO_PRODUCT[priceId] ?? "sfida";
      } catch {
        productId = "sfida";
      }
    }
  }

  // Abbonamento — prima fattura e rinnovi
  else if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const sub = invoice.parent?.subscription_details?.subscription;
    if (!sub) return NextResponse.json({ received: true });

    email = invoice.customer_email ?? undefined;
    if (!email) {
      // Recupera email dal customer
      try {
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
          email = customer.email ?? undefined;
        }
      } catch { /* non bloccante */ }
    }

    if (!email) {
      await notifyDave("⚠️ Invoice abbonamento senza email", `Invoice ${invoice.id} pagata ma manca l'email cliente. Controlla Stripe.`);
      return NextResponse.json({ received: true });
    }

    // Leggi il product_id dai metadata dell'abbonamento
    try {
      const subId = typeof sub === "string" ? sub : (sub as Stripe.Subscription).id;
      const fullSub = await stripe.subscriptions.retrieve(subId);
      productId = fullSub.metadata?.product_id ?? "club";
    } catch {
      productId = "club";
    }

    const products = productsFrom(productId);

    // Club → gestito interamente dal webhook dedicato di dgclub (utente auth +
    // mship_members + mail "crea la password"). Qui non va registrato nulla:
    // prima "club" cadeva nel fallback "sfida" e a ogni nuovo abbonato veniva
    // scritto un acquisto Sfida Estiva fasullo + spedita la mail con i link
    // della Sfida al posto di quelli del Club.
    if (products.length === 0) {
      console.log(`Abbonamento "${productId}" gestito da un altro webhook — ignorato qui (${email})`);
      return NextResponse.json({ received: true, skipped: productId });
    }

    await recordPurchases(email, products);
    // Manda l'email solo al primo pagamento (invoice.billing_reason === "subscription_create")
    if (invoice.billing_reason === "subscription_create") {
      try { await sendAccessEmail(email, products); } catch { /* best effort */ }
    }
    return NextResponse.json({ received: true });
  }

  // Abbonamento cancellato → revoca accesso
  else if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    productId = sub.metadata?.product_id ?? "club";
    try {
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
      email = customer.email ?? undefined;
    } catch { /* non bloccante */ }

    // Come sopra: la revoca del Club avviene su mship_members nel webhook di
    // dgclub. Qui `purchases` non contiene righe "club", quindi la DELETE non
    // troverebbe nulla — meglio non fingere di aver revocato qualcosa.
    if (email && productsFrom(productId).length > 0) {
      await revokeAccess(email, productId);
      await notifyDave(
        `ℹ️ Abbonamento cancellato — ${email}`,
        `L'abbonamento "${productId}" di ${email} è stato cancellato. Accesso revocato su Supabase.`
      );
    }
    return NextResponse.json({ received: true });
  }

  // Evento non rilevante
  else {
    return NextResponse.json({ received: true });
  }

  if (!email) {
    await notifyDave(
      "⚠️ Acquisto senza email",
      `Stripe ha confermato un acquisto "${productId}" ma manca l'email. Evento: ${event.type}. Controlla manualmente nel dashboard Stripe.`
    );
    return NextResponse.json({ received: true });
  }

  const products = productsFrom(productId);

  // Il Club ha il suo webhook dedicato (dgclub/netlify/functions/stripe-webhook.js)
  // che crea l'utente auth + la riga mship_members: l'accesso arriva da lì.
  // Qui non c'è nulla da fare — prima invece "club" cadeva nel fallback di
  // productsFrom() e veniva registrato come acquisto "sfida", mandando al socio
  // la mail con i link della Sfida Estiva che non aveva comprato.
  if (products.length === 0) {
    console.log(`Prodotto "${productId}" gestito da un altro webhook — ignorato qui (${email})`);
    return NextResponse.json({ received: true, skipped: productId });
  }

  const res = await recordPurchases(email, products);

  // Se Supabase fallisce, ritorna 500 così Stripe riprova automaticamente
  if (!res.ok) {
    const detail = await res.text();
    console.error(`Supabase insert failed: ${res.status}`, detail);
    await notifyDave(
      `⚠️ Acquisto non registrato — ${email}`,
      `Stripe ha confermato l'acquisto di "${productId}" (${products.join(", ")}) per ${email} ma l'insert su Supabase ha fallito.\n\nDettaglio: ${detail}\n\nAzione richiesta: aggiungi manualmente l'accesso.`
    );
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Invia l'email con i link d'accesso (best effort — non blocca la risposta a Stripe)
  try {
    await sendAccessEmail(email, products);
  } catch (e) {
    console.error("sendAccessEmail failed:", e);
    await notifyDave(
      `⚠️ Email accesso non inviata — ${email}`,
      `L'acquisto "${productId}" è registrato su Supabase ma l'email di accesso non è partita. Invia i link manualmente a ${email}.`
    );
  }

  return NextResponse.json({ received: true });
}
