import type { Metadata } from "next";
import localFont from "next/font/local";
import ExitPopup from "@/components/ExitPopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";
import ScrollAnimations from "@/components/ScrollAnimations";
import CookieBanner from "@/components/CookieBanner";
import { BASE_URL } from "@/lib/site";
import "./globals.css";

const dmSerif = localFont({
  src: [
    { path: "../public/fonts/Flatline-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Flatline-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Flatline-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});

// DM Sans self-hostato invece che via next/font/google: il download da
// fonts.gstatic.com al momento del build ha fatto fallire un deploy Vercel
// (404 sui .woff2 con la build cache stale, 2026-08-11). Con il file locale
// il build non dipende più da un server esterno.
// È un font variabile: un solo file copre tutto il range di pesi.
const dmSans = localFont({
  src: "../public/fonts/DMSans-Variable.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase mancava: senza, Next non sa risolvere gli URL relativi nei
  // metadata e lo segnala a ogni build.
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  title: "Dave Gamba — Personal Trainer Online da oltre 15 anni",
  description:
    "Tutto per costruire un fisico atletico, asciutto e scolpito con allenamenti da meno di 30 minuti. Oltre 3.000 clienti trasformati.",
  keywords: ["personal trainer online", "metodo Breve-Intenso-Mirato", "allenamento uomini", "Dave Gamba"],
  authors: [{ name: "Dave Gamba" }],
  openGraph: {
    title: "Dave Gamba — Personal Trainer Online da oltre 15 anni",
    description: "Tutto per costruire un fisico atletico, asciutto e scolpito con allenamenti da meno di 30 minuti. Oltre 3.000 clienti trasformati.",
    url: BASE_URL,
    siteName: "Dave Gamba",
    locale: "it_IT",
    type: "website",
    images: [{ url: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg", width: 1200, height: 630, alt: "Dave Gamba — Personal Trainer Online" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${dmSerif.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="DG Club" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="DG Club" />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
        <ScrollAnimations />
        <ExitPopup />
        <WhatsAppButton />
        <MobileBottomBar />
        <CookieBanner />
      </body>
    </html>
  );
}
