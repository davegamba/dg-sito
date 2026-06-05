"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "dg_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(8,12,15,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
        backdropFilter: "blur(8px)",
      }}
    >
      <p style={{ color: "#aaa", fontSize: "13px", margin: 0, lineHeight: 1.5, flex: "1 1 280px", maxWidth: 600 }}>
        Questo sito usa cookie tecnici e di profilazione (Meta Pixel, Google Analytics) per migliorare l&apos;esperienza e mostrare contenuti pertinenti.{" "}
        <Link href="/privacy" style={{ color: "#00CBDB", textDecoration: "underline" }}>
          Privacy policy
        </Link>
      </p>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={reject}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#888",
            fontSize: "12px",
            padding: "7px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Rifiuta
        </button>
        <button
          onClick={accept}
          style={{
            background: "#00CBDB",
            border: "none",
            color: "#000",
            fontWeight: 700,
            fontSize: "12px",
            padding: "7px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Accetta
        </button>
      </div>
    </div>
  );
}
