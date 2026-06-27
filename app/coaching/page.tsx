"use client";
import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import Testimonials from "@/components/home/Testimonials";

const HERO_FEATURES = [
  "Consulenza personale con Dave",
  "Analisi completa: blocchi, obiettivi, stile di vita",
  "Piano Strategico su misura",
  "Piano d'Allenamento BIM stilato da Dave",
  "Piano Alimentare con biologa nutrizionista",
  "Video esecuzione per ogni esercizio",
  "Check settimanale con Dave",
  { text: "Supporto WhatsApp per ", hl: "6 mesi" },
  "Affiancamento fino all'obiettivo",
];

const CAMBI = [
  "La tua migliore forma fisica di sempre — atletica, attraente, e soprattutto definitiva, non temporanea.",
  "Allenamenti brevi e mirati che ti danno più risultati in meno tempo.",
  "Un'alimentazione su misura — flessibile, senza rinunce inutili.",
  "L'energia e la lucidità che credevi di aver perso con gli anni.",
  "La certezza, finalmente, di essere sulla strada giusta.",
  "Qualcuno che ti tiene in rotta quando la motivazione cala.",
];

const STEPS = [
  { n: "1", title: "Candidatura", text: "Compili il questionario. Mi racconti dove sei e dove vuoi arrivare. Lo leggo io, personalmente." },
  { n: "2", title: "La call", text: "Ci sentiamo. Capisco i tuoi blocchi, il tuo tempo, la tua vita reale. Se non sei adatto te lo dico." },
  { n: "3", title: "Il tuo piano", text: "Costruisco allenamento BIM + alimentazione su misura. Niente schede copia-incolla. Niente diete da fame." },
  { n: "4", title: "Affiancamento", text: "Ti seguo fino all'obiettivo. WhatsApp diretto, check ogni settimana, correzioni in corsa. Non molli perché non sei solo." },
];

const FAQ = [
  { q: "Quanto costa?", a: "Te lo dico in call, dopo aver capito il tuo caso. È un investimento importante e personalizzato: non avrebbe senso un prezzo 'da listino' prima di sapere cosa ti serve. La candidatura è gratuita e senza impegno." },
  { q: "Bastano davvero 21 minuti?", a: "Sì, se fatti nell'ordine giusto. Non conta quanto ti alleni, conta come. È la costanza che ti cambia, non le ore in palestra." },
  { q: "Funziona se sono fermo da anni?", a: "È fatto apposta per chi riparte. Si parte dal tuo livello e si sale un gradino alla volta. Nella mia esperienza, chi riparte motivato ottiene risultati più rapidi di chi non si è mai fermato." },
  { q: "È tutto online?", a: "Sì. Piano, video di ogni esercizio, check e affiancamento su WhatsApp. Ti alleni dove vuoi, quando vuoi, ma non sei mai solo." },
  { q: "Devo andare in palestra?", a: "Come preferisci. Adatto il piano a casa o palestra. Lavoro con entrambi da 15 anni: i risultati non cambiano." },
  { q: "E l'alimentazione?", a: "La costruiamo con una biologa nutrizionista. Flessibile, reale, niente diete da fame. L'obiettivo è che tu mangi bene per sempre, non per un mese." },
  { q: "Non ho tempo.", a: "È esattamente il motivo per cui esiste questo metodo. 21 minuti, 3 volte a settimana. Se non hai questo, non hai tempo per stare in salute — e dobbiamo parlarne." },
  { q: "Quanto dura il percorso?", a: "L'affiancamento è di 6 mesi. Il tempo che serve per costruire qualcosa che poi resta tuo." },
];

export default function CoachingPage() {
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
      <Script id="fb-pixel-coaching" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','1727789690815942');
        fbq('track','PageView');
        fbq('track','ViewContent',{content_name:'Coaching 1-1',content_category:'coaching'});
      `}</Script>
      <style>{`
        .ch-body{font-family:'DM Sans',sans-serif;background:#0a0a0a;color:#fafaf8;overflow-x:hidden}
        .ch-body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.032) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;z-index:0}
        :root{--accent:#00CBDB;--gold:#F0C040;--bg:#0a0a0a;--bg-1:#111;--bg-2:#161616;--bg-3:#1c1c1c;--cyan-card:#0d1a1e;--cyan-card-ft:#0d2028;--white:#fafaf8;--gray-3:#c8c8c4;--gray-4:#9a9a94;--gray-6:#5a5a55;--border:#252525;--border-2:#333}
        .ch-hero{position:relative;width:100%;height:100vh;max-height:860px;overflow:hidden;display:flex;align-items:center;justify-content:center}
        .ch-hero img.bg{position:absolute;inset:0;width:100%;height:115%;object-fit:cover;object-position:center top;display:block;transform:translateY(-3%)}
        .ch-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 0%,rgba(10,10,10,0.78) 50%,rgba(10,10,10,0.15) 100%);pointer-events:none}
        .ch-hero-content{position:relative;z-index:2;padding:0 40px;width:100%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;animation:chFadeUp 0.7s ease 0.1s both}
        .ch-hero-left{display:flex;flex-direction:column;align-items:flex-start;text-align:left}
        .ch-hero-card{background:rgba(13,26,30,0.60);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(0,203,219,0.4);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;position:relative}
        .ch-hero-card-badge{position:absolute;top:-16px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#000;background:var(--accent);border-radius:100px;padding:7px 20px;white-space:nowrap}
        .ch-hero-card-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
        .ch-hero-card-features li{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--gray-3);line-height:1.45}
        .ch-hero-card-features li .ck{color:var(--accent);flex-shrink:0;margin-top:1px}
        .ch-hero-card-features li .hl{color:var(--gold);font-weight:600}
        .ch-checks-block{position:relative;z-index:1;background:#0d0d0d;border-top:1px solid var(--border)}
        .ch-checks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:1100px;margin:0 auto}
        .ch-check-item{display:flex;align-items:flex-start;gap:14px;padding:24px 20px;border-right:1px solid var(--border);border-bottom:1px solid var(--border)}
        .ch-check-item:nth-child(3n){border-right:none}
        .ch-check-item:nth-last-child(-n+3){border-bottom:none}
        .ch-check-icon{width:24px;height:24px;border-radius:50%;background:rgba(0,203,219,0.1);border:1px solid rgba(0,203,219,0.25);color:var(--accent);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;margin-top:1px}
        .ch-check-text{font-size:13px;color:var(--gray-3);line-height:1.55}
        .ch-press-topbar{position:relative;z-index:10;background:#fff;border-bottom:1px solid #e8e2d8;padding:10px 24px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
        .ch-press-topbar-label{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#aaa;margin-right:4px}
        .ch-press-topbar img{height:18px;object-fit:contain;opacity:0.7}
        .ch-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:5px 16px;border-radius:100px;margin-bottom:18px}
        .ch-badge-gold{background:rgba(240,192,64,0.12);color:var(--gold);border:1px solid rgba(240,192,64,0.25)}
        .ch-badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:chPulse 2s infinite}
        .ch-hero-eyebrow{font-size:12px;font-weight:300;color:rgba(255,255,255,0.4);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:10px}
        .ch-hero-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(48px,8vw,86px);line-height:1.0;letter-spacing:-0.02em;color:var(--white);margin-bottom:18px;font-weight:700}
        .ch-hero-title em{font-style:italic;color:var(--accent)}
        .ch-hero-sub{font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.7);font-weight:300;max-width:520px;margin:0 0 28px;line-height:1.65}
        .ch-btn-gold{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:800;padding:18px 40px;border-radius:14px;border:none;cursor:pointer;text-decoration:none;transition:all 0.2s;letter-spacing:0.04em;text-transform:uppercase}
        .ch-btn-gold:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .ch-btn-gold-outline{display:inline-flex;align-items:center;gap:10px;background:transparent;color:var(--gold);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:800;padding:18px 40px;border-radius:14px;border:1.5px solid var(--gold);cursor:pointer;text-decoration:none;transition:all 0.2s;letter-spacing:0.04em;text-transform:uppercase}
        .ch-btn-gold-outline:hover{background:rgba(240,192,64,0.1);transform:translateY(-1px)}
        .ch-section{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:80px 24px}
        .ch-bg-section{position:relative;z-index:1;background:var(--bg-1);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .ch-divider{height:1px;background:var(--border);position:relative;z-index:1}
        .ch-section-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(30px,4vw,50px);line-height:1.1;letter-spacing:-0.02em;margin-bottom:14px;text-align:center}
        .ch-section-title em{font-style:italic;color:var(--accent)}
        .ch-section-sub{font-size:16px;color:var(--gray-4);font-weight:300;line-height:1.7;max-width:580px;text-align:center;margin-left:auto;margin-right:auto}
        .ch-funziona-grid{display:grid;grid-template-columns:380px 1fr;gap:60px;align-items:center;margin-top:48px}
        .ch-funziona-foto{border-radius:20px;overflow:hidden;aspect-ratio:3/4;background:var(--bg-2);position:relative}
        .ch-funziona-foto img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
        .ch-steps{display:flex;flex-direction:column;gap:16px}
        .ch-step{background:var(--cyan-card);border:1px solid rgba(0,203,219,0.25);border-radius:20px;padding:28px;display:flex;gap:20px;align-items:flex-start}
        .ch-step-num{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:42px;color:var(--accent);line-height:1;flex-shrink:0;width:48px}
        .ch-step-title{font-size:16px;font-weight:600;margin-bottom:6px}
        .ch-step-text{font-size:14px;color:var(--gray-4);line-height:1.6}
        .ch-cambio-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-top:40px}
        .ch-cambio-item{display:flex;align-items:flex-start;gap:14px;background:var(--cyan-card);border:1px solid rgba(0,203,219,0.15);border-radius:16px;padding:20px}
        .ch-cambio-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(0,203,219,0.1);border:1px solid rgba(0,203,219,0.25);color:var(--accent)}
        .ch-cambio-item p{font-size:14px;color:var(--gray-3);line-height:1.55;margin:0}
        .ch-non-box{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 24px 80px}
        .ch-non-cols{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .ch-non-inner{background:var(--bg-2);border:1px solid var(--border);border-radius:20px;padding:32px 36px;display:flex;flex-direction:column;gap:12px}
        .ch-non-title{font-size:13px;font-weight:600;color:var(--gray-6);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:4px}
        .ch-non-item{display:flex;align-items:flex-start;gap:12px;font-size:14px;line-height:1.5}
        .ch-non-item.yes{color:var(--gray-3)}
        .ch-non-item.no{color:#e05555}
        .ch-non-icon{flex-shrink:0;margin-top:1px;font-size:15px}
        .ch-scarcity{position:relative;z-index:1;background:var(--bg-1);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:56px 24px;text-align:center}
        .ch-scarcity-inner{max-width:640px;margin:0 auto}
        .ch-scarcity-inner p{font-size:16px;color:var(--gray-4);line-height:1.7;margin:12px 0 0}
        .ch-faq-list{display:flex;flex-direction:column;gap:8px;margin-top:48px}
        .ch-faq-item{background:#fff;border:1px solid #e0d9cc;border-radius:14px;overflow:hidden;transition:border-color 0.2s}
        .ch-faq-item.open{border-color:rgba(0,203,219,0.4)}
        .ch-faq-question{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;background:none;border:none;color:#0A1A20;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;text-align:left;cursor:pointer}
        .ch-faq-icon{width:22px;height:22px;border-radius:50%;border:1px solid #d0c9be;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#888;font-size:14px;transition:all 0.2s}
        .ch-faq-item.open .ch-faq-icon{border-color:var(--accent);color:var(--accent);transform:rotate(45deg)}
        .ch-faq-answer{display:none;padding:0 24px 20px;font-size:14px;color:#666;line-height:1.7}
        .ch-faq-item.open .ch-faq-answer{display:block}
        .ch-cta-block{position:relative;z-index:1;text-align:center;max-width:660px;margin:0 auto;padding:100px 24px}
        .ch-cta-block p{font-size:16px;color:var(--gray-4);line-height:1.7;margin:20px 0 36px}
        .ch-cta-firma{font-size:14px;color:var(--gray-6);margin-top:20px}
        .ch-footer{position:relative;z-index:1;text-align:center;padding:28px 24px;border-top:1px solid var(--border);font-size:11px;color:var(--gray-6)}
        .ch-footer a{color:var(--gray-4);text-decoration:none;margin:0 8px}
        .ch-dave-block{position:relative;z-index:1;background:#F5F1EB;border-top:1px solid #e5ddd0;border-bottom:1px solid #e5ddd0}
        .ch-dave-inner{max-width:1100px;margin:0 auto;padding:80px 24px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .ch-dave-text{display:flex;flex-direction:column;gap:16px}
        .ch-dave-text p{font-size:16px;color:#4a4540;line-height:1.75}
        .ch-dave-text strong{color:#0A1A20}
        .ch-dave-img{border-radius:20px;overflow:hidden;aspect-ratio:4/5;background:var(--bg-2)}
        .ch-dave-img img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.in{opacity:1;transform:translateY(0)}
        @keyframes chFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes chPulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:960px){
          .ch-funziona-grid{grid-template-columns:1fr}
          .ch-funziona-foto{max-width:360px}
          .ch-dave-inner{grid-template-columns:1fr}
          .ch-dave-img{max-width:360px}
          .ch-non-cols{grid-template-columns:1fr}
        }
        @media(max-width:768px){
          .ch-hero{height:auto;min-height:100vh;max-height:none;padding:0 0 40px}
          .ch-hero-content{grid-template-columns:1fr;gap:0;padding:32px 16px 0}
          .ch-hero-left{align-items:center;text-align:center}
          .ch-hero-card{margin-top:48px;padding:40px 20px 24px}
          .ch-hero-card-badge{font-size:11px;padding:6px 16px}
          .ch-checks-grid{grid-template-columns:1fr}
          .ch-check-item{border-right:none;padding:18px 16px}
          .ch-check-item:nth-last-child(-n+3){border-bottom:1px solid var(--border)}
          .ch-check-item:last-child{border-bottom:none}
        }
        @media(max-width:600px){.ch-section{padding:56px 20px}}
      `}</style>

      <div className="ch-body">
        {/* Press top bar */}
        <div className="ch-press-topbar">
          <span className="ch-press-topbar-label">Come visto su</span>
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
            src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/foto-sfida-estiva.jpg"
            alt="Dave Gamba Premium Coaching"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="ch-hero-content">
            <div className="ch-hero-left">
              <div className="ch-hero-eyebrow">Coaching Online 1-1 con Dave</div>
              <h1 className="ch-hero-title">
                Il salto di qualità definitivo<br />
                <em>al tuo miglior fisico.</em>
              </h1>
              <p className="ch-hero-sub">
                Ti seguo io, personalmente. Un percorso costruito su di te — allenamento, alimentazione, testa — per arrivare a un corpo atletico e tenertelo. Per sempre, non per un&apos;estate.
              </p>
              <a href="/coaching/candidati" className="ch-btn-gold">
                Candidati al coaching →
              </a>
            </div>

            <div className="ch-hero-card">
              <div className="ch-hero-card-badge">COSA OTTIENI</div>
              <ul className="ch-hero-card-features">
                {HERO_FEATURES.map((f, i) =>
                  typeof f === "string"
                    ? <li key={i}><span className="ck">✓</span>{f}</li>
                    : <li key={i}><span className="ck">✓</span>{f.text}<span className="hl">{f.hl}</span></li>
                )}
              </ul>
              <a href="/coaching/candidati" className="ch-btn-gold" style={{ justifyContent: "center", whiteSpace: "nowrap" }}>
                Compila il questionario →
              </a>
            </div>
          </div>
        </section>

        {/* 6 spunte benefits */}
        <div className="ch-checks-block">
          <div className="ch-checks-grid">
            {[
              "La tua migliore forma fisica di sempre — atletica, attraente, e soprattutto definitiva, non temporanea.",
              "Allenamenti brevi e mirati che ti danno più risultati in meno tempo",
              "Un'alimentazione su misura — flessibile, senza rinunce inutili",
              "L'energia e la lucidità che credevi di aver perso con gli anni",
              "La certezza, finalmente, di essere sulla strada giusta",
              "Qualcuno che ti tiene in rotta quando la motivazione cala",
            ].map((t) => (
              <div key={t} className="ch-check-item">
                <div className="ch-check-icon">
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7L10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className="ch-check-text">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CHI È DAVE */}
        <div className="ch-dave-block">
          <div className="ch-dave-inner reveal">
            <div className="ch-dave-text">
              <div className="ch-badge ch-badge-gold">
                <span className="ch-badge-dot" />
                Chi ti segue
              </div>
              <h2 className="ch-section-title" style={{ textAlign: "left", margin: 0, color: "#0A1A20" }}>
                Non sono un&apos;app.<br /><em>Sono io.</em>
              </h2>
              <p>
                Alleno online dal 2009. <strong>Primo personal trainer online in Italia.</strong> Oltre <strong>3.000 persone seguite</strong>, 15 anni a fare solo questo.
              </p>
              <p>
                Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2 hanno parlato di me e del Metodo BIM. Ma i nomi che contano sono gli altri 3.000. Quelli che si sono rimessi in forma quando pensavano fosse troppo tardi.
              </p>
              <p>
                Nel coaching 1-1 non deleghi a un assistente. <strong>Parli con me.</strong> Leggo io il tuo questionario. Ti rispondo io su WhatsApp. Costruisco io il tuo piano.
              </p>
              <p>
                Se ti alleni, sei un atleta. E ogni atleta merita un coach vero.
              </p>
              <a href="/coaching/candidati" className="ch-btn-gold" style={{ width: "fit-content", marginTop: 8 }}>
                Candidati al coaching →
              </a>
            </div>
            <div className="ch-dave-img">
              <img
                src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/affondo-dave-intera.jpg"
                alt="Dave Gamba personal trainer"
                width={600}
                height={750}
                loading="lazy"
              />
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

        {/* COSA CAMBIA PER TE */}
        <div className="ch-section reveal">
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex" }}>
              <span className="ch-badge-dot" />
              La trasformazione
            </div>
          </div>
          <h2 className="ch-section-title">Cosa <em>cambia</em> per te</h2>
          <p className="ch-section-sub">Non solo il fisico. Il modo in cui vivi il tuo corpo.</p>
          <div className="ch-cambio-grid">
            {CAMBI.map((c) => (
              <div key={c} className="ch-cambio-item">
                <div className="ch-cambio-icon">
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7L10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p>{c}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ch-divider" />

        {/* TESTIMONIANZE — strip dinamica dalla home */}
        <Testimonials />

        {/* SCARSITÀ */}
        <div className="ch-scarcity reveal">
          <div className="ch-scarcity-inner">
            <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex", margin: "0 auto 12px" }}>
              <span className="ch-badge-dot" />
              Posti limitati
            </div>
            <h2 className="ch-section-title" style={{ margin: 0 }}>
              Seguo solo <em>due persone nuove</em> al mese.
            </h2>
            <p>
              È 1-1, lo faccio io, e le ore in un giorno sono quelle. Per questo si entra su candidatura: se c&apos;è posto e siamo in linea, partiamo. Se non c&apos;è posto ti metto in lista e ti avviso io.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="ch-bg-section">
          <div className="ch-section reveal">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="ch-badge ch-badge-gold" style={{ display: "inline-flex" }}>
                <span className="ch-badge-dot" />
                FAQ
              </div>
            </div>
            <h2 className="ch-section-title">Domande e <em>risposte</em></h2>
            <p className="ch-section-sub">Quelle che mi fanno sempre. Rispondo qui, senza giri di parole.</p>
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
            Se fa per te,<br /><em>lo capiamo subito.</em>
          </h2>
          <p>
            Compila il questionario. Lo leggo io. Se siamo in linea, ti scrivo per la call.<br />
            Se ti alleni, sei un atleta. Inizia da qui.
          </p>
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
