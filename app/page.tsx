// CyberLion Web Solutions - Business Home Page

import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import BusinessHero from '@/components/sections/BusinessHero';
import TechBanner from '@/components/sections/TechBanner';
import BusinessServices from '@/components/sections/BusinessServices';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: "CyberLion Web Solutions | IT Services & Web Development Phoenix",
  description:
    "WiFi setup, Starlink installation, network troubleshooting, and modern websites for homes and small businesses in Phoenix, Chandler, Gilbert, and Mesa. Fast turnaround, honest pricing.",
  keywords: "WiFi setup Phoenix, Starlink installation Arizona, network troubleshooting, web development Phoenix, IT services Chandler, home network setup, small business IT",
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <BusinessHero />
        <TechBanner />
        <BusinessServices />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
