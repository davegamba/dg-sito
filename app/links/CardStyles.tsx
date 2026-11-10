// Stili delle card Club e Coaching, condivisi da /links e dalle pagine del corso.
// Le regole restano identiche a quelle che stavano dentro app/links/page.tsx.
export default function CardStyles() {
  return (
    <style>{`
      .card,.card a{-webkit-tap-highlight-color:transparent;}
      .card:active,.card:focus-within{outline:none;}
      .card.coaching-closed{width:100%;box-sizing:border-box;background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 20px;cursor:pointer;font-family:inherit;text-align:left;margin-bottom:0;}
      .coaching-plus{color:#F0C040;font-size:1.8rem;font-weight:300;line-height:1;}
      .card-club{border:2.5px solid #00CBDB!important;}
      .card-coaching{border:2.5px solid #F0C040!important;}
      .card{background:rgba(0,18,22,0.55);border:2.5px solid rgba(0,203,219,0.7);border-radius:20px;overflow:hidden;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);box-shadow:0 8px 32px rgba(0,0,0,0.5);margin-bottom:13px;}
      .card-top{display:flex;gap:14px;padding:16px 16px 12px;}
      .card-img{flex-shrink:0;width:80px;height:80px;border-radius:12px;overflow:hidden;}
      .card-img img{width:100%;height:100%;object-fit:cover;}
      .card-info{flex:1;display:flex;flex-direction:column;justify-content:center;}
      .card-title{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:1.35rem;font-weight:700;color:#fff;letter-spacing:0.03em;line-height:1.2;margin-bottom:5px;}
      .card-desc{font-size:0.72rem;color:rgba(255,255,255,0.5);line-height:1.45;}
      .card-price{font-family:var(--font-dm-serif,'DM Serif Display',serif);font-size:1.4rem;color:#fff;font-weight:600;margin-top:6px;}
      .card-price span{font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:300;color:rgba(255,255,255,0.4);margin-left:4px;}
      .card-features{display:flex;flex-direction:column;gap:7px;border-top:1px solid rgba(255,255,255,0.06);margin:0 16px;padding:12px 0 14px;}
      .card-feature{display:flex;align-items:center;gap:9px;font-size:0.75rem;color:rgba(255,255,255,0.7);}
      .card-feature .dot{width:22px;height:22px;border-radius:50%;background:#00CBDB;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .dot-tri{width:0;height:0;border-style:solid;border-width:4px 0 4px 7px;border-color:transparent transparent transparent #000;margin-left:1px;}
      .card-btn{display:block;margin:14px 16px 16px;background:linear-gradient(180deg,#1AD8E8 0%,#00CBDB 32%,#0072CE 100%);color:#fff;font-weight:700;font-size:0.9rem;letter-spacing:0.04em;text-transform:uppercase;text-align:center;padding:14px;border-radius:12px;text-decoration:none;box-shadow:inset 0 1px 0 rgba(255,255,255,0.45);transition:filter 0.2s,transform 0.2s;}
      .card-btn:hover{filter:brightness(1.08);transform:translateY(-1px);}
      @keyframes btnWiggle{0%,72%,100%{transform:translateX(0) rotate(0);}76%{transform:translateX(-3px) rotate(-1deg);}80%{transform:translateX(3px) rotate(1deg);}84%{transform:translateX(-3px) rotate(-1deg);}88%{transform:translateX(3px) rotate(1deg);}92%{transform:translateX(-1px) rotate(0);}}
      button.card-btn{border:0;cursor:pointer;font-family:inherit;width:calc(100% - 32px);box-sizing:border-box;}
      .optin-form{margin:14px 16px 16px;display:flex;flex-direction:column;gap:10px;}
      .optin-form input{width:100%;box-sizing:border-box;background:rgba(255,255,255,0.06);border:1.5px solid rgba(0,203,219,0.55);border-radius:12px;padding:14px;font-size:16px;color:#fff;font-family:inherit;outline:none;}
      .optin-form input::placeholder{color:rgba(255,255,255,0.45);}
      .optin-form input:focus{border-color:#00CBDB;}
      .optin-form .card-btn{margin:2px 0 0;border:0;width:100%;cursor:pointer;font-family:inherit;}
      .optin-err{margin:0;color:#ff8a8a;font-size:0.8rem;}
      .optin-legal{margin:0;font-size:0.62rem;line-height:1.5;color:rgba(255,255,255,0.45);text-align:center;}
      .optin-legal a{color:rgba(255,255,255,0.6);}
      .chip-shine{position:relative;overflow:hidden;}
      .chip-shine::after{content:'';position:absolute;top:0;bottom:0;left:-60%;width:45%;background:linear-gradient(100deg,transparent 0%,rgba(255,255,255,0.85) 50%,transparent 100%);transform:skewX(-20deg);animation:chipShine 3s ease-in-out infinite;}
      @keyframes chipShine{0%{left:-60%;}55%,100%{left:130%;}}
      @media (prefers-reduced-motion:reduce){.chip-shine::after{animation:none;display:none;}}
      .btn-wiggle{animation:btnWiggle 3.4s ease-in-out 1.2s infinite;}
      .btn-wiggle:hover{animation:none;}
      @media (prefers-reduced-motion:reduce){.btn-wiggle{animation:none;}}
    `}</style>
  );
}
