"use client";

import { useState, useEffect, useRef } from "react";
import "@/lib/analytics";
import { determineProfile } from "@/lib/quiz";

/* ── TIPI ── */
type StepType = "image-grid-2" | "image-grid-3" | "checkbox" | "buttons" | "numbered";

interface StepOption {
  value: string;
  label: string;
  gradient?: string;
  icon?: string;
  img?: string;
  num?: string;
  sub?: string;
}

interface Step {
  type: StepType;
  question: string;
  hint: string;
  key: string;
  options: StepOption[];
}

interface Profile {
  icon: string;
  name: string;
  tagline: string;
  analysis: string;
  tips: string[];
}

/* ── DATI ── */
const R2 = "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/";

const TESTIMONIAL_PHOTOS = [
  `${R2}img_07.jpeg`,
  `${R2}alessandra-pilo-testimonianze-davegamba.jpg`,
  `${R2}img_08.jpeg`,
  `${R2}emiliano-testimonianze-dave-gamba.jpeg`,
  `${R2}img_09.jpeg`,
  `${R2}gloria-testimonianze-dave-gamba.jpeg`,
  `${R2}gus-recensioni-davegamba.jpg`,
  `${R2}marco-iacovalessandra-pilo-testimonianze-davegamba.jpeg`,
  `${R2}marta-marranzano.png`,
  `${R2}valerya-testimonianze-dave-gamba.jpeg`,
  `${R2}veronica-gonz-testimonianze-dave-gamba.jpeg`,
];

const STEPS: Step[] = [
  {
    type: "image-grid-3",
    question: "Qual è il tuo obiettivo principale?",
    hint: "Seleziona uno per iniziare",
    key: "obiettivo",
    options: [
      { value: "peso",     label: "Perdere peso importante per salute e benessere", img: `${R2}perdere-peso.jpg` },
      { value: "atletico", label: "Sviluppare un fisico atletico e definito",        img: `${R2}atletico-sbarra-spiaggia.jpg` },
      { value: "massa",    label: "Costruire massa muscolare",                       img: `${R2}massa-muscolare.jpeg` },
    ],
  },
  {
    type: "checkbox",
    question: "Cosa ti blocca in questo momento?",
    hint: "Seleziona tutto quello che ti descrive",
    key: "blocchi",
    options: [
      { value: "tempo", label: "Non ho tempo per allenarmi con costanza" },
      { value: "risultati", label: "Mi alleno ma non vedo risultati" },
      { value: "alimentazione", label: "Non so cosa mangiare" },
      { value: "costanza", label: "Inizio e mollo sempre" },
    ],
  },
  {
    type: "buttons",
    question: "Quanti minuti al giorno puoi dedicare all'allenamento?",
    hint: "Sii onesto — adatteremo il piano al tuo reale disponibile",
    key: "tempo",
    options: [
      { value: "30", label: "20–30 minuti" },
      { value: "45", label: "30–45 minuti" },
      { value: "60", label: "1 ora o più" },
    ],
  },
  {
    type: "buttons",
    question: "Quante sessioni a settimana riesci a fare?",
    hint: "La frequenza ideale è diversa per ogni profilo",
    key: "sessioni",
    options: [
      { value: "2", label: "2 volte a settimana" },
      { value: "3", label: "3 volte a settimana" },
      { value: "4", label: "4 volte a settimana" },
      { value: "5", label: "5 o più volte" },
    ],
  },
  {
    type: "numbered",
    question: "Il tuo livello di esperienza fitness?",
    hint: "Per calibrare intensità e struttura del tuo piano",
    key: "livello",
    options: [
      { value: "principiante", num: "1", label: "Principiante", sub: "Meno di 1 anno di allenamento regolare" },
      { value: "intermedio",   num: "2", label: "Intermedio",   sub: "1–3 anni di allenamento con qualche continuità" },
      { value: "avanzato",     num: "3", label: "Avanzato",     sub: "3+ anni di allenamento serio e costante" },
    ],
  },
  {
    type: "buttons",
    question: "Dove preferisci allenarti?",
    hint: "Il piano si adatta alla tua situazione",
    key: "luogo",
    options: [
      { value: "casa", label: "A casa con manubri" },
      { value: "palestra", label: "In palestra" },
      { value: "misto", label: "Entrambi" },
    ],
  },
];

const PROFILES: Record<string, Profile> = {
  zero: {
    icon: "🚀",
    name: "Da Zero a Fit",
    tagline: "Il tuo problema non è la motivazione. È la scelta.",
    analysis: `Il fitness là fuori è stato reso troppo complicato: c'è troppa confusione.<br /><br />Keto, digiuno intermittente, calisthenics, pesi, HIIT, funzionale: ognuno vende il suo metodo come quello giusto.<br /><br />Il risultato? Non parti mai con le idee chiare. O parti e molli dopo due settimane perché non sei sicuro/a di stare facendo la cosa giusta.<br /><br /><strong>La paralisi da scelta blocca più della pigrizia.</strong> Non ti serve trovare il metodo perfetto tra mille, ti servono i PRINCIPI base che funzionano in qualsiasi metodo e per tutti.`,
    tips: [
      "<strong>Inizia a padroneggiare gli esercizi fondamentali più semplici.</strong> Squat, stacco, panca, rematore, spinta sopra la testa. Ripetili finché non li padroneggi.",
      "<strong>Una sola regola a tavola per iniziare.</strong> Proteine ad ogni pasto. Quando diventa automatico, aggiungi le successive.",
      "<strong>Inizia ad allenarti 3 sessioni a settimana, non di più per ora.</strong> Chi inizia fa troppo troppo presto, e molla.",
    ],
  },
  stallo: {
    icon: "⚡",
    name: "In Stallo",
    tagline: "Ti alleni. Ma resti sempre uguale.",
    analysis: `Ti alleni. Ci vai, non salti, non molli. Eppure il fisico non si muove più. Questo è il punto più frustrante dell'allenamento, perché la colpa non è la pigrizia, e lo sai. <strong>Il problema è che il corpo è in stallo.</strong><br /><br />Ogni stimolo che ripeti uguale, nel tempo, smette di produrre risposta. Ti sembra di allenarti a vuoto, senza progredire.`,
    tips: [
      "<strong>Ogni sessione deve avere un numero da battere.</strong> Se non c'è un obiettivo numerico, non c'è stimolo.",
      "<strong>Tieni traccia.</strong> Senza dati non sai cosa cambiare.",
      "<strong>Cambia il parametro, non l'esercizio.</strong> Il problema non è quasi mai l'esercizio, è come stai progredendo in carichi e ripetizioni.",
    ],
  },
  salto: {
    icon: "🏆",
    name: "Salto di Livello",
    tagline: "Vai già bene. Ora si lavora sui dettagli.",
    analysis: `Sei già avanti rispetto al 90% delle persone. Ma senti che c'è un soffitto, e fai fatica a capire dove sia. <strong>A questo livello il problema NON è fare di più. È che i progressi si nascondono nei dettagli.</strong> Un centimetro di range di movimento in meno, un recupero troppo corto, un deficit proteico leggero che si accumula.`,
    tips: [
      "<strong>Controlla l'esecuzione, non solo il carico.</strong> Filma qualche serie e riguardati.",
      "<strong>Calcola i tuoi macro almeno una volta.</strong> Non stimati: reali.",
      "<strong>Tratta il recupero come allenamento.</strong> A questo livello guadagni tanto fuori dalla palestra quanto dentro.",
    ],
  },
  tempo: {
    icon: "⏱️",
    name: "Zero Tempo, Massimo Risultato",
    tagline: "Il problema non è il poco tempo. È come lo stai usando.",
    analysis: `Non hai tempo. O meglio, hai il tempo che hai, e non è molto. <strong>Ma il problema non è quanto tempo hai. È come lo stai usando.</strong><br /><br />Recuperi lunghi, esercizi superflui, volume a vuoto inutile che non ti fa progredire.<br /><br />Il tuo collo di bottiglia è: ottimizzare. Devi rendere il tuo allenamento più efficiente. Con la sequenza giusta, meno di mezz'ora produce più stimolo di un'ora fatta a caso.`,
    tips: [
      "<strong>Meno di mezz'ora al giorno è sufficiente.</strong> L'efficacia dipende dalla densità, non dalla durata.",
      "<strong>Usa sempre le superserie.</strong> Si dimezza il tempo, si raddoppia la densità.",
      "<strong>Allenati più breve, ma con più frequenza:</strong> 3-4 volte a settimana.",
    ],
  },
};

/* ── PERSONALIZZAZIONE: etichette leggibili delle risposte ── */
const OBIETTIVO_LABEL: Record<string, string> = {
  peso: "perdere peso",
  atletico: "costruire un fisico atletico e definito",
  massa: "mettere massa muscolare",
};
const LUOGO_LABEL: Record<string, string> = {
  casa: "a casa con i manubri",
  palestra: "in palestra",
  misto: "tra casa e palestra",
};
const SESSIONI_LABEL: Record<string, string> = {
  "2": "2 volte a settimana",
  "3": "3 volte a settimana",
  "4": "4 volte a settimana",
  "5": "5+ volte a settimana",
};
const BLOCCO_LABEL: Record<string, string> = {
  tempo: "il tempo",
  risultati: "la mancanza di risultati",
  alimentazione: "l'alimentazione",
  costanza: "la costanza",
};

function buildPersonalLine(answers: Record<string, string | string[]>): string {
  const obiettivo = OBIETTIVO_LABEL[answers["obiettivo"] as string];
  const luogo = LUOGO_LABEL[answers["luogo"] as string];
  const sessioni = SESSIONI_LABEL[answers["sessioni"] as string];
  const blocchi = (answers["blocchi"] as string[]) || [];
  const bloccoMain = BLOCCO_LABEL[blocchi[0]];

  const parts: string[] = [];
  if (obiettivo) parts.push(`vuoi <strong>${obiettivo}</strong>`);
  if (luogo && sessioni) parts.push(`allenandoti <strong>${luogo}</strong>, <strong>${sessioni}</strong>`);
  else if (sessioni) parts.push(`allenandoti <strong>${sessioni}</strong>`);
  else if (luogo) parts.push(`allenandoti <strong>${luogo}</strong>`);

  let line = parts.length ? `Hai detto che ${parts.join(", ")}.` : "";
  if (bloccoMain) line += ` Quello che ti blocca di più adesso è <strong>${bloccoMain}</strong>.`;
  return line.trim();
}

/* ── PERSONALIZZAZIONE: CTA finali per profilo ── */
interface CtaCard {
  badge: string;
  badgeColor: string;
  title: string;
  price?: string;
  href: string;
  img: string;
  cta: string;
  accent: string; // colore bordo/bottone
}
const CTA_CATALOG: Record<string, CtaCard> = {
  // Card "sfida" rimossa il 04/08/2026 — Sfida Estiva chiusa.
  club: {
    badge: "Tutti gli strumenti",
    badgeColor: "#00CBDB",
    title: "DG Athletic<br />Club",
    price: "€19/mese",
    href: "https://club.davegamba.com/entra-nel-club",
    img: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg",
    cta: "Entra nel Club →",
    accent: "#00CBDB",
  },
  coaching: {
    badge: "Servizio Premium",
    badgeColor: "#f5c842",
    title: "Coaching<br />Personale 1:1",
    href: "https://davegamba.com/coaching#candidati",
    img: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg",
    cta: "Prenota una call →",
    accent: "#f5c842",
  },
};
// Coppia di offerte [primaria, secondaria] in base al profilo
const PROFILE_CTA: Record<string, [string, string]> = {
  zero: ["club", "coaching"],
  tempo: ["club", "coaching"],
  stallo: ["club", "coaching"],
  salto: ["coaching", "club"],
};

/* ── SCHERMO ── */
type Screen = "hero" | "quiz" | "email" | "result";

export default function QuizFisicoPage() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [profileKey, setProfileKey] = useState<string>("stallo");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [screen, step]);

  const pct = Math.round(((step - 1) / STEPS.length) * 100);
  const currentStepData = STEPS[step - 1];

  function selectSingle(key: string, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setTimeout(() => advance({ ...answers, [key]: value }), 300);
  }

  function toggleCheckbox(key: string, value: string) {
    setAnswers(prev => {
      const arr = (prev[key] as string[]) || [];
      const exists = arr.includes(value);
      return { ...prev, [key]: exists ? arr.filter(v => v !== value) : [...arr, value] };
    });
  }

  function advance(currentAnswers = answers) {
    if (step < STEPS.length) {
      setStep(s => s + 1);
    } else {
      setScreen("email");
      // Pixel Lead event
      if (typeof window !== "undefined") {
        window.fbq?.("track", "Lead");
      }
    }
    void currentAnswers;
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers, website: "" }),
      });
    } catch { /* non blocchiamo se fallisce */ }
    const pk = determineProfile(answers);
    setProfileKey(pk);
    setScreen("result");
    if (typeof window !== "undefined") window.fbq?.("track", "CompleteRegistration");
    if (typeof window !== "undefined") window.gtag?.("event", "quiz_complete", { profile: pk });
    setSubmitting(false);
  }

  function restart() {
    setAnswers({});
    setStep(1);
    setName("");
    setEmail("");
    setScreen("hero");
  }

  const profile = PROFILES[profileKey];
  const personalLine = buildPersonalLine(answers);
  const ctaPair = (PROFILE_CTA[profileKey] || PROFILE_CTA.stallo).map(k => CTA_CATALOG[k]);

  const checkboxAnswers = (answers[currentStepData?.key] as string[]) || [];
  const hasCheckboxSelection = checkboxAnswers.length > 0;

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{overflow-x:hidden;max-width:100%;}
        body{font-family:var(--font-dm-sans,'DM Sans',sans-serif);background:#0a0a0a;color:#fafaf8;min-height:100vh;overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .step-anim{animation:fadeUp 0.3s ease;}
        /* width:100% e min-width:0 sono obbligatori, non cosmetici: il body e'
           display:flex flex-col, e il "margin:0 auto" disattiva lo stretch sul
           lato corto. Senza width, questo blocco si dimensionava sul CONTENUTO
           (680px) anche su uno schermo da 375, sforava e veniva tagliato dal
           blocco anti-scroll-laterale. Su desktop non si notava perche' lo
           schermo e' piu' largo di 680: e' per questo che il difetto si vedeva
           solo su mobile. */
        .quiz-wrap{max-width:680px;width:100%;min-width:0;margin:0 auto;}
      `}</style>
      <div ref={topRef} />

      <div className="quiz-wrap" style={{ fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)", paddingBottom: 80 }}>

        {/* ═══ HERO ═══ */}
        {screen === "hero" && (
          // Ancorato in alto, non centrato: con la foto in fondo il blocco
          // centrato spingeva la foto sotto la piega. Cosi' ci sta tutto.
          <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "16px 24px 20px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse at center,rgba(0,203,219,0.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
              <p style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a9a94", marginBottom: 14 }}>DaveGamba.com</p>
              <div style={{ display: "inline-block", background: "rgba(0,203,219,0.1)", color: "#00CBDB", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(0,203,219,0.2)", marginBottom: 14 }}>
                Quiz Gratuito · 2 Minuti
              </div>
              <h1 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(38px,8vw,62px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 14, fontWeight: 800 }}>
                Scopri il tuo<br /><em style={{ fontStyle: "italic", color: "#00CBDB" }}>Profilo Fisico</em>
              </h1>
              <p style={{ fontSize: 16, color: "#9a9a94", fontWeight: 300, lineHeight: 1.65, marginBottom: 18 }}>
                6 domande per capire dove sei adesso<br />e qual è il piano giusto per il tuo fisico.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 18 }}>
                {[{ v: "3.000+", l: "Clienti seguiti" }, { v: "15+", l: "Anni di esperienza" }, { v: "2 min", l: "Per il tuo profilo" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: 22, fontWeight: 700, color: "#00CBDB", marginBottom: 4 }}>{s.v}</strong>
                    <span style={{ fontSize: 12, color: "#5a5a55" }}>{s.l}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setScreen("quiz")}
                style={{ display: "inline-block", background: "#00CBDB", color: "#0a0a0a", fontSize: 16, fontWeight: 700, padding: "18px 48px", borderRadius: 12, border: "none", cursor: "pointer", width: "100%", maxWidth: 360, letterSpacing: "0.01em", transition: "all 0.2s" }}>
                Inizia il Quiz →
              </button>
              <p style={{ fontSize: 11, color: "#5a5a55", marginTop: 16, lineHeight: 1.5 }}>
                Gratuito. Unisciti alle 15.000 persone che lo hanno già provato.
              </p>

              {/* Foto sotto la CTA: da' un volto a chi sta chiedendo 2 minuti.
                  Sta sotto la riga di rassicurazione apposta, cosi' il testo che
                  toglie attrito resta attaccato al bottone. */}
              <div style={{ marginTop: 18, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg"
                  alt="Dave Gamba"
                  style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", objectPosition: "center 30%", borderRadius: 16, display: "block" }}
                />
                <p style={{ fontSize: 11, color: "#5a5a55", marginTop: 10, lineHeight: 1.5 }}>
                  Dave Gamba. 15 anni di metodo Breve-Intenso-Mirato, oltre 3.000 persone seguite.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ QUIZ ═══ */}
        {screen === "quiz" && (
          <>
            {/* Progress */}
            <div style={{ padding: "20px 24px 0", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "#9a9a94", marginBottom: 8, fontWeight: 500 }}>{pct}% Completato</div>
              <div style={{ height: 6, background: "#1e1e1c", borderRadius: 100, position: "relative", overflow: "visible" }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg,#00CBDB,#f5c842)", borderRadius: 100, width: `${pct}%`, transition: "width 0.4s ease", position: "relative" }}>
                  <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, background: "#f5c842", borderRadius: "50%", border: "2px solid #0a0a0a" }} />
                </div>
              </div>
            </div>

            {/* Header */}
            <div style={{ padding: "20px 24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => step > 1 ? setStep(s => s - 1) : undefined}
                style={{ background: "none", border: "none", color: "#9a9a94", fontSize: 13, fontWeight: 500, cursor: step > 1 ? "pointer" : "default", display: "flex", alignItems: "center", gap: 6, padding: 0, opacity: step === 1 ? 0.3 : 1, pointerEvents: step === 1 ? "none" : "auto", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                ← BACK
              </button>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB" }}>
                STEP {step} OF {STEPS.length}
              </span>
            </div>

            {/* Step content */}
            {/* 16px di lato come il resto del sito: con 24px il quiz era piu'
                stretto delle altre pagine e sembrava rimpicciolito. */}
            <div key={step} className="step-anim" style={{ padding: "0 16px" }}>
              {/* Era clamp(22px,5vw,30px): su un telefono da 375px il 5vw vale
                  18.75px, sotto il minimo, quindi restava fisso a 22px mentre il
                  resto del sito titola a 36px. Alzato il minimo perche' su mobile
                  e' quello che comanda. */}
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(27px,6.8vw,34px)", lineHeight: 1.2, marginBottom: 8, fontWeight: 800 }}>{currentStepData.question}</h2>
              <p style={{ fontSize: 14, color: "#9a9a94", fontWeight: 300, marginBottom: 28 }}>{currentStepData.hint}</p>

              {/* image-grid-2 */}
              {currentStepData.type === "image-grid-2" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {currentStepData.options.map(opt => (
                    <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)}
                      style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `2px solid ${answers[currentStepData.key] === opt.value ? "#00CBDB" : "transparent"}`, transition: "all 0.2s", background: "#1a1a18", aspectRatio: "1/1" }}>
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: opt.gradient }}>
                        <span style={{ fontSize: 52 }}>{opt.icon}</span>
                      </div>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.88))", padding: "32px 14px 14px", fontSize: 14, fontWeight: 600, color: answers[currentStepData.key] === opt.value ? "#00CBDB" : "#fafaf8", lineHeight: 1.3, textAlign: "center" }}>
                        {opt.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* image-grid-3 */}
              {currentStepData.type === "image-grid-3" && (
                // Impilate in verticale, non affiancate: in riga da tre su telefono
                // diventavano francobolli col testo spezzato su 5 righe, e sotto
                // restava mezzo schermo vuoto.
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {currentStepData.options.map(opt => {
                    const sel = answers[currentStepData.key] === opt.value;
                    return (
                      <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)}
                        style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel ? "#00CBDB" : "transparent"}`, transition: "all 0.2s", background: "#1a1a18", aspectRatio: "16/7" }}>
                        {/* Background: foto reale o gradiente/emoji.
                            "center 25%" e non "center top": il taglio largo su una
                            foto verticale, ancorato in alto, tagliava le teste. */}
                        {opt.img ? (
                          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${opt.img}')`, backgroundSize: "cover", backgroundPosition: "center 25%" }} />
                        ) : (
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: opt.gradient }}>
                            <span style={{ fontSize: 42 }}>{opt.icon}</span>
                          </div>
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.2) 55%,transparent 100%)" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "26px 18px 14px", fontSize: 17, fontWeight: 600, color: sel ? "#00CBDB" : "#fafaf8", lineHeight: 1.25, textAlign: "left" }}>
                          {opt.label}
                        </div>
                        {sel && (
                          <div style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: "#00CBDB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ color: "#0a0a0a", fontSize: 11, fontWeight: 700 }}>✓</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* checkbox */}
              {currentStepData.type === "checkbox" && (
                <>
                  <div style={{ display: "grid", gap: 10 }}>
                    {currentStepData.options.map(opt => {
                      const sel = checkboxAnswers.includes(opt.value);
                      return (
                        <div key={opt.value} onClick={() => toggleCheckbox(currentStepData.key, opt.value)}
                          style={{ display: "flex", alignItems: "center", gap: 14, background: sel ? "rgba(0,203,219,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${sel ? "#00CBDB" : "#222220"}`, borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 0.2s", fontSize: 15, color: sel ? "#fafaf8" : "#e4e4e0", lineHeight: 1.5 }}>
                          <div style={{ width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${sel ? "#00CBDB" : "#5a5a55"}`, background: sel ? "#00CBDB" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                            {sel && <span style={{ color: "#0a0a0a", fontSize: 12, fontWeight: 700 }}>✓</span>}
                          </div>
                          <span>{opt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => hasCheckboxSelection && advance()}
                    style={{ marginTop: 24, width: "100%", background: "#00CBDB", color: "#0a0a0a", fontSize: 15, fontWeight: 700, padding: 17, borderRadius: 12, border: "none", cursor: hasCheckboxSelection ? "pointer" : "default", opacity: hasCheckboxSelection ? 1 : 0.4, pointerEvents: hasCheckboxSelection ? "auto" : "none", transition: "all 0.2s" }}>
                    Continua →
                  </button>
                </>
              )}

              {/* buttons */}
              {currentStepData.type === "buttons" && (
                <div style={{ display: "grid", gap: 10 }}>
                  {currentStepData.options.map(opt => {
                    const sel = answers[currentStepData.key] === opt.value;
                    return (
                      <button key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)}
                        style={{ background: sel ? "rgba(0,203,219,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${sel ? "#00CBDB" : "#222220"}`, borderRadius: 12, color: sel ? "#fafaf8" : "#e4e4e0", fontFamily: "inherit", fontSize: 15, fontWeight: 400, padding: "17px 20px", cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* numbered */}
              {currentStepData.type === "numbered" && (
                <div style={{ display: "grid", gap: 12 }}>
                  {currentStepData.options.map(opt => {
                    const sel = answers[currentStepData.key] === opt.value;
                    return (
                      <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)}
                        style={{ display: "flex", alignItems: "center", gap: 20, background: sel ? "rgba(0,203,219,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${sel ? "#00CBDB" : "#222220"}`, borderRadius: 12, padding: "20px 22px", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${sel ? "#00CBDB" : "rgba(0,203,219,0.55)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#00CBDB", flexShrink: 0, transition: "all 0.2s" }}>
                          {opt.num}
                        </div>
                        <div>
                          <strong style={{ display: "block", fontSize: 16, fontWeight: 600, color: "#fafaf8", marginBottom: 3 }}>{opt.label}</strong>
                          <span style={{ fontSize: 13, color: "#9a9a94", fontWeight: 300 }}>{opt.sub}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══ EMAIL CAPTURE ═══ */}
        {screen === "email" && (
          <div style={{ padding: "0 24px 80px", animation: "fadeUp 0.35s ease" }}>
            {/* Progress 100% */}
            <div style={{ padding: "20px 0 0", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "#9a9a94", marginBottom: 8, fontWeight: 500 }}>Il tuo piano è quasi pronto</div>
              <div style={{ height: 6, background: "#1e1e1c", borderRadius: 100 }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg,#00CBDB,#f5c842)", borderRadius: 100, width: "100%", position: "relative" }}>
                  <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, background: "#f5c842", borderRadius: "50%", border: "2px solid #0a0a0a" }} />
                </div>
              </div>
            </div>
            <div style={{ paddingTop: 40, textAlign: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 14, display: "block" }}>Step Finale</span>
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(32px,8vw,46px)", lineHeight: 1.1, marginBottom: 10, fontWeight: 800 }}>
                Il tuo profilo è pronto 🔥
              </h2>
              <p style={{ fontSize: 15, color: "#9a9a94", fontWeight: 300, lineHeight: 1.6, marginBottom: 36 }}>
                Vedi subito il tuo <strong style={{ color: "#fafaf8" }}>profilo fisico completo</strong> qui sotto: analisi, cosa sta succedendo davvero e le mosse da applicare da subito.
              </p>
              <form onSubmit={submitEmail} style={{ display: "grid", gap: 12 }}>
                {/* Honeypot */}
                <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="given-name" required
                  style={{ width: "100%", height: 52, padding: "0 18px", background: "rgba(255,255,255,0.05)", border: "1px solid #222220", borderRadius: 12, color: "#fafaf8", fontFamily: "inherit", fontSize: 16, outline: "none", textAlign: "left" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="email" required
                  style={{ width: "100%", height: 52, padding: "0 18px", background: "rgba(255,255,255,0.05)", border: "1px solid #222220", borderRadius: 12, color: "#fafaf8", fontFamily: "inherit", fontSize: 16, outline: "none", textAlign: "left" }} />
                <button type="submit" disabled={submitting}
                  style={{ width: "100%", background: "#00CBDB", color: "#0a0a0a", fontFamily: "inherit", fontSize: 16, fontWeight: 700, padding: 18, borderRadius: 12, border: "none", cursor: "pointer", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Un momento..." : "Mostrami il mio profilo →"}
                </button>
              </form>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
                {["🔒 100% Privato", "🚫 Zero Spam", "⚡ Accesso Immediato"].map(t => (
                  <span key={t} style={{ fontSize: 12, color: "#5a5a55", display: "flex", alignItems: "center", gap: 5 }}>{t}</span>
                ))}
              </div>

              {/* ANTEPRIMA SFOCATA — e' il profilo VERO, gia' calcolato dalle
                  risposte: determineProfile e' una funzione pura e a questo punto
                  le risposte sono complete. Mostrarlo sfocato rende il premio
                  concreto: si vede che c'e', non si legge. */}
              {(() => {
                const anteprima = PROFILES[determineProfile(answers)];
                if (!anteprima) return null;
                return (
                  <div style={{ position: "relative", marginTop: 36, textAlign: "left" }}>
                    <div aria-hidden style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none", opacity: 0.75 }}>
                      <div style={{ textAlign: "center", marginBottom: 18 }}>
                        <span style={{ fontSize: 48, display: "block", marginBottom: 8 }}>{anteprima.icon}</span>
                        <div style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 30, fontWeight: 900, lineHeight: 1.1 }}>{anteprima.name}</div>
                        <div style={{ fontSize: 15, color: "#9a9a94", marginTop: 6 }}>{anteprima.tagline}</div>
                      </div>
                      <div style={{ background: "linear-gradient(135deg,rgba(245,200,66,0.08) 0%,rgba(245,200,66,0.02) 100%)", border: "1px solid rgba(245,200,66,0.25)", borderRadius: 16, padding: 24 }}>
                        <h4 style={{ fontSize: 15, fontWeight: 800, fontStyle: "italic", color: "#f5c842", marginBottom: 12 }}>Cosa sta succedendo davvero</h4>
                        <p style={{ fontSize: 15, color: "#e4e4e0", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: anteprima.analysis }} />
                      </div>
                    </div>

                    {/* Sfuma verso il fondo pagina: il testo non finisce di netto,
                        sembra che continui sotto. */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0) 30%, rgba(10,10,10,0.85) 75%, #0a0a0a 100%)", pointerEvents: "none" }} />

                    <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, textAlign: "center", pointerEvents: "none" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(0,203,219,0.12)", border: "1px solid rgba(0,203,219,0.35)", color: "#00CBDB", fontSize: 13, fontWeight: 600, padding: "9px 18px", borderRadius: 100 }}>
                        🔒 Inserisci la mail qui sopra per leggerlo
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ═══ RISULTATI ═══ */}
        {screen === "result" && profile && (
          <div style={{ padding: "0 24px 80px", animation: "fadeUp 0.4s ease" }}>
            {/* Hero risultato */}
            <div style={{ textAlign: "center", padding: "48px 0 40px" }}>
              <span style={{ fontSize: 64, marginBottom: 16, display: "block" }}>{profile.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 12, display: "block" }}>Il tuo Profilo Fisico</span>
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(34px,7vw,52px)", lineHeight: 1.05, marginBottom: 16, fontWeight: 900 }}>{profile.name}</h2>
              <p style={{ fontSize: 16, color: "#9a9a94", fontWeight: 300, lineHeight: 1.65, maxWidth: 400, margin: "0 auto" }}>{profile.tagline}</p>
            </div>

            {/* Riga personalizzata sulle risposte */}
            {personalLine && (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #222220", borderRadius: 12, padding: "16px 20px", marginBottom: 14, fontSize: 14, color: "#c8c8c4", lineHeight: 1.6, textAlign: "center" }}
                dangerouslySetInnerHTML={{ __html: personalLine }} />
            )}

            {/* Card analisi */}
            <div style={{ background: "linear-gradient(135deg,rgba(245,200,66,0.08) 0%,rgba(245,200,66,0.02) 100%)", border: "1px solid rgba(245,200,66,0.25)", borderRadius: 16, padding: 28, marginBottom: 14 }}>
              <h4 style={{ fontSize: 15, fontWeight: 800, fontStyle: "italic", color: "#f5c842", marginBottom: 14, display: "block" }}>Cosa sta succedendo davvero</h4>
              <p style={{ fontSize: 15, color: "#e4e4e0", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: profile.analysis }} />
            </div>

            {/* Card tips */}
            <div style={{ background: "linear-gradient(135deg,rgba(0,203,219,0.07) 0%,rgba(0,203,219,0.02) 100%)", border: "1px solid rgba(0,203,219,0.2)", borderRadius: 16, padding: 28, marginBottom: 14 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#00CBDB", marginBottom: 14, display: "block" }}>✅ 3 mosse da applicare subito</h3>
              <ul style={{ listStyle: "none", display: "grid", gap: 14 }}>
                {profile.tips.map((tip, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, fontSize: 15, color: "#e4e4e0", lineHeight: 1.6 }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", border: "1.5px solid #00CBDB", color: "#00CBDB", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: tip }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA section */}
            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(26px,5.5vw,36px)", textAlign: "center", lineHeight: 1.15, marginBottom: 10, fontWeight: 900 }}>
                Sei a <span style={{ color: "#f5c842" }}>1 passo</span> dal trasformare<br />definitivamente il tuo fisico
              </h2>
              <p style={{ fontSize: 15, color: "#9a9a94", textAlign: "center", fontWeight: 300, lineHeight: 1.6, marginBottom: 28 }}>
                In base alle tue risposte la strada più rapida per il fisico che vuoi sono i Protocolli:
              </p>

              {/* CTA card DG Athletic Club */}
              <p style={{ fontSize: 14, color: "#c8c8c4", lineHeight: 1.65, marginBottom: 14 }}>
                Per avere un percorso progressivo, Corsi Focus e una community che ti segue ogni settimana, scopri il Club:
              </p>
              <a href="https://club.davegamba.com/entra-nel-club" target="_blank" rel="noopener noreferrer"
                style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid rgba(0,203,219,0.5)", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none", marginBottom: 32 }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
                <div style={{ position: "relative", zIndex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "inline-block", background: "#00CBDB", color: "#0a0a0a", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, alignSelf: "flex-start" }}>Membership</div>
                  <h3 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 22, fontWeight: 900, lineHeight: 1.2, color: "#fafaf8" }}>DG Athletic<br />Club</h3>
                  <div style={{ display: "block", background: "#00CBDB", color: "#0a0a0a", fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, textAlign: "center" }}>Entra nel Club →</div>
                </div>
              </a>

              {/* CTA card Coaching */}
              <p style={{ fontSize: 14, color: "#c8c8c4", lineHeight: 1.65, marginBottom: 14 }}>
                Se vuoi il massimo ed essere seguito personalmente da Dave nella tua trasformazione fisica, scopri il Coaching:
              </p>
              <a href="https://davegamba.com/coaching#candidati" target="_blank" rel="noopener noreferrer"
                style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid rgba(245,200,66,0.5)", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none", marginBottom: 24 }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
                <div style={{ position: "relative", zIndex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "inline-block", background: "#f5c842", color: "#0a0a0a", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, alignSelf: "flex-start" }}>Servizio Premium</div>
                  <h3 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 22, fontWeight: 900, lineHeight: 1.2, color: "#fafaf8" }}>Coaching<br />Personale 1:1</h3>
                  <div style={{ display: "block", background: "#f5c842", color: "#0a0a0a", fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, textAlign: "center" }}>Vai al Coaching →</div>
                </div>
              </a>

              <button onClick={restart}
                style={{ display: "block", textAlign: "center", fontSize: 13, color: "#5a5a55", cursor: "pointer", marginTop: 8, background: "none", border: "none", fontFamily: "inherit", width: "100%", transition: "color 0.2s" }}>
                ↩ Rifai il quiz
              </button>
            </div>

            {/* Strip testimoniali */}
            <div style={{ margin: "40px -24px 0", overflow: "hidden" }}>
              <style>{`
                @keyframes marqueeQuiz { from { transform: translateX(0); } to { transform: translateX(-50%); } }
              `}</style>
              <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a55", marginBottom: 16 }}>Risultati reali da clienti reali</p>
              <div style={{ display: "flex", gap: 12, width: "max-content", animation: "marqueeQuiz 40s linear infinite" }}>
                {[...TESTIMONIAL_PHOTOS, ...TESTIMONIAL_PHOTOS].map((src, i) => (
                  <img key={i} src={src} alt="Risultato" loading="lazy"
                    style={{ width: 160, height: 160, objectFit: "cover", objectPosition: "center top", borderRadius: 14, flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {screen === "result" && (
          <div style={{ textAlign: "center", padding: "32px 24px", fontSize: 12, color: "#5a5a55" }}>
            © Dave Gamba · <a href="https://davegamba.com" style={{ color: "#5a5a55", textDecoration: "none" }}>davegamba.com</a>
          </div>
        )}
      </div>
    </>
  );
}
