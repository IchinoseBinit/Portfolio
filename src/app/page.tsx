import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveals from "@/components/Reveals";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
      {/* client-only: runs the scroll-reveal IntersectionObserver */}
      <Reveals />
    </>
  );
}
