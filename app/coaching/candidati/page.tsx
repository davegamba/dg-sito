"use client";

import { useState } from "react";
import Link from "next/link";
import { fbqTrack, gtagEvent } from "@/lib/analytics";

const TOTAL_STEPS = 3;

const STEP_LABELS = ["Chi sei", "La tua situazione", "Il tuo impegno"];

export default function CandidatiPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [scaleVal, setScaleVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function nextStep(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const entries: Record<string, string> = {};
    data.forEach((v, k) => { entries[k] = v as string; });
    setFormData((prev) => ({ ...prev, ...entries }));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!scaleVal) { setError("Seleziona il tuo livello di impegno."); return; }
    setError("");
    setLoading(true);

    const lastStep = new FormData(e.currentTarget);
    const lastEntries: Record<string, string> = {};
    lastStep.forEach((v, k) => { lastEntries[k] = v as string; });
    const payload = { ...formData, ...lastEntries, impegno: scaleVal };

    try {
      const res = await fetch("/api/coaching-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      fbqTrack("Lead");
      gtagEvent("coaching_application", { event_category: "lead", event_label: "coaching-1-1" });
      setSuccess(true);
    } catch {
      setError("Errore nell'invio. Riprova o scrivimi su Instagram.");
    } finally {
      setLoading(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#06080f}
        .cq-page{min-height:100vh;background:#06080f;color:#fafaf8;font-family:'DM Sans',sans-serif;display:flex;flex-direction:column}
        .cq-topbar{display:flex;align-items:center;justify-content:space-between;padding:18px 28px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .cq-logo{font-family:serif;font-size:18px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#fafaf8;text-decoration:none}
        .cq-close{font-size:13px;color:rgba(255,255,255,0.35);text-decoration:none;transition:color 0.2s}
        .cq-close:hover{color:rgba(255,255,255,0.7)}
        .cq-progress-wrap{height:3px;background:rgba(255,255,255,0.07)}
        .cq-progress-fill{height:100%;background:linear-gradient(to right,#00CBDB,#00AECF);transition:width 0.4s ease}
        .cq-main{flex:1;max-width:680px;width:100%;margin:0 auto;padding:48px 24px 80px}
        .cq-step-label{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#00CBDB;margin-bottom:12px}
        .cq-title{font-family:serif;font-size:clamp(26px,5vw,40px);line-height:1.15;color:#fafaf8;margin-bottom:8px}
        .cq-sub{font-size:15px;color:rgba(255,255,255,0.45);line-height:1.6;margin-bottom:36px}
        .cq-form{display:flex;flex-direction:column;gap:20px}
        .cq-field{display:flex;flex-direction:column;gap:8px}
        .cq-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .cq-label{font-size:13px;font-weight:600;color:#fafaf8;letter-spacing:0.02em}
        .cq-label span{color:#00CBDB;margin-left:2px}
        .cq-hint{font-size:12px;color:rgba(255,255,255,0.3);margin-top:-4px}
        .cq-input,.cq-textarea{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 16px;color:#fafaf8;font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:border-color 0.2s;width:100%}
        .cq-input:focus,.cq-textarea:focus{border-color:rgba(0,203,219,0.5)}
        .cq-input::placeholder,.cq-textarea::placeholder{color:rgba(255,255,255,0.2)}
        .cq-textarea{resize:vertical;min-height:110px;line-height:1.6}
        .cq-radio-group{display:flex;flex-direction:column;gap:8px}
        .cq-radio-row{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px 16px;cursor:pointer;transition:border-color 0.15s,background 0.15s;font-size:14px;color:rgba(255,255,255,0.7);user-select:none}
        .cq-radio-row:has(input:checked){border-color:rgba(0,203,219,0.45);background:rgba(0,203,219,0.06);color:#fafaf8}
        .cq-radio-row input{accent-color:#00CBDB;width:16px;height:16px;flex-shrink:0}
        .cq-scale-group{display:flex;gap:8px}
        .cq-scale-btn{flex:1;aspect-ratio:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center}
        .cq-scale-btn:hover{border-color:rgba(0,203,219,0.3);color:#fafaf8}
        .cq-scale-btn.active{background:rgba(0,203,219,0.1);border-color:rgba(0,203,219,0.5);color:#00CBDB}
        .cq-consent-row{display:flex;align-items:flex-start;gap:12px;cursor:pointer}
        .cq-consent-row input{width:16px;height:16px;margin-top:2px;flex-shrink:0;accent-color:#00CBDB;cursor:pointer}
        .cq-consent-row span{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.5}
        .cq-consent-row a{color:#00CBDB;text-decoration:underline}
        .cq-nav{display:flex;gap:12px;margin-top:8px}
        .cq-btn-back{background:transparent;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);font-family:'DM Sans',sans-serif;font-size:14px;padding:15px 24px;border-radius:12px;cursor:pointer;transition:all 0.2s;white-space:nowrap}
        .cq-btn-back:hover{border-color:rgba(255,255,255,0.3);color:#fafaf8}
        .cq-btn-next{flex:1;background:linear-gradient(to bottom,#F7E27A,#F0C040);color:#000;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;padding:16px;border-radius:12px;border:none;cursor:pointer;transition:all 0.2s;letter-spacing:0.02em}
        .cq-btn-next:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .cq-btn-next:disabled{opacity:0.6;cursor:default;transform:none}
        .cq-error{color:#e05555;font-size:13px;text-align:center}
        .cq-note{text-align:center;font-size:12px;color:rgba(255,255,255,0.25);margin-top:12px}
        .cq-success{text-align:center;padding:60px 24px}
        .cq-success h2{font-family:serif;font-size:36px;color:#fafaf8;margin:16px 0 12px}
        .cq-success p{font-size:16px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:440px;margin:0 auto}
        @media(max-width:600px){.cq-row{grid-template-columns:1fr}.cq-main{padding:32px 20px 60px}}
      `}</style>

      <div className="cq-page">
        {/* Top bar */}
        <div className="cq-topbar">
          <a href="/coaching" className="cq-logo">Dave Gamba</a>
          <a href="/coaching" className="cq-close">← Torna alla pagina</a>
        </div>

        {/* Progress bar */}
        <div className="cq-progress-wrap">
          <div className="cq-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <main className="cq-main">
          {success ? (
            <div className="cq-success">
              <div style={{ fontSize: 52 }}>✅</div>
              <h2>Candidatura ricevuta!</h2>
              <p>Grazie. Ho ricevuto la tua candidatura e ti contatterò entro 24-48 ore per la call conoscitiva gratuita e senza impegno.</p>
              <p style={{ marginTop: 24, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>Sali di livello, Dave</p>
            </div>
          ) : (
            <>
              {/* Step 1 */}
              {step === 1 && (
                <form className="cq-form" onSubmit={nextStep}>
                  <div>
                    <div className="cq-step-label">{STEP_LABELS[0]} · Step 1 di {TOTAL_STEPS}</div>
                    <h1 className="cq-title">Prima di tutto,<br />chi sei?</h1>
                    <p className="cq-sub">Pochi dati per poter fissare la call con te.</p>
                  </div>
                  <div className="cq-row">
                    <div className="cq-field">
                      <label className="cq-label">Nome e Cognome <span>*</span></label>
                      <input className="cq-input" type="text" name="nome" placeholder="Marco Rossi" required defaultValue={formData.nome} />
                    </div>
                    <div className="cq-field">
                      <label className="cq-label">Data di nascita <span>*</span></label>
                      <input className="cq-input" type="date" name="data_nascita" required defaultValue={formData.data_nascita} />
                    </div>
                  </div>
                  <div className="cq-row">
                    <div className="cq-field">
                      <label className="cq-label">La tua email <span>*</span></label>
                      <input className="cq-input" type="email" name="email" placeholder="marco@email.com" required defaultValue={formData.email} />
                    </div>
                    <div className="cq-field">
                      <label className="cq-label">Numero di telefono</label>
                      <input className="cq-input" type="tel" name="telefono" placeholder="+39 333 000 0000" defaultValue={formData.telefono} />
                    </div>
                  </div>
                  <button type="submit" className="cq-btn-next">Continua →</button>
                  <p className="cq-note">✓ Gratuito e senza impegno</p>
                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form className="cq-form" onSubmit={nextStep}>
                  <div>
                    <div className="cq-step-label">{STEP_LABELS[1]} · Step 2 di {TOTAL_STEPS}</div>
                    <h1 className="cq-title">Dove sei adesso<br />e dove vuoi arrivare?</h1>
                    <p className="cq-sub">Più sei specifico, più la call sarà utile per te.</p>
                  </div>
                  <div className="cq-field">
                    <label className="cq-label">Qual è la tua situazione fisica attuale e cosa ti sta frustrando di più? <span>*</span></label>
                    <div className="cq-hint">Condizione di partenza, eventuali infortuni, patologie o intolleranze</div>
                    <textarea className="cq-textarea" name="situazione_frustrazione" placeholder="Raccontami da dove parti e cosa ti blocca..." required defaultValue={formData.situazione_frustrazione} />
                  </div>
                  <div className="cq-field">
                    <label className="cq-label">Qual è la tua trasformazione desiderata? <span>*</span></label>
                    <div className="cq-radio-group">
                      {["Ricomposizione — perdere grasso e tonificare", "Sviluppare un fisico muscoloso e atletico", "Aumentare energia e testosterone", "Altro"].map((v) => (
                        <label key={v} className="cq-radio-row">
                          <input type="radio" name="obiettivo" value={v} required defaultChecked={formData.obiettivo === v} />{v}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="cq-field">
                    <label className="cq-label">Perché pensi che non abbia funzionato finora? <span>*</span></label>
                    <textarea className="cq-textarea" name="perche_no" placeholder="Cosa non ha funzionato e perché..." required defaultValue={formData.perche_no} />
                  </div>
                  <div className="cq-nav">
                    <button type="button" className="cq-btn-back" onClick={prevStep}>← Indietro</button>
                    <button type="submit" className="cq-btn-next">Continua →</button>
                  </div>
                </form>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <form className="cq-form" onSubmit={handleSubmit}>
                  <div>
                    <div className="cq-step-label">{STEP_LABELS[2]} · Step 3 di {TOTAL_STEPS}</div>
                    <h1 className="cq-title">Ultima cosa —<br />quanto ci tieni davvero?</h1>
                    <p className="cq-sub">Queste domande mi aiutano a capire se posso aiutarti.</p>
                  </div>
                  <div className="cq-field">
                    <label className="cq-label">Come cambierebbe la tua vita con il fisico che desideri? <span>*</span></label>
                    <textarea className="cq-textarea" name="vita_con_fisico" placeholder="Immagina come ti sentiresti..." required defaultValue={formData.vita_con_fisico} />
                  </div>
                  <div className="cq-field">
                    <label className="cq-label">Su una scala 1-5, quanto sei pronto a impegnarti ora? <span>*</span></label>
                    <div className="cq-scale-group">
                      {["1", "2", "3", "4", "5"].map((v) => (
                        <button key={v} type="button" className={`cq-scale-btn${scaleVal === v ? " active" : ""}`} onClick={() => setScaleVal(v)}>{v}</button>
                      ))}
                    </div>
                  </div>
                  <div className="cq-field">
                    <label className="cq-label">Dove preferisci fare la call con Dave?</label>
                    <div className="cq-radio-group">
                      <label className="cq-radio-row"><input type="radio" name="canale_call" value="Telefono" />📞 Telefono</label>
                      <label className="cq-radio-row"><input type="radio" name="canale_call" value="WhatsApp" />💬 WhatsApp</label>
                    </div>
                  </div>
                  <label className="cq-consent-row">
                    <input type="checkbox" name="consenso" required />
                    <span>Ho letto la <Link href="/privacy">Privacy Policy</Link> e acconsento al trattamento dei miei dati per essere ricontattato da Dave Gamba.</span>
                  </label>
                  {error && <p className="cq-error">{error}</p>}
                  <div className="cq-nav">
                    <button type="button" className="cq-btn-back" onClick={prevStep}>← Indietro</button>
                    <button type="submit" className="cq-btn-next" disabled={loading}>
                      {loading ? "Invio in corso…" : "Invia candidatura →"}
                    </button>
                  </div>
                  <p className="cq-note">✓ Gratuito e senza impegno — ti ricontatto entro 24-48h</p>
                </form>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
