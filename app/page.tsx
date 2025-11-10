// CyberLion Web Solutions - Business Home Page

import Navigation from '@/components/Navigation';
import BusinessHero from '@/components/sections/BusinessHero';
import BusinessServices from '@/components/sections/BusinessServices';
import WhyNotDIY from '@/components/sections/WhyNotDIY';
import AIArmy from '@/components/sections/AIArmy';
import MilkJoke from '@/components/sections/MilkJoke';
import Pricing from '@/components/sections/Pricing';
import BusinessAbout from '@/components/sections/BusinessAbout';
import LifetimeGuarantee from '@/components/sections/LifetimeGuarantee';
import BusinessCTA from '@/components/sections/BusinessCTA';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <BusinessHero />
        <BusinessServices />
        <WhyNotDIY />
        <AIArmy />
        <MilkJoke />
        <Pricing />
        <BusinessAbout />
        <LifetimeGuarantee />
        <BusinessCTA />
        <Contact />
      </main>
    </>
  );
}
