"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

const DEADLINE = new Date("2026-06-15T23:59:59").getTime();
const STRIPE_LINK = "https://buy.stripe.com/5kQdRa9BQc5EgQi2961Nu00";

const TRASFORMAZIONI = [
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_07.jpeg", alt: "Trasformazione" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/alessandra-pilo-testimonianze-davegamba.jpg", alt: "Alessandra Pilo" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_08.jpeg", alt: "Trasformazione" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/emiliano-testimonianze-dave-gamba.jpeg", alt: "Emiliano" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_09.jpeg", alt: "Trasformazione" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/gloria-testimonianze-dave-gamba.jpeg", alt: "Gloria" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/gus-recensioni-davegamba.jpg", alt: "Gus" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/marco-iacovalessandra-pilo-testimonianze-davegamba.jpeg", alt: "Marco e Alessandra" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/marta-marranzano.png", alt: "Marta Marranzano" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/valerya-testimonianze-dave-gamba.jpeg", alt: "Valerya" },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/veronica-gonz-testimonianze-dave-gamba.jpeg", alt: "Veronica" },
];

const COMMENTI = [
  "commento-sfida-estiva-1.jpg", "commento-sfida-estiva-2.jpg", "commento-sfida-estiva-3.jpg",
  "commento-sfida-estiva-4.jpg", "commento-sfida-estiva-5.jpg", "commento-sfida-estiva-6.jpg",
  "commento-sfida-estiva-7.jpg", "commento-sfida-estiva-8.jpg", "commento-sfida-estiva-9.jpg",
  "commento-sfida-estiva-10.jpg",
];

const FAQ = [
  { q: "Serve attrezzatura?", a: "Per la versione Home, solo manubri e un elastico. Nella versione Gym avrai le macchine da palestra." },
  { q: "È un abbonamento?", a: "No. Paghi 33€ una volta sola. La sfida è tua per sempre. Nessun rinnovo." },
  { q: "Sono adatto se non ho mai fatto esercizio?", a: "Sì. La progressione parte graduale e sale nel tempo." },
  { q: "Cosa succede dopo i 21 giorni?", a: "Molti ripetono la sfida aumentando di poco i carichi. Chi vuole andare oltre può entrare nel mio Premium Coaching Personale." },
  { q: "Devo seguire una dieta precisa?", a: "No. Ricevi 21 Tips pratici da applicare subito, senza stravolgere la tua vita. Se poi vorrai seguire un piano alimentare su misura ci sarà il mio Piano Alimentare oppure il Premium Coaching Personale." },
  { q: '"Non sono costante, non fa per me"', a: "Meno di 21 minuti al giorno per 21 giorni. Chiunque può essere costante con un impegno così condensato. Il problema non sei tu — è il sistema che usavi prima." },
  { q: "Funziona sia per chi si allena a casa che in palestra?", a: "Sì. Ogni allenamento include due versioni: una per casa (manubri e un elastico) e una per la palestra (macchinari). Accedi a tutto con un solo acquisto — scegli ogni giorno in base a dove sei." },
  { q: "Quanto tempo ho per completare la sfida?", a: "Puoi iniziare quando vuoi. Se salti un giorno non succede niente — riprendi da dove eri rimasto. L'accesso è a vita." },
  { q: "Funziona anche se ho più di 30/40/50 anni?", a: "Soprattutto. Il metodo Breve-Intenso-Mirato nasce per chi ha poco tempo e un fisico che recupera diversamente rispetto a 20 anni fa. Allenamenti brevi e intensi sono più efficaci per gli uomini sopra i 35-50 anni rispetto alle sessioni lunghe in palestra." },
];

const PHONE_SCREENS = [
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_04.jpeg", alt: "Tip del giorno e workout", desc: <><strong>Ogni giorno: un video + un tip nutrizionale.</strong> Apri, guarda, segui. Niente da pianificare, niente da decidere. Il sistema lavora per te.</> },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_03.jpeg", alt: "Dashboard sfida estiva", desc: <><strong>I tuoi 21 giorni sempre sotto controllo.</strong> Vedi a che punto sei, cosa ti aspetta domani. Accesso immediato e a vita — ripeti la sfida ogni anno.</> },
  { src: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_05.jpeg", alt: "Workout con esercizi e serie", desc: <><strong>Gli esercizi, i carichi, le serie. Tutto guidato.</strong> Funziona su smartphone, tablet e PC — da casa, in palestra, in hotel, ovunque tu sia.</> },
];

function pad(n: number) { return n < 10 ? "0" + n : String(n); }

function useCountdown() {
  const [timer, setTimer] = useState("--:--:--");
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    function tick() {
      const diff = DEADLINE - Date.now();
      if (diff <= 0) { setTimer("SCADUTO"); setExpired(true); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimer(d > 0 ? `${d}g ${pad(h)}h ${pad(m)}m ${pad(s)}s` : `${pad(h)}h ${pad(m)}m ${pad(s)}s`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { timer, expired };
}

export default function SfidaEstivaPage() {
  const { timer, expired } = useCountdown();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const countdownStyle = expired ? { background: "rgba(200,0,0,0.15)" } : {};

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--cyan:#00CBDB;--gold:#F0C040;--black:#1A1A1A;--cream:#FFFAF4;--sand:#F5EFE4;--sand2:#EDE5D6;--white:#fff;--text:#1A1A1A;--muted:#777}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);overflow-x:hidden}
        .sf-container{max-width:960px;margin:0 auto;padding:0 24px}
        .sf-topbar{background:linear-gradient(90deg,#FFE566 0%,#F5B800 100%);color:#1A1A1A;text-align:center;padding:10px 16px;font-size:clamp(0.78rem,2.2vw,0.95rem);font-weight:600;line-height:1.5}
        .sf-hero{position:relative;min-height:60vh;display:flex;align-items:flex-end;overflow:hidden}
        .sf-hero-bg{position:absolute;inset:0;background-size:cover;background-position:center 30%;background-image:url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/heroBg.jpeg')}
        @media(min-width:768px){.sf-hero{min-height:80vh}.sf-hero-bg{background-position:center 65%}}
        .sf-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.1) 100%)}
        .sf-hero-content{position:relative;z-index:2;padding:40px 24px 60px;width:100%;max-width:960px;margin:0 auto;text-align:center}
        .sf-hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);border-radius:100px;padding:7px 18px;font-size:0.72rem;color:#fff;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:24px}
        .sf-hero h1{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,6vw,4rem);line-height:1.05;color:#fff;margin-bottom:20px}
        .sf-hero h1 em{font-style:italic;color:var(--cyan)}
        .sf-hero-sub{font-size:1rem;font-weight:400;color:rgba(255,255,255,0.92);line-height:1.7;margin-bottom:32px;max-width:520px;margin-left:auto;margin-right:auto}
        .sf-hero-stats{display:flex;justify-content:center;gap:40px;margin-bottom:36px}
        .sf-stat-n{font-family:'DM Serif Display',serif;font-size:2rem;color:var(--cyan);line-height:1}
        .sf-stat-l{font-size:0.7rem;color:rgba(255,255,255,0.45);letter-spacing:0.1em;text-transform:uppercase;margin-top:3px}
        .sf-btn-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
        .sf-btn-primary{display:inline-flex;align-items:center;background:linear-gradient(180deg,#FFE566 0%,#F5B800 100%);box-shadow:0 2px 0 rgba(0,0,0,0.18),inset 0 1px 0 rgba(255,255,255,0.28);color:var(--black);font-weight:600;font-size:0.95rem;padding:16px 28px;border-radius:100px;text-decoration:none;transition:all 0.2s}
        .sf-btn-primary:hover{background:linear-gradient(180deg,#FFED80 0%,#F5C400 100%);transform:translateY(-2px);box-shadow:0 8px 28px rgba(240,192,64,0.4)}
        .sf-hero-note{margin-top:14px;font-size:0.75rem;color:rgba(255,255,255,0.3)}
        .sf-hero-note strong{color:rgba(255,255,255,0.6)}
        .sf-press{background:var(--white);padding:20px 24px;border-bottom:1px solid var(--sand2);text-align:center}
        .sf-press-label{font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
        .sf-press img{height:24px;width:100%;object-fit:contain;opacity:0.55;display:block}
        .sf-section{padding:80px 0}
        .sf-label{display:block;font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--cyan);margin-bottom:16px}
        .sf-section h2{font-family:'DM Serif Display',serif;font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.15;margin-bottom:20px}
        .sf-section h2 em{font-style:italic;color:var(--cyan)}
        .sf-body{font-size:1rem;line-height:1.8;color:var(--muted)}
        .sf-section--img{position:relative;overflow:hidden;color:#fff}
        .sf-section-bg{position:absolute;inset:0;background-size:cover;background-position:center}
        .sf-section-bg::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.58)}
        .sf-section-inner{position:relative;z-index:1}
        .sf-offer-box{background:var(--black);border-radius:22px;padding:56px 44px;text-align:center;margin-top:56px;position:relative;overflow:hidden}
        .sf-offer-box::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(0,203,219,0.15) 0%,transparent 65%);pointer-events:none}
        .sf-offer-box>*{position:relative;z-index:1}
        .sf-offer-tag{display:inline-block;background:rgba(0,203,219,0.1);border:1px solid rgba(0,203,219,0.25);color:var(--cyan);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;padding:6px 16px;border-radius:100px;margin-bottom:20px}
        .sf-offer-title{font-family:'DM Serif Display',serif;font-size:1.8rem;color:#fff;margin-bottom:4px}
        .sf-offer-sub{font-size:0.85rem;color:rgba(255,255,255,0.35);margin-bottom:0}
        .sf-offer-price{font-family:'DM Serif Display',serif;font-size:4.5rem;color:var(--cyan);line-height:1;margin:20px 0 6px}
        .sf-offer-price-note{font-size:0.82rem;color:rgba(255,255,255,0.3);margin-bottom:28px}
        .sf-offer-list{display:flex;flex-direction:column;gap:9px;max-width:380px;margin:0 auto 36px;text-align:left}
        .sf-offer-item{display:flex;align-items:center;gap:10px;font-size:0.9rem;color:rgba(255,255,255,0.7)}
        .sf-offer-dot{width:5px;height:5px;background:var(--cyan);border-radius:50%;flex-shrink:0}
        .sf-btn-offer{display:inline-flex;align-items:center;background:linear-gradient(180deg,#FFE566 0%,#F5B800 100%);box-shadow:0 2px 0 rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.28);color:var(--black);font-weight:700;font-size:1.05rem;padding:18px 36px;border-radius:100px;text-decoration:none;transition:all 0.2s}
        .sf-btn-offer:hover{background:#f5cc40;transform:translateY(-2px);box-shadow:0 12px 36px rgba(240,192,64,0.35)}
        .sf-offer-secure{margin-top:16px;font-size:0.72rem;color:rgba(255,255,255,0.22)}
        .sf-offer-secure span{color:rgba(0,203,219,0.5)}
        .sf-countdown{display:inline-flex;align-items:center;gap:8px;background:rgba(0,0,0,0.22);border:1px solid rgba(255,255,255,0.25);border-radius:100px;padding:10px 24px;font-size:clamp(0.85rem,3vw,1.05rem);font-weight:700;color:#fff;letter-spacing:0.02em;flex-wrap:wrap;justify-content:center;text-align:center}
        .sf-countdown b{color:var(--gold);font-variant-numeric:tabular-nums;font-size:clamp(0.9rem,3.2vw,1.15rem)}
        .sf-countdown-offer{display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(0,203,219,0.12);border:1px solid rgba(0,203,219,0.4);border-radius:100px;padding:8px 20px;margin-bottom:20px;font-size:clamp(0.78rem,2.5vw,0.95rem);font-weight:600;color:var(--cyan);flex-wrap:wrap;text-align:center}
        .sf-countdown-offer b{color:var(--cyan);font-variant-numeric:tabular-nums;font-weight:800}
        .sf-faq{margin-top:44px}
        .sf-faq-item{border-bottom:1px solid var(--sand2);padding:22px 0}
        .sf-faq-q{font-family:'DM Serif Display',serif;font-size:1.03rem;cursor:pointer;display:flex;justify-content:space-between;gap:16px;user-select:none;background:none;border:none;width:100%;text-align:left;color:var(--text);padding:0}
        .sf-faq-icon{font-size:1.2rem;color:var(--cyan);flex-shrink:0;font-family:sans-serif;font-weight:300}
        .sf-faq-a{font-size:0.92rem;color:var(--muted);line-height:1.7;margin-top:12px}
        .sf-footer-cta{position:relative;min-height:480px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .sf-footer-bg{position:absolute;inset:0;background-size:cover;background-position:center;background-image:url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/spiaggiaBg.jpeg')}
        .sf-footer-bg::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.55)}
        .sf-footer-content{position:relative;z-index:1;padding:80px 24px}
        .sf-footer-content h2{font-family:'DM Serif Display',serif;font-size:clamp(2rem,5vw,3rem);color:#fff;margin-bottom:12px;line-height:1.1}
        .sf-footer-content h2 em{font-style:italic;color:var(--cyan)}
        .sf-footer-content p{color:rgba(255,255,255,0.55);margin-bottom:36px;font-size:0.95rem}
        .sf-footer-note{background:var(--black);padding:28px 24px;text-align:center;font-size:0.7rem;color:rgba(255,255,255,0.2)}
        .sf-footer-note a{color:inherit}
        .sf-sticky{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,rgba(0,180,195,0.97) 0%,rgba(0,203,219,0.95) 50%,rgba(0,225,240,0.97) 100%);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,0.2);padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:100;transform:translateY(100%);transition:transform 0.3s}
        .sf-sticky.show{transform:translateY(0)}
        .sf-sticky-txt{font-size:0.85rem;color:rgba(255,255,255,0.9)}
        .sf-sticky-txt strong{color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.15)}
        .sf-btn-sticky{background:linear-gradient(180deg,#FFE566 0%,#F5B800 100%);box-shadow:0 2px 0 rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.28);color:var(--black);font-weight:600;font-size:0.8rem;padding:10px 18px;border-radius:100px;text-decoration:none;white-space:nowrap}
        .sf-marquee-outer{overflow:hidden;width:100%;margin-top:40px;margin-bottom:32px}
        .sf-marquee-track{display:flex;gap:16px;width:max-content;animation:sfMarquee 40s linear infinite}
        .sf-marquee-track:hover{animation-play-state:paused}
        .sf-marquee-img{width:260px;height:260px;object-fit:cover;object-position:center;border-radius:20px;flex-shrink:0;display:block}
        .sf-marquee-track--reverse{animation-name:sfMarqueeReverse}
        .sf-marquee-track--tight{gap:4px}
        .sf-marquee-img--wide{width:auto;height:150px;object-fit:contain;border-radius:12px}
        @keyframes sfMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes sfMarqueeReverse{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        .sf-phone-stack{display:flex;flex-direction:row;align-items:flex-start;justify-content:center;gap:24px}
        .sf-phone-block{display:flex;flex-direction:column;align-items:center;gap:28px;max-width:260px;flex:1;min-width:200px}
        @media(max-width:700px){.sf-phone-stack{overflow-x:auto;justify-content:flex-start;padding:0 24px 16px;scrollbar-width:none;-ms-overflow-style:none;scroll-snap-type:x mandatory}.sf-phone-stack::-webkit-scrollbar{display:none}.sf-phone-block{flex-shrink:0;width:260px;min-width:260px;scroll-snap-align:center}}
        .sf-phone-shell{width:280px;background:#0f0f0f;border-radius:36px;padding:10px 8px 18px;box-shadow:0 40px 90px rgba(0,0,0,0.22),0 0 0 1px rgba(255,255,255,0.07),inset 0 1px 0 rgba(255,255,255,0.06)}
        .sf-phone-notch{width:64px;height:18px;background:#0f0f0f;border-radius:0 0 14px 14px;margin:0 auto 6px}
        .sf-phone-screen{border-radius:28px;overflow:hidden;aspect-ratio:9/16;background:#111}
        .sf-phone-screen img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
        .sf-phone-bar{width:60px;height:3px;background:rgba(255,255,255,0.12);border-radius:2px;margin:10px auto 0}
        .sf-phone-desc{text-align:center;font-size:0.87rem;color:rgba(255,255,255,0.85);line-height:1.65;background:var(--cyan);border-radius:20px;padding:18px 16px}
        .sf-phone-desc strong{display:block;color:#fff;font-size:0.97rem;margin-bottom:4px}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.in{opacity:1;transform:translateY(0)}
      `}</style>

      {/* Meta Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1727789690815942');fbq('track','PageView');
      `}</Script>

      {/* Topbar */}
      <div className="sf-topbar">⏳ Offerta a <strong>33€</strong> scade il 7 giugno &nbsp;·&nbsp; <b>{timer}</b></div>

      {/* Hero */}
      <section className="sf-hero">
        <div className="sf-hero-bg" />
        <div className="sf-hero-content">
          <div className="sf-hero-badge">🌴 Il metodo di Dave Gamba per l&apos;estate</div>
          <h1>L&apos;estate arriva.<br /><em>Il tuo corpo</em><br />è pronto?</h1>
          <p className="sf-hero-sub">21 allenamenti da 21 minuti.<br /><strong>Versione Casa e versione Palestra incluse.</strong><br /><br />Il sistema Breve-Intenso-Mirato applicato all&apos;Estate 🌴</p>
          <div className="sf-hero-stats">
            <div><div className="sf-stat-n">1.000+</div><div className="sf-stat-l">iscritti soddisfatti</div></div>
            <div><div className="sf-stat-n">21 min</div><div className="sf-stat-l">al giorno, non di più</div></div>
            <div><div className="sf-stat-n">33€</div><div className="sf-stat-l">pagamento unico</div></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span className="sf-countdown" style={countdownStyle}>⏳ Offerta scade tra: <b>{timer}</b></span>
          </div>
          <div className="sf-btn-row">
            <a href={STRIPE_LINK} className="sf-btn-primary" onClick={() => (window as any).fbq?.("track", "InitiateCheckout", { value: 33, currency: "EUR", content_name: "Sfida Estiva 21 Giorni" })}>
              Inizia la Sfida Estiva →
            </a>
          </div>
          <p className="sf-hero-note"><strong>33€ una tantum</strong> · Include versione casa + palestra · Accesso immediato e a vita</p>
        </div>
      </section>

      {/* Press */}
      <div className="sf-press">
        <div className="sf-press-label">Visto su</div>
        <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_01.jpeg" alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2" />
      </div>

      {/* Problema */}
      <section className="sf-section reveal" style={{ padding: "80px 0", background: "radial-gradient(ellipse at 50% 0%, rgba(0,203,219,0.07) 0%, transparent 65%), #FFFAF4" }}>
        <div className="sf-container">
          <span className="sf-label">La soluzione</span>
          <h2>Non hai un problema di motivazione:<br /><em>hai un problema di sistema.</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32 }}>
            {[
              { t: "Poco tempo", d: "Vorresti allenarti ma quando trovi il momento è già sera" },
              { t: "Nessuna struttura", d: "Segui video scollegati senza progressione né piano" },
              { t: "Ricomincia sempre", d: "Inizi bene, poi molli — il ciclo si ripete ogni anno" },
            ].map(({ t, d }) => (
              <div key={t} style={{ padding: "24px 16px", background: "#F5EFE4", borderRadius: 20, textAlign: "center", fontSize: "0.84rem", lineHeight: 1.5, color: "#1A1A1A" }}>
                <strong style={{ display: "block", fontFamily: "'DM Serif Display',serif", fontSize: "1.05rem", marginBottom: 6 }}>{t}</strong>
                <span style={{ color: "#777" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I 3 pilastri */}
      <section className="sf-section reveal" style={{ padding: "48px 0 64px", background: "#fff" }}>
        <div className="sf-container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.35rem", color: "#1A1A1A", marginBottom: 4 }}>La soluzione è semplice:</p>
            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.6rem", color: "var(--cyan)" }}>avere un percorso studiato e progressivo.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[{ n: "21", t: "Allenamenti", d: "Progressivi. Versione casa e palestra — scegli tu ogni giorno." }, { n: "21", t: "Tips", d: "Le mie routine per restare in forma d'estate. Applicabili subito." }, { n: "21", t: "Minuti", d: "Breve-Intenso-Mirato. Per chi ha poco tempo e vuole il massimo." }].map(({ n, t, d }) => (
              <div key={t} style={{ padding: "24px 16px", background: "var(--cyan)", borderRadius: 20, textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "3rem", lineHeight: 1, background: "linear-gradient(160deg,#FFE566 0%,#F5B800 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.05rem", margin: "8px 0 6px", color: "#fff" }}>{t}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chi è Dave */}
      <section className="sf-section sf-section--img reveal">
        <div className="sf-section-bg" style={{ backgroundImage: "url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/palmeBg.jpeg')" }} />
        <div className="sf-section-inner">
          <div className="sf-container">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "nowrap", maxWidth: 760, margin: "0 auto" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_06.jpeg" alt="Dave Gamba" style={{ width: "100%", height: 300, objectFit: "cover", objectPosition: "35% 20%", borderRadius: 20, boxShadow: "0 20px 56px rgba(0,0,0,0.45)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="sf-label" style={{ color: "rgba(0,203,219,0.65)", display: "block", marginBottom: 10 }}>About me</span>
                <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>15 anni di trasformazioni fisiche.<br />3.000+ clienti.<br /><em style={{ color: "var(--cyan)" }}>Un solo metodo.</em></h2>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>Da oltre 20 anni atleta fitness ed ex agonista sportivo. Personal Trainer internazionale certificato ISSA. Intervistato da Corriere della Sera, La Repubblica, Vanity Fair e molti altri — creando il proprio metodo <strong style={{ color: "#fff" }}>Breve-Intenso-Mirato.</strong></p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, maxWidth: 760, margin: "28px auto 0", padding: "0 24px" }}>
              {[["BREVE", "Allenamenti condensati nel minor tempo."], ["INTENSO", "Nel fitness, l'intensità batte la quantità."], ["MIRATO", "Ogni esercizio ha uno scopo preciso. Niente fatica a vuoto."]].map(([label, desc]) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1rem", color: "var(--cyan)", letterSpacing: "0.04em", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Come funziona — phone stack */}
      <section className="sf-section reveal" style={{ padding: "80px 0", background: "#F5EFE4" }}>
        <div className="sf-container">
          <span className="sf-label">Come funziona dentro</span>
          <h2>Apri. Segui.<br /><em>Allenati.</em></h2>
          <p className="sf-body" style={{ marginBottom: 56 }}>Ogni giorno un allenamento, un video, un tip. 21 minuti e hai finito.</p>
          <div className="sf-phone-stack">
            {PHONE_SCREENS.map(({ src, alt, desc }) => (
              <div key={alt} className="sf-phone-block reveal">
                <div className="sf-phone-shell">
                  <div className="sf-phone-notch" />
                  <div className="sf-phone-screen"><img src={src} alt={alt} /></div>
                  <div className="sf-phone-bar" />
                </div>
                <div className="sf-phone-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risultati — marquee */}
      <section className="sf-section reveal" style={{ padding: "80px 0", background: "#fff" }}>
        <div className="sf-container">
          <span className="sf-label">Risultati reali</span>
          <h2>Non teorie.<br /><em>Risultati concreti.</em></h2>
          <p className="sf-body">Oltre 3.000 persone hanno già seguito il metodo di Dave.</p>
        </div>
        <div className="sf-marquee-outer">
          <div className="sf-marquee-track">
            {[...TRASFORMAZIONI, ...TRASFORMAZIONI].map(({ src, alt }, i) => (
              <img key={i} className="sf-marquee-img" src={src} alt={alt} loading="lazy" />
            ))}
          </div>
        </div>
        <div className="sf-marquee-outer" style={{ marginTop: 16 }}>
          <div className="sf-marquee-track sf-marquee-track--reverse sf-marquee-track--tight">
            {[...COMMENTI, ...COMMENTI].map((f, i) => (
              <img key={i} className="sf-marquee-img sf-marquee-img--wide" src={`https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/${f}`} alt="Commento" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Offerta */}
      <section className="sf-section reveal" style={{ padding: "80px 0", background: "radial-gradient(ellipse at 50% 0%, rgba(0,203,219,0.08) 0%, transparent 60%), #F5EFE4" }}>
        <div className="sf-container">
          <span className="sf-label">L&apos;offerta</span>
          <h2>Tutto quello che ti serve<br />per arrivare all&apos;estate <em>in forma.</em></h2>
          <div className="sf-offer-box">
            <div className="sf-countdown-offer" style={countdownStyle}>⏳ Offerta scade il 7 giugno — rimane: <b>{timer}</b></div>
            <div className="sf-offer-title">Sfida Estiva 21 Giorni</div>
            <p className="sf-offer-sub">con il Metodo Breve-Intenso-Mirato di Dave Gamba</p>
            <div className="sf-offer-price">33€</div>
            <p className="sf-offer-price-note">pagamento unico · nessun abbonamento · nessun rinnovo</p>
            <div className="sf-offer-list">
              {["21 allenamenti full body progressivi", "21 Tips per la definizione estiva", "Video guidati — segui e basta", "Versione casa + versione palestra incluse", "Accesso a vita — ripeti quando vuoi"].map((t) => (
                <div key={t} className="sf-offer-item"><span className="sf-offer-dot" />{t}</div>
              ))}
            </div>
            <div className="sf-btn-row" style={{ justifyContent: "center", marginBottom: 16 }}>
              <a href={STRIPE_LINK} className="sf-btn-offer" onClick={() => (window as any).fbq?.("track", "InitiateCheckout", { value: 33, currency: "EUR", content_name: "Sfida Estiva 21 Giorni" })}>
                Inizia la Sfida Estiva →
              </a>
            </div>
            <p className="sf-offer-secure">🔐 Pagamento sicuro con <span>Stripe</span> e <span>PayPal</span> · Accesso immediato</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sf-section reveal" style={{ padding: "80px 0", background: "#fff" }}>
        <div className="sf-container">
          <span className="sf-label">Domande frequenti</span>
          <h2>Hai dubbi? <em>Normale.</em></h2>
          <div className="sf-faq">
            {FAQ.map(({ q, a }, i) => (
              <div key={i} className="sf-faq-item">
                <button className="sf-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q}
                  <span className="sf-faq-icon">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="sf-faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="sf-footer-cta">
        <div className="sf-footer-bg" />
        <div className="sf-footer-content">
          <h2>L&apos;estate arriva.<br /><em>Inizia oggi.</em></h2>
          <p>33€ · Accesso immediato · A vita</p>
          <div className="sf-btn-row" style={{ justifyContent: "center" }}>
            <a href={STRIPE_LINK} className="sf-btn-offer" onClick={() => (window as any).fbq?.("track", "InitiateCheckout", { value: 33, currency: "EUR", content_name: "Sfida Estiva 21 Giorni" })}>
              Inizia la Sfida Estiva →
            </a>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="sf-footer-note">
        © Dave Gamba · Italy&apos;s first online personal trainer dal 2009 ·{" "}
        <Link href="/privacy">Privacy</Link> · <Link href="/termini">Termini</Link>
      </div>

      {/* Sticky bar */}
      <div className={`sf-sticky${showSticky ? " show" : ""}`}>
        <div className="sf-sticky-txt"><strong>Sfida Estiva 21 Giorni</strong> — 33€ una tantum</div>
        <a href={STRIPE_LINK} className="sf-btn-sticky" onClick={() => (window as any).fbq?.("track", "InitiateCheckout", { value: 33, currency: "EUR", content_name: "Sfida Estiva 21 Giorni" })}>
          Inizia la Sfida →
        </a>
      </div>
    </>
  );
}
