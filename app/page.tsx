import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ProductCards from "@/components/home/ProductCards";
import MetodoBIM from "@/components/home/MetodoBIM";
import ChiSono from "@/components/home/ChiSono";
import YoutubeScroll from "@/components/home/YoutubeScroll";
import Testimonials from "@/components/home/Testimonials";
import OptinStrip from "@/components/home/OptinStrip";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <ProductCards />
        <MetodoBIM />
        <ChiSono />
        <YoutubeScroll />
        <Testimonials />
        <OptinStrip />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
