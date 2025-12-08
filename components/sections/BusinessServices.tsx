// CyberLion Web Solutions - Services Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wifi,
  Shield,
  Satellite,
  Network,
  Printer,
  Server,
  Lock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const itServices = [
  {
    icon: Wifi,
    title: "WiFi Setup & Heat Mapping",
    description: "Professional WiFi installation, heat mapping, and optimization. We eliminate dead zones and ensure strong coverage throughout your entire space.",
    features: ["Coverage Analysis", "Dead Zone Fixes", "Access Point Setup", "Performance Tuning"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Satellite,
    title: "Starlink Installation",
    description: "Expert Starlink mounting and network integration. Get your satellite internet professionally installed and configured for optimal performance.",
    features: ["Professional Mounting", "Router Setup", "Network Integration", "Configuration"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Pi-hole & pfSense",
    description: "Network-wide ad blocking with Pi-hole and enterprise-grade firewall protection with pfSense. Take control of your network security.",
    features: ["Ad Blocking Setup", "Firewall Configuration", "DNS Management", "VPN Integration"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Network,
    title: "Small Business Networking",
    description: "Complete network infrastructure for home offices and small businesses. Reliable, scalable setups that just work.",
    features: ["Network Design", "Router Upgrades", "Business WiFi", "Cable Installation"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Printer,
    title: "Printer Setup & Support",
    description: "Stop fighting with printers. We handle setup, drivers, network printing, and troubleshooting so your printers actually work.",
    features: ["Printer Setup", "Network Printing", "Driver Installation", "Troubleshooting"],
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Server,
    title: "General Tech Support",
    description: "All the tech help you need—router configuration, device setup, troubleshooting, and general IT support for homes and small businesses.",
    features: ["Router Setup", "Device Configuration", "Tech Troubleshooting", "IT Support"],
    color: "from-indigo-500 to-blue-500",
  },
];

const webServices = [
  {
    icon: Network,
    title: "Modern Websites",
    description: "Fast, responsive websites built with Angular, Nuxt, and Tailwind. Clean code, great performance, and built to last.",
    features: ["Angular & Nuxt", "Tailwind CSS", "Responsive Design", "Fast Performance"],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Server,
    title: "Local Business Sites",
    description: "Professional websites for local businesses. Landing pages, portfolios, and business sites that help you get found online.",
    features: ["Business Websites", "Landing Pages", "SEO Optimized", "Mobile-First"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Lock,
    title: "Hosting & Maintenance",
    description: "Reliable hosting setup and ongoing maintenance. We keep your site fast, secure, and running smoothly.",
    features: ["Hosting Setup", "Speed Optimization", "Security Updates", "Ongoing Support"],
    color: "from-emerald-500 to-green-500",
  },
];

export default function BusinessServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title - using fromTo to ensure elements are visible
      gsap.fromTo(".services-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      // Animate service cards with stagger - using fromTo to ensure elements are visible
      gsap.fromTo(".service-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-12 lg:py-20 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="services-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Services</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Technology That Just Works
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Helping homeowners, families, and small businesses get their technology working the way it should. Fast turnaround, honest pricing, and no pushy upsells.
            </p>
          </div>
        </div>

        {/* Local IT Services Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Local IT Services</h3>
          <div ref={cardsRef} className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {itServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="service-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card/50 backdrop-blur h-full"
                >
                  <CardHeader>
                    <div className={`inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Web Development Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Web Development</h3>
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {webServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="service-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card/50 backdrop-blur h-full"
                >
                  <CardHeader>
                    <div className={`inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="#contact">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
