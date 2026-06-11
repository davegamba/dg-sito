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

const LINKS = [
  {
    href: "/quiz-fisico",
    img: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/card-quiz-metabolico.jpg",
    title: "Quiz Profilo Fisico",
    sub: <>Scopri il tuo Profilo in 2 minuti <span style={{ color: "#F0C040" }}>[Gratuito]</span></>,
    imgPosition: "center",
  },
  {
    href: "https://sfidaestiva.davegamba.com",
    img: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/Facetune_25-03-2026-09-35-25.jpg",
    title: "Sfida Estiva 21 Giorni",
    sub: <>Mettiti in forma per l&apos;Estate</>,
    imgPosition: "center 65%",
  },
  {
    href: "/coaching#candidati",
    img: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg",
    title: "Premium Coaching 1-1",
    sub: <>Percorso personalizzato con Dave</>,
    imgPosition: "center top",
  },
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
      `}</style>

      <div className="links-page" style={{ position: "relative", zIndex: 1, paddingBottom: 60, fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>

        {/* Barra "Come visto su" */}
        <div style={{ background: "#fff", padding: "10px 20px" }}>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", textAlign: "center", marginBottom: 6 }}>Come visto su</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png" alt="Come visto su" style={{ width: "100%", height: "auto", display: "block", maxWidth: 360, margin: "0 auto" }} />
        </div>

        {/* HERO */}
        <div style={{ position: "relative", width: "100%", height: "100vh", maxHeight: 780, overflow: "hidden" }}>
          <Image
            src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg"
            alt="Dave Gamba"
            fill
            style={{ objectFit: "cover", objectPosition: "center top", transform: "translateY(-3%)" }}
            priority
            unoptimized
          />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "75%", background: "linear-gradient(to top, rgba(8,12,15,0.97) 0%, rgba(8,12,15,0.88) 40%, rgba(8,12,15,0.5) 65%, transparent 100%)", pointerEvents: "none" }} />

          {/* Content overlay */}
          <div className="hero-content" style={{ position: "absolute", bottom: 24, left: 0, right: 0, zIndex: 2, padding: "0 20px", display: "flex", flexDirection: "column" }}>

            {/* Nome */}
            <div style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "2.2rem", lineHeight: 1, color: "#fff", letterSpacing: "0.02em", marginBottom: 4, textAlign: "center" }}>
              DAVE<span style={{ color: "#00CBDB" }}>GAMBA</span>
            </div>
            <div style={{ fontSize: "0.72rem", fontWeight: 300, color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", marginBottom: 14 }}>
              Sistema Breve. Intenso. Mirato.<br />Per un fisico atletico, asciutto e scolpito.
            </div>

            {/* Social */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20 }}>
              {SOCIAL.map(({ href, label, svg }) => (
                <a key={label} href={href} aria-label={label} className="social-icon"
                  style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "all 0.2s" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "currentColor" }}>{svg}</svg>
                </a>
              ))}
            </div>

            {/* Link cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 16 }}>
              {LINKS.map(({ href, img, title, sub, imgPosition }) => (
                <a key={href} href={href} className="link-card"
                  style={{ display: "flex", alignItems: "center", background: "rgba(0,18,22,0.38)", border: "1.5px solid rgba(0,203,219,0.45)", borderRadius: 9999, overflow: "hidden", textDecoration: "none", color: "#fff", backdropFilter: "blur(20px) saturate(1.8)", WebkitBackdropFilter: "blur(20px) saturate(1.8)", boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(0,203,219,0.08) inset", transition: "border-color 0.2s" }}>
                  <div style={{ flexShrink: 0, width: 90, height: 92, overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: imgPosition }} />
                  </div>
                  <div style={{ flex: 1, padding: "0 16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)", fontWeight: 600, fontSize: "1.15rem", color: "#fff", marginBottom: 4, letterSpacing: "0.04em" }}>{title}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>{sub}</div>
                  </div>
                  <span style={{ paddingRight: 16, color: "#00CBDB", fontSize: "1.6rem" }}>›</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BELOW HERO */}
        <div style={{ padding: "0 20px", background: "#080C0F", marginTop: -20, position: "relative", zIndex: 3 }}>

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
