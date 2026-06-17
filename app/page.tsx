import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Journey } from "@/components/sections/Journey";
import { Focus } from "@/components/sections/Focus";
import { BeyondBound } from "@/components/sections/BeyondBound";
import { Impact } from "@/components/sections/Impact";
import { Insights } from "@/components/sections/Insights";
import { Values, Media } from "@/components/sections/ValuesMedia";
import { Personal, Vision } from "@/components/sections/PersonalVision";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Journey />
        <Focus />
        <BeyondBound />
        <Impact />
        <Insights />
        <Values />
        <Media />
        <Personal />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
