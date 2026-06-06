"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Product {
  id: string;
  title: string;
  price?: string;
  href?: string;
  stripeLink?: string;
  tag?: string;
  tagColor?: string;
  isCoachingCta?: boolean;
  image?: string;
  imagePosition?: string;
}

const COACHING: Product = {
  id: "coaching",
  title: "Coaching Personale 1-1",
  tag: "Premium",
  tagColor: "#C8963E",
  isCoachingCta: true,
  href: "/coaching",
  image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/sfondo-links-1.jpeg",
  imagePosition: "center top",
};

const PRODUCTS_DEFAULT: Product[] = [
  {
    id: "quiz",
    title: "Quiz Profilo Fisico",
    href: "/quiz-fisico",
    tag: "Gratis",
    tagColor: "#00CBDB",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/card-quiz-metabolico.jpg",
    imagePosition: "center",
  },
  {
    id: "calorie",
    title: "Conta Calorie",
    href: "https://club.davegamba.com/calorie/",
    tag: "Gratis",
    tagColor: "#00CBDB",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/Facetune_29-05-2026-20-47-56.jpg",
    imagePosition: "center",
  },
  {
    id: "sfida",
    title: "Protocollo Estivo — Asciutti o Scolpiti",
    price: "€33",
    stripeLink: "https://buy.stripe.com/5kQdRa9BQc5EgQi2961Nu00",
    tag: "🔒 Sblocca",
    tagColor: "#C8963E",
    href: "https://sfida.davegamba.com",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/Facetune_25-03-2026-09-35-25.jpg",
    imagePosition: "center 65%",
  },
  {
    id: "addominali",
    title: "Protocollo Addominali Scolpiti",
    price: "€21",
    stripeLink: "",
    tag: "🔒 Sblocca",
    tagColor: "#C8963E",
    href: "",
    image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/card-quiz-metabolico.jpg",
    imagePosition: "center",
  },
];

const LS_KEY = "dg_club_card_order";

function getOrderedProducts(): Product[] {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return PRODUCTS_DEFAULT;
    const ids: string[] = JSON.parse(saved);
    const map = Object.fromEntries(PRODUCTS_DEFAULT.map(p => [p.id, p]));
    const ordered = ids.map(id => map[id]).filter(Boolean);
    // Aggiungi eventuali nuovi prodotti non presenti nell'ordine salvato
    const extra = PRODUCTS_DEFAULT.filter(p => !ids.includes(p.id));
    return [...ordered, ...extra];
  } catch {
    return PRODUCTS_DEFAULT;
  }
}

interface CardProps {
  product: Product;
  unlocked: boolean;
  onClick: () => void;
}

function SortableCard({ product, unlocked, onClick }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const isLocked = !unlocked && !product.isCoachingCta;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
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
      {/* Prezzo in alto a destra */}
      {isLocked && product.price && (
        <div className="bc-card-price-badge">{product.price}</div>
      )}
      <div className="bc-card-body">
        {product.tag && (
          <span
            className="bc-tag"
            style={{ color: product.tagColor, borderColor: (product.tagColor ?? "#fff") + "44" }}
          >
            {product.tag}
          </span>
        )}
        <div className="bc-card-title">{product.title}</div>
      </div>
    </div>
  );
}

interface Props {
  userEmail: string;
  unlockedProducts: string[];
}

export default function AppDashboard({ userEmail, unlockedProducts }: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DEFAULT);

  useEffect(() => {
    setProducts(getOrderedProducts());
  }, []);

  const isUnlocked = useCallback((productId: string) => {
    if (productId === "quiz" || productId === "calorie") return true;
    return unlockedProducts.includes(productId);
  }, [unlockedProducts]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 300, tolerance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setProducts(prev => {
      const oldIndex = prev.findIndex(p => p.id === active.id);
      const newIndex = prev.findIndex(p => p.id === over.id);
      const newOrder = arrayMove(prev, oldIndex, newIndex);
      localStorage.setItem(LS_KEY, JSON.stringify(newOrder.map(p => p.id)));
      return newOrder;
    });
  };

  const handleCardClick = (product: Product) => {
    const unlocked = isUnlocked(product.id);
    if (product.isCoachingCta) {
      router.push("/coaching");
    } else if (unlocked) {
      if (product.href?.startsWith("http")) {
        window.open(product.href, "_blank");
      } else if (product.href) {
        router.push(product.href);
      }
    } else {
      if (product.stripeLink) window.open(product.stripeLink, "_blank");
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @font-face {
          font-family: 'Flatline';
          src: url('/fonts/Flatline-Regular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Flatline';
          src: url('/fonts/Flatline-SemiBold.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .bc-wrap {
          min-height: 100dvh;
          font-family: 'DM Sans', sans-serif;
          color: #0A1A20;
          position: relative;
          overflow-x: hidden;
        }

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
          background: linear-gradient(
            to bottom,
            rgba(0,203,219,0.93)   0%,
            rgba(0,203,219,0.93)   37%,
            rgba(0,185,205,0.96)   38%,
            rgba(250,246,240,0.93) 39%,
            rgba(250,246,240,0.93) 100%
          );
        }

        /* Header */
        .bc-header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 46px;
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }
        .bc-header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #fff;
        }
        .bc-header-logo-dave,
        .bc-header-logo-gamba {
          font-family: 'Flatline', sans-serif;
          font-weight: 500;
          font-size: 1.1rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1;
          color: #fff;
        }
        .bc-header-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }
        .bc-header-email {
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.02em;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bc-logout-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 100px;
          color: rgba(255,255,255,0.85);
          font-size: 10px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.2s;
          padding: 4px 12px;
        }
        .bc-logout-btn:hover { background: rgba(255,255,255,0.15); }


        /* Main */
        .bc-main {
          position: relative;
          z-index: 5;
          max-width: 860px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }

        /* Greeting */
        .bc-greeting {
          text-align: center;
          margin-bottom: 20px;
        }
        .bc-greeting-sub {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 18px;
          font-family: 'DM Sans', sans-serif;
        }
        .bc-greeting-name {
          font-family: 'Flatline', sans-serif;
          font-size: clamp(30px, 5.5vw, 58px);
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
          margin-bottom: 18px;
        }
        .bc-drag-hint {
          margin-top: 0px;
          font-size: 11px;
          color: rgba(10,26,32,0.55);
          letter-spacing: 0.04em;
        }
        .bc-grid-wrap {
          margin-top: 28px;
        }

        /* Grid 2 colonne */
        .bc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Card compatta */
        .bc-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 1px solid rgba(0,203,219,0.3);
          transition: border-color 0.3s, transform 0.2s;
          cursor: grab;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          touch-action: none;
        }
        .bc-card.unlocked:active,
        .bc-card.coaching:active {
          transform: scale(0.97);
        }
        .bc-card.unlocked:hover,
        .bc-card.coaching:hover {
          border-color: rgba(0,203,219,0.7);
        }
        .bc-card.locked {
          filter: brightness(0.55) saturate(0.3);
          cursor: pointer;
        }

        .bc-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          z-index: 0;
          transition: transform 0.4s ease;
        }
        .bc-card:hover .bc-card-bg { transform: scale(1.04); }

        .bc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8,4,2,0.95) 0%,
            rgba(8,4,2,0.5) 50%,
            rgba(8,4,2,0.05) 100%
          );
          z-index: 1;
        }

        .bc-card-body {
          position: relative;
          z-index: 2;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .bc-tag {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 100px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          width: fit-content;
          border: 1px solid;
        }

        .bc-card-title {
          font-family: 'Flatline', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #F5F0E8;
          line-height: 1.25;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .bc-card-price-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 3;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #0A0603;
          background: linear-gradient(135deg, #D4A84B, #C8963E);
          border-radius: 100px;
          padding: 5px 12px;
          box-shadow: 0 2px 8px rgba(200,150,62,0.4);
        }

        /* Striscia coaching */
        .bc-coaching-strip {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(200,150,62,0.4);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          transition: border-color 0.2s, transform 0.2s;
          padding: 0 22px;
        }
        .bc-coaching-strip:active { transform: scale(0.98); }
        .bc-coaching-strip:hover { border-color: rgba(200,150,62,0.7); }
        .bc-coaching-strip-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center top;
          z-index: 0;
        }
        .bc-coaching-strip-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(8,4,2,0.92) 0%, rgba(8,4,2,0.6) 100%);
          z-index: 1;
        }
        .bc-coaching-strip-body {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .bc-coaching-strip-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .bc-coaching-strip-tag {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8963E;
        }
        .bc-coaching-strip-title {
          font-family: 'Flatline', sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #F5F0E8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .bc-coaching-strip-cta {
          background: linear-gradient(135deg, #D4A84B, #C8963E);
          color: #0A0603;
          font-size: 12px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          border: none;
          border-radius: 100px;
          padding: 8px 18px;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: 0.03em;
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
          <div className="bc-header-right">
            <span className="bc-header-email">{userEmail}</span>
            <button className="bc-logout-btn" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? "..." : "Esci"}
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="bc-main">

          <div className="bc-greeting">
            <div className="bc-greeting-sub">Il tuo spazio personale</div>
            <div className="bc-greeting-name">
              <span style={{ color: "#fff" }}>DG Athletic Club</span>
            </div>
            <div className="bc-drag-hint">Tieni premuto per riordinare</div>
          </div>

          <div className="bc-grid-wrap">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={products.map(p => p.id)} strategy={rectSortingStrategy}>
                <div className="bc-grid">
                  {products.map((product) => (
                    <SortableCard
                      key={product.id}
                      product={product}
                      unlocked={isUnlocked(product.id)}
                      onClick={() => handleCardClick(product)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Striscia Coaching — fuori dal drag */}
            <div
              className="bc-coaching-strip"
              style={{ marginTop: "12px" }}
              onClick={() => router.push("/coaching")}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div
                className="bc-coaching-strip-bg"
                style={{ backgroundImage: `url('${COACHING.image}')` }}
              />
              <div className="bc-coaching-strip-overlay" />
              <div className="bc-coaching-strip-body">
                <div className="bc-coaching-strip-text">
                  <span className="bc-coaching-strip-tag">Premium</span>
                  <span className="bc-coaching-strip-title">Coaching Personale 1-1</span>
                </div>
                <a href="/coaching" className="bc-coaching-strip-cta" onClick={e => e.stopPropagation()}>Scopri →</a>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
