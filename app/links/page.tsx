import type { Metadata } from "next";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Dave Gamba — Link",
  description: "Personal trainer online dal 2009. Metodo BIM: Breve, Intenso, Mirato.",
};

const SOCIAL = [
  {
    href: "https://www.instagram.com/dave.gamba",
    label: "Instagram",
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>,
  },
  {
    href: "https://www.youtube.com/@DaveGambaFitness",
    label: "YouTube",
    svg: <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>,
  },
  {
    href: "https://www.tiktok.com/@dave.gamba",
    label: "TikTok",
    svg: <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>,
  },
];

const CLUB_FEATURES = [
  "Schede progressive nuove ogni mese",
  "Corsi focus mirati",
  "I pasti flessibili di Dave",
  "Per casa e palestra",
];

const COACHING_FEATURES = [
  "Call conoscitiva con Dave senza impegno",
  "Piano d'allenamento su misura",
  "Piano alimentare con biologa nutrizionista",
  "Check settimanale",
  "Affiancamento WhatsApp con Dave fino all'obiettivo",
];

const YT_VIDEOS = [
  "hGA0z6hRihk",
  "Dv8NRpmSXE0",
  "WCLaVNUxjfU",
  "VLaos7K2jMQ",
  "oAxIWT0hK5U",
];

export default function LinksPage() {
  const articles = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <>
      <style>{`
        html,body{background:#080C0F;overflow-x:hidden;margin:0;padding:0;}
        body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(circle,rgba(0,203,219,0.10) 1px,transparent 1px);background-size:24px 24px;pointer-events:none;z-index:0;}
        .links-page{width:100%;max-width:480px;margin:0 auto;overflow-x:hidden;}
        .yt-scroll{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none;-ms-overflow-style:none;margin:0 -20px;padding-left:20px;padding-right:20px;}
        .yt-scroll::-webkit-scrollbar{display:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .hero-content{animation:fadeUp 0.7s ease 0.15s both;}
        .social-icon:hover{background:rgba(255,255,255,0.15)!important;border-color:rgba(255,255,255,0.6)!important;color:#fff!important;}
        .link-card:hover{border-color:rgba(255,255,255,0.5);}
        .yt-card:hover .yt-play{background:rgba(0,0,0,0.15)!important;}
        .card{background:rgba(0,18,22,0.55);border:1.5px solid rgba(0,203,219,0.35);border-radius:20px;overflow:hidden;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);box-shadow:0 8px 32px rgba(0,0,0,0.5);margin-bottom:13px;}
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
        .card-feature .dot{width:22px;height:22px;border-radius:50%;background:#00CBDB;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.6rem;color:#000;font-weight:700;}
        .card-btn{display:block;margin:14px 16px 16px;background:linear-gradient(135deg,#00CBDB,#00AECF);color:#000;font-weight:700;font-size:0.9rem;letter-spacing:0.04em;text-transform:uppercase;text-align:center;padding:14px;border-radius:12px;text-decoration:none;transition:filter 0.2s,transform 0.2s;}
        .card-btn:hover{filter:brightness(1.08);transform:translateY(-1px);}
      `}</style>

      <div className="links-page" style={{ position: "relative", zIndex: 1, paddingBottom: 60, fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>

        {/* Barra "Come visto su" */}
        <div style={{ background: "#fff", padding: "5px 20px 4px" }}>
          <div style={{ fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", textAlign: "center", marginBottom: 2 }}>Come visto su</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png" alt="Come visto su" style={{ width: "100%", height: "auto", display: "block", maxWidth: 260, margin: "0 auto" }} />
        </div>

        {/* HERO */}
        <div style={{ position: "relative", width: "100%", height: "52vh", maxHeight: 420, overflow: "hidden" }}>
          <Image
            src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg"
            alt="Dave Gamba"
            fill
            style={{ objectFit: "cover", objectPosition: "center top", transform: "translateY(-3%)" }}
            priority
            unoptimized
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "75%", background: "linear-gradient(to top, rgba(8,12,15,0.97) 0%, rgba(8,12,15,0.88) 40%, rgba(8,12,15,0.5) 65%, transparent 100%)", pointerEvents: "none" }} />
          <div className="hero-content" style={{ position: "absolute", bottom: 24, left: 0, right: 0, zIndex: 2, padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "2.2rem", lineHeight: 1, color: "#fff", letterSpacing: "0.02em", marginBottom: 4 }}>
              DAVE<span style={{ color: "#00CBDB" }}>GAMBA</span>
            </div>
            <div style={{ fontSize: "0.72rem", fontWeight: 300, color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", marginBottom: 14 }}>
              Sistema Breve. Intenso. Mirato.<br />Per un fisico atletico, asciutto e scolpito.
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {SOCIAL.map(({ href, label, svg }) => (
                <a key={label} href={href} aria-label={label} className="social-icon"
                  style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "all 0.2s" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "currentColor" }}>{svg}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div style={{ padding: "28px 20px 0", background: "#080C0F", marginTop: -20, position: "relative", zIndex: 3 }}>

          {/* Quiz Profilo Fisico */}
          <a href="/quiz-fisico" className="link-card"
            style={{ display: "flex", alignItems: "center", background: "rgba(0,18,22,0.55)", border: "1.5px solid rgba(0,203,219,0.45)", borderRadius: 20, overflow: "hidden", textDecoration: "none", color: "#fff", backdropFilter: "blur(20px) saturate(1.8)", WebkitBackdropFilter: "blur(20px) saturate(1.8)", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", marginBottom: 13 }}>
            <div style={{ flexShrink: 0, width: 90, height: 92, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/card-quiz-metabolico.jpg" alt="Quiz Profilo Fisico" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, padding: "0 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "1.15rem", color: "#fff", marginBottom: 4, letterSpacing: "0.04em" }}>Quiz Profilo Fisico</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>Scopri il tuo Profilo in 2 minuti <span style={{ color: "#F0C040" }}>[Gratuito]</span></div>
            </div>
            <span style={{ paddingRight: 16, color: "#00CBDB", fontSize: "1.6rem" }}>›</span>
          </a>

          {/* DG Athletic Club */}
          <div className="card">
            <div className="card-top">
              <div className="card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg" alt="DG Athletic Club" style={{ objectPosition: "center top" }} />
              </div>
              <div className="card-info">
                <span style={{ alignSelf: "flex-start", background: "#00CBDB", color: "#000", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 20, marginBottom: 7 }}>Prova il Club · 14 giorni gratis</span>
                <div className="card-title">DG Athletic Club</div>
                <div className="card-desc">Tutto ciò che serve per un fisico atletico, asciutto e scolpito. Schede progressive, meno di mezz&apos;ora al giorno.</div>
                <div className="card-price">Gratis 14 giorni <span>poi €19/mese</span></div>
              </div>
            </div>
            <div className="card-features">
              {CLUB_FEATURES.map((f) => (
                <div key={f} className="card-feature"><span className="dot">▶</span>{f}</div>
              ))}
            </div>
            <a href="https://club.davegamba.com/entra-nel-club" className="card-btn">Prova gratis 14 giorni →</a>
          </div>

          {/* Premium Coaching */}
          <div className="card">
            <div className="card-top">
              <div className="card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg" alt="Premium Coaching 1-1" style={{ objectPosition: "center top" }} />
              </div>
              <div className="card-info">
                <div className="card-title">Premium Coaching 1-1</div>
                <div className="card-desc">Percorso completamente personalizzato con Dave. Pochi posti disponibili.</div>
              </div>
            </div>
            <div className="card-features">
              {COACHING_FEATURES.map((f) => (
                <div key={f} className="card-feature"><span className="dot">▶</span>{f}</div>
              ))}
            </div>
            <a href="https://www.davegamba.com/coaching/" target="_blank" rel="noopener noreferrer" className="card-btn">Compila il Questionario →</a>
          </div>

          {/* YouTube */}
          <div style={{ margin: "28px 0 48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ color: "#ff0000", fontSize: "1rem" }}>▶</span>
              <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "1.45rem", color: "#fff", flex: 1, letterSpacing: "0.04em" }}>Mio Canale <span style={{ color: "#00CBDB" }}>Youtube</span></span>
              <a href="https://www.youtube.com/@DaveGambaFitness" style={{ fontSize: "0.85rem", color: "#00CBDB", textDecoration: "none" }}>Vai al canale ›</a>
            </div>
            <div className="yt-scroll">
              {YT_VIDEOS.map((id) => (
                <a key={id} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer"
                  style={{ flexShrink: 0, width: 290, textDecoration: "none", color: "#fff" }}>
                  <div style={{ position: "relative", width: 290, height: 190, borderRadius: 10, overflow: "hidden", background: "#111" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={`Video ${id}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div className="yt-play" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", fontSize: "1.5rem", color: "rgba(255,255,255,0.85)", transition: "background 0.2s" }}>▶</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Blog */}
          <div style={{ margin: "0 0 48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ color: "#00CBDB", fontSize: "1rem" }}>✎</span>
              <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "1.45rem", color: "#fff", flex: 1, letterSpacing: "0.04em" }}>Ultimi articoli dal <span style={{ color: "#00CBDB" }}>Blog</span></span>
              <a href="/blog" style={{ fontSize: "0.85rem", color: "#00CBDB", textDecoration: "none" }}>Vai al blog ›</a>
            </div>
            <div className="yt-scroll">
              {articles.map((a) => (
                <a key={a.slug} href={`/blog/${a.slug}`}
                  style={{ flexShrink: 0, width: 230, textDecoration: "none", color: "#fff" }}>
                  <div style={{ position: "relative", width: 230, height: 150, borderRadius: 10, overflow: "hidden", background: "#111", marginBottom: 10 }}>
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)" }}>
                        <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontSize: "1.5rem", color: "#333" }}>DG</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00CBDB", marginBottom: 4 }}>{a.category}</div>
                  <div style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "0.95rem", color: "#fff", lineHeight: 1.3, letterSpacing: "0.02em" }}>{a.title}</div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", padding: "32px 24px 0", fontSize: "0.65rem", color: "rgba(136,136,136,0.4)", letterSpacing: "0.1em" }}>
          <a href="/privacy" style={{ color: "rgba(136,136,136,0.5)", textDecoration: "none", margin: "0 8px" }}>Privacy</a>·
          <a href="/termini" style={{ color: "rgba(136,136,136,0.5)", textDecoration: "none", margin: "0 8px" }}>Termini</a>
        </div>

      </div>
    </>
  );
}
