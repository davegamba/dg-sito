import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import PressStrip from "@/components/home/PressStrip";
import ChiSono from "@/components/home/ChiSono";
import Stats from "@/components/home/Stats";
import BlogSection from "@/components/home/BlogSection";
import ProductCards from "@/components/home/ProductCards";
import Testimonials from "@/components/home/Testimonials";
import YoutubeScroll from "@/components/home/YoutubeScroll";
import OptinStrip from "@/components/home/OptinStrip";


export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <PressStrip />
        <Stats />
        <ChiSono />
        <ProductCards />
        <BlogSection />
        <Testimonials />
        <YoutubeScroll />
        <OptinStrip />
      </main>
      <Footer />
    </>
  );
}
