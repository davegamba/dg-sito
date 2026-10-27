---
name: articolo-es
description: Scrive e pubblica il prossimo articolo del blog spagnolo di davegamba.com (/es/) prendendolo dalla coda, adattandolo da un articolo italiano esistente. Usa quando parte la routine settimanale, o quando Dave dice "/articolo-es", "fai il prossimo articolo spagnolo", "pubblica l'articolo in spagnolo della settimana".
---

# Articolo spagnolo della settimana

Pubblica **un** articolo in spagnolo su `www.davegamba.com/es/<slug>`, adattato
da un articolo italiano di `content/blog/`. Gira in automatico ogni lunedì
(routine cloud) e Dave non approva prima: **i controlli di questa skill sono
l'unica rete di sicurezza**. Nel dubbio, non pubblicare e scrivilo nella mail.

Questa skill è autosufficiente: nel cloud c'è solo questo repository, non la
memoria di Dave né la cartella `references/`. Tutto quello che serve è qui.

Procedura nata dai primi 4 articoli fatti a mano (ottobre 2026): yogur griego,
ghee, creatina, desayuno proteico. Usali come modello di tono e struttura:
`content/es/*.mdx`.

---

## 0. Prima di tutto

1. `git pull --rebase` (sul repository lavorano anche altre sessioni).
2. Leggi `coda.md` in questa cartella. Prendi la **prima voce con stato `da fare`**.
   - Coda vuota → non scrivere niente, manda la mail "coda finita" (sezione 7) e fermati.
3. Leggi l'articolo italiano di partenza in `content/blog/<slug-it>.mdx` e 2
   articoli spagnoli già pubblicati in `content/es/` per tono e formato.
4. Leggi `AGENTS.md`: questa è una versione di Next.js diversa da quella che conosci.

## 1. Domande vere della gente

La voce della coda contiene già le domande di Google ("Preguntas relacionadas",
raccolte in anticipo dal Mac di Dave con `hl=es&gl=es`). Usa quelle.

Se la voce non le ha: prova a raccoglierle (massimo 5-6 ricerche, 3-4 secondi
tra una e l'altra). **Se Google mostra una verifica anti-robot o tutto torna
vuoto, non aggirarla mai**: ricava i temi dai titoli dei primi risultati con
la ricerca web e scrivilo nella mail ("domande non raccolte").

Regole:
- **Titolo, H2, H3 e FAQ nascono da queste domande quando sono coerenti**,
  scritte come le scrive la gente. Mai tradurre i titoli italiani.
- Filtra: fuori tema, clickbait, domande mediche personali (lì: rimando al medico).
- Un tema con più domande diventa H2; una domanda precisa diventa H3; le
  domande secche vanno nelle FAQ.

## 2. Fonti: verificale TUTTE, anche quelle dell'italiano

Nel blog italiano sono state trovate decine di fonti false e numeri gonfiati,
e ci sono finiti dentro anche articoli spagnoli copiati prima della
correzione (yogur: due DOI sbagliati; creatina: una revisione che diceva
l'opposto). **Non copiare nessuna fonte senza ricontrollarla.**

Per ogni studio:
1. Titolo vero dal DOI: `curl -s https://api.crossref.org/works/<DOI>` →
   `message.title`. Deve essere lo studio che stai citando.
2. Numeri dall'abstract: PMID con
   `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=<DOI>[doi]`
   (codifica le parentesi quadre nell'URL), abstract con
   `efetch.fcgi?db=pubmed&id=<PMID>&rettype=abstract&retmode=text`. Se c'è il
   connettore PubMed, puoi usare quello.
3. **Leggi anche le CONCLUSIONI**, non solo i numeri: la creatina citava una
   revisione la cui conclusione premiava altri integratori.
4. Il numero non c'è nell'abstract → cercalo nel testo completo (PMC) o rendi
   l'affermazione qualitativa. Fonte sbagliata o introvabile → sostituisci con
   uno studio vero verificato, o togli l'affermazione.
5. Se uno studio ha limiti dichiarati (qualità bassa, pochi partecipanti,
   studio sugli animali), **dillo nel testo**. È uno dei tratti di Dave.
6. Valori nutrizionali: USDA FoodData Central
   (`https://api.nal.usda.gov/fdc/v1/food/<fdcId>?api_key=DEMO_KEY`).
7. Se trovi un errore anche nell'articolo **italiano**, correggilo pure lì
   (stessa verifica) e scrivilo nella mail.

## 3. Scrittura: adattamento, non traduzione

**Spagnolo neutro**, comprensibile in Spagna e in America Latina (oltre metà
del traffico spagnolo viene da Colombia, Argentina, Messico):
- "tú", mai "vosotros"; niente spagnolismi stretti (vale, guay, coger)
- quando un termine cambia tra paesi, spiegalo una volta (es. "mantequilla,
  manteca en Argentina y Uruguay")
- esempi, abitudini, prodotti e supermercati di Spagna e America Latina.
  **Marchi e supermercati solo se verificati**, altrimenti generico.
- unità metriche, virgola decimale

**Voce di Dave** (personal trainer online dal 2009, oltre 3.000 clienti):
- prima persona singolare, frasi corte, a capo spesso, opinioni nette
- niente domande retoriche in apertura, niente "en este artículo veremos"
- niente superlativi vuoti, niente riferimenti che datano il testo
- niente tono accademico; spiega i termini tecnici con parole semplici
- target ampio: uomini e donne, giovani e over 40
- mai prescrizioni dirette al singolo lettore; sui temi medici rimanda al médico
- **mai il trattino lungo "—" nei titoli**: usa i due punti. Nel testo usalo poco
- il metodo, se serve, è "**Breve-Intenso-Específico**" per esteso, mai l'acronimo
- le testimonianze dei clienti italiani si riscrivono o si tolgono, mai tradotte

**Struttura obbligatoria** (vedi gli articoli in `content/es/`):

```mdx
---
title: 'Titolo: con i due punti, keyword in testa'
date: <data di oggi>T00:00:00.000Z
category: Nutrición | Suplementos | Entrenamiento
excerpt: "<massimo 155 caratteri, con un dato, senza punti di domanda iniziali>"
image: /images/blog/<copertina>
published: true
---

<div className="succo-box">
  ## Lo esencial

  * 4-5 punti, comprensibili da soli, almeno uno con un dato
</div>

Apertura diretta, 3-5 righe corte.

> Risposta diretta: un paragrafo denso che risponde alla domanda principale.

---

## H2 (domande di Google) ... 6-8 H2, con H3

## Punto de fricción

## Preguntas frecuentes
### Domanda?
Risposta in UN SOLO paragrafo (il parser legge solo la prima riga).

***

**Sube de nivel, Dave.**

***

## Referencias
* [Autore et al. (anno). Titolo vero. Rivista.](https://doi.org/...)
```

- **Almeno 2 tabelle e 3 liste.**
- **Citazioni inline** nel testo: `([Autore et al., Rivista, anno](https://doi.org/...))`.
- **FAQ: 5-10 domande che NON ripetono gli H2.**
- **Punto de fricción scritto da zero** per questo argomento: il lettore ha la
  risposta, mostragli perché da sola non basta. Righe corte. Mai uno stampo.
- **Zero CTA**: niente `<ClubCta />`, `<QuizCta... />`, `<ArticleCta />`, niente
  link al Club, al quiz, al calcolatore o a qualsiasi pagina `/blog/`. Esistono
  solo in italiano.
- **Link interni solo verso `/es/<slug>` esistenti**, e solo dove c'entrano.
- **Copertina**: riusa quella dell'articolo italiano **solo se non ha scritte
  in italiano** (guardala con Read). Se ne ha, usa la copertina di un altro
  articolo spagnolo coerente e scrivilo nella mail.

## 4. Collegamento tecnico (due passi, il resto è automatico)

1. Il file: `content/es/<slug-es>.mdx`. Slug in spagnolo, con la keyword principale.
2. Una riga in `PAIRS` di `lib/translations.ts`:
   `{ it: "<slug-it>", es: "<slug-es>" },` (hreflang reciproco, link "Versione in italiano").

Indice `/es`, "Más artículos", sitemap, eccezione al redirect `/es/...` si
aggiornano da soli. **Non toccare** layout, componenti, `next.config.ts`.

## 5. Build e controlli: se uno fallisce, NON si pubblica

```bash
npm ci            # solo se manca node_modules
npx next build
node scripts/check-es.mjs <slug-es>
```

- Build fallita → correggi l'articolo e riprova. Se non riesci in 2 tentativi: niente commit, mail di errore.
- `check-es.mjs` con ERRORE → correggi e riprova. Gli AVVISI leggili e decidi.
- Lo script stampa il titolo vero di ogni DOI: **confrontalo con la citazione**.

## 6. Pubblicazione

```bash
git add content/es/<slug-es>.mdx lib/translations.ts .claude/skills/articolo-es/coda.md
git commit -m "Articolo spagnolo: <slug-es>"
git pull --rebase && git push
```

Aggiorna `coda.md` **nello stesso commit**: stato `fatto <data>`, URL. Se hai
saltato una voce: stato `saltato <data>: motivo`, e passa alla successiva solo
la settimana dopo (un articolo a settimana, mai due).

Vercel pubblica da solo dopo il push. **Non aspettare il deploy, niente
controlli ripetuti.**

## 7. Mail a Dave (sempre, anche se è andato tutto male)

Con il connettore Gmail, a **davept.info@gmail.com**, oggetto
`Blog ES: <esito> – <slug o motivo>`. In italiano, massimo 10 righe:
- esito: pubblicato / NON pubblicato e perché / coda finita
- URL dell'articolo
- "Ricordati: richiesta di indicizzazione in Search Console per <URL>"
- fonti corrette o tolte rispetto all'italiano, domande non raccolte, dubbi
- quante voci restano in coda (se ≤ 2: "la coda sta finendo, servono nuovi articoli")

Se il connettore Gmail non c'è, scrivi lo stesso riepilogo come ultimo
messaggio della sessione.

## Cosa NON fare mai

- Più di un articolo per esecuzione.
- Pubblicare con un controllo fallito.
- Aggirare verifiche anti-robot.
- Inventare fonti, numeri, marchi, prodotti o testimonianze.
- Toccare articoli italiani se non per correggere un errore verificato.
- Modificare codice, layout o configurazione del sito.
