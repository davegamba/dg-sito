"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, CONSENT_EVENT, GA_ID, PIXEL_ID } from "@/lib/consent";

let caricato = false;

function loadTracking() {
  // Guardia: il banner puo' montarsi piu' volte durante la navigazione
  // client-side, e caricare il Pixel due volte raddoppia i PageView.
  if (caricato) return;
  caricato = true;

  // Google Analytics
  const gaScript = document.createElement("script");
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  gaScript.async = true;
  document.head.appendChild(gaScript);

  const gaInit = document.createElement("script");
  gaInit.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(gaInit);

  // Meta Pixel
  const pixelScript = document.createElement("script");
  pixelScript.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(pixelScript);

  // Sveglia le pagine che aspettano il consenso per mandare i loro eventi
  // (ViewContent su /coaching, ecc.)
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

const STANDALONE_PAGES = ["/links"];

// Il consenso vive in localStorage, che sul server non esiste. useSyncExternalStore
// legge il valore reale al primo render client e "" durante l'SSR, senza il
// setState-dentro-effect che causava un render a cascata (e il lampo del banner).
function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CONSENT_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CONSENT_EVENT, cb);
  };
}

export default function CookieBanner() {
  const pathname = usePathname();
  const [scelto, setScelto] = useState(false);

  const consent = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(CONSENT_KEY) ?? "",
    () => "" // snapshot server: nessun consenso noto
  );

  useEffect(() => {
    if (consent === "accepted") loadTracking();
  }, [consent]);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setScelto(true);
    loadTracking();
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setScelto(true);
  }

  // Il banner si vede solo se non c'è ancora una scelta e non siamo su una
  // pagina standalone (/links, che è un funnel a sé e non traccia).
  const visible = !scelto && consent === "" && !STANDALONE_PAGES.includes(pathname);

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
          Solo essenziali
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
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
