"use client";

import { useState, useEffect, useRef } from "react";

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
      { value: "20", label: "Meno di 20 minuti" },
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
    analysis: `Non è che non sai abbastanza. È che fuori c'è troppo da scegliere. Keto, digiuno intermittente, calisthenics, pesi, HIIT, funzionale — ognuno giura che il suo metodo sia quello giusto. Il risultato? Non parti. O parti e molli dopo due settimane perché non sei sicuro di stare facendo la cosa giusta. <strong>La paralisi da scelta blocca più della pigrizia.</strong> Non ti serve trovare il metodo perfetto tra mille — ti servono i principi base che funzionano per tutti, applicati con costanza.`,
    tips: [
      "<strong>Scegli 5 esercizi e basta.</strong> Squat, stacco, panca, rematore, spinta sopra la testa. Basta. Non cercare varianti, non ottimizzare. Ripetili finché non li padroneggi. La padronanza di pochi movimenti batte la varietà casuale ogni volta.",
      "<strong>Una sola regola a tavola per iniziare.</strong> Proteine ad ogni pasto. Non serve contare niente, non serve eliminare niente. Solo questo. Quando diventa automatico, aggiungi la prossima regola.",
      "<strong>3 sessioni a settimana, non di più.</strong> Chi inizia tende a fare troppo troppo presto — e molla. Il corpo si trasforma nella continuità, non nello sforzo massimo della prima settimana.",
    ],
  },
  stallo: {
    icon: "⚡",
    name: "In Stallo",
    tagline: "Ti alleni. Ma ti alleni sempre uguale.",
    analysis: `Ti alleni. Ci vai, non salti, non molli. Eppure il fisico non si muove più. Questo è il punto più frustrante dell'allenamento — perché la colpa non è la pigrizia, e lo sai. <strong>Il problema è che il corpo si è adattato.</strong> È progettato per farlo: ogni stimolo che ripeti uguale, nel tempo, smette di produrre risposta. Il tuo allenamento è diventato una manutenzione. Non un miglioramento.`,
    tips: [
      "<strong>Ogni sessione deve avere un numero da battere.</strong> Un chilo in più, un rep in più, un secondo di recupero in meno. Se non c'è un obiettivo numerico, non c'è stimolo. Semplice così.",
      "<strong>Tieni un log.</strong> Anche su carta, anche sul telefono. Chi non misura non migliora — non perché è una regola motivazionale, ma perché senza dati non sai cosa cambiare. È il gesto più piccolo con il ritorno più alto.",
      "<strong>Cambia il parametro, non l'esercizio.</strong> Prima di buttare uno squat o una panca, prova a variare tempi di esecuzione, recuperi o carico. Il problema non è quasi mai l'esercizio — è come lo stai facendo.",
    ],
  },
  salto: {
    icon: "🏆",
    name: "Salto di Livello",
    tagline: "Ci sei. Ora si lavora sui dettagli.",
    analysis: `Sei già avanti rispetto al 90% delle persone. Ti alleni con costanza, sai come farlo, i fondamentali li hai. Ma senti che c'è un soffitto — e fai fatica a capire dove sia. <strong>A questo livello il problema non è lavorare di più. È che i progressi si nascondono nei dettagli.</strong> Un centimetro di ROM in meno, un recupero troppo corto, un deficit proteico leggero che si accumula — sono cose invisibili ai principianti ma che a te fanno la differenza tra migliorare e stagnare.`,
    tips: [
      "<strong>Controlla l'esecuzione, non solo il carico.</strong> Filma qualche serie. ROM completo, tempo sotto tensione corretto, controllo della fase eccentrica. Spesso il limite non è la forza — è la qualità del movimento che lascia progressi sul tavolo.",
      "<strong>Calcola i tuoi macro almeno una volta.</strong> Non serve farlo per sempre. Ma sapere il tuo mantenimento calorico e il tuo fabbisogno proteico reale — non stimato — ti dà un controllo che la maggior parte delle persone non avrà mai.",
      "<strong>Tratta il recupero come allenamento.</strong> Sonno, gestione dello stress, mobilità. A questo livello guadagni tanto fuori dalla palestra quanto dentro. È lì che si nasconde ancora molto margine.",
    ],
  },
  tempo: {
    icon: "⏱️",
    name: "Zero Tempo, Massimo Risultato",
    tagline: "Il problema non è il tempo. È come lo stai usando.",
    analysis: `Non hai tempo. O meglio — hai il tempo che hai, e non è molto. E senti che non basta per fare le cose per bene. <strong>Ma il problema non è quanto tempo hai. È come lo stai usando.</strong> La maggior parte del tempo in palestra viene sprecato: recuperi lunghi, esercizi accessori che non spostano niente, volume che stanca senza costruire. Con la sequenza giusta, 21 minuti producono più stimolo di un'ora fatta a caso.`,
    tips: [
      "<strong>21 minuti sono sufficienti.</strong> Con gli esercizi giusti, nell'ordine giusto, con il recupero calibrato — è tutto quello che serve. L'efficacia non dipende dalla durata, dipende dalla densità del lavoro fatto.",
      "<strong>Usa le superserie.</strong> Due esercizi in sequenza senza riposo tra loro. Si dimezza il tempo, si raddoppia la densità. È il principio che permette di fare in 21 minuti quello che altri fanno in un'ora.",
      "<strong>3 volte a settimana, non di più.</strong> Con i tuoi ritmi, il recupero è parte del processo. Chi si allena 5 volte con poco tempo ottiene meno di chi si allena 3 volte in modo mirato. Meno è più — se il meno è fatto bene.",
    ],
  },
};

function determineProfile(answers: Record<string, string | string[]>): string {
  const livello = answers["livello"] as string;
  const blocchi = (answers["blocchi"] as string[]) || [];
  if (livello === "avanzato") return "salto";
  if (blocchi.includes("tempo")) return "tempo";
  if (livello === "principiante") return "zero";
  return "stallo";
}

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
  const [countdown, setCountdown] = useState(15 * 60);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [screen, step]);

  // Countdown sui risultati
  useEffect(() => {
    if (screen !== "result") return;
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(15 * 60);
    countdownRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(countdownRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [screen]);

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
        // @ts-expect-error fbq global
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
    // @ts-expect-error fbq global
    if (typeof window !== "undefined" && window.fbq) window.fbq("track", "CompleteRegistration");
    // @ts-expect-error gtag global
    if (typeof window !== "undefined" && window.gtag) window.gtag("event", "quiz_complete", { profile: pk });
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
  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

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
        .quiz-wrap{max-width:680px;margin:0 auto;}
      `}</style>
      <div ref={topRef} />

      <div className="quiz-wrap" style={{ fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)", paddingBottom: 80 }}>

        {/* ═══ HERO ═══ */}
        {screen === "hero" && (
          <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse at center,rgba(0,203,219,0.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
              <p style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a9a94", marginBottom: 40 }}>DaveGamba.com</p>
              <div style={{ display: "inline-block", background: "rgba(0,203,219,0.1)", color: "#00CBDB", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(0,203,219,0.2)", marginBottom: 28 }}>
                Quiz Gratuito · 2 Minuti
              </div>
              <h1 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(38px,8vw,62px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Scopri il tuo<br /><em style={{ fontStyle: "italic", color: "#00CBDB" }}>Profilo Fisico</em>
              </h1>
              <p style={{ fontSize: 16, color: "#9a9a94", fontWeight: 300, lineHeight: 1.65, marginBottom: 40 }}>
                6 domande per capire dove sei adesso<br />e qual è il piano giusto per il tuo fisico.
              </p>
              <div style={{ display: "flex", gap: 32, justifyContent: "center", marginBottom: 40 }}>
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
            <div key={step} className="step-anim" style={{ padding: "0 24px" }}>
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(22px,5vw,30px)", lineHeight: 1.2, marginBottom: 8 }}>{currentStepData.question}</h2>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "0 -8px" }}>
                  {currentStepData.options.map(opt => {
                    const sel = answers[currentStepData.key] === opt.value;
                    return (
                      <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)}
                        style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel ? "#00CBDB" : "transparent"}`, transition: "all 0.2s", background: "#1a1a18", aspectRatio: "3/4" }}>
                        {/* Background: foto reale o gradiente/emoji */}
                        {opt.img ? (
                          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${opt.img}')`, backgroundSize: "cover", backgroundPosition: "center top" }} />
                        ) : (
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: opt.gradient }}>
                            <span style={{ fontSize: 42 }}>{opt.icon}</span>
                          </div>
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.2) 55%,transparent 100%)" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 10px 12px", fontSize: 13, fontWeight: 600, color: sel ? "#00CBDB" : "#fafaf8", lineHeight: 1.3, textAlign: "center" }}>
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
                        <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${sel ? "#00CBDB" : "#5a5a55"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: sel ? "#00CBDB" : "#9a9a94", flexShrink: 0, transition: "all 0.2s" }}>
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
            <div style={{ paddingTop: 40 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 14, display: "block" }}>Step Finale</span>
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(28px,6vw,40px)", lineHeight: 1.1, marginBottom: 10 }}>
                Il Piano del tuo profilo<br />è pronto 🔥
              </h2>
              <p style={{ fontSize: 15, color: "#9a9a94", fontWeight: 300, lineHeight: 1.6, marginBottom: 36 }}>
                Inserisci nome e email per ricevere il tuo piano di partenza:
              </p>
              <form onSubmit={submitEmail} style={{ display: "grid", gap: 12 }}>
                {/* Honeypot */}
                <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="given-name" required
                  style={{ width: "100%", height: 52, padding: "0 18px", background: "rgba(255,255,255,0.05)", border: "1px solid #222220", borderRadius: 12, color: "#fafaf8", fontFamily: "inherit", fontSize: 16, outline: "none" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="email" required
                  style={{ width: "100%", height: 52, padding: "0 18px", background: "rgba(255,255,255,0.05)", border: "1px solid #222220", borderRadius: 12, color: "#fafaf8", fontFamily: "inherit", fontSize: 16, outline: "none" }} />
                <button type="submit" disabled={submitting}
                  style={{ width: "100%", background: "#00CBDB", color: "#0a0a0a", fontFamily: "inherit", fontSize: 16, fontWeight: 700, padding: 18, borderRadius: 12, border: "none", cursor: "pointer", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Un momento..." : "Ottieni il tuo piano gratuito →"}
                </button>
              </form>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
                {["🔒 100% Privato", "🚫 Zero Spam", "⚡ Accesso Immediato"].map(t => (
                  <span key={t} style={{ fontSize: 12, color: "#5a5a55", display: "flex", alignItems: "center", gap: 5 }}>{t}</span>
                ))}
              </div>
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
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(34px,7vw,52px)", lineHeight: 1.05, marginBottom: 16, fontWeight: 800 }}>{profile.name}</h2>
              <p style={{ fontSize: 16, color: "#9a9a94", fontWeight: 300, lineHeight: 1.65, maxWidth: 400, margin: "0 auto" }}>{profile.tagline}</p>
            </div>

            {/* Card analisi */}
            <div style={{ background: "linear-gradient(135deg,rgba(255,80,80,0.08) 0%,rgba(255,80,80,0.02) 100%)", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 16, padding: 28, marginBottom: 14 }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, fontStyle: "italic", color: "#ff6b6b", marginBottom: 14, display: "block" }}>Cosa sta succedendo davvero</h4>
              <p style={{ fontSize: 15, color: "#e4e4e0", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: profile.analysis }} />
            </div>

            {/* Card tips */}
            <div style={{ background: "linear-gradient(135deg,rgba(0,203,219,0.07) 0%,rgba(0,203,219,0.02) 100%)", border: "1px solid rgba(0,203,219,0.2)", borderRadius: 16, padding: 28, marginBottom: 14 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#00CBDB", marginBottom: 14, display: "block" }}>3 mosse da applicare subito</h3>
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
              <h2 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: "clamp(26px,5.5vw,36px)", textAlign: "center", lineHeight: 1.15, marginBottom: 10, fontWeight: 800 }}>
                Sei a <span style={{ color: "#f5c842" }}>1 passo</span> dal trasformare<br />definitivamente il tuo fisico
              </h2>
              <p style={{ fontSize: 15, color: "#9a9a94", textAlign: "center", fontWeight: 300, lineHeight: 1.6, marginBottom: 28 }}>
                In base alle tue risposte la strada più rapida per il fisico che vuoi sono i Protocolli:
              </p>

              {/* Countdown */}
              <div style={{ background: "rgba(0,203,219,0.06)", border: "1px solid rgba(0,203,219,0.2)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 20 }}>⏳</div>
                <div style={{ flex: 1, fontSize: 13, color: "#9a9a94", lineHeight: 1.4 }}>
                  <strong style={{ color: "#fafaf8", display: "block", fontSize: 12, marginBottom: 2 }}>Offerta a tempo limitato</strong>
                  Questo prezzo speciale scade tra
                </div>
                <div style={{ fontFamily: "inherit", fontSize: 22, fontWeight: 700, color: countdown <= 60 ? "#ff6b6b" : "#00CBDB", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                  {mm}:{ss}
                </div>
              </div>

              {/* CTA cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                <a href="https://sfidaestiva.davegamba.com/" target="_blank" rel="noopener noreferrer"
                  style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid rgba(0,203,219,0.5)", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none", transition: "border-color 0.2s" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/foto-sfida-estiva.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
                  <div style={{ position: "relative", zIndex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "inline-block", background: "#00CBDB", color: "#0a0a0a", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, alignSelf: "flex-start" }}>Offerta a tempo limitato</div>
                    <h3 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 18, lineHeight: 1.2, color: "#fafaf8" }}>Sfida Estiva<br />21 Giorni</h3>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#fafaf8" }}>€33</div>
                    <div style={{ display: "block", background: "#00CBDB", color: "#0a0a0a", fontSize: 13, fontWeight: 700, padding: 11, borderRadius: 8, textAlign: "center" }}>Inizia subito →</div>
                  </div>
                </a>
                <a href="https://davegamba.com/coaching#candidati" target="_blank" rel="noopener noreferrer"
                  style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid rgba(245,200,66,0.5)", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg')", backgroundSize: "cover", backgroundPosition: "center top" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
                  <div style={{ position: "relative", zIndex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "inline-block", background: "#f5c842", color: "#0a0a0a", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, alignSelf: "flex-start" }}>Servizio Premium</div>
                    <h3 style={{ fontFamily: "var(--font-dm-serif,'DM Serif Display',serif)", fontSize: 18, lineHeight: 1.2, color: "#fafaf8" }}>Coaching<br />Personale 1:1</h3>
                    <div style={{ display: "block", background: "#f5c842", color: "#0a0a0a", fontSize: 13, fontWeight: 700, padding: 11, borderRadius: 8, textAlign: "center" }}>Prenota una call →</div>
                  </div>
                </a>
              </div>

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
              <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5a55", marginBottom: 16 }}>Risultati reali dei clienti</p>
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
