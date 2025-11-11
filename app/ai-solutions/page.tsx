// AI Solutions - Dedicated page for AI services

import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AIHero from "@/components/sections/ai/AIHero";
import AIServices from "@/components/sections/ai/AIServices";
import AIUseCases from "@/components/sections/ai/AIUseCases";
import AIProcess from "@/components/sections/ai/AIProcess";
import Contact from "@/components/sections/Contact";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "AI Solutions | CyberLion Web Solutions",
  description:
    "Transform your business with intelligent AI solutions. Custom chatbots, process automation, AI integration, and machine learning implementations tailored to your needs.",
};

export default function AISolutions() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <AIHero />
        <AIServices />
        <AIUseCases />
        <AIProcess />
        <Contact />
        <ChatBot
          apiUrl="https://chatbot-api-production-29fd.up.railway.app"
          businessName="CyberLion Web Solutions"
          theme="cyberlion"
          welcomeMessage="I am a somewhat useless chatbot created by CyberLion Web Solutions. How can I assist you today?"
        />
      </main>
    </>
  );
}
