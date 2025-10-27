"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import FaultTreeAnalyzer from "./FaultTreeAnalyzer";

export default function ReliabilityAnalyzerPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full bg-background text-foreground pt-24 px-6 sm:px-12">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="max-w-5xl mx-auto text-center mb-16 space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl font-bold">
            Cyberlion Reliability Analyzer
          </h1>
          <p className="text-lg text-muted-foreground">
            Build your own risk model and see how <span className="text-primary font-semibold">Cyberlion</span> compares to a typical agency.
          </p>
        </section>

        {/* Analyzer */}
        <section className="max-w-5xl mx-auto">
          <FaultTreeAnalyzer />
        </section>
      </main>
    </>
  );
}
