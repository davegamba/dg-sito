"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  price?: string;
  href?: string;
  stripeLink?: string;
  tag?: string;
  tagColor?: string;
  isCoachingCta?: boolean;
  image?: string;
  imagePosition?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "quiz",
    title: "Quiz Profilo Fisico",
    description: "Scopri il tuo punto di partenza e il percorso giusto per te.",
    href: "/quiz-fisico",
    tag: "Gratuito",
    tagColor: "#00CBDB",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/card-quiz-metabolico.jpg",
    imagePosition: "center",
  },
  {
    id: "calorie",
    title: "App Conta Calorie",
    description: "Calcola il tuo fabbisogno calorico e tieni traccia dei macro.",
    href: "https://club.davegamba.com/calorie/",
    tag: "Gratuito",
    tagColor: "#00CBDB",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/Facetune_29-05-2026-20-47-56.jpg",
    imagePosition: "center",
  },
  {
    id: "sfida",
    title: "Sfida Estiva 21 Giorni",
    description: "21 allenamenti BIM da 21 minuti. Brucia grasso, mantieni muscolo.",
    price: "€37",
    stripeLink: "https://buy.stripe.com/5kQdRa9BQc5EgQi2961Nu00",
    tag: "21 Giorni",
    tagColor: "#C8963E",
    href: "https://sfida.davegamba.com",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/Facetune_25-03-2026-09-35-25.jpg",
    imagePosition: "center 65%",
  },
  {
    id: "coaching",
    title: "Coaching Personale 1-1",
    description: "Il servizio online di piani personalizzati sotto la guida personale di Dave fino al tuo risultato.",
    tag: "Premium",
    tagColor: "#C8963E",
    isCoachingCta: true,
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg",
    imagePosition: "center top",
  },
];

interface Props {
  userEmail: string;
  unlockedProducts: string[];
}

export default function AppDashboard({ userEmail, unlockedProducts }: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const isUnlocked = (productId: string) => {
    if (productId === "quiz" || productId === "calorie") return true;
    if (productId === "coaching") return true;
    return unlockedProducts.includes(productId);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const firstName = userEmail.split("@")[0].split(".")[0];
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .bc-wrap {
          min-height: 100dvh;
          font-family: 'DM Sans', sans-serif;
          color: #0A1A20;
          position: relative;
          overflow-x: hidden;
        }

        /* Sfondo palme fisso */
        .bc-bg {
          position: fixed;
          inset: 0;
          background-image: url('https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/palmeBg.jpeg');
          background-size: cover;
          background-position: center top;
          z-index: 0;
        }
        .bc-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.91);
        }

        /* Header */
        .bc-header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          background: linear-gradient(135deg, #00CBDB 0%, #00AECF 55%, #0077CC 100%);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0,203,219,0.2);
        }
        .bc-header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .bc-header-logo-dave {
          font-family: 'DM Serif Display', serif;
          font-size: 1.875rem;
          color: #fff;
          line-height: 1;
        }
        .bc-header-logo-gamba {
          font-family: 'DM Serif Display', serif;
          font-size: 1.875rem;
          color: #001E28;
          line-height: 1;
        }
        .bc-header-center {
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }
        .bc-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bc-header-email {
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.03em;
        }
        .bc-logout-btn {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 100px;
          color: #fff;
          font-size: 11px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.2s;
          padding: 5px 14px;
        }
        .bc-logout-btn:hover { background: rgba(255,255,255,0.25); }

        /* Main */
        .bc-main {
          position: relative;
          z-index: 5;
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 24px 100px;
        }

        /* Greeting */
        .bc-greeting {
          text-align: center;
          margin-bottom: 48px;
        }
        .bc-greeting-name {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 2.5vw, 16px);
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .bc-greeting-name em { font-style: normal; }
        .bc-greeting-sub {
          margin-top: 10px;
          font-size: 14px;
          color: rgba(10,26,32,0.45);
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        /* Divider ornamentale */
        .bc-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        .bc-ornament-line { flex: 1; height: 1px; background: rgba(200,150,62,0.25); }
        .bc-ornament-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(200,150,62,0.55); }

        /* Grid card */
        .bc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        /* Card */
        .bc-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 1px solid rgba(0,203,219,0.3);
          transition: border-color 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .bc-card.unlocked:hover {
          border-color: rgba(0,203,219,0.7);
          transform: translateY(-3px);
        }
        .bc-card.locked {
          filter: brightness(0.6) saturate(0.4);
        }
        .bc-card.coaching {
          border-color: rgba(0,203,219,0.3);
        }
        .bc-card.coaching:hover {
          border-color: rgba(0,203,219,0.7);
          transform: translateY(-3px);
        }

        /* Card bg */
        .bc-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          z-index: 0;
          transition: transform 0.4s ease;
        }
        .bc-card:hover .bc-card-bg { transform: scale(1.03); }

        /* Card overlay — più caldo del nero puro */
        .bc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(14,8,3,0.97) 0%,
            rgba(14,8,3,0.65) 45%,
            rgba(14,8,3,0.08) 100%
          );
          z-index: 1;
        }

        /* Card body */
        .bc-card-body {
          position: relative;
          z-index: 2;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Tag */
        .bc-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          width: fit-content;
          border: 1px solid;
        }

        .bc-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 21px;
          color: #F5F0E8;
          line-height: 1.2;
        }
        .bc-card-desc {
          font-size: 13px;
          color: rgba(245,240,232,0.5);
          line-height: 1.55;
          font-weight: 300;
        }
        .bc-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
        }
        .bc-price {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #C8963E;
        }

        /* Bottoni */
        .bc-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 22px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .bc-btn-cyan {
          background: rgba(0,203,219,0.15);
          color: #00CBDB;
          border: 1px solid rgba(0,203,219,0.3);
        }
        .bc-btn-cyan:hover { background: rgba(0,203,219,0.25); }
        .bc-btn-gold {
          background: linear-gradient(135deg, #D4A84B, #C8963E);
          color: #0A0603;
          font-weight: 700;
        }
        .bc-btn-gold:hover { filter: brightness(1.1); transform: translateY(-1px); }

        @media (max-width: 520px) {
          .bc-grid { grid-template-columns: 1fr; }
          .bc-header-email { display: none; }
          .bc-header-center { display: none; }
        }
      `}</style>

      <div className="bc-wrap">
        <div className="bc-bg" />

        {/* Header */}
        <header className="bc-header">
          <a href="https://davegamba.com" className="bc-header-logo">
            <span className="bc-header-logo-dave">Dave</span>
            <span className="bc-header-logo-gamba">Gamba</span>
          </a>
          <div className="bc-header-center">Il tuo spazio personale</div>
          <div className="bc-header-right">
            <span className="bc-header-email">{userEmail}</span>
            <button className="bc-logout-btn" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? "..." : "Esci"}
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="bc-main">

          {/* Greeting */}
          <div className="bc-greeting">
            <div className="bc-greeting-name">
              <span style={{ color: "#0A1A20" }}>DG </span><span style={{ color: "#00CBDB" }}>Fit Club</span>
            </div>
            <div className="bc-greeting-sub">Cosa vuoi fare oggi?</div>
          </div>

          {/* Ornament */}
          <div className="bc-ornament">
            <div className="bc-ornament-line" />
            <div className="bc-ornament-dot" />
            <div className="bc-ornament-dot" />
            <div className="bc-ornament-dot" />
            <div className="bc-ornament-line" />
          </div>

          {/* Grid */}
          <div className="bc-grid">
            {PRODUCTS.map((product) => {
              const unlocked = isUnlocked(product.id);

              return (
                <div
                  key={product.id}
                  className={`bc-card ${product.isCoachingCta ? "coaching" : unlocked ? "unlocked" : "locked"}`}
                >
                  <div
                    className="bc-card-bg"
                    style={{
                      backgroundImage: `url('${product.image}')`,
                      backgroundPosition: product.imagePosition ?? "center",
                    }}
                  />
                  <div className="bc-card-overlay" />
                  <div className="bc-card-body">
                    {product.tag && (
                      <span
                        className="bc-tag"
                        style={{ color: product.tagColor, borderColor: product.tagColor + "44" }}
                      >
                        {product.tag}
                      </span>
                    )}
                    <div className="bc-card-title">{product.title}</div>
                    <div className="bc-card-desc">{product.description}</div>
                    <div className="bc-card-footer">
                      {product.isCoachingCta ? (
                        <a href="/coaching" className="bc-btn bc-btn-gold">
                          Scopri il coaching →
                        </a>
                      ) : unlocked ? (
                        <a
                          href={product.href}
                          className="bc-btn bc-btn-cyan"
                          target={product.href?.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          Apri →
                        </a>
                      ) : (
                        <>
                          <span className="bc-price">{product.price}</span>
                          <a
                            href={product.stripeLink}
                            className="bc-btn bc-btn-gold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            🔒 Sblocca
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
