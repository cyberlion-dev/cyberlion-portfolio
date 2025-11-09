// CyberLion Web Solutions - Call to Action Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Animate floating orbs
      gsap.to(".cta-orb", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20" />
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cta-orb absolute top-10 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
        <div className="cta-orb absolute bottom-10 right-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Digital Presence?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss your project and explore how CyberLion can help you achieve
            your goals. Get a free consultation and discover the possibilities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="#contact">
              <Button size="lg" className="text-lg px-8 py-6 group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/50">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <a href="mailto:contact@cyberlion.dev" className="hover:text-primary transition-colors">
                contact@cyberlion.dev
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
