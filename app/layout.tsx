import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import ExitPopup from "@/components/ExitPopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";
import ScrollAnimations from "@/components/ScrollAnimations";
import CookieBanner from "@/components/CookieBanner";
import TawkChat from "@/components/TawkChat";
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
  title: "Dave Gamba — Personal Trainer Online dal 2009",
  description:
    "Metodo BIM: 21 minuti, 3 volte a settimana. Risultati reali per uomini professionisti 35–50 anni. Oltre 3.000 clienti trasformati.",
  keywords: ["personal trainer online", "metodo BIM", "allenamento uomini", "Dave Gamba"],
  authors: [{ name: "Dave Gamba" }],
  openGraph: {
    title: "Dave Gamba — Personal Trainer Online dal 2009",
    description: "21 minuti, 3 volte a settimana. Il metodo BIM.",
    url: "https://davegamba.com",
    siteName: "Dave Gamba",
    locale: "it_IT",
    type: "website",
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
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
        <ScrollAnimations />
        <ExitPopup />
        <WhatsAppButton />
        <MobileBottomBar />
        <CookieBanner />
        <TawkChat />
      </body>
    </html>
  );
}
