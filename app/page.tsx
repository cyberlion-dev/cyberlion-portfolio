// CyberLion - Web Tools & Service Websites

import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import NewHero from '@/components/sections/NewHero';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import NewServices from '@/components/sections/NewServices';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: "CyberLion | Web Development",
  description:
    "Custom web applications and service websites. From quote calculators to full service websites.",
  keywords: "web development, web tools, custom web applications, service websites",
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <NewHero />
        <FeaturedProjects />
        <NewServices />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
