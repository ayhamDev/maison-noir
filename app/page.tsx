import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Manifesto from "@/components/sections/Manifesto";
import Portfolio from "@/components/sections/Portfolio";
import Atlas from "@/components/sections/Atlas";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Manifesto />
      <Portfolio />
      <Atlas />
      <Contact />
    </main>
  );
}
