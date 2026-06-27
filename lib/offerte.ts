// ─────────────────────────────────────────────────────────────────
//  TABELLA DELLE OFFERTE — il "cervello" dei checkout
//
//  Per aggiungere un nuovo prodotto/offerta basta aggiungere un blocco
//  qui sotto. L'URL nasce in automatico: /checkout/<slug>
//  Es. slug "glutei"  →  davegamba.com/checkout/glutei
//
//  - amount        = prezzo in CENTESIMI (€33 = 3300)
//  - productId     = chiave di sblocco nel Club (deve combaciare con
//                    l'id della card in app/club/AppDashboard.tsx)
//  - bump          = offerta aggiuntiva opzionale (lascia undefined se non serve)
// ─────────────────────────────────────────────────────────────────

export interface Bump {
  nome: string;
  descrizione: string;
  prezzo: number;          // €9  (prezzo scontato del bump)
  prezzoOld: number;       // €21 (prezzo barrato)
  risparmio: number;       // €12
  amountBundle: number;    // totale prodotto + bump, in CENTESIMI (€42 = 4200)
  productIdBundle: string; // chiavi di sblocco unite, es. "sfida+addominali"
}

export interface Offerta {
  slug: string;
  nome: string;
  emoji?: string;
  descrizione: string;
  prezzo: number;   // €33 (prezzo base del prodotto)
  amount: number;   // 3300 (in CENTESIMI)
  productId: string; // chiave di sblocco nel Club, es. "sfida"
  bump?: Bump;
  // Solo per abbonamenti Stripe ricorrenti:
  recurring?: { interval: "month" | "year"; priceId: string };
}

export const OFFERTE: Record<string, Offerta> = {
  "club-mensile": {
    slug: "club-mensile",
    nome: "DG Athletic Club",
    emoji: "🏆",
    descrizione: "Founder price · Bloccato a vita · Disdici quando vuoi",
    prezzo: 19,
    amount: 1900,
    productId: "club",
    recurring: { interval: "month", priceId: "price_1Tlsa1IyNONJea71nFkbb0rQ" },
  },
  "club-annuale": {
    slug: "club-annuale",
    nome: "DG Athletic Club — Annuale",
    emoji: "🏆",
    descrizione: "Founder price · 3 mesi gratis · Bloccato a vita",
    prezzo: 179,
    amount: 17900,
    productId: "club",
    recurring: { interval: "year", priceId: "price_1Tlsa1IyNONJea71lCG65MZZ" },
  },
  "addominali": {
    slug: "addominali",
    nome: "Pancia Piatta & Core",
    emoji: "🔥",
    descrizione: "Accesso immediato · 12 sessioni · 4 settimane",
    prezzo: 21,
    amount: 2100,
    productId: "addominali",
    // Price ID Stripe: price_1TjOl3IyNONJea717l3NmgVG
    // Payment Link:   https://buy.stripe.com/3cI8wQ7tI8TscA21521Nu05
  },
  "sfida-estiva": {
    slug: "sfida-estiva",
    nome: "Sfida Estiva 21 Giorni",
    emoji: "⚡",
    descrizione: "Accesso immediato · Programma completo",
    prezzo: 33,
    amount: 3300,
    productId: "sfida",
    bump: {
      nome: "Corso Addominali Completo",
      descrizione:
        "Tecnica corretta, progressioni e il programma definitivo per addominali visibili — senza distruggere la schiena.",
      prezzo: 9,
      prezzoOld: 21,
      risparmio: 12,
      amountBundle: 4200,
      productIdBundle: "sfida+addominali",
    },
  },
};

export function getOfferta(slug: string): Offerta | null {
  return OFFERTE[slug] ?? null;
}
