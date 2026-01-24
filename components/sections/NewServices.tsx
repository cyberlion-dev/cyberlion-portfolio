"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Wrench,
  Zap,
  Layout,
  Database,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Wrench,
    title: "Web Tools",
    description: "Calculators, dashboards, data tools, and utilities.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Websites",
    description: "Landing pages, business sites, and portfolios.",
    color: "from-primary to-purple-500",
  },
  {
    icon: Layout,
    title: "Embeddable Widgets",
    description: "Interactive tools that work on existing sites.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Database,
    title: "Forms & Data Collection",
    description: "Contact forms to complex multi-step workflows.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Integrations",
    description: "Connect services and automate workflows.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "UI/UX",
    description: "Clean interfaces that make sense.",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function NewServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="service-card group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} bg-opacity-10`}>
                      <Icon className="w-6 h-6 text-white" style={{
                        filter: `drop-shadow(0 0 8px currentColor)`
                      }} />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="#contact">
            <Button size="lg" className="text-lg px-8 py-6">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
