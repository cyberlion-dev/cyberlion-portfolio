// AI-Amplified IT Team - Comparison Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Check,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Zap,
  Brain
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  {
    category: "Team Size",
    traditional: "10-15 specialists",
    amplified: "2-3 AI-enhanced experts",
    icon: Users,
    savings: "80% fewer people"
  },
  {
    category: "Project Timeline",
    traditional: "6 months",
    amplified: "6 weeks",
    icon: Clock,
    savings: "75% faster"
  },
  {
    category: "Annual Cost",
    traditional: "$800K - $1.2M",
    amplified: "$150K - $200K",
    icon: DollarSign,
    savings: "80% cost reduction"
  },
  {
    category: "Capabilities",
    traditional: "Limited by team size",
    amplified: "Enterprise-grade, scalable",
    icon: TrendingUp,
    savings: "Unlimited potential"
  },
  {
    category: "Response Time",
    traditional: "Days to weeks",
    amplified: "Hours to days",
    icon: Zap,
    savings: "10x faster"
  },
  {
    category: "Expertise",
    traditional: "Siloed specialists",
    amplified: "Full-stack + AI synergy",
    icon: Brain,
    savings: "Complete coverage"
  }
];

export default function AITeamComparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Using fromTo to ensure elements are visible
      gsap.fromTo(".comparison-title",
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

      gsap.fromTo(".comparison-row",
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="py-12 lg:py-20 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="comparison-title">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold">
              The Math That Matters
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Traditional IT vs.
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                AI-Amplified IT
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Same enterprise power. Fraction of the cost. Exponential speed.
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="hidden md:block"></div>
            <div className="text-center p-4 bg-red-500/10 border-2 border-red-500/30 rounded-t-2xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <X className="w-5 h-5 text-red-500" />
                <span className="font-bold text-lg">Traditional IT</span>
              </div>
              <p className="text-xs text-muted-foreground">Old Way</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 border-2 border-green-500/30 rounded-t-2xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="font-bold text-lg">AI-Amplified IT</span>
              </div>
              <p className="text-xs text-muted-foreground">New Way</p>
            </div>
            <div className="hidden md:block text-center p-4 bg-primary/10 border-2 border-primary/30 rounded-t-2xl">
              <span className="font-bold text-lg text-primary">Your Savings</span>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonData.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="comparison-row grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mb-4 hover:shadow-lg transition-all duration-300 border-2"
              >
                {/* Category */}
                <div className="flex items-center gap-3 font-semibold">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span>{item.category}</span>
                </div>

                {/* Traditional */}
                <div className="flex items-center justify-center p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                  <span className="text-muted-foreground">{item.traditional}</span>
                </div>

                {/* AI-Amplified */}
                <div className="flex items-center justify-center p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                  <span className="font-semibold text-foreground">{item.amplified}</span>
                </div>

                {/* Savings */}
                <div className="flex items-center justify-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <span className="font-bold text-primary">{item.savings}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 border-2 border-primary/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What takes traditional IT departments <span className="font-bold text-foreground">10 people and 6 months</span>,
                we deliver with <span className="font-bold text-primary">2 specialists and AI in 6 weeks</span>.
                Same enterprise capabilities. <span className="font-bold text-green-500">80% cost savings</span>.{" "}
                <span className="font-bold text-blue-500">75% faster delivery</span>.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
