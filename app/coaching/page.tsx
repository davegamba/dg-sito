"use client";
import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

const HERO_FEATURES = ["Consulenza personale con Dave", "Analisi completa: blocchi, obiettivi, stile di vita", "Piano Strategico su misura", "Piano d'Allenamento BIM stilato da Dave", "Piano Alimentare con biologa nutrizionista", "Video esecuzione per ogni esercizio", "Check settimanale con Dave", { text: "Supporto WhatsApp per ", hl: "6 mesi" }, "Affiancamento fino all'obiettivo"];

export default function CoachingPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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
        .ch-hero-content{position:relative;z-index:2;padding:0 40px;width:100%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;animation:chFadeUp 0.7s ease 0.1s both}
        .ch-hero-left{display:flex;flex-direction:column;align-items:flex-start;text-align:left}
        .ch-hero-card{background:rgba(13,26,30,0.60);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(0,203,219,0.4);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;position:relative}
        .ch-hero-card-badge{position:absolute;top:-16px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#000;background:var(--accent);border-radius:100px;padding:7px 20px;white-space:nowrap}
        .ch-hero-card-divider{height:1px;background:rgba(255,255,255,0.08);margin-bottom:16px}
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
        .ch-press-topbar{position:relative;z-index:10;background:#fff;border-bottom:1px solid #e8e2d8;padding:10px 24px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
        .ch-press-topbar-label{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#aaa;margin-right:4px}
        .ch-press-topbar img{height:18px;object-fit:contain;opacity:0.7}
        .ch-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:5px 16px;border-radius:100px;margin-bottom:18px}
        .ch-badge-gold{background:rgba(240,192,64,0.12);color:var(--gold);border:1px solid rgba(240,192,64,0.25)}
        .ch-badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:chPulse 2s infinite}
        .ch-hero-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(48px,8vw,86px);line-height:1.0;letter-spacing:-0.02em;color:var(--white);margin-bottom:18px}
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
        .ch-section-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:clamp(30px,4vw,50px);line-height:1.1;letter-spacing:-0.02em;margin-bottom:14px;text-align:center}
        .ch-section-title em{font-style:italic;color:var(--accent)}
        .ch-section-sub{font-size:16px;color:var(--gray-4);font-weight:300;line-height:1.7;max-width:580px;text-align:center;margin-left:auto;margin-right:auto}
        .ch-funziona-grid{display:grid;grid-template-columns:380px 1fr;gap:60px;align-items:center;margin-top:48px}
        .ch-funziona-foto{border-radius:20px;overflow:hidden;aspect-ratio:3/4;background:var(--bg-2);position:relative}
        .ch-funziona-foto img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
        .ch-funziona-caption{padding:20px;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);position:absolute;bottom:0;left:0;right:0;border-top:1px solid rgba(255,255,255,0.08)}
        .ch-steps{display:flex;flex-direction:column;gap:16px}
        .ch-step{background:var(--cyan-card);border:1px solid var(--accent);border-radius:20px;padding:28px;display:flex;gap:20px;align-items:flex-start}
        .ch-step-num{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:42px;color:var(--accent);line-height:1;flex-shrink:0;width:48px}
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
        .ch-plan-name{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:38px;color:var(--white);margin-bottom:20px;line-height:1}
        .ch-plan-divider{height:1px;background:rgba(255,255,255,0.07);margin-bottom:20px}
        .ch-plan-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;flex:1;padding:0}
        .ch-plan-features li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--gray-3);line-height:1.5}
        .ch-plan-features li .check{color:var(--accent);flex-shrink:0;margin-top:1px}
        .ch-plan-features li .hl{color:var(--gold);font-weight:600}
        .ch-plan-price{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:42px;color:var(--white);line-height:1;margin-bottom:4px}
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
        .ch-steps-header{margin-bottom:36px}
        .ch-steps-labels{display:flex;justify-content:space-between;margin-bottom:10px}
        .ch-step-label{font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--gray-6);transition:color 0.2s}
        .ch-step-label.active{color:var(--accent)}
        .ch-progress-track{height:3px;background:rgba(255,255,255,0.08);border-radius:100px;overflow:hidden}
        .ch-progress-fill{height:100%;background:linear-gradient(to right,var(--accent),#00AECF);border-radius:100px;transition:width 0.4s ease}
        .ch-step-counter{font-size:12px;color:var(--gray-6);text-align:right;margin-top:8px}
        .ch-form-nav{display:flex;gap:12px;align-items:center;margin-top:8px}
        .ch-btn-back{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;font-size:14px;padding:14px 24px;border-radius:12px;cursor:pointer;transition:all 0.2s}
        .ch-btn-back:hover{border-color:rgba(255,255,255,0.3);color:var(--white)}
        .ch-btn-next{flex:1;background:linear-gradient(to bottom,#F7E27A 0%,#F0C040 100%);color:#000;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;padding:16px;border-radius:12px;border:none;cursor:pointer;transition:all 0.2s}
        .ch-btn-next:hover{filter:brightness(1.06);transform:translateY(-1px)}
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
        {/* Press top bar */}
        <div className="ch-press-topbar">
          <span className="ch-press-topbar-label">Come visto su</span>
          <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png" alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2" style={{ height: 18 }} />
        </div>

        {/* Hero */}
        <section className="ch-hero">
          <img className="bg" src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/foto-sfida-estiva.jpg" alt="Dave Gamba Premium Coaching" />
          <div className="ch-hero-content">
            {/* Sinistra: testo */}
            <div className="ch-hero-left">
              <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Coaching Online con Dave</div>
              <h1 className="ch-hero-title">Premium<br /><em>Coaching 1-1</em></h1>
              <p className="ch-hero-sub" style={{ margin: "0 0 0" }}>Per chi vuole il massimo risultato fisico nel minor tempo possibile, con un percorso personalizzato e guidato da Dave.</p>
            </div>
            {/* Destra: card cosa include il coaching */}
            <div className="ch-hero-card">
              <div className="ch-hero-card-badge">COME FUNZIONA</div>
              <ul className="ch-hero-card-features">
                {HERO_FEATURES.map((f, i) => typeof f === "string"
                  ? <li key={i}><span className="ck">✓</span>{f}</li>
                  : <li key={i}><span className="ck">✓</span>{f.text}<span className="hl">{f.hl}</span></li>
                )}
              </ul>
              <a href="/coaching/candidati" target="_blank" rel="noopener noreferrer" className="ch-btn-plan">Compila il questionario →</a>
            </div>
          </div>
        </section>

        {/* Blocco spunte */}
        <div className="ch-checks-block">
          <div className="ch-checks-grid">
            {[
              { icon: "✓", t: "La tua migliore forma fisica di sempre — atletica, attraente, e soprattutto definitiva, non temporanea." },
              { icon: "✓", t: "Allenamenti brevi e mirati che ti danno più risultati in meno tempo" },
              { icon: "✓", t: "Un'alimentazione su misura — flessibile, senza rinunce inutili" },
              { icon: "✓", t: "L'energia e la lucidità che credevi di aver perso con gli anni" },
              { icon: "✓", t: "La certezza, finalmente, di essere sulla strada giusta" },
              { icon: "▸", t: "Qualcuno che ti tiene in rotta quando la motivazione cala" },
            ].map(({ icon, t }) => (
              <div key={t} className="ch-check-item">
                <div className="ch-check-icon">{icon}</div>
                <p className="ch-check-text">{t}</p>
              </div>
            ))}
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
