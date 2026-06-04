"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { determineProfile } from "@/lib/quiz";
import Header from "@/components/Header";

/* ─── TYPES ─── */
type Screen = "hero" | "quiz" | "email" | "result";
type Answers = Record<string, string | string[]>;

type StepOption = {
  value: string;
  label: string;
  gradient?: string;
  icon?: string;
  num?: string;
  sub?: string;
};

type Step = {
  type: "image-grid-2" | "image-grid-3" | "checkbox" | "buttons" | "numbered";
  question: string;
  hint: string;
  key: string;
  options: StepOption[];
};

/* ─── DATI STEPS ─── */
const steps: Step[] = [
  {
    type: "image-grid-2",
    question: "Qual è il tuo obiettivo principale?",
    hint: "Seleziona uno per iniziare",
    key: "obiettivo",
    options: [
      { value: "asciutto", label: "Diventare più asciutto e definito", gradient: "linear-gradient(135deg,#0d2b30,#1a4a50)", icon: "🏃" },
      { value: "massa", label: "Costruire massa muscolare", gradient: "linear-gradient(135deg,#2b1a0d,#4a2f1a)", icon: "💪" },
      { value: "peso", label: "Perdere peso per salute e stare bene", gradient: "linear-gradient(135deg,#0d2b1a,#1a4a30)", icon: "❤️" },
      { value: "atletico", label: "Diventare più agile e atletico", gradient: "linear-gradient(135deg,#1a0d2b,#2f1a4a)", icon: "⚡" },
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
    type: "image-grid-3",
    question: "Il tuo fisico ideale?",
    hint: "Scegli il risultato che vuoi raggiungere",
    key: "fisico",
    options: [
      { value: "sottile", label: "Sottile e asciutto", gradient: "linear-gradient(135deg,#0d2030,#1a3850)", icon: "🏊" },
      { value: "atletico", label: "Atletico e scolpito", gradient: "linear-gradient(135deg,#002020,#003535)", icon: "🏋️" },
      { value: "grosso", label: "Grosso e forte", gradient: "linear-gradient(135deg,#200a0a,#3a1515)", icon: "🦁" },
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
      { value: "intermedio", num: "2", label: "Intermedio", sub: "1–3 anni di allenamento con qualche continuità" },
      { value: "avanzato", num: "3", label: "Avanzato", sub: "3+ anni di allenamento serio e costante" },
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

/* ─── PROFILI ─── */
const profiles: Record<string, { icon: string; name: string; tagline: string; analysis: string; tips: string[] }> = {
  zero: {
    icon: "🚀",
    name: "Da Zero a Fit",
    tagline: "Il tuo problema non è la motivazione. È il troppo.",
    analysis: `Hai provato cose diverse, schede diverse, forse diete diverse. Risultato: confusione e zero progressi stabili. <strong>Il troppo blocca più della pigrizia.</strong> Il cervello in sovraccarico di informazioni sceglie l'inerzia. La soluzione non è trovare la strategia giusta tra mille — è scegliere le poche cose che producono il 90% dei risultati e diventare bravo in quelle.`,
    tips: [
      "<strong>Dimentica la varietà.</strong> Scegli 5 esercizi fondamentali e ripetili fino a padroneggiarli. La padronanza dei fondamentali batte sempre la varietà casuale.",
      "<strong>A tavola, stessa logica.</strong> Impara prima una sola cosa: mangiare abbastanza proteine ad ogni pasto. Solo questo. Poi aggiungi.",
      "<strong>3 sessioni a settimana, niente di più.</strong> La costanza su poco batte l'intensità su tutto. Il corpo si trasforma nella continuità.",
    ],
  },
  stallo: {
    icon: "⚡",
    name: "In Stallo",
    tagline: "Ti alleni. Ma ti alleni sempre uguale.",
    analysis: `Il corpo si adatta. È progettato per farlo. Se fai le stesse serie, gli stessi pesi, gli stessi esercizi — smette di rispondere. <strong>Non è colpa tua, è fisiologia.</strong> Lo stimolo si esaurisce quando non cresce. Senza una progressione mirata, il tuo allenamento diventa una manutenzione, non un miglioramento.`,
    tips: [
      "<strong>Progressione mirata, non a occhio.</strong> Ogni sessione deve avere un numero da battere — un chilo in più, un rep in più.",
      "<strong>Tieni un log.</strong> Anche su carta. Chi non misura non migliora. Chi misura migliora quasi sempre.",
      "<strong>Cambia il parametro, non l'esercizio.</strong> Prima di buttare un esercizio, prova a variare tempi di esecuzione, recuperi o carico.",
    ],
  },
  salto: {
    icon: "🏆",
    name: "Salto di Livello",
    tagline: "Bravo. Ora è il momento di fare cose diverse.",
    analysis: `Sei già avanti rispetto al 90% delle persone — ti alleni con costanza. Questo è il vero vantaggio competitivo. Ma per fare il salto di qualità <strong>non serve lavorare di più. Serve lavorare in modo diverso.</strong> A questo livello i guadagni vengono dai dettagli: esecuzione, recupero, periodizzazione, alimentazione di precisione.`,
    tips: [
      "<strong>I dettagli fanno la differenza.</strong> Un centimetro di ROM in più, il tempo sotto tensione corretto, la qualità del recupero tra le serie.",
      "<strong>Alimentazione di precisione.</strong> Capire una volta i tuoi macro di mantenimento e di surplus ti dà un controllo che la maggior parte non ha mai avuto.",
      "<strong>Il recovery è allenamento.</strong> Sonno, gestione dello stress, mobilità. Lì c'è ancora molto margine.",
    ],
  },
  tempo: {
    icon: "⏱️",
    name: "Zero Tempo, Massimo Risultato",
    tagline: "Il problema non è il tempo. È lo spreco di tempo.",
    analysis: `Un allenamento efficace non richiede un'ora. Richiede la giusta sequenza. <strong>La maggior parte del tempo in palestra viene sprecato</strong> — recuperi troppo lunghi, esercizi accessori inutili, volume eccessivo. Con il metodo giusto, 21 minuti producono più stimolo di un'ora random.`,
    tips: [
      "<strong>21 minuti sono sufficienti.</strong> Con gli esercizi giusti, nell'ordine giusto, con il recupero calibrato — è tutto quello che serve.",
      "<strong>Superserie intelligenti.</strong> Due esercizi in sequenza senza riposo tra loro. Si dimezza il tempo, si raddoppia la densità di lavoro.",
      "<strong>3 volte a settimana, non di più.</strong> Con il tuo stile di vita, il recupero è parte del processo.",
    ],
  },
};

/* ─── COMPONENTE ─── */
export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [profileKey, setProfileKey] = useState("");
  const [countdown, setCountdown] = useState(15 * 60);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (screen === "result") {
      countdownRef.current = setInterval(() => {
        setCountdown((c) => (c > 0 ? c - 1 : 0));
      }, 1000);
    }
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [screen]);

  const pct = Math.round(((step - 1) / steps.length) * 100);
  const currentStepData = steps[step - 1];

  function selectSingle(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => advance({ ...answers, [key]: value }), 300);
  }

  function toggleCheckbox(key: string, value: string) {
    setAnswers((prev) => {
      const arr = (prev[key] as string[]) || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }

  function advance(currentAnswers = answers) {
    if (step < steps.length) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setScreen("email");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    try {
      await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers, website: honeypot }),
      });
    } catch {
      // fallback silenzioso — mostra comunque il risultato
    }
    const pk = determineProfile(answers);
    setProfileKey(pk);
    setScreen("result");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");
  const timerColor = countdown <= 60 ? "#ff6b6b" : "#00CBDB";

  const checkboxArr = (answers[currentStepData?.key] as string[]) || [];

  /* ─── HERO ─── */
  if (screen === "hero") return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
      <Header />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px 80px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse at center, rgba(0,203,219,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a9a94", marginBottom: 40 }}>DaveGamba.com</p>
          <div style={{ display: "inline-block", background: "rgba(0,203,219,0.1)", color: "#00CBDB", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(0,203,219,0.2)", marginBottom: 28 }}>Quiz Gratuito · 2 Minuti</div>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(38px,8vw,62px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fafaf8", marginBottom: 20 }}>
            Scopri il tuo<br /><em style={{ fontStyle: "italic", color: "#00CBDB" }}>Profilo Fisico</em>
          </h1>
          <p style={{ fontSize: 16, color: "#9a9a94", fontWeight: 300, lineHeight: 1.65, marginBottom: 40 }}>7 domande per capire dove sei adesso<br />e qual è il piano giusto per il tuo fisico.</p>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginBottom: 40 }}>
            {[["3.000+", "Clienti seguiti"], ["15+", "Anni di esperienza"], ["2 min", "Per il tuo profilo"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <strong style={{ display: "block", fontSize: 22, fontWeight: 700, color: "#00CBDB", marginBottom: 4 }}>{v}</strong>
                <span style={{ fontSize: 12, color: "#5a5a55" }}>{l}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setScreen("quiz")} style={{ display: "block", background: "#00CBDB", color: "#0a0a0a", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 16, fontWeight: 700, padding: "18px 48px", borderRadius: 12, border: "none", cursor: "pointer", width: "100%", maxWidth: 360, margin: "0 auto", letterSpacing: "0.01em" }}>
            Inizia il Quiz →
          </button>
          <p style={{ fontSize: 11, color: "#5a5a55", marginTop: 16, lineHeight: 1.5 }}>Gratuito. Unisciti alle 15.000 persone che lo hanno già provato.</p>
        </div>
      </div>
    </div>
  );

  /* ─── QUIZ ─── */
  if (screen === "quiz") return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fafaf8", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
      <Header />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 0 80px" }}>
        {/* Progress */}
        <div style={{ padding: "20px 24px 0", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: "#9a9a94", marginBottom: 8, fontWeight: 500 }}>{pct}% Completato</div>
          <div style={{ height: 6, background: "#1e1e1c", borderRadius: 100, position: "relative", overflow: "visible" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#00CBDB,#f5c842)", borderRadius: 100, transition: "width 0.4s ease", position: "relative" }}>
              <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, background: "#f5c842", borderRadius: "50%", border: "2px solid #0a0a0a" }} />
            </div>
          </div>
        </div>
        {/* Header */}
        <div style={{ padding: "20px 24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => step > 1 ? setStep((s) => s - 1) : null} style={{ background: "none", border: "none", color: step === 1 ? "#3a3a3a" : "#9a9a94", fontSize: 13, fontWeight: 500, cursor: step === 1 ? "default" : "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans, sans-serif)" }}>← BACK</button>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB" }}>STEP {step} OF {steps.length}</span>
        </div>
        {/* Step content */}
        <div style={{ padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(22px,5vw,30px)", lineHeight: 1.2, marginBottom: 8, color: "#fafaf8" }}>{currentStepData.question}</h2>
          <p style={{ fontSize: 14, color: "#9a9a94", fontWeight: 300, marginBottom: 28 }}>{currentStepData.hint}</p>

          {/* IMAGE GRID 2 */}
          {currentStepData.type === "image-grid-2" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {currentStepData.options.map((opt) => {
                const sel = answers[currentStepData.key] === opt.value;
                return (
                  <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel ? "#00CBDB" : "transparent"}`, aspectRatio: "1/1", background: "#1a1a18", transition: "border-color 0.2s" }}>
                    <div style={{ width: "100%", height: "100%", background: opt.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>{opt.icon}</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.88))", padding: "32px 14px 14px", fontSize: 14, fontWeight: 600, color: sel ? "#00CBDB" : "#fafaf8", textAlign: "center", lineHeight: 1.3 }}>{opt.label}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* IMAGE GRID 3 */}
          {currentStepData.type === "image-grid-3" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {currentStepData.options.map((opt) => {
                const sel = answers[currentStepData.key] === opt.value;
                return (
                  <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel ? "#00CBDB" : "transparent"}`, aspectRatio: "2/3", background: "#1a1a18", transition: "border-color 0.2s" }}>
                    <div style={{ width: "100%", height: "100%", background: opt.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{opt.icon}</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.88))", padding: "24px 10px 12px", fontSize: 13, fontWeight: 600, color: sel ? "#00CBDB" : "#fafaf8", textAlign: "center", lineHeight: 1.3 }}>{opt.label}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CHECKBOX */}
          {currentStepData.type === "checkbox" && (
            <>
              <div style={{ display: "grid", gap: 10 }}>
                {currentStepData.options.map((opt) => {
                  const sel = checkboxArr.includes(opt.value);
                  return (
                    <div key={opt.value} onClick={() => toggleCheckbox(currentStepData.key, opt.value)} style={{ display: "flex", alignItems: "center", gap: 14, background: sel ? "rgba(0,203,219,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${sel ? "#00CBDB" : "#222220"}`, borderRadius: 12, padding: "16px 18px", cursor: "pointer", fontSize: 15, color: sel ? "#fafaf8" : "#e4e4e0", lineHeight: 1.5, transition: "all 0.2s" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, border: sel ? "1.5px solid #00CBDB" : "1.5px solid #5a5a55", background: sel ? "#00CBDB" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                        {sel && <span style={{ color: "#0a0a0a", fontSize: 12, fontWeight: 700 }}>✓</span>}
                      </div>
                      {opt.label}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => checkboxArr.length > 0 && advance()} style={{ marginTop: 24, width: "100%", background: "#00CBDB", color: "#0a0a0a", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 15, fontWeight: 700, padding: 17, borderRadius: 12, border: "none", cursor: checkboxArr.length > 0 ? "pointer" : "default", opacity: checkboxArr.length > 0 ? 1 : 0.4 }}>
                Continua →
              </button>
            </>
          )}

          {/* BUTTONS */}
          {currentStepData.type === "buttons" && (
            <div style={{ display: "grid", gap: 10 }}>
              {currentStepData.options.map((opt) => {
                const sel = answers[currentStepData.key] === opt.value;
                return (
                  <button key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)} style={{ background: sel ? "rgba(0,203,219,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${sel ? "#00CBDB" : "#222220"}`, borderRadius: 12, color: sel ? "#fafaf8" : "#e4e4e0", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 15, fontWeight: 400, padding: "17px 20px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* NUMBERED */}
          {currentStepData.type === "numbered" && (
            <div style={{ display: "grid", gap: 12 }}>
              {currentStepData.options.map((opt) => {
                const sel = answers[currentStepData.key] === opt.value;
                return (
                  <div key={opt.value} onClick={() => selectSingle(currentStepData.key, opt.value)} style={{ display: "flex", alignItems: "center", gap: 20, background: sel ? "rgba(0,203,219,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${sel ? "#00CBDB" : "#222220"}`, borderRadius: 12, padding: "20px 22px", cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${sel ? "#00CBDB" : "#5a5a55"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: sel ? "#00CBDB" : "#9a9a94", flexShrink: 0, transition: "all 0.2s" }}>{opt.num}</div>
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
      </div>
    </div>
  );

  /* ─── EMAIL CAPTURE ─── */
  if (screen === "email") return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fafaf8", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
      <Header />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "100px 24px 80px" }}>
        {/* Progress 100% */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: "#9a9a94", marginBottom: 8, fontWeight: 500 }}>Il tuo piano è quasi pronto</div>
          <div style={{ height: 6, background: "#1e1e1c", borderRadius: 100 }}>
            <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg,#00CBDB,#f5c842)", borderRadius: 100, position: "relative" }}>
              <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, background: "#f5c842", borderRadius: "50%", border: "2px solid #0a0a0a" }} />
            </div>
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 14, display: "block" }}>Step Finale</span>
        <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(28px,6vw,40px)", lineHeight: 1.1, marginBottom: 10 }}>Il tuo profilo<br />è pronto 🔥</h2>
        <p style={{ fontSize: 15, color: "#9a9a94", fontWeight: 300, lineHeight: 1.6, marginBottom: 36 }}>Inserisci nome e email per ricevere i risultati personalizzati e il tuo piano di partenza.</p>
        <form onSubmit={submitEmail} style={{ display: "grid", gap: 12 }}>
          {/* honeypot — nascosto agli utenti, compilato solo dai bot */}
          <div style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9a9a94", display: "block", marginBottom: 6 }}>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="es. Marco" required style={{ width: "100%", height: 52, padding: "0 18px", background: "rgba(255,255,255,0.05)", border: "1px solid #222220", borderRadius: 12, color: "#fafaf8", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 16, outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9a9a94", display: "block", marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="es. marco@email.com" required style={{ width: "100%", height: 52, padding: "0 18px", background: "rgba(255,255,255,0.05)", border: "1px solid #222220", borderRadius: 12, color: "#fafaf8", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 16, outline: "none" }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#00CBDB", color: "#0a0a0a", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 16, fontWeight: 700, padding: 18, borderRadius: 12, border: "none", cursor: "pointer", marginTop: 6, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Un momento..." : "Ottieni il tuo piano gratuito →"}
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
          {["🔒 100% Privato", "🚫 Zero Spam", "⚡ Accesso Immediato"].map((t) => (
            <span key={t} style={{ fontSize: 12, color: "#5a5a55" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── RISULTATO ─── */
  const profile = profiles[profileKey];
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fafaf8", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
      <Header />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px 80px" }}>
        {/* Hero risultato */}
        <div style={{ textAlign: "center", padding: "48px 0 40px" }}>
          <span style={{ fontSize: 64, marginBottom: 16, display: "block" }}>{profile.icon}</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 12, display: "block" }}>Il tuo Profilo Fisico</span>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(34px,7vw,52px)", lineHeight: 1.05, marginBottom: 16 }}>{profile.name}</h2>
          <p style={{ fontSize: 16, color: "#9a9a94", fontWeight: 300, lineHeight: 1.65, maxWidth: 400, margin: "0 auto" }}>{profile.tagline}</p>
        </div>
        {/* Card analisi */}
        <div style={{ background: "linear-gradient(135deg,rgba(0,203,219,0.07),rgba(0,203,219,0.02))", border: "1px solid rgba(0,203,219,0.2)", borderRadius: 16, padding: 28, marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 14, display: "block" }}>Cosa sta succedendo davvero</span>
          <p style={{ fontSize: 15, color: "#e4e4e0", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: profile.analysis }} />
        </div>
        {/* Card tips */}
        <div style={{ background: "linear-gradient(135deg,rgba(0,203,219,0.07),rgba(0,203,219,0.02))", border: "1px solid rgba(0,203,219,0.2)", borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 14, display: "block" }}>3 mosse da applicare subito</span>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 14 }}>
            {profile.tips.map((tip, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "#e4e4e0", lineHeight: 1.6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00CBDB", flexShrink: 0, marginTop: 8 }} />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </div>
        {/* CTA prodotti */}
        <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(24px,5vw,32px)", textAlign: "center", lineHeight: 1.15, marginBottom: 10 }}>Sei a 1 passo dal trasformare<br />definitivamente il tuo fisico</h3>
        <p style={{ fontSize: 15, color: "#9a9a94", textAlign: "center", fontWeight: 300, lineHeight: 1.6, marginBottom: 20 }}>In base alle tue risposte la strada più rapida per il fisico che vuoi:</p>
        {/* Countdown */}
        <div style={{ background: "rgba(0,203,219,0.06)", border: "1px solid rgba(0,203,219,0.2)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>⏳</span>
          <div style={{ flex: 1, fontSize: 13, color: "#9a9a94", lineHeight: 1.4 }}>
            <strong style={{ color: "#fafaf8", display: "block", fontSize: 12, marginBottom: 2 }}>Offerta a tempo limitato</strong>
            Questo prezzo speciale scade tra
          </div>
          <span style={{ fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: 22, fontWeight: 700, color: timerColor, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{mm}:{ss}</span>
        </div>
        {/* Cards prodotti */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          <a href="https://sfidaestiva.davegamba.com/" target="_blank" rel="noopener noreferrer" style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid transparent", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/foto-sfida-estiva.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: 18, lineHeight: 1.2, color: "#fafaf8" }}>Sfida Estiva<br />21 Giorni</h3>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fafaf8" }}>€37</div>
              <div style={{ background: "rgba(255,255,255,0.12)", color: "#fafaf8", border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, fontWeight: 700, padding: 11, borderRadius: 8, textAlign: "center" }}>Inizia subito →</div>
            </div>
          </a>
          <a href="https://davegamba.com/coaching" target="_blank" rel="noopener noreferrer" style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid rgba(0,203,219,0.5)", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg')", backgroundSize: "cover", backgroundPosition: "center top" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ display: "inline-block", background: "#00CBDB", color: "#0a0a0a", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, alignSelf: "flex-start" }}>Consigliato</span>
              <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: 18, lineHeight: 1.2, color: "#fafaf8" }}>Coaching<br />Personale 1:1</h3>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fafaf8" }}>€920</div>
              <div style={{ background: "#00CBDB", color: "#0a0a0a", fontSize: 13, fontWeight: 700, padding: 11, borderRadius: 8, textAlign: "center" }}>Prenota una call →</div>
            </div>
          </a>
        </div>
        <button onClick={() => { setScreen("hero"); setStep(1); setAnswers({}); }} style={{ display: "block", width: "100%", textAlign: "center", fontSize: 13, color: "#5a5a55", cursor: "pointer", background: "none", border: "none", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 8 }}>↩ Rifai il quiz</button>
      </div>
      <div style={{ textAlign: "center", padding: "32px 24px", fontSize: 12, color: "#5a5a55" }}>© Dave Gamba · <Link href="/" style={{ color: "#5a5a55", textDecoration: "none" }}>davegamba.com</Link></div>
    </div>
  );
}
