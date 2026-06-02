# Blog Articles — davegamba.com

_Aggiornato: 02/06/2026 — design approvato da Dave_

---

## STACK TECNICO

- **Progetto:** `dg-sito/` in cartella DAVE CLAUDE
- **Deploy:** `git push origin main` → Vercel auto-deploya in ~1-2 minuti
- **URL attuale:** https://dg-sito.vercel.app (dominio davegamba.com da collegare)
- **Articoli:** file `.mdx` in `dg-sito/content/blog/`
- **Rendering:** `next-mdx-remote/rsc` + `gray-matter` per frontmatter
- **Pannello CMS:** Decap CMS su `/admin` — autenticazione GitHub OAuth
- **OAuth configurato:** GitHub OAuth App "DaveGamba CMS", callback su `dg-sito.vercel.app`

### Struttura frontmatter
```yaml
---
title: "Titolo articolo"
date: 2026-06-02          # YYYY-MM-DD
category: Nutrizione       # vedi categorie sotto
excerpt: "Frase breve SEO — max 155 caratteri"
image: /images/blog/nome.jpg   # o null
published: false           # false = bozza, true = live
---
```

### Categorie disponibili nel CMS
Allenamento · Nutrizione · Dimagrimento · Testosterone · Longevità · Mindset · Metodo BIM

---

## DESIGN SISTEMA BLOG

### Colori brand
- Ciano principale: `#00CBDB`
- Ciano attenuato: `#0099a8`
- Nero: `#000000`
- Sfondo sabbia corpo articolo: `#faf6ef`

### Struttura pagina articolo
- **Header + Hero + Titolo + TL;DR box** → sfondo nero (dark brand)
- **Corpo articolo** → sfondo sabbia `#faf6ef`, testo `#222`, arrotondato in alto con `rounded-t-[28px]`
- **Footer firma** → "Sali di livello, Dave" su sfondo sabbia
- **CTA sezione** → sfondo dark `#0d0d0d` sotto il corpo

### Tipografia
| Elemento | Stile |
|---|---|
| H2 | Serif, ciano pieno `#00CBDB`, bordo superiore sottile sabbia |
| H3 | Serif, scuro `#1a1a1a` — subordinato all'H2 ciano |
| Paragrafo | Sans, `#222`, 1rem, interlinea 1.9 |
| Grassetto | `#000`, font-weight 700 |
| Link | Ciano `#00CBDB`, sottolineato |
| Tabelle | Header ciano, righe alternate `#fafafa` — richiede plugin `remark-gfm` ✅ installato |
| Blockquote | Bordo sinistro ciano, sfondo `#f0fdfe` |
| Riferimenti | H2 ciano + lista bullet con link DOI cliccabili |
| **Box Succo** | `<div className="succo-box">` — sfondo `#e8fafb`, bordo `2px solid #00CBDB`, radius 18px, su sfondo sabbia ✅ approvato |
| **Bullet `▸`** | `position: absolute` sul `::before` — NON flex (flex spezza grassetto in colonne) |

### TL;DR box (in sezione dark)
- Sfondo `#0d0d0d`, bordo `#1a1a1a`, arrotondato 16px
- Label "TL;DR" ciano uppercase piccolo
- Testo `#aaa` — prende l'`excerpt` dal frontmatter

### Perché sfondo chiaro
Ricerca Nielsen Norman Group: testo scuro su sfondo chiaro = migliore comprensione per lettura prolungata. Sfondo panna `#fdf9f2` scelto per calore e coerenza brand — **approvato da Dave il 02/06/2026**.

---

## STATO ARTICOLI

| # | Slug | Titolo | Categoria | Pub | URL Podia | CTA |
|---|---|---|---|---|---|---|
| 1 | `proteine-fanno-male-ai-reni` | Proteine: Fanno Male ai Reni? | Nutrizione | ❌ | — | — |
| 2 | `creatina-guida-scientifica` | Creatina: La Guida Scientifica | Nutrizione | ❌ | — | — |
| 3 | `esercizi-pettorali` | Esercizi Pettorali | Allenamento | ❌ | — | — |
| 4 | `allenarsi-stomaco-vuoto` | Allenarsi a Stomaco Vuoto | Allenamento | ❌ | — | — |
| 5 | `stretching-benefici-mobilita` | Stretching: Quale Tipo Funziona | Allenamento | ❌ | — | — |
| 6 | `alimentazione-post-allenamento` | Cosa Mangiare dopo l'Allenamento | Nutrizione | ❌ | — | — |
| 7 | `allenamento-a-casa` | Allenamento a Casa | Allenamento | ❌ | — | — |
| 8 | `colazione-proteica` | La Mia Colazione Proteica | Nutrizione | ❌ | — | — |
| 9 | `metabolismo-lento` | Metabolismo Lento | Dimagrimento | ❌ | — | — |
| 10 | `sonno-benefici-ormoni` | Sonno: La Guida Definitiva | Longevità | ❌ | — | — |
| 11 | `benefici-camminata-quanti-passi` | Benefici della Camminata | Allenamento | ❌ | — | — |
| 12 | `cardio-o-pesi` | Cardio o Pesi per Dimagrire? | Allenamento | ❌ | — | — |
| 13 | `esercizi-addominali` | Esercizi Addominali | Allenamento | ❌ | — | — |
| 14 | `latte-fa-male` | Il Latte fa Male? | Nutrizione | ❌ | — | — |
| 15 | `come-dimagrire-estate-protocollo` | Come Asciugarsi per l'Estate | Dimagrimento | ❌ | — | — |
| 16 | `osteoporosi-e-osteopenia` | Osteoporosi e Osteopenia | Longevità | ❌ | — | — |
| 17 | `quante-uova-a-settimana` | Quante Uova Puoi Mangiare? | Nutrizione | ❌ | — | — |
| 18 | `esercizi-respirazione-benefici` | Respirazione e Cervello | Metodo BIM | ❌ | — | — |
| 19 | `stare-seduti-fa-male` | Stare Seduti fa Male | Longevità | ❌ | — | — |
| 20 | `come-dimagrire-velocemente` | Come Dimagrire Velocemente | Dimagrimento | ❌ | — | demo |

**Legenda:** ❌ bozza (invisibile sul sito) · ✅ pubblicato

---

## CONTESTO SEO E MIGRAZIONE DA PODIA

- **Vecchio sito Podia:** ~650 views/mese, sessione media 3m38s (alta qualità, traffico basso)
- **Articolo più performante su Podia:** `/blog/come-dimagrire-velocemente` — primo da curare con cura SEO
- **Struttura URL mantenuta:** `/blog/[slug]` — già indicizzata su Google, non cambiare
- **Redirect 301:** quando si migra da Podia → aggiungere redirect in `next.config.ts` → `redirects`
- **Obiettivo traffico organico:** ricostruire in 6-12 mesi sul nuovo sito Next.js
- **Il succo della guida / TL;DR:** serve per Google Featured Snippet — tenerlo nell'articolo
- **Immagini Podia:** da scaricare e spostare su R2, poi aggiornare `image:` nel frontmatter
- **Da fare:** Dave deve fornire URL Podia degli articoli già pubblicati → aggiorniamo slug + redirect

---

## PANNELLO CMS — COME FUNZIONA

1. Vai su `dg-sito.vercel.app/admin`
2. Clicca "Accedi con GitHub" → autorizza
3. Vedi tutti gli articoli in "Articoli Blog"
4. Apri articolo → modifica campi → interruttore PUBBLICATO su ON → Salva
5. Vercel rideploya automaticamente in ~1 minuto → articolo live

**Quando il dominio sarà collegato:** cambiare `base_url` nel file `public/admin/index.html` da `dg-sito.vercel.app` a `davegamba.com`

---

## IMMAGINI BLOG

- **Storage consigliato:** Cloudflare R2 (già usato per hero home)
- **Percorso locale temporaneo:** `dg-sito/public/images/blog/nome.jpg`
- **Percorso nel frontmatter:** `/images/blog/nome.jpg`
- **`next.config.ts`:** già configurato per domini Podia e R2

---

## DECISIONI DI DESIGN — APPROVATE DA DAVE (02/06/2026)

- **Sfondo corpo articolo:** panna `#fdf9f2` ✅
- **H2 titoli:** ciano pieno `#00CBDB`, serif ✅
- **H3 titoli:** scuro `#1a1a1a`, serif ✅
- **Corpo testo:** `#222`, 1rem, interlinea 1.9 ✅
- **Tabelle:** header ciano, righe alternate — plugin `remark-gfm` installato ✅
- **Bullet `▸`:** `position: absolute` (non flex — flex spezzava il grassetto in colonne) ✅
- **Riferimenti scientifici:** H2 ciano + lista bullet con link DOI cliccabili ✅
- **TL;DR / Succo della guida:** resta nell'articolo (serve a Google Featured Snippet) ✅
- **Immagini:** su R2, non nel repo GitHub
- **CTA:** da definire — aggiungere in massa con script quando decisi link prodotto
- **Tempo lettura** ✅ — calcolato da `calcReadingTime()` in lib/posts.ts (200 parole/min)
- **Breadcrumb** ✅ — Home › Blog › Titolo nell'header dark
- **Social sharing** ✅ — WhatsApp, X, LinkedIn sotto la firma
- **Indice navigabile** ✅ — "In questo articolo" estratto da H2 con `extractToc()`, visibile se >5 sezioni. Escluso il succo-box dal TOC. Ordine approvato: **Succo → Indice → Corpo**
- **Articoli correlati** ✅ — `getRelatedPosts()` in lib/posts.ts, 3 card stessa categoria in fondo
- **Filtri categoria** ✅ — componente client `BlogList.tsx` nella pagina /blog
- **Barra progresso lettura** ✅ — componente client `ReadingProgress.tsx`, linea ciano 3px in cima (posizione approvata)
- **Struttura articolo approvata:** Hero → Header dark (breadcrumb, categoria, titolo, autore/data/lettura, descrizione) → Sfondo sabbia (Succo → Indice → Corpo → Firma → Condividi → Correlati) → CTA dark
- **Succo split:** `splitContent()` in lib/posts.ts divide il contenuto in succo+body per renderizzarli separatamente con l'indice in mezzo
- **Social sharing:** WhatsApp + Facebook + LinkedIn (no X — in Italia Facebook batte X)
- **H2 bicolore:** prima parte ciano, seconda parte nera (separatore — o :). Eccezione: "Riferimenti Scientifici" → italic grigio piccolo
- **Breadcrumb:** Home › Blog › Titolo, nel header dark

---

## TODO BLOG

- [ ] **CTA** — definire testo e link CTA standard, poi applicare in massa a tutti gli articoli
- [x] **Succo della Guida** — ✅ risolto con fix CSS bullet
- [ ] **URL Podia** — Dave fornisce slug originali articoli pubblicati → aggiornare slug + redirect 301
- [ ] **Immagini copertina** — scaricare da Podia, caricare su R2, aggiornare `image:` nel frontmatter
- [ ] **Custom domain** — collegare `davegamba.com` a Vercel (Vercel → Settings → Domains)
- [ ] **Aggiornare Decap** — dopo dominio: cambiare `base_url` in `public/admin/index.html`
- [ ] **Altri articoli** — Dave ha altri articoli da importare (obiettivo 40 totali, ora 20)
- [ ] **Redirect 301** — da vecchi URL Podia → nuovi Next.js (in `next.config.ts`)

---

## PROMPT MASTER ARTICOLI — VERSIONE AGGIORNATA PER MDX

### Lunghezza articoli — chiarimento (aggiornato 02/06/2026)
- **Pillar:** target ~3.000 parole. Non 4.000 per regola, non 2.000 per pigrizia. 3.000 densi senza padding.
- **Cluster:** ~1.500 parole.
- Regola: espandi solo con contenuto che aggiunge valore reale. Mai allungare il brodo.
- Per i pillar, le sezioni ad alto valore da non saltare: caso studio con numeri, testosterone totale vs libero vs SHBG (o equivalente tecnico del topic), FAQ con risposte da 6-8 righe.
- Le espansioni a basso valore da evitare: integratori marginali, longevità teorica senza pratica, elenchi padding.

### Differenze dal prompt originale (blog Podia → Next.js MDX)
- **Output:** non più `.docx` ma file **MDX diretto** in `content/blog/[slug].mdx`. Il pannello CMS è il "docx di revisione" — Dave può modificare prima di pubblicare.
- **Fase 1 obbligatoria:** keyword research + competitor + schema → attesa approvazione Dave → poi scrittura MDX
- **Struttura frontmatter obbligatoria:**
```yaml
---
title: "Titolo SEO"
date: YYYY-MM-DD
category: Allenamento|Nutrizione|Dimagrimento|Testosterone|Longevità|Mindset|Metodo BIM
excerpt: "120-160 caratteri SEO — problema + promessa senza dare la risposta"
image: null
published: false
---
```
- **Box succo:** si scrive come `<div className="succo-box">` attorno all'H2 + lista bullet
- **FAQ:** vanno DOPO la firma "Sali di livello, Dave." (come da prompt originale)

### Link interni reali (slug aggiornati)
```
/blog/allenamento-a-casa
/blog/benefici-camminata-quanti-passi
/blog/stare-seduti-fa-male
/blog/cardio-o-pesi
/blog/alimentazione-post-allenamento
/blog/osteoporosi-e-osteopenia
/blog/latte-fa-male
/blog/quante-uova-a-settimana
/blog/allenarsi-stomaco-vuoto
/blog/esercizi-respirazione-benefici
/blog/stretching-benefici-mobilita
/blog/sonno-benefici-ormoni
/blog/proteine-fanno-male-ai-reni
/blog/creatina-guida-scientifica
/blog/metabolismo-lento
/blog/esercizi-addominali
/blog/esercizi-pettorali
/blog/colazione-proteica
/blog/cardio-o-pesi
/blog/come-dimagrire-estate-protocollo
```

### Articoli da produrre (in ordine di opportunità SEO)
1. Come alzare il testosterone naturalmente dopo i 40
2. Cortisolo alto e grasso addominale — il collegamento che nessuno spiega
3. Zone 2 cardio — cos'è e perché è il cardio migliore per chi ha 40 anni
4. HRV (variabilità della frequenza cardiaca) — come misurare il recupero
5. Digiuno intermittente 16:8 — funziona davvero o è sopravvalutato?
6. Quante calorie bruci davvero in palestra (la verità)
7. Omega-3 — la guida scientifica completa su dosi e benefici
8. Perché non riesci a mantenerti in forma dopo i 35

---

## COMANDI UTILI

```bash
cd "/Users/davegamba/Documents/DAVE CLAUDE/dg-sito"

# Pubblicare un articolo
# Nel file: published: false → true
git add content/blog/nome-articolo.mdx
git commit -m "pubblica: nome articolo"
git push origin main

# Dev server locale (porta 3000)
npm run dev
```
