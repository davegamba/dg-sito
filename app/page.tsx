import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthHashRedirect from "@/components/AuthHashRedirect";
import Hero from "@/components/home/Hero";
import PressStrip from "@/components/home/PressStrip";
import ChiSono from "@/components/home/ChiSono";
import Stats from "@/components/home/Stats";
import BlogSection from "@/components/home/BlogSection";
import Testimonials from "@/components/home/Testimonials";
import YoutubeScroll from "@/components/home/YoutubeScroll";
import OptinStrip from "@/components/home/OptinStrip";


const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.davegamba.com/#website",
      name: "Dave Gamba",
      url: "https://www.davegamba.com",
      description: "Personal trainer online dal 2009. Metodo BIM — Breve, Intenso, Mirato. Oltre 3.000 clienti trasformati.",
      inLanguage: "it-IT",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.davegamba.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.davegamba.com/#organization",
      name: "DaveGamba.com",
      url: "https://www.davegamba.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.davegamba.com/images/logo.png",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.instagram.com/davegamba_fit/",
        "https://www.youtube.com/@DaveGambaFitness",
        "https://www.facebook.com/davegamba",
      ],
      founder: { "@type": "Person", name: "Dave Gamba" },
      foundingDate: "2009",
      description: "Metodo BIM — Breve, Intenso, Mirato. Allenamento in 21 minuti, 3 volte a settimana.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Milano",
        addressCountry: "IT",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.davegamba.com/#person",
      name: "Dave Gamba",
      url: "https://www.davegamba.com",
      image: "https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/atletico-sbarra-spiaggia.jpg",
      jobTitle: "Personal Trainer Online",
      description: "Personal trainer online dal 2009, fondatore del Metodo BIM. Oltre 3.000 clienti seguiti in 15+ anni di attività.",
      birthDate: "1984-11-23",
      nationality: "IT",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Milano",
        addressCountry: "IT",
      },
      sameAs: [
        "https://www.instagram.com/davegamba_fit/",
        "https://www.youtube.com/@DaveGambaFitness",
      ],
      knowsAbout: [
        "Allenamento funzionale",
        "Nutrizione sportiva",
        "Ipertrofia muscolare",
        "Longevità e anti-aging",
        "Personal training online",
      ],
      worksFor: { "@id": "https://www.davegamba.com/#organization" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <AuthHashRedirect />
      <Header />
      <main className="flex-1">
        <Hero />
        <PressStrip />
        <Testimonials variant="dark" />
        <ChiSono />
        <BlogSection />
        <YoutubeScroll />
        <OptinStrip />
      </main>
      <Footer />
    </>
  );
}
