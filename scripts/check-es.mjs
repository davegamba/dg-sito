#!/usr/bin/env node
// Controlli automatici su un articolo spagnolo, DOPO `npx next build`.
// Se un controllo fallisce l'articolo NON si pubblica (exit code 1).
//
// Uso: node scripts/check-es.mjs <slug-spagnolo>
//
// Usato dalla routine settimanale del blog spagnolo (skill articolo-es).
// Regole: .claude/skills/articolo-es/SKILL.md

import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Uso: node scripts/check-es.mjs <slug-spagnolo>");
  process.exit(2);
}

const BASE = "https://www.davegamba.com";
const root = process.cwd();
const mdxPath = path.join(root, "content/es", `${slug}.mdx`);
const htmlPath = path.join(root, ".next/server/app/es", `${slug}.html`);
const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

if (!fs.existsSync(mdxPath)) fail(`manca il file ${mdxPath}`);
if (!fs.existsSync(htmlPath)) fail(`manca la pagina compilata ${htmlPath}: la build è stata fatta?`);
if (errors.length) report();

const mdx = fs.readFileSync(mdxPath, "utf8");
const html = fs.readFileSync(htmlPath, "utf8");

// --- Contenuto (file .mdx) ---
const fm = mdx.match(/^---\n([\s\S]*?)\n---/);
if (!fm) fail("frontmatter mancante");
const excerpt = fm?.[1].match(/^excerpt:\s*["'](.*)["']\s*$/m)?.[1] ?? "";
if (!excerpt) fail("excerpt mancante");
else if (excerpt.length > 160) fail(`excerpt troppo lungo (${excerpt.length} caratteri, massimo 160)`);
if (!/^image:\s*\/images\//m.test(fm?.[1] ?? "")) warn("copertina non impostata o esterna: controlla che non abbia scritte in italiano");

for (const line of mdx.split("\n")) {
  if (/^#{1,3} /.test(line) && line.includes("—")) fail(`trattino lungo in un titolo: ${line}`);
}
if (/\bBIM\b/.test(mdx)) fail('acronimo "BIM" nel testo: il metodo si scrive per esteso');
if (/Breve-Intenso-Mirato/.test(mdx)) fail('"Breve-Intenso-Mirato" in un testo spagnolo: è "Breve-Intenso-Específico"');
if (/<(ClubCta|QuizCta|QuizCtaMid|QuizCtaTop|ClubCtaMid|CalcCtaMid|ArticleCta)\b/.test(mdx)) fail("CTA italiana nel testo spagnolo");
if (/\]\(\/blog\//.test(mdx) || /davegamba\.com\/blog\//.test(mdx)) fail("link verso una pagina italiana (/blog/): i link interni vanno solo verso /es/");
if (!/^## Preguntas frecuentes/m.test(mdx)) fail('manca la sezione "## Preguntas frecuentes"');
if (!/\*\*Sube de nivel, Dave\.\*\*/.test(mdx)) fail('manca la firma "Sube de nivel, Dave."');
if (!/^## Referencias/m.test(mdx)) fail('manca la sezione "## Referencias"');
const tables = (mdx.match(/^\|.*\|\s*\n\|[-| :]+\|/gm) || []).length;
if (tables < 2) fail(`solo ${tables} tabelle (minimo 2)`);

// Link interni /es/ esistenti
for (const m of mdx.matchAll(/\]\(\/es\/([^)#\s]+)\)/g)) {
  if (!fs.existsSync(path.join(root, "content/es", `${m[1]}.mdx`))) fail(`link a /es/${m[1]} che non esiste`);
}

// Parole italiane tipiche finite nel testo spagnolo
const ITALIAN = /\b(perché|anche|quindi|allenamento|proteine|grassi|cioè|però|dell'|nella|degli|sono|questo|quello)\b/i;
mdx.split("\n").forEach((l, i) => {
  if (ITALIAN.test(l) && !/^\* \[|doi\.org|fdc\.nal|who\.int/.test(l)) warn(`riga ${i + 1} con parole che sembrano italiane: ${l.slice(0, 90)}`);
});

// --- Pagina compilata (HTML) ---
const url = `${BASE}/es/${slug}`;
if (!html.includes(`<link rel="canonical" href="${url}"/>`)) fail("canonical non punta alla pagina stessa");
if (!html.includes(`hrefLang="es" href="${url}"`)) fail("manca l'hreflang es verso se stessa");
const itHref = html.match(/hrefLang="it" href="([^"]+)"/)?.[1];
if (!itHref) fail("manca l'hreflang it: aggiungi la coppia in lib/translations.ts (PAIRS)");
if (!/hrefLang="x-default"/.test(html)) fail("manca l'hreflang x-default");
if (!html.includes('<meta property="og:locale" content="es_ES"/>')) fail("og:locale non è es_ES");
const faqCount = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
  .map((m) => { try { return JSON.parse(m[1]); } catch { return {}; } })
  .find((d) => d["@type"] === "FAQPage")?.mainEntity?.length ?? 0;
if (faqCount < 5) fail(`solo ${faqCount} FAQ nei dati strutturati (minimo 5)`);
const body = html.split("<body")[1] ?? "";
const visible = body.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
for (const w of ["Condividi", "Indice", "Scopri", "Fai il quiz", "Potrebbe interessarti", "min di lettura", "Sali di livello"]) {
  if (visible.includes(w)) fail(`testo italiano nella pagina: "${w}"`);
}
if (/href="\/blog[/"]/.test(body)) fail("la pagina contiene link verso /blog");

// L'italiano gemello deve puntare a questa pagina (hreflang reciproco)
if (itHref) {
  const itSlug = itHref.split("/blog/")[1];
  const itHtml = path.join(root, ".next/server/app/blog", `${itSlug}.html`);
  if (!fs.existsSync(itHtml)) fail(`la gemella italiana ${itSlug} non esiste nella build`);
  else if (!fs.readFileSync(itHtml, "utf8").includes(`hrefLang="es" href="${url}"`)) fail("la gemella italiana non ha l'hreflang di ritorno");
}

// --- Fonti: ogni DOI deve esistere. Il titolo va confrontato a mano con la citazione ---
const dois = [...new Set([...mdx.matchAll(/doi\.org\/([^)\s]+)/g)].map((m) => m[1]))];
if (dois.length === 0) warn("nessun DOI nel testo");
console.log("\nFonti (titolo vero da Crossref: confrontalo con la citazione nel testo):");
for (const doi of dois) {
  try {
    const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: { "User-Agent": "davegamba-check-es (mailto:davept.info@gmail.com)" },
    });
    if (!r.ok) { fail(`DOI inesistente: ${doi} (HTTP ${r.status})`); continue; }
    const m = (await r.json()).message;
    console.log(`  ${doi}\n    → ${m.title?.[0]} | ${m.author?.[0]?.family ?? "?"} ${m.issued?.["date-parts"]?.[0]?.[0] ?? ""}`);
  } catch (e) {
    warn(`DOI non verificabile ora (rete): ${doi}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

report();

function report() {
  console.log("");
  for (const w of warnings) console.log(`AVVISO  ${w}`);
  for (const e of errors) console.log(`ERRORE  ${e}`);
  console.log(errors.length ? `\n✗ ${errors.length} errori: NON pubblicare.` : "\n✓ Controlli superati.");
  process.exit(errors.length ? 1 : 0);
}
