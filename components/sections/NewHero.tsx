"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Phone, Globe, Shield, Wifi } from "lucide-react";

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
      gsap.fromTo(".hero-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".hero-phone",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
      );

      gsap.fromTo(".hero-services",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
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

      // Pulse animation on avatar glow
      gsap.to(".avatar-glow", {
        scale: 1.1,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Subtle pulse on phone button
      gsap.to(".phone-pulse", {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const quickServices = [
    { icon: Globe, label: "Websites & Web Apps" },
    { icon: Wifi, label: "SOHO Networking" },
    { icon: Shield, label: "Cybersecurity" },
  ];

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
        <div className="floating-shape absolute top-1/2 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="hero-avatar mb-6 relative group cursor-pointer">
              <div className="avatar-glow absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-green-500 rounded-full blur-2xl opacity-30" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-500 to-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              <Image
                src="/cyberlion.jpg"
                alt="CyberLion - Local IT Services"
                width={150}
                height={150}
                className="relative rounded-full border-4 border-border shadow-2xl group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Tagline */}
            <div className="hero-tagline mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                IT Services for Small Business
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Tech Problems?</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-green-500 bg-clip-text text-transparent">
                I&apos;ve Got You Covered.
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From building your business website to setting up your office network, I handle the tech so you can focus on what you do best. No geek speak, just solutions that work.
            </p>

            {/* Phone Number - Prominent */}
            <a
              href="tel:+14803605964"
              className="hero-phone phone-pulse inline-flex items-center gap-3 px-8 py-4 mb-8 rounded-2xl bg-gradient-to-r from-primary to-blue-600 text-primary-foreground font-bold text-xl sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-7 h-7" />
              (480) 360-5964
            </a>

            {/* Quick Service Icons */}
            <div className="hero-services flex flex-wrap justify-center gap-6 mb-10">
              {quickServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.label} className="flex items-center gap-2 text-muted-foreground">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{service.label}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#services">
                <Button size="lg" className="text-lg px-8 py-6 min-w-[200px]">
                  View Services
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 min-w-[200px]">
                  Get a Free Quote
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
