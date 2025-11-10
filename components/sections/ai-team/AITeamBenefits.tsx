// AI-Amplified IT Team - Benefits Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import {
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Users2,
  Zap,
  Check
} from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Launch Faster",
    description: "From concept to production in weeks, not months. Our AI-enhanced workflow eliminates bottlenecks.",
    bullets: [
      "Rapid prototyping with AI assistance",
      "Automated testing & deployment",
      "Concurrent task execution"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "AI doesn&apos;t mean compromising on security. We leverage AI for enhanced threat detection and prevention.",
    bullets: [
      "AI-powered security monitoring",
      "Automated vulnerability scanning",
      "Real-time threat response"
    ],
    color: "from-red-500 to-rose-500"
  },
  {
    icon: Sparkles,
    title: "Continuous Innovation",
    description: "AI keeps our team at the cutting edge. We implement the latest tech without the learning curve.",
    bullets: [
      "Access to latest AI capabilities",
      "Rapid technology adoption",
      "Future-proof solutions"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Scale Effortlessly",
    description: "Need to 10x your capacity? Our AI tools scale instantly while traditional teams need months of hiring.",
    bullets: [
      "Instant capacity expansion",
      "No hiring delays",
      "Elastic resource allocation"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users2,
    title: "Elite Expertise",
    description: "Our specialists are force-multiplied by AI. One expert with AI does the work of an entire department.",
    bullets: [
      "Senior-level specialists only",
      "AI-enhanced productivity",
      "Cross-functional capabilities"
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "24/7 Productivity",
    description: "AI never sleeps. While your traditional IT team clocks out, our AI continues optimizing and monitoring.",
    bullets: [
      "Round-the-clock operations",
      "Automated maintenance",
      "Proactive issue resolution"
    ],
    color: "from-yellow-500 to-orange-500"
  }
];

export default function AITeamBenefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".benefits-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".benefit-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-20 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="benefits-title">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Why AI-Amplified Teams Win
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              It&apos;s not about replacing people. It&apos;s about empowering elite
              specialists with AI superpowers.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="benefit-card group p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card/50 backdrop-blur"
              >
                <div className={`inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <ul className="space-y-2">
                  {benefit.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
