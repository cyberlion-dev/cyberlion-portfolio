// AI-Amplified IT Team - Dedicated page

import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import AITeamHero from '@/components/sections/ai-team/AITeamHero';
import AITeamComparison from '@/components/sections/ai-team/AITeamComparison';
import AITeamBenefits from '@/components/sections/ai-team/AITeamBenefits';
import AITeamROI from '@/components/sections/ai-team/AITeamROI';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: "AI-Amplified IT Team | CyberLion Web Solutions",
  description: "Enterprise power without enterprise overhead. Discover how our AI-enhanced specialists deliver Fortune 500 results with a fraction of the team size and cost.",
};

export default function AIAmplifiedTeam() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <AITeamHero />
        <AITeamComparison />
        <AITeamBenefits />
        <AITeamROI />
        <Contact />
      </main>
    </>
  );
}
