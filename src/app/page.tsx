

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MenuTeaser from "@/components/MenuTeaser";
import Locations from "@/components/Locations";
import SocialGrid from "@/components/SocialGrid";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <MenuTeaser />
        <Locations />
        <SocialGrid />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

