// Main page - Custom portfolio layout composing all sections

import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Home() {
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
