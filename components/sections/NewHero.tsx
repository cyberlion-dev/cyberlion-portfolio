"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function NewHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate avatar
      gsap.fromTo(".hero-avatar",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );

      // Animate content
      gsap.fromTo(".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(".hero-stats",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
      );

      // Floating animation with rotation
      gsap.to(".floating-shape", {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 1.5 },
      });

      // Gradient text animation
      const gradient = document.querySelector('.gradient-text');
      if (gradient) {
        gsap.to(gradient, {
          backgroundPosition: "200% center",
          duration: 8,
          repeat: -1,
          ease: "linear"
        });
      }

      // Pulse animation on avatar glow
      gsap.to(".avatar-glow", {
        scale: 1.1,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-16 md:pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="floating-shape absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="floating-shape absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="hero-avatar mb-8 relative group cursor-pointer">
              <div className="avatar-glow absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full blur-2xl opacity-30" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              <Image
                src="/cyberlion.jpg"
                alt="CyberLion"
                width={180}
                height={180}
                className="relative rounded-full border-4 border-border shadow-2xl group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Heading */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">I Build</span>
              <br />
              <span className="gradient-text bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto]">
                Web Tools & Websites
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Quote calculators, service websites, desktop apps. If it needs building, I&apos;ll figure it out.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/portfolio">
                <Button size="lg" className="text-lg px-8 py-6 min-w-[200px]">
                  Portfolio
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 min-w-[200px]">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
