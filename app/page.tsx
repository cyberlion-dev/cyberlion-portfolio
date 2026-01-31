// CyberLion - Local IT Services & Web Solutions

import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import NewHero from '@/components/sections/NewHero';
import NewServices from '@/components/sections/NewServices';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: "CyberLion | IT Services & Web Development | Chandler, AZ",
  description:
    "Local IT services in Chandler, AZ. Websites, web applications, hosting, SOHO networking, and cybersecurity assessments. No geek speak, just solutions that work.",
  keywords: "IT services Chandler AZ, web development, website design, small business IT, SOHO networking, cybersecurity assessment, web hosting, local tech support",
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <NewHero />
        <NewServices />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
