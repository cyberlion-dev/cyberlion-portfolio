// Portfolio page - Custom portfolio layout composing all sections

import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: "Portfolio | Jordan Boyce - Developer & Designer",
  description: "A showcase of development and design projects by Jordan Boyce. Explore my work in web development, UI/UX design, and creative solutions.",
};

export default function Portfolio() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-hidden w-full">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
