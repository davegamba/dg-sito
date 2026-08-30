"use client";
import { useEffect } from "react";
import Link from "next/link";
import Testimonials from "@/components/home/Testimonials";
import { fbqTrack } from "@/lib/analytics";
import { onConsent } from "@/lib/consent";

const HERO_FEATURES = [
  "Consulenza personale con Dave",
  "Analisi completa: blocchi, obiettivi, stile di vita",
  "Piano Strategico su misura",
  "Piano d'Allenamento Breve-Intenso-Mirato stilato da Dave",
  "Piano Alimentare con biologa nutrizionista",
  "Video esecuzione per ogni esercizio",
  "Check settimanale con Dave",
  { text: "Supporto WhatsApp per ", hl: "6 mesi" },
  "Affiancamento fino all'obiettivo",
];

const PER_CHI = [
  "Chi si allena da tempo con risultati altalenanti, ma vuole fare il salto di qualità definitivo.",
  "Chi si impegna ma rimane in stallo, senza vedere una vera differenza.",
  "Chi vuole un riferimento accanto per mantenere la rotta e la costanza nel tempo.",
  "Chi non vuole più perdere tempo e vuole arrivare al risultato migliore nel tempo più breve.",
  "Chi vuole raggiungere la propria migliore forma fisica di sempre, definitiva, non temporanea.",
  "Chi vuole un metodo di allenamento breve e mirato, che dà più risultati in meno tempo.",
  "Chi vuole un'alimentazione su misura — flessibile, senza rinunce inutili.",
  "Chi vuole ritrovare l'energia e la lucidità che credeva di aver perso con gli anni.",
  "Chi vuole, finalmente, la certezza di essere sulla strada giusta.",
];

const STEPS = [
  { n: "1", title: "Candidatura", text: "Compili il questionario. Mi racconti dove sei e dove vuoi arrivare. Lo leggo io, personalmente." },
  { n: "2", title: "La call", text: "Ci sentiamo. Capisco i tuoi blocchi, il tuo tempo, la tua vita reale. Se non sei adatto te lo dico." },
  { n: "3", title: "Il tuo piano", text: "Costruisco allenamento Breve-Intenso-Mirato + alimentazione su misura. Niente schede copia-incolla. Niente diete da fame." },
  { n: "4", title: "Affiancamento", text: "Ti seguo fino all'obiettivo. WhatsApp diretto, check ogni settimana, correzioni in corsa. Non molli perché non sei solo." },
];

const FAQ = [
  { q: "Funziona se sono fermo da anni?", a: "È fatto apposta per chi riparte. Si parte dal tuo livello e si sale un gradino alla volta. Nella mia esperienza, chi riparte motivato ottiene risultati più rapidi di chi non si è mai fermato." },
  { q: "È tutto online?", a: "Sì. Piano, video di ogni esercizio, check e affiancamento su WhatsApp. Ti alleni dove vuoi, quando vuoi, ma non sei mai solo." },
  { q: "Devo andare in palestra?", a: "Come preferisci. Adatto il piano a casa o palestra. Lavoro con entrambi da 15 anni: i risultati non cambiano." },
  { q: "E l'alimentazione?", a: "La costruiamo con una biologa nutrizionista. Flessibile, reale, niente diete da fame. L'obiettivo è che tu mangi bene per sempre, non per un mese." },
  { q: "Non ho tempo.", a: "È esattamente il motivo per cui esiste questo metodo. 21 minuti, 3 volte a settimana. Se non hai questo, non hai tempo per stare in salute — e dobbiamo parlarne." },
  { q: "Quanto dura il percorso?", a: "L'affiancamento è di 6 mesi. Il tempo che serve per costruire qualcosa che poi resta tuo." },
];

const FORMULE = [
  { dur: "3 mesi", price: "420€", mese: "140€/mese", hl: "3 mesi", stripe: "https://buy.stripe.com/fZu3cw01gc5E1Vo6pm1Nu09" },
  { dur: "6 mesi", price: "650€", mese: "108€/mese", hl: "6 mesi", best: true, stripe: "https://buy.stripe.com/3cI8wQdS6c5EarU6pm1Nu0a" },
  { dur: "12 mesi", price: "1.100€", mese: "92€/mese", hl: "12 mesi", stripe: "https://buy.stripe.com/14AbJ29BQedMdE62961Nu0b" },
];

export default function CoachingPage() {
  // ViewContent solo dopo il consenso: il Pixel lo carica il CookieBanner,
  // che e' anche l'unico a mandare il PageView.
  useEffect(
    () =>
      onConsent(() =>
        fbqTrack("ViewContent", { content_name: "Coaching 1-1", content_category: "coaching" })
      ),
    []
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function toggleFaq(e: React.MouseEvent<HTMLButtonElement>) {
    const item = (e.currentTarget as HTMLElement).closest(".ch-faq-item");
    if (item) item.classList.toggle("open");
  }

  return (
    <>
      <style>{`
        .ch-body{font-family:'DM Sans',sans-serif;background:#0a0a0a;color:#fafaf8;overflow-x:hidden}
        .ch-body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.032) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;z-index:0}
        :root{--accent:#00CBDB;--gold:#F0C040;--bg:#0a0a0a;--bg-1:#111;--bg-2:#161616;--bg-3:#1c1c1c;--cyan-card:#0d1a1e;--cyan-card-ft:#0d2028;--white:#fafaf8;--gray-3:#c8c8c4;--gray-4:#9a9a94;--gray-6:#5a5a55;--border:#252525;--border-2:#333}
        .ch-hero{position:relative;width:100%;height:100vh;max-height:860px;overflow:hidden;display:flex;align-items:center;justify-content:center}
        .ch-hero img.bg{position:absolute;inset:0;width:100%;height:115%;object-fit:cover;object-position:center top;display:block;transform:translateY(-3%)}
        .ch-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 0%,rgba(10,10,10,0.78) 50%,rgba(10,10,10,0.15) 100%);pointer-events:none}
        .ch-hero-content{position:relative;z-index:2;padding:0 40px;width:100%;max-width:800px;margin:0 auto;display:grid;grid-template-columns:1fr;align-items:center;animation:chFadeUp 0.7s ease 0.1s both}
        .ch-hero-left{display:flex;flex-direction:column;align-items:flex-start;text-align:left}
        .ch-perchi-block{position:relative;z-index:1;background:#0d0d0d;border-bottom:1px solid var(--border);padding:64px 24px}
        .ch-perchi-inner{max-width:720px;margin:0 auto}
        .ch-perchi-list{display:flex;flex-direction:column;gap:14px;margin-top:36px}
        .ch-perchi-item{display:flex;align-items:flex-start;gap:14px;background:var(--cyan-card);border:1px solid rgba(0,203,219,0.15);border-radius:16px;padding:22px 20px}
        .ch-perchi-text{font-size:15px;color:var(--gray-3);line-height:1.6}
        .ch-press-topbar{position:relative;z-index:10;background:#fff;border-bottom:1px solid #e8e2d8;padding:10px 24px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
        .ch-press-topbar-label{font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#aaa;margin-right:4px}
        .ch-press-topbar img{height:18px;object-fit:contain;opacity:0.7}
        .ch-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:5px 16px;border-radius:100px;margin-bottom:18px}
        .ch-badge-gold{background:rgba(240,192,64,0.12);color:var(--gold);border:1px solid rgba(240,192,64,0.25)}
        .ch-badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:chPulse 2s infinite}
        .ch-hero-eyebrow{font-size:12px;font-weight:800;color:var(--gold);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:10px}
        .ch-hero-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(36px,4.5vw,64px);line-height:1.05;letter-spacing:-0.02em;color:var(--white);margin-bottom:18px;font-weight:700}
        .ch-hero-title em{font-style:italic;color:var(--accent)}
        .ch-hero-sub{font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.85);font-weight:600;max-width:520px;margin:0 0 28px;line-height:1.65}
        .ch-btn-gold{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:800;padding:18px 40px;border-radius:14px;border:none;cursor:pointer;text-decoration:none;transition:all 0.2s;letter-spacing:0.04em;text-transform:uppercase}
        .ch-btn-gold:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .ch-section{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:80px 24px}
        .ch-divider{height:1px;background:var(--border);position:relative;z-index:1}
        .ch-section-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(30px,4vw,50px);line-height:1.1;letter-spacing:-0.02em;margin-bottom:14px;text-align:center}
        .ch-section-title em{font-style:italic;color:var(--accent)}
        .ch-section-sub{font-size:16px;color:var(--gray-4);font-weight:300;line-height:1.7;max-width:580px;text-align:center;margin-left:auto;margin-right:auto}
        .ch-steps{display:flex;flex-direction:column;gap:16px}
        .ch-step{background:var(--cyan-card);border:1px solid rgba(0,203,219,0.25);border-radius:20px;padding:28px;display:flex;gap:20px;align-items:flex-start}
        .ch-step-num{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:42px;color:var(--accent);line-height:1;flex-shrink:0;width:48px}
        .ch-step-title{font-size:16px;font-weight:600;margin-bottom:6px}
        .ch-step-text{font-size:14px;color:var(--gray-4);line-height:1.6}
        .ch-cambio-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(0,203,219,0.1);border:1px solid rgba(0,203,219,0.25);color:var(--accent)}
        .ch-invest-lead{font-size:16px;color:var(--gray-3);line-height:1.7;max-width:620px;text-align:center;margin:0 auto 8px}
        .ch-invest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:40px auto 32px;align-items:stretch}
        .ch-invest-card{background:var(--cyan-card);border:2px solid rgba(0,203,219,0.4);border-radius:18px;padding:32px 24px 28px;text-align:center;position:relative;display:flex;flex-direction:column}
        .ch-invest-card.best{background:var(--cyan-card-ft);border-color:rgba(0,203,219,0.7)}
        .ch-invest-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#000;background:var(--accent);border-radius:100px;padding:4px 12px;white-space:nowrap}
        .ch-invest-dur{font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
        .ch-invest-price{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:34px;color:var(--white);line-height:1}
        .ch-invest-mese{font-size:13px;color:var(--gray-4);margin-top:6px}
        .ch-invest-divider{height:1px;background:rgba(255,255,255,0.08);margin:22px 0 18px}
        .ch-invest-features{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px;text-align:left;flex:1}
        .ch-invest-features li{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--gray-3);line-height:1.45}
        .ch-invest-features li .ck{color:var(--accent);flex-shrink:0;margin-top:1px}
        .ch-invest-features li .hl{color:var(--gold);font-weight:600}
        .ch-invest-buy{display:block;margin-top:22px;text-align:center;background:linear-gradient(to bottom,#4ADE80 0%,#16A34A 100%);color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:800;padding:14px;border-radius:12px;text-decoration:none;letter-spacing:0.02em;transition:filter 0.2s,transform 0.2s}
        .ch-invest-buy:hover{filter:brightness(1.08);transform:translateY(-1px)}
        .ch-invest-cta{text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:8px}
        .ch-invest-scarcity{font-size:14px;color:var(--gray-4);line-height:1.7;max-width:560px;text-align:center;margin:8px auto 32px}
        .ch-invest-scarcity strong{color:var(--gold)}
        .ch-faq-list{display:flex;flex-direction:column;gap:8px;margin-top:48px}
        .ch-faq-item{background:var(--bg);border:1px solid var(--border-2);border-radius:14px;overflow:hidden;transition:border-color 0.2s}
        .ch-faq-item.open{border-color:rgba(0,203,219,0.4);background:#000}
        .ch-faq-question{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;background:none;border:none;color:var(--white);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;text-align:left;cursor:pointer}
        .ch-faq-icon{width:22px;height:22px;border-radius:50%;border:1px solid var(--border-2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--gray-4);font-size:14px;transition:all 0.2s}
        .ch-faq-item.open .ch-faq-icon{border-color:var(--accent);color:var(--accent);transform:rotate(45deg)}
        .ch-faq-answer{display:none;padding:0 24px 20px;font-size:14px;color:var(--gray-4);line-height:1.75}
        .ch-faq-item.open .ch-faq-answer{display:block}
        .ch-cta-block{position:relative;z-index:1;text-align:center;max-width:660px;margin:0 auto;padding:100px 24px}
        .ch-cta-block p{font-size:16px;color:var(--gray-4);line-height:1.7;margin:20px 0 36px}
        .ch-cta-firma{font-size:14px;color:var(--gray-6);margin-top:20px}
        .ch-footer{position:relative;z-index:1;text-align:center;padding:28px 24px;border-top:1px solid var(--border);font-size:11px;color:var(--gray-6)}
        .ch-footer a{color:var(--gray-4);text-decoration:none;margin:0 8px}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.in{opacity:1;transform:translateY(0)}
        @keyframes chFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes chPulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:768px){
          .ch-hero{height:auto;min-height:100vh;max-height:none;padding:0 0 40px}
          .ch-hero-content{grid-template-columns:1fr;gap:0;padding:26vh 16px 0}
          .ch-hero-left{align-items:center;text-align:center}
        }
        @media(max-width:900px){.ch-invest-grid{grid-template-columns:1fr;max-width:400px}}
        @media(max-width:600px){.ch-section{padding:56px 20px}}
      `}</style>

      <div className="ch-body">
        {/* Press top bar */}
        <div className="ch-press-topbar">
          <span className="ch-press-topbar-label">Visto su</span>
          <img
            src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png"
            alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2"
            width={320}
            height={18}
            fetchPriority="low"
          />
        </div>

        {/* Hero */}
        <section className="ch-hero">
          <img
            className="bg"
            src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/affondo-dave-intera.jpg"
            alt="Dave Gamba Premium Coaching"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="ch-hero-content">
            <div className="ch-hero-left">
              <div className="ch-hero-eyebrow">Coaching Online 1-1 con Dave</div>
              <h1 className="ch-hero-title">
                Il servizio personale per il tuo salto di qualità fisico, definitivo.
              </h1>
              <p className="ch-hero-sub">
                Il percorso costruito su misura su di te per scolpire un fisico atletico asciutto e scolpito, seguito personalmente da Dave.
              </p>
              <a href="/coaching/candidati" className="ch-btn-gold">
                Candidati al coaching →
              </a>
            </div>
          </div>
        </section>

        {/* IL COACHING È PER CHI */}
        <div className="ch-perchi-block">
          <div className="ch-perchi-inner reveal">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex" }}>
                <span className="ch-badge-dot" />
                La trasformazione
              </div>
            </div>
            <h2 className="ch-section-title">Il coaching è <em>per chi</em></h2>
            <div className="ch-perchi-list">
              {PER_CHI.map((t) => (
                <div key={t} className="ch-perchi-item">
                  <div className="ch-cambio-icon">
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7L10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="ch-perchi-text">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COME FUNZIONA — 4 step */}
        <div className="ch-section reveal">
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex" }}>
              <span className="ch-badge-dot" />
              Il percorso
            </div>
          </div>
          <h2 className="ch-section-title">Come <em>funziona</em></h2>
          <p className="ch-section-sub">Quattro passaggi. Dal punto in cui sei ora al risultato che vuoi.</p>
          <div className="ch-steps" style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            {STEPS.map((s) => (
              <div key={s.n} className="ch-step">
                <div className="ch-step-num">{s.n}</div>
                <div>
                  <div className="ch-step-title">{s.title}</div>
                  <div className="ch-step-text">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ch-divider" />

        {/* TESTIMONIANZE — strip dinamica dalla home */}
        <Testimonials variant="dark" />

        {/* INVESTIMENTO & TRASPARENZA */}
        <div className="ch-section reveal">
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex" }}>
              <span className="ch-badge-dot" />
              Per iniziare subito
            </div>
          </div>
          <h2 className="ch-section-title">Scegli il <em>piano per te</em></h2>
          <p className="ch-invest-lead">
            Per iniziare subito scegli il piano ideale per te.
          </p>
          <div className="ch-invest-grid">
            {FORMULE.map((f) => (
              <div key={f.dur} className={`ch-invest-card${f.best ? " best" : ""}`}>
                {f.best && <span className="ch-invest-badge">Più scelto</span>}
                <div className="ch-invest-dur">{f.dur}</div>
                <div className="ch-invest-price">{f.price}</div>
                <div className="ch-invest-mese">≈ {f.mese}</div>
                <div className="ch-invest-divider" />
                <ul className="ch-invest-features">
                  {HERO_FEATURES.map((feat, i) =>
                    typeof feat === "string"
                      ? <li key={i}><span className="ck">✓</span>{feat}</li>
                      : <li key={i}><span className="ck">✓</span>{feat.text}<span className="hl">{f.hl}</span></li>
                  )}
                </ul>
                <a href={f.stripe} target="_blank" rel="noopener noreferrer" className="ch-invest-buy">
                  Acquista ora {f.dur} →
                </a>
              </div>
            ))}
          </div>
          <p className="ch-invest-scarcity">
            <strong>Posti limitati</strong> — seguo solo 2 persone nuove al mese perché seguo ogni persona personalmente.
          </p>
          <div className="ch-invest-cta">
            <a href="/coaching/candidati" className="ch-btn-gold">
              Candidati al coaching →
            </a>
          </div>
        </div>

        <div className="ch-divider" />

        {/* FAQ */}
        <div style={{ position: "relative", zIndex: 1, background: "var(--bg-3)", borderTop: "1px solid var(--border-2)", borderBottom: "1px solid var(--border-2)" }}>
          <div className="ch-section reveal">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex" }}>
                <span className="ch-badge-dot" />
                FAQ
              </div>
            </div>
            <h2 className="ch-section-title" style={{ color: "var(--white)" }}>Domande e <em>risposte</em></h2>
            <p className="ch-section-sub" style={{ color: "var(--gray-4)" }}>Quelle che mi fanno sempre. Rispondo qui, senza giri di parole.</p>
            <div className="ch-faq-list" style={{ background: "transparent" }}>
              {FAQ.map((f) => (
                <div key={f.q} className="ch-faq-item">
                  <button className="ch-faq-question" onClick={toggleFaq}>
                    {f.q}
                    <span className="ch-faq-icon">+</span>
                  </button>
                  <div className="ch-faq-answer">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA FINALE */}
        <div className="ch-cta-block reveal">
          <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex", margin: "0 auto 16px" }}>
            <span className="ch-badge-dot" />
            Il prossimo passo
          </div>
          <h2 className="ch-section-title">
            Compila il <em>questionario</em>
          </h2>
          <a href="/coaching/candidati" className="ch-btn-gold" style={{ fontSize: 16, padding: "18px 44px" }}>
            Candidati al coaching →
          </a>
          <div className="ch-cta-firma">Sali di livello, Dave</div>
        </div>

        {/* Footer */}
        <div className="ch-footer">
          © Dave Gamba &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/termini">Termini e Condizioni</Link>
        </div>
      </div>
    </>
  );
}
