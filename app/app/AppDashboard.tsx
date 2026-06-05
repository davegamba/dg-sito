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
}

const PRODUCTS: Product[] = [
  {
    id: "quiz",
    title: "Quiz — Il tuo profilo fitness",
    description: "Scopri il tuo punto di partenza e il percorso giusto per te.",
    href: "/quiz",
    tag: "Gratuito",
    tagColor: "#00CBDB",
  },
  {
    id: "calorie",
    title: "App Conta Calorie",
    description: "Calcola il tuo fabbisogno calorico e tieni traccia dei macro.",
    href: "https://club.davegamba.com/conta-calorie.html",
    tag: "Gratuito",
    tagColor: "#00CBDB",
  },
  {
    id: "sfida",
    title: "Sfida Estiva 21 Giorni",
    description: "21 allenamenti BIM da 21 minuti. Brucia grasso, mantieni muscolo. Risultati visibili in 3 settimane.",
    price: "€37",
    stripeLink: "https://buy.stripe.com/5kQdRa9BQc5EgQi2961Nu00",
    tag: "21 Giorni",
    tagColor: "#F0C040",
    href: "https://sfida.davegamba.com",
  },
  {
    id: "coaching",
    title: "Coaching Personalizzato",
    description: "Scheda su misura, nutrizione, supporto diretto. Per chi vuole risultati seri senza perdere tempo.",
    tag: "Premium",
    tagColor: "#F0C040",
    isCoachingCta: true,
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
    // Quiz e calorie sempre liberi
    if (productId === "quiz" || productId === "calorie") return true;
    // Coaching è sempre una CTA, non si "sblocca"
    if (productId === "coaching") return true;
    // Sfida: controlla in purchases
    return unlockedProducts.includes(productId);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getInitial = (email: string) => email.charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080810; }
        .da-wrap {
          min-height: 100dvh;
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          color: #F0F0F0;
        }
        .da-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #1A1A2E;
          background: #0A0A18;
        }
        .da-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          background: linear-gradient(135deg, #00F0FF, #0077CC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .da-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .da-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00CBDB, #0077CC);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          flex-shrink: 0;
        }
        .da-email {
          color: #888;
          font-size: 13px;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .da-logout {
          background: none;
          border: 1px solid #2A2A3E;
          border-radius: 8px;
          color: #666;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .da-logout:hover { color: #F0F0F0; border-color: #444; }
        .da-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }
        .da-greeting {
          margin-bottom: 40px;
        }
        .da-greeting-title {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #F0F0F0;
          margin-bottom: 8px;
        }
        .da-greeting-sub {
          color: #666;
          font-size: 15px;
        }
        .da-section-label {
          color: #555;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .da-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .da-card {
          background: #111118;
          border: 1px solid #1E1E2E;
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s;
          position: relative;
          overflow: hidden;
        }
        .da-card.unlocked:hover { border-color: #00CBDB44; }
        .da-card.locked {
          opacity: 0.7;
        }
        .da-card.coaching-card {
          border-color: #F0C04022;
          background: #131310;
        }
        .da-card.coaching-card:hover { border-color: #F0C04044; }
        .da-tag {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          width: fit-content;
          border: 1px solid;
        }
        .da-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #F0F0F0;
          line-height: 1.3;
        }
        .da-card-desc {
          color: #888;
          font-size: 14px;
          line-height: 1.6;
          flex: 1;
        }
        .da-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .da-lock {
          font-size: 20px;
        }
        .da-price {
          color: #F0C040;
          font-size: 18px;
          font-weight: 700;
          font-family: 'DM Serif Display', serif;
        }
        .da-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s;
        }
        .da-btn:hover { opacity: 0.85; }
        .da-btn-cyan { background: linear-gradient(135deg, #00CBDB, #0077CC); color: #fff; }
        .da-btn-gold { background: linear-gradient(135deg, #FFE066, #D4800A); color: #000; }
        .da-btn-outline {
          background: none;
          border: 1px solid #2A2A3E;
          color: #666;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .da-email { display: none; }
          .da-grid { grid-template-columns: 1fr; }
          .da-greeting-title { font-size: 26px; }
        }
      `}</style>

      <div className="da-wrap">
        {/* Header */}
        <header className="da-header">
          <div className="da-logo">DaveGamba</div>
          <div className="da-user">
            <div className="da-avatar">{getInitial(userEmail)}</div>
            <span className="da-email">{userEmail}</span>
            <button className="da-logout" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? "..." : "Esci"}
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="da-main">
          <div className="da-greeting">
            <div className="da-greeting-title">Ciao 👋</div>
            <div className="da-greeting-sub">Ecco tutto quello che hai a disposizione.</div>
          </div>

          <div className="da-section-label">I tuoi contenuti</div>

          <div className="da-grid">
            {PRODUCTS.map((product) => {
              const unlocked = isUnlocked(product.id);

              if (product.isCoachingCta) {
                return (
                  <div key={product.id} className="da-card coaching-card">
                    <span
                      className="da-tag"
                      style={{ color: product.tagColor, borderColor: product.tagColor + "44" }}
                    >
                      {product.tag}
                    </span>
                    <div className="da-card-title">{product.title}</div>
                    <div className="da-card-desc">{product.description}</div>
                    <a href="/coaching" className="da-btn da-btn-gold" style={{ marginTop: 4, justifyContent: "center" }}>
                      Scopri il coaching →
                    </a>
                  </div>
                );
              }

              return (
                <div key={product.id} className={`da-card ${unlocked ? "unlocked" : "locked"}`}>
                  <span
                    className="da-tag"
                    style={{ color: product.tagColor, borderColor: product.tagColor + "44" }}
                  >
                    {product.tag}
                  </span>
                  <div className="da-card-title">{product.title}</div>
                  <div className="da-card-desc">{product.description}</div>
                  <div className="da-card-footer">
                    {unlocked ? (
                      <a
                        href={product.href}
                        className="da-btn da-btn-cyan"
                        target={product.href?.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        Apri →
                      </a>
                    ) : (
                      <>
                        <span className="da-price">{product.price}</span>
                        <a
                          href={product.stripeLink}
                          className="da-btn da-btn-gold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔒 Sblocca
                        </a>
                      </>
                    )}
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
