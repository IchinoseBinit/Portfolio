import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Reveals from "@/components/Reveals";
import { homeGraph } from "@/content/schema";

export default function Home() {
  return (
    <>
      {/* ProfilePage + FAQPage — home-page-specific schema (site-wide graph is in layout) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Work />
        <Experience />
        <Stack />
        <Faq />
        <Contact />
      </main>
      <Footer />
      {/* client-only: runs the scroll-reveal IntersectionObserver */}
      <Reveals />
    </>
  );
}
