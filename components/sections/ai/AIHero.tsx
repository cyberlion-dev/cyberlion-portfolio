// AI Solutions - Hero Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, Sparkles, Zap, Bot } from "lucide-react";

export default function AIHero() {
  const heroRef = useRef<HTMLElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content - using fromTo to ensure elements are visible
      gsap.fromTo(".ai-hero-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".ai-hero-subtitle",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".ai-hero-description",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".ai-hero-buttons",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      // Floating shapes animation
      gsap.to(".ai-floating-shape", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Brain pulse animation
      gsap.to(brainRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rotating neurons/connections effect
      gsap.to(".neuron", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="ai-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-violet-950/10 to-purple-950/10 pt-16 md:pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Neural Network Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="neuron absolute top-1/4 left-1/4 w-2 h-2 bg-violet-500 rounded-full" />
        <div className="neuron absolute top-1/3 right-1/3 w-2 h-2 bg-purple-500 rounded-full" />
        <div className="neuron absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-500 rounded-full" />
        <div className="neuron absolute bottom-1/3 right-1/4 w-2 h-2 bg-pink-500 rounded-full" />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="ai-floating-shape absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="ai-floating-shape absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="ai-floating-shape absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Brain Icon */}
          <div ref={brainRef} className="inline-block mb-6">
            <div className="relative">
              <Brain className="w-24 h-24 text-violet-500" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="ai-hero-title text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span className="text-foreground">Solutions for Your Business</span>
          </h1>

          {/* Subtitle */}
          <p className="ai-hero-subtitle text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4">
            Automate. Optimize. Innovate.
          </p>

          {/* Description */}
          <p className="ai-hero-description text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Harness the power of artificial intelligence to transform your operations.
            From intelligent chatbots to custom machine learning models, we build AI
            solutions that drive efficiency and unlock new possibilities.
          </p>

          {/* CTA Buttons */}
          <div className="ai-hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#ai-services">
              <Button size="lg" className="text-lg px-8 py-6 group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                Explore AI Services
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Request Consultation
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">AI Chatbots</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">Process Automation</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">Custom AI Models</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-violet-500/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-violet-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
