import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import DigitalTwin from "@/components/DigitalTwin";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Career />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <DigitalTwin />
    </>
  );
}
