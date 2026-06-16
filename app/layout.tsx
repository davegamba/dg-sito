import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import ExitPopup from "@/components/ExitPopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";
import ScrollAnimations from "@/components/ScrollAnimations";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const dmSerif = localFont({
  src: [
    { path: "../public/fonts/Flatline-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Flatline-SemiBold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Dave Gamba — Personal Trainer Online da oltre 15 anni",
  description:
    "Tutto per costruire un fisico atletico, asciutto e scolpito con allenamenti da meno di 30 minuti. Oltre 3.000 clienti trasformati.",
  keywords: ["personal trainer online", "metodo BIM", "allenamento uomini", "Dave Gamba"],
  authors: [{ name: "Dave Gamba" }],
  openGraph: {
    title: "Dave Gamba — Personal Trainer Online da oltre 15 anni",
    description: "Tutto per costruire un fisico atletico, asciutto e scolpito con allenamenti da meno di 30 minuti. Oltre 3.000 clienti trasformati.",
    url: "https://davegamba.com",
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
