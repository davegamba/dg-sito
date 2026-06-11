"use client";
import { useState, useRef } from "react";

export default function QuestionarioAcquisto() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/questionario-acquisto", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.ok) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(json.error ?? "Errore durante l'invio. Riprova.");
      }
    } catch {
      setError("Errore di rete. Controlla la connessione e riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        :root{--accent:#00CBDB;--gold:#F0C040;--bg:#0a0a0a;--bg-1:#111;--bg-2:#161616;--bg-3:#1c1c1c;--white:#fafaf8;--gray-3:#c8c8c4;--gray-4:#9a9a94;--gray-6:#5a5a55;--border:#252525;--border-2:#333}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--bg);color:var(--white);font-family:'DM Sans',sans-serif}
        .qa-wrap{min-height:100dvh;background:var(--bg)}
        .qa-header{background:var(--bg-1);border-bottom:1px solid var(--border);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px}
        .qa-logo{font-family:'DM Serif Display',serif;font-size:20px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--white);text-decoration:none}
        .qa-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(0,203,219,0.08);border:1px solid rgba(0,203,219,0.25);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:var(--accent)}
        .qa-inner{max-width:760px;margin:0 auto;padding:48px 24px 80px}
        .qa-hero{margin-bottom:48px}
        .qa-status{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;display:block}
        .qa-title{font-family:'DM Serif Display',serif;font-size:clamp(32px,5vw,48px);line-height:1.1;margin-bottom:14px}
        .qa-sub{font-size:15px;color:var(--gray-4);line-height:1.7;max-width:560px}
        .qa-section{background:var(--bg-1);border:1px solid var(--border);border-radius:20px;padding:32px;margin-bottom:20px}
        .qa-section-title{font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);margin-bottom:24px;display:flex;align-items:center;gap:8px}
        .qa-section-title span{background:var(--accent);color:#000;border-radius:100px;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0}
        .qa-field{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
        .qa-field:last-child{margin-bottom:0}
        .qa-label{font-size:13px;font-weight:600;color:var(--white);letter-spacing:0.02em}
        .qa-label .req{color:var(--accent);margin-left:2px}
        .qa-hint{font-size:12px;color:var(--gray-6);line-height:1.5}
        .qa-input,.qa-textarea{background:var(--bg-3);border:1px solid var(--border-2);border-radius:12px;padding:14px 16px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:border-color 0.2s;width:100%}
        .qa-input:focus,.qa-textarea:focus{border-color:rgba(0,203,219,0.5)}
        .qa-input::placeholder,.qa-textarea::placeholder{color:rgba(255,255,255,0.2)}
        .qa-textarea{resize:vertical;min-height:110px;line-height:1.6}
        .qa-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .qa-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
        .qa-radio-group{display:flex;flex-direction:column;gap:10px}
        .qa-radio-row{display:flex;align-items:center;gap:12px;background:var(--bg-3);border:1px solid var(--border-2);border-radius:10px;padding:12px 16px;cursor:pointer;transition:border-color 0.15s;font-size:14px;color:var(--gray-3);user-select:none}
        .qa-radio-row:has(input:checked){border-color:rgba(0,203,219,0.5);background:rgba(0,203,219,0.06);color:var(--white)}
        .qa-radio-row input{accent-color:var(--accent);width:16px;height:16px;flex-shrink:0}
        .qa-file-input{background:var(--bg-3);border:1px dashed var(--border-2);border-radius:12px;padding:20px;color:var(--gray-4);font-family:'DM Sans',sans-serif;font-size:14px;width:100%;cursor:pointer;transition:border-color 0.2s}
        .qa-file-input:hover{border-color:rgba(0,203,219,0.4)}
        .qa-error{background:rgba(224,85,85,0.08);border:1px solid rgba(224,85,85,0.3);border-radius:12px;padding:14px 18px;font-size:14px;color:#e05555;margin-bottom:20px}
        .qa-btn{width:100%;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;padding:18px;border-radius:14px;border:none;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:10px;letter-spacing:0.02em;margin-top:32px}
        .qa-btn:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .qa-btn:disabled{opacity:0.6;cursor:default;transform:none}
        .qa-success{text-align:center;padding:80px 24px}
        .qa-success-icon{font-size:64px;margin-bottom:24px;display:block}
        .qa-success-title{font-family:'DM Serif Display',serif;font-size:clamp(28px,5vw,40px);margin-bottom:16px}
        .qa-success-text{font-size:15px;color:var(--gray-4);line-height:1.7;max-width:480px;margin:0 auto}
        .qa-footer{text-align:center;padding:32px 24px;font-size:12px;color:var(--gray-6);border-top:1px solid var(--border)}
        @media(max-width:600px){.qa-row,.qa-row-3{grid-template-columns:1fr}.qa-section{padding:24px 20px}}
      `}</style>

      <div className="qa-wrap">
        <div className="qa-header">
          <a href="https://davegamba.com" className="qa-logo">Dave Gamba</a>
          <div className="qa-badge">✓ Acquisto confermato</div>
        </div>

        <div className="qa-inner">
          {success ? (
            <div className="qa-success">
              <span className="qa-success-icon">✅</span>
              <h2 className="qa-success-title">Questionario ricevuto!</h2>
              <p className="qa-success-text">
                Riceverai una conferma via email. Dave preparerà il tuo piano personalizzato entro <strong style={{ color: "#fafaf8" }}>2–3 giorni lavorativi</strong>.<br /><br />
                A presto,<br /><em>Dave</em>
              </p>
            </div>
          ) : (
            <>
              <div className="qa-hero">
                <span className="qa-status">Coaching Personale 1-1</span>
                <h1 className="qa-title">Comincia il tuo<br />percorso Coaching!</h1>
                <p className="qa-sub">Compila questo questionario per prepararti i tuoi piani personalizzati. Le schede vengono preparate in ordine di acquisto.</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">

                {/* 01 - Dati */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>01</span> I tuoi dati</div>
                  <div className="qa-row">
                    <div className="qa-field">
                      <label className="qa-label">Nome e Cognome <span className="req">*</span></label>
                      <input className="qa-input" type="text" name="nome" placeholder="Marco Rossi" required />
                    </div>
                    <div className="qa-field">
                      <label className="qa-label">Data di nascita <span className="req">*</span></label>
                      <input className="qa-input" type="date" name="data_nascita" required />
                    </div>
                  </div>
                  <div className="qa-row">
                    <div className="qa-field">
                      <label className="qa-label">Email <span className="req">*</span></label>
                      <input className="qa-input" type="email" name="email" placeholder="marco@email.com" required />
                    </div>
                    <div className="qa-field">
                      <label className="qa-label">Numero WhatsApp <span className="req">*</span></label>
                      <div className="qa-hint" style={{ marginBottom: 4 }}>Con prefisso internazionale (es. +39 333 1234567)</div>
                      <input className="qa-input" type="tel" name="whatsapp" placeholder="+39 333 1234567" required />
                    </div>
                  </div>
                </div>

                {/* 02 - Misure fisiche */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>02</span> Misure fisiche</div>
                  <div className="qa-row">
                    <div className="qa-field">
                      <label className="qa-label">Peso (kg) <span className="req">*</span></label>
                      <input className="qa-input" type="number" name="peso" placeholder="75" min="30" max="300" required />
                    </div>
                    <div className="qa-field">
                      <label className="qa-label">Altezza (cm) <span className="req">*</span></label>
                      <input className="qa-input" type="number" name="altezza" placeholder="178" min="100" max="250" required />
                    </div>
                  </div>
                  <div className="qa-field">
                    <label className="qa-label">BIA</label>
                    <div className="qa-hint">% massa grassa, massa magra, acqua corporea — oppure lascia vuoto</div>
                    <input className="qa-input" type="text" name="bia" placeholder="es. 18% grassa, 62% magra, 20% acqua" />
                  </div>
                </div>

                {/* 03 - Misure corporee */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>03</span> Misure corporee</div>
                  <p className="qa-hint" style={{ marginBottom: 20 }}>Le aggiornerai ogni settimana nell&apos;app — inserisci quelle di oggi per iniziare</p>
                  <div className="qa-row-3">
                    <div className="qa-field">
                      <label className="qa-label">Braccio (cm)</label>
                      <input className="qa-input" type="number" name="braccio" placeholder="34" />
                    </div>
                    <div className="qa-field">
                      <label className="qa-label">Vita (cm)</label>
                      <input className="qa-input" type="number" name="vita" placeholder="82" />
                    </div>
                    <div className="qa-field">
                      <label className="qa-label">Coscia (cm)</label>
                      <input className="qa-input" type="number" name="coscia" placeholder="55" />
                    </div>
                  </div>
                </div>

                {/* 04 - Foto */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>04</span> Foto di partenza</div>
                  <div className="qa-field">
                    <label className="qa-label">Foto attuale in costume</label>
                    <div className="qa-hint" style={{ marginBottom: 8 }}>Ambiente luminoso, posa frontale. Sarà il tuo punto di riferimento per il &ldquo;Dopo&rdquo;. JPG/PNG, max 10MB.</div>
                    <input className="qa-file-input" type="file" name="foto" accept="image/jpeg,image/png,image/webp" />
                  </div>
                </div>

                {/* 05 - Obiettivo e allenamento */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>05</span> Obiettivo e allenamento</div>
                  <div className="qa-field">
                    <label className="qa-label">Il tuo obiettivo fisico <span className="req">*</span></label>
                    <div className="qa-hint">Sii specifico: non solo &ldquo;dimagrire&rdquo; ma quanto, entro quando, per quale motivo</div>
                    <textarea className="qa-textarea" name="obiettivo" rows={4} required placeholder="Es. Voglio perdere 8 kg entro settembre, tornare al peso che avevo a 30 anni, e ritrovare energia per il lavoro..." />
                  </div>
                  <div className="qa-field">
                    <label className="qa-label">Quante volte puoi allenarti a settimana? <span className="req">*</span></label>
                    <div className="qa-radio-group">
                      {["1-2 volte a settimana", "3 volte a settimana", "4-5 volte a settimana"].map(v => (
                        <label key={v} className="qa-radio-row">
                          <input type="radio" name="frequenza" value={v} required />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="qa-field">
                    <label className="qa-label">Dove ti alleni? <span className="req">*</span></label>
                    <div className="qa-radio-group">
                      {["Solo palestra", "Solo casa", "Palestra + casa (entrambe)"].map(v => (
                        <label key={v} className="qa-radio-row">
                          <input type="radio" name="luogo" value={v} required />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="qa-field">
                    <label className="qa-label">Il tuo allenamento attuale</label>
                    <div className="qa-hint">Cosa fai ora, con che frequenza, da quanto tempo</div>
                    <textarea className="qa-textarea" name="allenamento_attuale" rows={3} placeholder="Es. Vado in palestra 2 volte a settimana da 6 mesi, faccio corpo libero e qualche macchina..." />
                  </div>
                </div>

                {/* 06 - Alimentazione */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>06</span> Alimentazione</div>
                  <div className="qa-field">
                    <label className="qa-label">La tua giornata alimentare tipo <span className="req">*</span></label>
                    <div className="qa-hint">Descrivi colazione, pranzo, cena e spuntini di un giorno normale — più sei preciso, più il piano sarà su misura</div>
                    <textarea className="qa-textarea" name="alimentazione" rows={5} required placeholder="Colazione: caffè e cornetto&#10;Pranzo: pasta o secondo con verdure&#10;Cena: ..." />
                  </div>
                  <div className="qa-field">
                    <label className="qa-label">Cibi di cui fai fatica a fare a meno</label>
                    <div className="qa-hint">Nessun giudizio — serve per costruire un piano realistico e sostenibile</div>
                    <textarea className="qa-textarea" name="cibi_preferiti" rows={2} placeholder="Es. pane, pasta, dolci la sera..." />
                  </div>
                </div>

                {/* 07 - Altro */}
                <div className="qa-section">
                  <div className="qa-section-title"><span>07</span> Altro</div>
                  <div className="qa-field">
                    <div className="qa-hint" style={{ marginBottom: 8 }}>Infortuni, patologie, limitazioni fisiche, intolleranze, farmaci...</div>
                    <textarea className="qa-textarea" name="altro" rows={4} placeholder="Qualsiasi cosa possa essere utile a Dave per costruire il tuo piano su misura..." />
                  </div>
                </div>

                <p style={{ fontSize: 13, color: "var(--gray-6)", textAlign: "center", marginTop: 24 }}>
                  Dopo l&apos;invio riceverai una conferma via email. Dave preparerà il tuo piano entro <strong style={{ color: "var(--gray-4)" }}>2–3 giorni lavorativi</strong>.
                </p>

                {error && <div className="qa-error">{error}</div>}

                <button type="submit" className="qa-btn" disabled={loading}>
                  {loading ? "Invio in corso..." : "Invia il questionario →"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="qa-footer">
          <a href="mailto:info@davegamba.com" style={{ color: "var(--gray-6)", textDecoration: "none" }}>info@davegamba.com</a>
          {" · "}A presto, Dave
          <br />© DaveGamba.com — Tutti i diritti riservati
        </div>
      </div>
    </>
  );
}
