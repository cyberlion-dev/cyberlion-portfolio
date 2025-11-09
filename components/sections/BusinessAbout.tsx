// CyberLion Web Solutions - About/Why Choose Us Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Zap,
  Shield,
  Heart,
  Award,
  Users2,
  Clock,
  TrendingUp
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: "Precision & Quality",
    description: "We deliver pixel-perfect solutions with meticulous attention to detail and industry best practices.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick turnaround times without compromising on quality. Your time is valuable, and we respect that.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Every solution we build prioritizes security and privacy. Your data and your users' data are protected.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description: "Your success is our success. We work closely with you to understand and exceed your expectations.",
  },
];

const stats = [
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Users2, value: "50+", label: "Happy Clients" },
  { icon: Clock, value: "24/7", label: "Support Available" },
  { icon: TrendingUp, value: "100%", label: "Client Satisfaction" },
];

export default function BusinessAbout() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // Animate value cards
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate stats
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="about-title">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold">
              Why Choose CyberLion
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Partner in Digital Excellence
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another web agency. We're your strategic partner,
              combining technical expertise with business acumen to deliver
              solutions that drive real results.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="value-card p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 bg-card/80 backdrop-blur"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <Card className="relative stats-grid border-2 p-8 lg:p-12 bg-card/50 backdrop-blur">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-item text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" strokeWidth={2} />
                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <blockquote className="text-2xl lg:text-3xl font-semibold leading-relaxed text-foreground/90 italic">
            "We believe every business deserves a powerful digital presence backed by
            <span className="text-primary"> robust security</span> and
            <span className="text-primary"> cutting-edge technology</span>.
            That's the CyberLion promise."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
