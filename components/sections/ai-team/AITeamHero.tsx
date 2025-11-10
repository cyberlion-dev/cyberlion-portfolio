// AI-Amplified IT Team - Hero Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, Users, TrendingDown, ArrowRight } from "lucide-react";

export default function AITeamHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".hero-stats", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-blue-500/5"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 border-2 border-primary/50 backdrop-blur">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              The Future of IT
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            The
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {" "}AI-Amplified{" "}
            </span>
            <br />
            IT Team
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4">
            Enterprise Power. Without the Enterprise.
          </p>

          {/* Description */}
          <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Why pay for a department when you need a dream team? Our AI-enhanced
            specialists deliver Fortune 500 results with a fraction of the team
            size, budget, and timeline.
          </p>

          {/* Stats */}
          <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border-2 border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingDown className="w-6 h-6 text-green-500" />
                <div className="text-4xl font-bold text-green-500">80%</div>
              </div>
              <div className="text-sm text-muted-foreground">Cost Reduction</div>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border-2 border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-primary" />
                <div className="text-4xl font-bold text-primary">3x</div>
              </div>
              <div className="text-sm text-muted-foreground">Faster Delivery</div>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border-2 border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-blue-500" />
                <div className="text-4xl font-bold text-blue-500">1/5</div>
              </div>
              <div className="text-sm text-muted-foreground">Team Size</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#comparison">
              <Button size="lg" className="text-lg px-8 py-6 group">
                See The Difference
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Schedule Consultation
              </Button>
            </Link>
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
