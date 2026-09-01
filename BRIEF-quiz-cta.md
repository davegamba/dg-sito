# BRIEF — Sostituzione banner Club → Quiz (Operazione B)

Documento operativo. Progettato da Opus il 2026-08-27, da eseguire con Sonnet.
**Segui alla lettera. Non ci sono decisioni da prendere: se qualcosa non torna, fermati e segnalalo.**

---

## Contesto in una riga

Stiamo sostituendo i banner che mandano al DG Athletic Club con banner verso il
lead magnet `/quiz-fisico`. Il quiz cattura l'email e alla fine propone comunque
Club e coaching personalizzati per profilo, quindi non perdiamo la conversione:
ci mettiamo davanti uno scalino che il lettore freddo è disposto a salire.

## Cosa è GIÀ STATO FATTO (non rifarlo)

- ✅ Creato `components/QuizCta.tsx` (copy fissa, banner di fondo)
- ✅ Creato `components/QuizCtaMid.tsx` (copy fissa, variante compatta, banner centrale)
- ✅ Entrambi registrati in `mdxComponents` dentro `app/blog/[slug]/page.tsx`
- ✅ Sostituite tutte le **52** occorrenze di `<ClubCta />` con `<QuizCta />` — commit `a4e5ea8`

## Cosa DEVI fare tu (Operazione B)

Sostituire **19 blocchi `<ArticleCta .../>` che puntano a `entra-nel-club`** con la riga singola:

```
<QuizCtaMid />
```

Un blocco per file, 19 file. Elenco esatto più sotto.

---

## ⛔ REGOLE DI SICUREZZA — leggile prima di toccare qualsiasi cosa

Queste regole nascono da un errore reale già commesso su questo progetto: uno
script cercò `*Sali di livello, Dave.*` mentre i file contenevano
`**Sali di livello, Dave.**` (grassetto). Il match parziale spezzò gli asterischi
e **corruppe 15 articoli** senza che nessuno se ne accorgesse subito.

1. **VIETATO usare `sed`, `awk`, `perl -i` o qualsiasi regex per questa operazione.**
   I blocchi sono multi-riga e con formattazione variabile: una regex può
   agganciare più del dovuto e rompere il file in silenzio.

2. **Usa SOLO lo strumento Edit**, che fallisce rumorosamente se la stringa non
   combacia esattamente o non è unica. È esattamente la protezione che ci serve.

3. **Un file alla volta.** Per ciascuno: leggi il blocco esatto → sostituiscilo
   con `<QuizCtaMid />` → passa al successivo. Non accorpare.

4. **Copia il blocco vecchio carattere per carattere** nel campo `old_string`,
   comprese indentazione e la riga di chiusura `/>`. Se l'Edit fallisce, **non
   inventare varianti**: rileggi il file e riprova con il testo reale.

5. **Non toccare NIENT'ALTRO.** In particolare, restano **invariati**:
   - i 5 `<ArticleCta>` verso `calcolatore-fabbisogno.html` (è già un lead magnet)
   - i 2 `<ArticleCta>` verso `/coaching`
   - i ~50 link testuali inline a `club.davegamba.com` dentro le frasi
     (sono prosa, non banner — ed è proprio lì che si ruppe tutto l'altra volta)
   - i `<QuizCta />` in fondo agli articoli, già a posto

---

## Elenco dei 19 file (spunta man mano)

Ogni file contiene **esattamente 1** blocco da sostituire.

- [ ] allenarsi-20-minuti.mdx
- [ ] cosa-mangiare-dopo-allenamento.mdx
- [ ] crema-solare-fa-male.mdx
- [ ] dieta-detox.mdx
- [ ] dimagrire-prima-estate.mdx
- [ ] esercizi-braccia.mdx
- [ ] esercizi-gambe.mdx
- [ ] esercizi-glutei.mdx
- [ ] gonfiore-addominale-estate.mdx
- [ ] omega-3.mdx
- [ ] perche-non-dimagrisco.mdx
- [ ] pressione-bassa-caldo.mdx
- [ ] quante-volte-allenarsi-a-settimana.mdx
- [ ] rimettersi-in-forma-settembre.mdx
- [ ] ritenzione-idrica.mdx
- [ ] sarcopenia-perdita-massa-muscolare.mdx
- [ ] stanchezza-estiva.mdx
- [ ] testosterone-allenamento-forza.mdx
- [ ] vitamina-d.mdx

Come si presenta il blocco da rimuovere (la copy cambia da file a file, la
struttura no):

```
<ArticleCta
  kicker="DG Athletic Club"
  title="..."
  description="..."
  href="https://club.davegamba.com/entra-nel-club"
  cta="Scopri il Club"
  compact
/>
```

→ diventa, tutto intero, una sola riga:

```
<QuizCtaMid />
```

---

## Verifica finale — TUTTI questi controlli devono passare

Esegui da `dg-sito/`:

```bash
echo -n "ArticleCta verso il Club rimasti (atteso 0): "
for f in content/blog/*.mdx; do awk '/<ArticleCta/,/\/>/' "$f" | grep -c "entra-nel-club"; done | paste -sd+ - | bc

echo -n "QuizCtaMid inseriti (atteso 19): "
grep -o "<QuizCtaMid />" content/blog/*.mdx | wc -l

echo -n "QuizCta in fondo (atteso 52, invariato): "
grep -o "<QuizCta />" content/blog/*.mdx | wc -l

echo -n "ArticleCta calcolatore (atteso 5, invariato): "
grep -c "calcolatore-fabbisogno" content/blog/*.mdx | grep -v ":0" | wc -l

echo -n "ArticleCta coaching (atteso 2, invariato): "
grep -l 'href="/coaching"' content/blog/*.mdx | wc -l

echo -n "File con QuizCtaMid doppio (atteso 0): "
grep -c "<QuizCtaMid />" content/blog/*.mdx | grep -v ":1$" | grep -v ":0$" | wc -l
```

Poi, obbligatorio:

```bash
npx next build
```

Deve chiudere con `✓ Compiled successfully` e **nessun** `Error occurred prerendering page`.

Infine ispeziona il diff prima di committare:

```bash
git diff --stat
```

Atteso: **19 file modificati**, ciascuno con poche righe rimosse e 1 aggiunta.
Se compaiono file non in elenco, o un file con decine di righe cambiate,
**fermati e segnala** invece di committare.

---

## Commit

Solo se ogni controllo sopra è verde:

```bash
git add content/blog components/QuizCtaMid.tsx "app/blog/[slug]/page.tsx"
git commit -m "Lead magnet: banner a meta articolo passa da Club a Quiz Fisico (19 articoli)"
git pull --rebase origin main && git push origin main
```

---

## Se qualcosa va storto

Nessuna modifica è ancora stata pushata per l'Operazione B, quindi il ripristino
è pulito:

```bash
git checkout -- content/blog/
```

Riporta tutti gli articoli all'ultimo commit buono (`a4e5ea8`). Poi segnala il
problema invece di ritentare a caso.
