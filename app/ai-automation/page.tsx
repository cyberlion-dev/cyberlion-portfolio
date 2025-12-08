// AI & Automation - Smart home and business automation services

import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AutomationHero from "@/components/sections/automation/AutomationHero";
import AutomationServices from "@/components/sections/automation/AutomationServices";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "AI & Automation | CyberLion Web Solutions",
  description:
    "Smart home automation, business process automation, and AI chatbots. Home Assistant setups, automated workflows, and intelligent solutions for your home or business.",
  keywords: "home automation, Home Assistant, smart home, business automation, AI chatbot, process automation, Phoenix",
};

export default function AIAutomation() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <AutomationHero />
        <AutomationServices />
        <Contact />
      </main>
    </>
  );
}
