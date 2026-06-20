"use client";
import Link from "next/link";

const R = "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/";

const BULLETS = [
  {
    title: "12 sessioni video guidate",
    desc: "Una per ogni giorno di allenamento — sempre a portata di tap nel club.",
  },
  {
    title: "Progressione in 4 settimane",
    desc: "Attivazione → Resistenza → Forza → Intensità. Ogni settimana sale il livello.",
  },
  {
    title: "Corpo libero — fai da casa",
    desc: "Nessun attrezzo, nessuna palestra. Casa, hotel, ovunque tu sia.",
  },
  {
    title: "Accesso immediato e permanente",
    desc: "Paghi una volta. Il corso è tuo per sempre, nel DG Athletic Club.",
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="#00CBDB">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="#1a0f00">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function AddominaliPage() {
  return (
    <div style={{ background: "#0A0A0A", color: "#ECEEF0", minHeight: "100dvh", fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "88dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${R}foto-sfida-estiva.jpg')`,
          backgroundSize: "cover", backgroundPosition: "center 20%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,1) 18%, rgba(8,8,8,.55) 55%, rgba(8,8,8,.2))",
        }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 22px 38px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", color: "#00CBDB", textTransform: "uppercase", marginBottom: 12 }}>
            DG Athletic Club
          </div>
          <h1 style={{
            fontFamily: "var(--font-dm-serif), Flatline, sans-serif",
            fontWeight: 700, fontSize: "clamp(36px, 10vw, 48px)",
            lineHeight: 1.0, letterSpacing: ".02em", marginBottom: 14,
          }}>
            Pancia Piatta<br />&amp; Core
          </h1>
          <p style={{ color: "#9AA0A6", fontSize: 15, lineHeight: 1.65, maxWidth: 340, marginBottom: 28 }}>
            12 sessioni. 4 settimane. Zero attrezzi.<br />
            <strong style={{ color: "#ECEEF0" }}>Il programma che ti dà un core solido e una pancia piatta</strong> — in 15 minuti al giorno.
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-dm-serif), Flatline, sans-serif", fontWeight: 700, fontSize: 38, color: "#F0C040" }}>€21</span>
            <span style={{ fontSize: 13, color: "#9AA0A6" }}>pagamento unico</span>
          </div>
          <Link href="/checkout/addominali" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", maxWidth: 400,
            background: "linear-gradient(180deg, #F5CE50 0%, #E8B820 55%, #D4A510 100%)",
            color: "#1a0f00", fontWeight: 700, fontSize: 17, padding: "18px",
            border: "none", borderRadius: 15, cursor: "pointer", textDecoration: "none",
            boxShadow: "0 6px 22px rgba(240,192,64,.35), inset 0 1px 0 rgba(255,255,255,.45)",
          }}>
            <ArrowIcon />
            Inizia ora
          </Link>
        </div>
      </section>

      {/* COSA OTTIENI */}
      <section style={{ padding: "36px 22px 32px", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{
          fontFamily: "var(--font-dm-serif), Flatline, sans-serif",
          fontWeight: 700, fontSize: 22, letterSpacing: ".02em", marginBottom: 20,
        }}>
          Cosa ottieni
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {BULLETS.map((b) => (
            <div key={b.title} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(0,203,219,.12)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <CheckIcon />
              </div>
              <div>
                <strong style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{b.title}</strong>
                <span style={{ fontSize: 13, color: "#9AA0A6", lineHeight: 1.5 }}>{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINALE */}
      <section style={{ padding: "0 22px 52px" }}>
        <div style={{
          background: "#16181B", border: "0.5px solid rgba(240,192,64,.2)",
          borderRadius: 20, padding: "26px 20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#9AA0A6", marginBottom: 8 }}>
            PANCIA PIATTA &amp; CORE
          </div>
          <div style={{ fontFamily: "var(--font-dm-serif), Flatline, sans-serif", fontWeight: 700, fontSize: 44, color: "#F0C040", marginBottom: 4 }}>
            €21
          </div>
          <div style={{ fontSize: 13, color: "#9AA0A6", marginBottom: 20 }}>
            Pagamento unico · Nessun abbonamento
          </div>
          <Link href="/checkout/addominali" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%",
            background: "linear-gradient(180deg, #F5CE50, #E8B820 55%, #D4A510)",
            color: "#1a0f00", fontWeight: 700, fontSize: 17, padding: "18px",
            border: "none", borderRadius: 14, cursor: "pointer", textDecoration: "none",
            boxShadow: "0 6px 22px rgba(240,192,64,.35), inset 0 1px 0 rgba(255,255,255,.45)",
            marginBottom: 14,
          }}>
            <ArrowIcon />
            Acquista ora
          </Link>
          <div style={{ fontSize: 12, color: "#5F6469", lineHeight: 1.5 }}>
            Accesso immediato dopo il pagamento.<br />Supporto via WhatsApp se hai dubbi.
          </div>
        </div>
      </section>

    </div>
  );
}
