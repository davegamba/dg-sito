import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina non trovata — Dave Gamba",
  robots: { index: false, follow: true },
};

// Sostituisce il vecchio app/[...slug]/page.tsx, che mandava OGNI url
// sconosciuto su davegamba.podia.com — dominio che oggi risponde 404.
// I redirect Podia legittimi restano mappati uno a uno in next.config.ts.
export default function NotFound() {
  return (
    <>
      <Header />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px",
          gap: 20,
        }}
      >
        <p
          style={{
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#00CBDE",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Errore 404
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", margin: 0, lineHeight: 1.15 }}>
          Questa pagina non esiste.
        </h1>
        <p style={{ color: "#666", fontSize: 16, maxWidth: 420, margin: 0, lineHeight: 1.6 }}>
          Può darsi che l&apos;indirizzo sia sbagliato, o che il contenuto sia stato spostato.
          Riparti da qui.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          <Link
            href="/"
            style={{
              background: "#00CBDE",
              color: "#000",
              fontWeight: 700,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Torna alla home
          </Link>
          <Link
            href="/blog"
            style={{
              border: "1px solid #ddd",
              color: "#14181a",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Vai al blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
