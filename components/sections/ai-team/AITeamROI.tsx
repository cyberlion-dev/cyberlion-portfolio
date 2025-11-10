// AI-Amplified IT Team - ROI Calculator/Showcase

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, DollarSign, TrendingUp, Zap } from "lucide-react";

const roiData = [
  {
    scenario: "Website Development",
    traditional: {
      team: "5 people (PM, 2 Devs, Designer, QA)",
      timeline: "4 months",
      cost: "$80,000",
      ongoing: "$15K/month support"
    },
    amplified: {
      team: "2 AI-enhanced specialists",
      timeline: "4 weeks",
      cost: "$15,000",
      ongoing: "Included (Website for Life)"
    }
  },
  {
    scenario: "Enterprise Software",
    traditional: {
      team: "12 people (PM, 6 Devs, 2 QA, DevOps, 2 Designers)",
      timeline: "12 months",
      cost: "$720,000",
      ongoing: "$50K/month maintenance"
    },
    amplified: {
      team: "3 AI-enhanced specialists",
      timeline: "3 months",
      cost: "$120,000",
      ongoing: "$10K/month"
    }
  }
];

export default function AITeamROI() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".roi-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".roi-card", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-20 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="roi-title">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Real-World ROI Examples
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how much you could save by switching to an AI-amplified team.
            </p>
          </div>
        </div>

        {/* ROI Cards */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {roiData.map((scenario, index) => (
            <Card key={index} className="roi-card p-8 border-2 bg-card/50 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-primary" />
                {scenario.scenario}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traditional */}
                <div className="p-6 rounded-xl bg-red-500/5 border-2 border-red-500/20">
                  <div className="text-sm font-semibold text-red-500 mb-4 uppercase tracking-wide">
                    Traditional Approach
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Team Size</div>
                      <div className="font-semibold">{scenario.traditional.team}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="font-semibold">{scenario.traditional.timeline}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Initial Cost</div>
                      <div className="font-semibold text-xl">{scenario.traditional.cost}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Ongoing</div>
                      <div className="font-semibold">{scenario.traditional.ongoing}</div>
                    </div>
                  </div>
                </div>

                {/* AI-Amplified */}
                <div className="p-6 rounded-xl bg-green-500/5 border-2 border-green-500/20 relative">
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    RECOMMENDED
                  </div>
                  <div className="text-sm font-semibold text-green-500 mb-4 uppercase tracking-wide">
                    AI-Amplified Team
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Team Size</div>
                      <div className="font-semibold">{scenario.amplified.team}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="font-semibold">{scenario.amplified.timeline}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Initial Cost</div>
                      <div className="font-semibold text-xl text-green-500">{scenario.amplified.cost}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Ongoing</div>
                      <div className="font-semibold">{scenario.amplified.ongoing}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold">
                    Your Savings: <span className="text-primary text-xl">
                      {index === 0 ? "$65,000 (81% cost reduction)" : "$600,000 (83% cost reduction)"}
                    </span>
                  </span>
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">
                    Time Saved: <span className="text-blue-500 text-xl">
                      {index === 0 ? "75% faster" : "75% faster"}
                    </span>
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 border-2 border-primary/30">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Let&apos;s discuss your project and show you exactly how much you could save
              with an AI-amplified approach.
            </p>
            <Link href="#contact">
              <Button size="lg" className="group">
                Get Your Custom ROI Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
