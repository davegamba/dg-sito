# APP-DECISIONS.md — Decisioni Tecniche e Estetiche

_Log aggiornato a ogni sessione. Non cancellare — è la memoria del progetto._

---

## STACK

| Decisione | Scelta | Motivo |
|---|---|---|
| Framework | Next.js 16 App Router | SSR + SSG + API routes in un unico repo |
| Linguaggio | TypeScript | Type safety, meno bug in produzione |
| CSS | Tailwind v4 (CSS-based config) | Utility-first, ottimo con Next.js |
| Auth + DB | Supabase | Postgres + Auth + Storage tutto-in-uno |
| Pagamenti | Stripe | Standard de facto |
| Blog | Ghost CMS (API only) | Dave già su Ghost, no lock-in |
| Deploy | Vercel | Zero-config con Next.js |
| Icons | Lucide React | Leggero, consistente |

---

## DESIGN

| Decisione | Scelta | Motivo |
|---|---|---|
| Stile home | Komi-inspired, dark, visual-first | Riferimento esplicito di Dave |
| Background | #080810 (nero metallico) | Brand DG |
| Accent primario | #00CBDB (ciano) | Brand DG |
| Accent secondario | #F0C040 (oro) | Streak/premium |
| Font titoli | DM Serif Display (Google Fonts) | Elegante, authority |
| Font UI | DM Sans (Google Fonts) | Moderno, leggibile |
| Responsive | Mobile-first | Priority: utenti da mobile |

---

## STRUTTURA PAGINE

| Pagina | Route | Stato |
|---|---|---|
| Home marketing | `/` | 🟡 In sviluppo |
| Blog index | `/blog` | 🔴 Da fare |
| Singolo post | `/blog/[slug]` | 🔴 Da fare |
| Optin lead magnet | `/optin/[slug]` | 🔴 Da fare |
| Login | `/login` | 🔴 Da fare |
| Signup | `/signup` | 🔴 Da fare |
| Hub utente | `/hub` | 🔴 Da fare |
| Prodotto singolo | `/prodotti/[slug]` | 🔴 Da fare |

---

## NOTE DI SESSIONE

### 2026-05-25
- Init progetto con `create-next-app@16.2.6`
- Ghost CMS: da configurare dopo (URL e API key da aggiungere in `.env.local`)
- Supabase: da configurare dopo (da aggiungere in `.env.local`)
- Stripe: da configurare dopo
- Foto di Dave: usare `/public/images/dave.jpg` — DA AGGIUNGERE
