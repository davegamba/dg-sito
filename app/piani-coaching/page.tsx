import Link from "next/link";

const PIANI = [
  {
    badge: "Per iniziare", badgeFeatured: false,
    duration: "Coaching da 3 mesi", name: "Starter",
    features: ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "3 mesi" }, "Affiancamento fino all'obiettivo"],
    price: "420€", priceSub: "/ 3 mesi", monthly: "≈ 140€/mese", rate: "oppure 3 rate da 140€ con Stripe 🔒", stripe: "https://buy.stripe.com/8x200k6pE4Dc0RkaFC1Nu01",
  },
  {
    badge: "Più scelto", badgeFeatured: true,
    duration: "Coaching da 6 mesi", name: "Accelerator",
    features: ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "6 mesi" }, "Affiancamento fino all'obiettivo"],
    price: "650€", priceSub: "/ 6 mesi", monthly: "≈ 108€/mese", rate: "oppure 5 rate da 130€ con Stripe 🔒", stripe: "https://buy.stripe.com/aFa7sM15kedM1Vo2961Nu02",
  },
  {
    badge: "Il definitivo", badgeFeatured: false,
    duration: "Coaching da 12 mesi", name: "Exclusive",
    features: ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "12 mesi" }, "Affiancamento fino all'obiettivo"],
    price: "1.100€", priceSub: "/ 12 mesi", monthly: "≈ 92€/mese", rate: "oppure 10 rate da 110€ con Stripe 🔒", stripe: "https://buy.stripe.com/8x228scO27Po0Rk5li1Nu03",
  },
];

export default function PianiCoachingPage() {
  return (
    <>
      <style>{`
        .pc-body{font-family:'DM Sans',sans-serif;background:#0a0a0a;color:#fafaf8;min-height:100vh}
        :root{--accent:#00CBDB;--gold:#F0C040;--bg:#0a0a0a;--bg-1:#111;--cyan-card:#0d1a1e;--cyan-card-ft:#0d2028;--white:#fafaf8;--gray-3:#c8c8c4;--gray-4:#9a9a94;--gray-6:#5a5a55;--border:#252525}
        .pc-topbar{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
        .pc-logo{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:18px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--white);text-decoration:none}
        .pc-back{font-size:13px;color:rgba(255,255,255,0.35);text-decoration:none;transition:color 0.2s}
        .pc-back:hover{color:rgba(255,255,255,0.7)}
        .pc-section{max-width:1100px;margin:0 auto;padding:64px 24px 80px}
        .pc-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(36px,6vw,64px);line-height:1.05;letter-spacing:-0.02em;text-align:center;margin-bottom:12px}
        .pc-title em{font-style:italic;color:var(--accent)}
        .pc-sub{font-size:16px;color:var(--gray-4);font-weight:300;text-align:center;margin-bottom:48px}
        .pc-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
        .pc-plan-card{background:var(--cyan-card);border:1px solid rgba(0,203,219,0.2);border-radius:24px;padding:44px 28px 32px;display:flex;flex-direction:column;transition:border-color 0.2s;position:relative;overflow:visible}
        .pc-plan-card.featured{background:var(--cyan-card-ft);border-color:rgba(0,203,219,0.45)}
        .pc-plan-card:hover{border-color:rgba(0,203,219,0.35)}
        .pc-plan-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);background:var(--bg-1);border:1px solid rgba(0,203,219,0.35);border-radius:100px;padding:5px 14px;white-space:nowrap}
        .pc-plan-badge.featured{color:#000;background:var(--accent);border-color:var(--accent)}
        .pc-plan-duration{font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
        .pc-plan-name{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:38px;color:var(--white);margin-bottom:20px;line-height:1}
        .pc-plan-divider{height:1px;background:rgba(255,255,255,0.07);margin-bottom:20px}
        .pc-plan-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;flex:1}
        .pc-plan-features li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--gray-3);line-height:1.5}
        .pc-plan-features li .ck{color:var(--accent);flex-shrink:0;margin-top:1px}
        .pc-plan-features li .hl{color:var(--gold);font-weight:600}
        .pc-plan-price{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:42px;color:var(--white);line-height:1;margin-bottom:4px}
        .pc-plan-price span{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:var(--gray-6)}
        .pc-plan-monthly{font-size:12px;color:var(--accent);font-weight:600;margin-top:2px;margin-bottom:2px;opacity:0.8}
        .pc-plan-rate{font-size:12px;color:var(--gray-6);margin-bottom:20px;margin-top:6px;min-height:18px}
        .pc-btn-plan{display:block;width:100%;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;padding:15px;border-radius:12px;border:none;cursor:pointer;text-decoration:none;text-align:center;transition:all 0.2s;letter-spacing:0.02em}
        .pc-btn-plan:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .pc-note{text-align:center;font-size:12px;color:var(--gray-6);margin-top:24px;line-height:1.9}
        .pc-footer{text-align:center;padding:28px 24px;border-top:1px solid var(--border);font-size:11px;color:var(--gray-6)}
        .pc-footer a{color:var(--gray-4);text-decoration:none;margin:0 8px}
        @media(max-width:900px){.pc-plans{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}}
        @media(max-width:480px){.pc-plan-card{padding:44px 20px 24px}.pc-section{padding:40px 16px 60px}}
      `}</style>
      <div className="pc-body">
        <div className="pc-topbar">
          <Link href="/coaching" className="pc-logo">Dave Gamba</Link>
          <Link href="/coaching" className="pc-back">← Torna al Coaching</Link>
        </div>
        <div className="pc-section">
          <h1 className="pc-title">I Piani del<br /><em>Premium Coaching</em></h1>
          <p className="pc-sub">Scegli il piano ideale per te:</p>
          <div className="pc-plans">
            {PIANI.map(({ badge, badgeFeatured, duration, name, features, price, priceSub, monthly, rate, stripe }) => (
              <div key={name} className={`pc-plan-card${badgeFeatured ? " featured" : ""}`}>
                <div className={`pc-plan-badge${badgeFeatured ? " featured" : ""}`}>{badge}</div>
                <div className="pc-plan-duration">{duration}</div>
                <div className="pc-plan-name">{name}</div>
                <div className="pc-plan-divider" />
                <ul className="pc-plan-features">
                  {features.map((f, i) => typeof f === "string"
                    ? <li key={i}><span className="ck">✓</span>{f}</li>
                    : <li key={i}><span className="ck">✓</span>{f.text}<span className="hl">{f.hl}</span></li>
                  )}
                </ul>
                <div className="pc-plan-price">{price} <span>{priceSub}</span></div>
                <div className="pc-plan-monthly">{monthly}</div>
                <div className="pc-plan-rate">{rate || <>&nbsp;</>}</div>
                <a href={stripe} className="pc-btn-plan" target="_blank" rel="noopener noreferrer">Inizia con {name} →</a>
              </div>
            ))}
          </div>
          <p className="pc-note">🔐 Pagamenti sicuri via Stripe e PayPal<br />🚨 Posti limitati — le iscrizioni chiudono a esaurimento</p>
        </div>
        <div className="pc-footer">
          © Dave Gamba &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/termini">Termini e Condizioni</Link>
        </div>
      </div>
    </>
  );
}
