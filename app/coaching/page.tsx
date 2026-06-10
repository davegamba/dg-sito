"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import Testimonials from "@/components/home/Testimonials";

const FAQ_LIST = [
  { q: "Quanto durano gli allenamenti?", a: "20-30 minuti per sessione. Il Metodo BIM — Breve, Intenso, Mirato — è progettato per chi ha poco tempo e vuole massimi risultati. Niente ore in palestra." },
  { q: "Sono principiante, posso farlo?", a: "Assolutamente sì. Anzi, cominciare subito con un metodo corretto ti evita mesi o anni di errori. Il piano viene costruito esattamente sul tuo livello di partenza." },
  { q: "Per casa o palestra?", a: "Entrambe. Il piano viene costruito in base a dove ti alleni. Per casa bastano manubri a vite e un tappetino — nessuna attrezzatura costosa." },
  { q: "È per uomo e donna?", a: "Sì. I principi fisiologici di base sono gli stessi — ogni piano viene poi cucito sulla persona specifica, tenendo conto di obiettivi, ormoni e stile di vita." },
  { q: "Posso seguire il coaching anche dall'estero?", a: "Sì, tutto online. Ho clienti in tutta Europa e oltre. Basta una connessione internet e uno smartphone." },
  { q: "Quando vedrò i risultati?", a: "Primi risultati visibili in 2-3 settimane. Cambiamenti profondi tra 2-3 mesi. Risultati solidi e duraturi tra 3-6 mesi. Non fidarti di chi ti vende trasformazioni immediate — non esistono." },
  { q: "Il piano cambia durante il percorso?", a: "Sì. I check settimanali servono proprio a questo: analizzare i progressi e adattare il piano per mantenerti sempre in traiettoria. Il metodo evolve con te." },
  { q: "Cosa succede alla fine del Coaching?", a: "Avrai tutti gli strumenti per continuare in autonomia. Ti insegno non solo cosa fare, ma come ragionare — così puoi adattare il metodo alla tua vita per sempre." },
  { q: "Posso pagare a rate?", a: "Sì. L'Accelerator (6 mesi) si paga in 2 rate da 265€. L'Exclusive (12 mesi) in 3 rate da 330€. Le opzioni sono disponibili al momento del pagamento tramite Stripe." },
  { q: "Metodi di pagamento accettati?", a: "Tutti i pagamenti passano per Stripe, che supporta: carte di credito e debito (Visa, Mastercard, Amex), Apple Pay, Google Pay, Klarna, SEPA Direct Debit e Satispay." },
];

const PIANI = [
  {
    badge: "Per iniziare", badgeFeatured: false,
    duration: "Coaching da 3 mesi", name: "Starter",
    features: ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "3 mesi" }, "Affiancamento fino all'obiettivo"],
    price: "290€", priceSub: "/ 3 mesi", monthly: "≈ 97€/mese", rate: "", stripe: "https://buy.stripe.com/8x200k6pE4Dc0RkaFC1Nu01",
  },
  {
    badge: "Più scelto", badgeFeatured: true,
    duration: "Coaching da 6 mesi", name: "Accelerator",
    features: ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "6 mesi" }, "Affiancamento fino all'obiettivo"],
    price: "530€", priceSub: "/ 6 mesi", monthly: "≈ 88€/mese", rate: "oppure 2 rate da 265€ con Stripe 🔒", stripe: "https://buy.stripe.com/aFa7sM15kedM1Vo2961Nu02",
  },
  {
    badge: "Il definitivo", badgeFeatured: false,
    duration: "Coaching da 12 mesi", name: "Exclusive",
    features: ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "12 mesi" }, "Affiancamento fino all'obiettivo"],
    price: "960€", priceSub: "/ 12 mesi", monthly: "≈ 80€/mese", rate: "oppure 3 rate da 330€ con Stripe 🔒", stripe: "https://buy.stripe.com/8x228scO27Po0Rk5li1Nu03",
  },
];

export default function CoachingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scaleVal, setScaleVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!scaleVal) { setError("Seleziona il tuo livello di impegno sulla scala 1-5."); return; }
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = { impegno: scaleVal };
    data.forEach((v, k) => { payload[k] = v; });
    payload.impegno = scaleVal;

    try {
      const res = await fetch("/api/coaching-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      (window as any).fbq?.("track", "Lead");
      (window as any).gtag?.("event", "coaching_application", { event_category: "lead", event_label: "coaching-1-1" });
      setSuccess(true);
    } catch {
      setError("Errore nell'invio. Riprova o scrivimi direttamente su Instagram.");
    } finally {
      setLoading(false);
    }
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
        .ch-section-antr{background:#0f0f14}
        .ch-section-navy{background:#080e1c}
        .ch-hero{position:relative;width:100%;height:100vh;max-height:860px;overflow:hidden;display:flex;align-items:center;justify-content:center}
        .ch-hero img.bg{position:absolute;inset:0;width:100%;height:115%;object-fit:cover;object-position:center top;display:block;transform:translateY(-3%)}
        .ch-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 0%,rgba(10,10,10,0.78) 50%,rgba(10,10,10,0.15) 100%);pointer-events:none}
        .ch-hero-content{position:relative;z-index:2;padding:0 24px;text-align:center;width:100%;animation:chFadeUp 0.7s ease 0.1s both}
        .ch-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:5px 16px;border-radius:100px;margin-bottom:18px}
        .ch-badge-gold{background:rgba(240,192,64,0.12);color:var(--gold);border:1px solid rgba(240,192,64,0.25)}
        .ch-badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:chPulse 2s infinite}
        .ch-hero-title{font-family:'DM Serif Display',serif;font-size:clamp(48px,8vw,86px);line-height:1.0;letter-spacing:-0.02em;color:var(--white);margin-bottom:18px}
        .ch-hero-title em{font-style:italic;color:var(--accent)}
        .ch-hero-sub{font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.6);font-weight:300;max-width:520px;margin:0 auto 28px;line-height:1.65}
        .ch-btn-row{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap}
        .ch-btn-gold{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;padding:16px 36px;border-radius:100px;border:none;cursor:pointer;text-decoration:none;transition:all 0.2s;letter-spacing:0.02em}
        .ch-btn-gold:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .ch-btn-outline{display:inline-flex;align-items:center;gap:10px;background:transparent;color:rgba(255,255,255,0.6);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:400;padding:14px 28px;border-radius:100px;border:1px solid rgba(255,255,255,0.15);cursor:pointer;text-decoration:none;transition:all 0.2s}
        .ch-btn-outline:hover{border-color:rgba(255,255,255,0.35);color:var(--white)}
        .ch-btn-gold-outline{display:inline-flex;align-items:center;gap:10px;background:transparent;color:var(--gold);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;padding:16px 36px;border-radius:100px;border:1.5px solid var(--gold);cursor:pointer;text-decoration:none;transition:all 0.2s;letter-spacing:0.02em}
        .ch-btn-gold-outline:hover{background:rgba(240,192,64,0.1);transform:translateY(-1px)}
        .ch-press-bar{position:relative;z-index:1;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:20px 24px;background:var(--bg-1);display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
        .ch-press-label{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gray-6);margin-right:4px}
        .ch-press-logos{display:flex;align-items:center;gap:32px;flex-wrap:wrap;justify-content:center}
        .ch-press-logos img{height:20px;object-fit:contain;opacity:0.45;filter:brightness(0) invert(1)}
        .ch-section{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:80px 24px}
        .ch-bg-section{position:relative;z-index:1;background:var(--bg-1);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .ch-divider{height:1px;background:var(--border);position:relative;z-index:1}
        .ch-section-title{font-family:'DM Serif Display',serif;font-size:clamp(30px,4vw,50px);line-height:1.1;letter-spacing:-0.02em;margin-bottom:14px;text-align:center}
        .ch-section-title em{font-style:italic;color:var(--accent)}
        .ch-section-sub{font-size:16px;color:var(--gray-4);font-weight:300;line-height:1.7;max-width:580px;text-align:center;margin-left:auto;margin-right:auto}
        .ch-funziona-grid{display:grid;grid-template-columns:380px 1fr;gap:60px;align-items:center;margin-top:48px}
        .ch-funziona-foto{border-radius:20px;overflow:hidden;aspect-ratio:3/4;background:var(--bg-2);position:relative}
        .ch-funziona-foto img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
        .ch-funziona-caption{padding:20px;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);position:absolute;bottom:0;left:0;right:0;border-top:1px solid rgba(255,255,255,0.08)}
        .ch-steps{display:flex;flex-direction:column;gap:16px}
        .ch-step{background:var(--cyan-card);border:1px solid var(--accent);border-radius:20px;padding:28px;display:flex;gap:20px;align-items:flex-start}
        .ch-step-num{font-family:'DM Serif Display',serif;font-size:42px;color:var(--accent);line-height:1;flex-shrink:0;width:48px}
        .ch-step-title{font-size:16px;font-weight:600;margin-bottom:6px}
        .ch-step-text{font-size:14px;color:var(--gray-4);line-height:1.6}
        .ch-cambio-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-top:40px}
        .ch-cambio-item{display:flex;align-items:flex-start;gap:14px;background:var(--cyan-card);border:1px solid rgba(0,203,219,0.15);border-radius:16px;padding:20px}
        .ch-cambio-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px}
        .ch-cambio-icon.check{background:rgba(0,203,219,0.1);border:1px solid rgba(0,203,219,0.25);color:var(--accent)}
        .ch-cambio-icon.arrow{background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.2);color:var(--gold);font-size:15px}
        .ch-cambio-item p{font-size:14px;color:var(--gray-3);line-height:1.55}
        .ch-non-box{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 24px 60px}
        .ch-non-inner{background:var(--bg-2);border:1px solid var(--border);border-radius:20px;padding:32px 36px;display:flex;flex-direction:column;gap:12px}
        .ch-non-title{font-size:13px;font-weight:600;color:var(--gray-6);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:4px}
        .ch-non-item{display:flex;align-items:flex-start;gap:12px;font-size:14px;color:#e05555;line-height:1.5}
        .ch-non-x{color:#e05555;flex-shrink:0;font-size:15px;margin-top:1px}
        .ch-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;align-items:start}
        .ch-plan-card{background:var(--cyan-card);border:1px solid rgba(0,203,219,0.2);border-radius:24px;padding:44px 28px 32px;display:flex;flex-direction:column;transition:border-color 0.2s;position:relative;overflow:visible}
        .ch-plan-card.featured{background:var(--cyan-card-ft);border-color:rgba(0,203,219,0.45)}
        .ch-plan-card:hover{border-color:rgba(0,203,219,0.35)}
        .ch-plan-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);background:var(--bg-1);border:1px solid rgba(0,203,219,0.35);border-radius:100px;padding:5px 14px;white-space:nowrap}
        .ch-plan-badge.featured{color:#000;background:var(--accent);border-color:var(--accent)}
        .ch-plan-duration{font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
        .ch-plan-name{font-family:'DM Serif Display',serif;font-size:38px;color:var(--white);margin-bottom:20px;line-height:1}
        .ch-plan-divider{height:1px;background:rgba(255,255,255,0.07);margin-bottom:20px}
        .ch-plan-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;flex:1;padding:0}
        .ch-plan-features li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--gray-3);line-height:1.5}
        .ch-plan-features li .check{color:var(--accent);flex-shrink:0;margin-top:1px}
        .ch-plan-features li .hl{color:var(--gold);font-weight:600}
        .ch-plan-price{font-family:'DM Serif Display',serif;font-size:42px;color:var(--white);line-height:1;margin-bottom:4px}
        .ch-plan-price span{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:var(--gray-6)}
        .ch-plan-rate{font-size:12px;color:var(--gray-6);margin-bottom:20px;margin-top:6px;min-height:18px}
        .ch-btn-plan{display:block;width:100%;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;padding:15px;border-radius:12px;border:none;cursor:pointer;text-decoration:none;text-align:center;transition:all 0.2s;letter-spacing:0.02em}
        .ch-btn-plan:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .ch-plans-note{text-align:center;font-size:12px;color:var(--gray-6);margin-top:24px;line-height:1.9}
        .ch-form-section{position:relative;z-index:1;background:#06080f;border-top:1px solid #1a1a2a;border-bottom:1px solid #1a1a2a}
        .ch-form-inner{max-width:800px;margin:0 auto;padding:80px 24px}
        .ch-coaching-form{display:flex;flex-direction:column;gap:28px}
        .ch-form-field{display:flex;flex-direction:column;gap:8px}
        .ch-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .ch-form-label{font-size:13px;font-weight:600;color:var(--white);letter-spacing:0.02em}
        .ch-form-label span{color:var(--accent);margin-left:2px}
        .ch-form-hint{font-size:12px;color:var(--gray-6);margin-top:-4px}
        .ch-form-input,.ch-form-textarea{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 16px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:border-color 0.2s;width:100%}
        .ch-form-input:focus,.ch-form-textarea:focus{border-color:rgba(0,203,219,0.5)}
        .ch-form-input::placeholder,.ch-form-textarea::placeholder{color:rgba(255,255,255,0.2)}
        .ch-form-textarea{resize:vertical;min-height:100px;line-height:1.6}
        .ch-radio-group,.ch-check-group{display:flex;flex-direction:column;gap:8px}
        .ch-radio-row,.ch-check-row{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 16px;cursor:pointer;transition:border-color 0.15s,background 0.15s;font-size:14px;color:var(--gray-3);user-select:none}
        .ch-radio-row:has(input:checked),.ch-check-row:has(input:checked){border-color:rgba(0,203,219,0.4);background:rgba(0,203,219,0.05);color:var(--white)}
        .ch-radio-row input,.ch-check-row input{accent-color:var(--accent);width:16px;height:16px;flex-shrink:0}
        .ch-scale-group{display:flex;gap:8px;flex-wrap:wrap}
        .ch-scale-btn{flex:1;min-width:40px;aspect-ratio:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:var(--gray-4);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center}
        .ch-scale-btn:hover{border-color:rgba(0,203,219,0.3);color:var(--white)}
        .ch-scale-btn.active{background:rgba(0,203,219,0.1);border-color:rgba(0,203,219,0.5);color:var(--accent)}
        .ch-form-divider{height:1px;background:var(--border);margin:4px 0}
        .ch-consent-row{display:flex;align-items:flex-start;gap:12px;cursor:pointer}
        .ch-consent-row input{width:16px;height:16px;margin-top:2px;flex-shrink:0;accent-color:var(--accent);cursor:pointer}
        .ch-consent-row span{font-size:12px;color:var(--gray-6);line-height:1.5}
        .ch-consent-row a{color:var(--accent);text-decoration:underline}
        .ch-btn-submit{width:100%;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;padding:18px;border-radius:14px;border:none;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:10px;letter-spacing:0.02em}
        .ch-btn-submit:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .ch-btn-submit:disabled{opacity:0.6;cursor:default;transform:none}
        .ch-form-success{text-align:center;padding:48px 24px;background:rgba(0,203,219,0.04);border:1px solid rgba(0,203,219,0.2);border-radius:20px}
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
        .ch-footer{position:relative;z-index:1;text-align:center;padding:28px 24px;border-top:1px solid var(--border);font-size:11px;color:var(--gray-6)}
        .ch-footer a{color:var(--gray-4);text-decoration:none;margin:0 8px}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.in{opacity:1;transform:translateY(0)}
        @keyframes chFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes chPulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:960px){.ch-funziona-grid{grid-template-columns:1fr}.ch-plans{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}}
        @media(max-width:600px){.ch-section{padding:56px 20px}.ch-form-row{grid-template-columns:1fr}}
      `}</style>

      <div className="ch-body">
        {/* Hero */}
        <section className="ch-hero">
          <img className="bg" src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/foto-sfida-estiva.jpg" alt="Dave Gamba Premium Coaching" />
          <div className="ch-hero-content">
            <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Coaching Online con Dave</div>
            <h1 className="ch-hero-title">Premium<br /><em>Coaching 1-1</em></h1>
            <p className="ch-hero-sub">Per chi vuole il massimo risultato fisico nel minor tempo possibile, con un percorso personalizzato e guidato da Dave.</p>
            <div className="ch-btn-row">
              <a href="#candidati" className="ch-btn-gold-outline">Candidati ora →</a>
              <a href="#piani" className="ch-btn-gold-outline">Vedi i piani</a>
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="w-full bg-white py-3 sm:py-4">
          <div className="w-full px-4 sm:px-8 flex flex-col items-center gap-2">
            <p className="text-[#999] text-[9px] font-semibold tracking-[0.2em] uppercase">
              Come visto su
            </p>
            <img
              src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png"
              alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2"
              className="w-full max-w-2xl h-7 sm:h-9 object-contain"
            />
          </div>
        </section>

        {/* Come funziona */}
        <div className="ch-bg-section ch-section-navy">
          <section className="ch-section reveal">
            <h2 className="ch-section-title" style={{ textAlign: "center" }}>Come funziona <em>in 3 passi</em></h2>
            <p className="ch-section-sub" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>Il Premium Coaching 1:1 per la tua trasformazione fisica definitiva con Dave.</p>
            <div className="ch-funziona-grid">
              <div className="ch-funziona-foto">
                <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/davegamba-estate-cover3.jpg" alt="Dave Gamba — Premium Coaching" />
              </div>
              <div className="ch-steps">
              {[
                { n: "01", t: "Candidati e fissa la call", d: "Compila il questionario qui sotto. È gratuito e senza impegno. Ti ricontatto entro 24-48h per una call conoscitiva — per capire se posso aiutarti davvero." },
                { n: "02", t: "Scegli il tuo piano", d: "Dopo la call scegli il pacchetto più adatto — 3, 6 o 12 mesi. Stesso sistema per tutti, durata diversa in base al tuo obiettivo." },
                { n: "03", t: "Ricevi i piani e si parte", d: "Analizzo la tua situazione e ricevi i tuoi piani personalizzati — allenamento e alimentazione. Da quel momento sono al tuo fianco ogni settimana." },
              ].map(({ n, t, d }) => (
                <div key={n} className="ch-step">
                  <div className="ch-step-num">{n}</div>
                  <div><div className="ch-step-title">{t}</div><p className="ch-step-text">{d}</p></div>
                </div>
              ))}
              </div>
            </div>
          </section>
        </div>

        <div className="ch-divider" />

        {/* Cambio vita */}
        <div style={{ background: "#f5f0e8", position: "relative", zIndex: 1 }}>
          <section className="ch-section reveal">
            <h2 className="ch-section-title" style={{ color: "#0A1A20", textAlign: "center" }}>Non solo fisico.<br /><em style={{ color: "var(--accent)" }}>Un cambio di vita.</em></h2>
            <p className="ch-section-sub" style={{ color: "#666", textAlign: "center", maxWidth: 560, margin: "0 auto" }}>Quello che costruiamo insieme rimane. Con il Premium Coaching otterrai:</p>
            <div className="ch-cambio-grid">
              {[
                { icon: "check", t: "La tua migliore forma fisica di sempre — atletica, attraente, e soprattutto definitiva, non temporanea." },
                { icon: "check", t: "Allenamenti brevi e mirati che ti danno più risultati in meno tempo" },
                { icon: "check", t: "Un'alimentazione su misura — flessibile, senza rinunce inutili" },
                { icon: "check", t: "L'energia e la lucidità che credevi di aver perso con gli anni" },
                { icon: "check", t: "La certezza, finalmente, di essere sulla strada giusta" },
                { icon: "arrow", t: "Qualcuno che ti tiene in rotta quando la motivazione cala" },
              ].map(({ icon, t }) => (
                <div key={t} className="ch-cambio-item">
                  <div className={`ch-cambio-icon ${icon}`}>{icon === "check" ? "✓" : "▸"}</div>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Non è per te */}
        <div className="ch-non-box ch-section-navy" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="ch-non-inner">
            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(18px,3vw,24px)", fontStyle: "italic", color: "var(--gray-3)", marginBottom: 12 }}>Non è per te se…</h3>
            {["Non sei disposto a seguire un piano strutturato per almeno 90 giorni", "Vuoi bodybuilding estremo o prepararti a competizioni agonistiche", "Cerchi solo \"la dieta del momento\" senza costruire un metodo duraturo"].map((t) => (
              <div key={t} className="ch-non-item"><span className="ch-non-x">✕</span>{t}</div>
            ))}
          </div>
        </div>

        <div className="ch-divider" />

        {/* Piani */}
        <section className="ch-section ch-section-antr reveal" id="piani">
          <h2 className="ch-section-title" style={{ fontSize: "clamp(42px,6vw,72px)", textAlign: "center", maxWidth: 600, margin: "0 auto 20px" }}>I Piani del<br /><em>Premium Coaching</em></h2>
          <p className="ch-section-sub" style={{ textAlign: "center", margin: "0 auto" }}>Scegli il piano ideale per te:</p>
          <div className="ch-plans">
            {PIANI.map(({ badge, badgeFeatured, duration, name, features, price, priceSub, rate, stripe }) => (
              <div key={name} className={`ch-plan-card${badgeFeatured ? " featured" : ""}`}>
                <div className={`ch-plan-badge${badgeFeatured ? " featured" : ""}`}>{badge}</div>
                <div className="ch-plan-duration">{duration}</div>
                <div className="ch-plan-name">{name}</div>
                <div className="ch-plan-divider" />
                <ul className="ch-plan-features">
                  {features.map((f, i) => typeof f === "string"
                    ? <li key={i}><span className="check">✓</span>{f}</li>
                    : <li key={i}><span className="check">✓</span>{f.text}<span className="hl">{f.hl}</span></li>
                  )}
                </ul>
                <div className="ch-plan-price">{price} <span>{priceSub}</span></div>
                <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, marginTop: 2, marginBottom: 2, opacity: 0.8 }}>{(PIANI.find(p => p.name === name) as typeof PIANI[0]).monthly}</div>
                <div className="ch-plan-rate">{rate || <>&nbsp;</>}</div>
                <a href={stripe} className="ch-btn-plan" target="_blank" rel="noopener noreferrer">Inizia con {name} →</a>
              </div>
            ))}
          </div>
          <p className="ch-plans-note">🔐 Pagamenti sicuri via Stripe e PayPal<br />🚨 Posti limitati — le iscrizioni chiudono a esaurimento</p>
        </section>

        <div className="ch-divider" />

        {/* Testimonianze */}
        <Testimonials />

        <div className="ch-divider" />

        {/* Form candidatura */}
        <div className="ch-form-section" id="candidati">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,203,219,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
          <div className="ch-form-inner" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 className="ch-section-title">Parliamoci.<br /><em>Candidati al Coaching.</em></h2>
              <p className="ch-section-sub" style={{ margin: "0 auto", textAlign: "center" }}>Hai domande? Vuoi parlare con Dave prima di iniziare? Compila il questionario e ti ricontattiamo entro 24-48h per una call conoscitiva gratuita e senza impegno.</p>
            </div>

            {success ? (
              <div className="ch-form-success">
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, marginBottom: 12 }}>Candidatura ricevuta!</h3>
                <p style={{ fontSize: 15, color: "var(--gray-4)", lineHeight: 1.7 }}>Grazie. Ho ricevuto la tua candidatura e ti contatterò entro 24-48 ore per la call conoscitiva gratuita.</p>
              </div>
            ) : (
              <form className="ch-coaching-form" onSubmit={handleSubmit}>
                <div className="ch-form-row">
                  <div className="ch-form-field">
                    <label className="ch-form-label">Nome e Cognome <span>*</span></label>
                    <input className="ch-form-input" type="text" name="nome" placeholder="Marco Rossi" required />
                  </div>
                  <div className="ch-form-field">
                    <label className="ch-form-label">Data di nascita <span>*</span></label>
                    <input className="ch-form-input" type="date" name="data_nascita" required />
                  </div>
                </div>
                <div className="ch-form-divider" />
                <div className="ch-form-field">
                  <label className="ch-form-label">Qual è la tua situazione fisica attuale e cosa ti sta frustrando di più? <span>*</span></label>
                  <div className="ch-form-hint">Condizione di partenza, eventuali infortuni, patologie o intolleranze — e cosa non funziona oggi</div>
                  <textarea className="ch-form-textarea" name="situazione_frustrazione" placeholder="Raccontami da dove parti e cosa ti blocca..." required />
                </div>
                <div className="ch-form-field">
                  <label className="ch-form-label">Qual è la tua trasformazione desiderata? <span>*</span></label>
                  <div className="ch-radio-group">
                    {["Ricomposizione — perdere grasso e tonificare", "Sviluppare un fisico muscoloso e atletico", "Aumentare energia e testosterone", "Altro"].map((v) => (
                      <label key={v} className="ch-radio-row"><input type="radio" name="obiettivo" value={v} required />{v}</label>
                    ))}
                  </div>
                </div>
                <div className="ch-form-field">
                  <label className="ch-form-label">Perché pensi che non abbia funzionato? <span>*</span></label>
                  <textarea className="ch-form-textarea" name="perche_no" placeholder="Cosa non ha funzionato e perché..." required />
                </div>
                <div className="ch-form-field">
                  <label className="ch-form-label">Come cambierebbe la tua vita con il fisico che desideri? <span>*</span></label>
                  <textarea className="ch-form-textarea" name="vita_con_fisico" placeholder="Immagina..." required />
                </div>
                <div className="ch-form-divider" />
                <div className="ch-form-field">
                  <label className="ch-form-label">Su una scala 1-5, quanto sei pronto a impegnarti ora? <span>*</span></label>
                  <div className="ch-scale-group">
                    {["1", "2", "3", "4", "5"].map((v) => (
                      <button key={v} type="button" className={`ch-scale-btn${scaleVal === v ? " active" : ""}`} onClick={() => setScaleVal(v)}>{v}</button>
                    ))}
                  </div>
                </div>
                <div className="ch-form-field">
                  <label className="ch-form-label">Dove preferisci fare la call con Dave?</label>
                  <div className="ch-radio-group">
                    <label className="ch-radio-row"><input type="radio" name="canale_call" value="Telefono" />📞 Telefono</label>
                    <label className="ch-radio-row"><input type="radio" name="canale_call" value="WhatsApp" />💬 WhatsApp</label>
                  </div>
                </div>
                <div className="ch-form-row">
                  <div className="ch-form-field">
                    <label className="ch-form-label">Numero di telefono</label>
                    <input className="ch-form-input" type="tel" name="telefono" placeholder="+39 333 000 0000" />
                  </div>
                  <div className="ch-form-field">
                    <label className="ch-form-label">La tua email <span>*</span></label>
                    <input className="ch-form-input" type="email" name="email" placeholder="marco@email.com" required />
                  </div>
                </div>
                <label className="ch-consent-row">
                  <input type="checkbox" name="consenso" required />
                  <span>Ho letto la <Link href="/privacy">Privacy Policy</Link> e acconsento al trattamento dei miei dati per essere ricontattato da Dave Gamba.</span>
                </label>
                {error && <p style={{ color: "#e05555", fontSize: 13 }}>{error}</p>}
                <button type="submit" className="ch-btn-submit" disabled={loading}>
                  {loading ? "Invio in corso…" : "Invia candidatura →"}
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray-6)" }}>✓ Gratuito e senza impegno — ti ricontatto entro 24-48h</p>
              </form>
            )}
          </div>
        </div>

        <div className="ch-divider" />

        {/* FAQ */}
        <div className="ch-bg-section" style={{ background: "#f5f0e8", borderColor: "#e0d9cc" }}>
          <section className="ch-section reveal">
            <h2 className="ch-section-title" style={{ fontSize: "clamp(36px,5vw,56px)", color: "#0A1A20" }}>Domande <em style={{ color: "var(--accent)" }}>frequenti</em></h2>
            <div className="ch-faq-list">
              {FAQ_LIST.map(({ q, a }, i) => (
                <div key={i} className={`ch-faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="ch-faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {q}
                    <span className="ch-faq-icon">+</span>
                  </button>
                  <div className="ch-faq-answer">{a}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA finale */}
        <div style={{ position: "relative", zIndex: 1, overflow: "hidden", background: "#080e1c" }}>
          {/* Glow background */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse at center, rgba(0,203,219,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 200, background: "radial-gradient(ellipse at center, rgba(240,192,64,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 720, margin: "0 auto", padding: "100px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 className="ch-section-title" style={{ fontSize: "clamp(36px,5vw,60px)", marginBottom: 16 }}>
              Pronto a fare il<br /><em>salto di livello?</em>
            </h2>
            <p style={{ fontSize: 17, color: "var(--gray-4)", lineHeight: 1.7, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
              Un percorso personalizzato con Dave. Piano di allenamento, alimentazione, check settimanali. Risultati veri, in tempi reali.
            </p>

            {/* Numeri */}
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 48, flexWrap: "wrap" }}>
              {[{ n: "3.000+", l: "Clienti seguiti" }, { n: "15+", l: "Anni di esperienza" }, { n: "93%", l: "Raggiungono l'obiettivo" }].map(({ n, l }) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 36, color: "var(--accent)", lineHeight: 1, marginBottom: 6 }}>{n}</div>
                  <div style={{ fontSize: 12, color: "var(--gray-6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="ch-btn-row">
              <a href="#candidati" className="ch-btn-gold" style={{ fontSize: 16, padding: "18px 44px" }}>Parla con Dave →</a>
              <a href="#piani" className="ch-btn-gold-outline">Torna ai Piani</a>
            </div>

            <p style={{ marginTop: 20, fontSize: 12, color: "var(--gray-6)" }}>✓ Nessun impegno · Call conoscitiva gratuita · Risposta entro 24-48h</p>
          </div>
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
