// CyberLion Web Solutions - AI Army Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Bot,
  Brain,
  Zap,
  Shield,
  Code2,
  Rocket,
  ArrowRight,
  Sparkles
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const aiCapabilities = [
  {
    icon: Code2,
    title: "AI-Assisted Development",
    description: "Code faster, debug smarter, deploy with confidence",
  },
  {
    icon: Shield,
    title: "Automated Security Scanning",
    description: "AI constantly monitors for vulnerabilities 24/7",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "AI analyzes and optimizes every millisecond",
  },
  {
    icon: Brain,
    title: "Intelligent Problem Solving",
    description: "Complex issues solved in minutes, not days",
  },
];

export default function AIArmy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ai-army-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".ai-army-title",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".ai-capability-card",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          scrollTrigger: {
            trigger: ".ai-capabilities-grid",
            start: "top 80%",
          },
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-20 bg-gradient-to-b from-violet-950/5 via-purple-950/10 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="ai-army-title">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold border-violet-500/50 text-violet-500">
              <Bot className="w-4 h-4 mr-2 inline" />
              AI-Enhanced Development
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              I&apos;m Only Happy When I&apos;m{" "}
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Miserable
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Those stressful web development tasks that make most developers want to quit?{" "}
              <span className="font-semibold text-foreground">That&apos;s where I thrive.</span>{" "}
              We&apos;re a <span className="font-semibold text-foreground">small but mighty</span> development firm—doing
              the job of many with few, powered by cutting-edge AI.
            </p>
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 border-2 border-violet-500/30">
              <p className="text-lg font-semibold text-foreground mb-3">
                <Sparkles className="w-5 h-5 text-violet-500 inline mr-2" />
                Let Me and My AI Army Handle Your Stress
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Complex integrations? Security audits? Performance bottlenecks? Mysterious bugs at 2am?
                That&apos;s not stress for me—that&apos;s my happy place. And with AI-powered tools amplifying
                every line of code I write, I can solve 10x more problems in a fraction of the time.
              </p>
            </div>
          </div>
        </div>

        {/* AI Capabilities Grid */}
        <div className="ai-capabilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aiCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card
                key={index}
                className="ai-capability-card p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-violet-500/50 bg-card/50 backdrop-blur"
              >
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Main Message */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 lg:p-12 bg-card/50 backdrop-blur border-2 border-violet-500/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 mb-6 relative">
                <Bot className="w-10 h-10 text-white" strokeWidth={2} />
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Small Team. Enterprise Results.
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                We&apos;re not a big agency with bloated overhead. We&apos;re a lean, AI-amplified team
                that delivers what used to require 10+ developers. Lower costs, faster delivery, better results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-violet-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">10x Faster Development</p>
                    <p className="text-sm text-muted-foreground">
                      AI assists with code generation, testing, and debugging—what takes others weeks, I complete in days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-violet-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Bulletproof Security</p>
                    <p className="text-sm text-muted-foreground">
                      AI scans every line of code for vulnerabilities before deployment
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-violet-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Complex Problem Solving</p>
                    <p className="text-sm text-muted-foreground">
                      AI helps me tackle enterprise-level challenges that would stump most small agencies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-violet-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Future-Proof Tech</p>
                    <p className="text-sm text-muted-foreground">
                      AI keeps me current with the latest frameworks, tools, and best practices
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-2 border-violet-500/20 mb-8">
              <p className="text-center text-lg font-semibold mb-2">
                <span className="text-violet-500">Your Stress</span> → <span className="text-purple-500">My Passion</span> → <span className="text-primary">Your Success</span>
              </p>
              <p className="text-center text-sm text-muted-foreground">
                You get enterprise-level capabilities at small business prices. That&apos;s the AI advantage.
              </p>
            </div>

            <div className="text-center">
              <Link href="#pricing">
                <Button size="lg" className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                  See How This Helps You Save
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
