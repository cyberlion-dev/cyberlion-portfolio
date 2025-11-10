// AI Solutions - Implementation Process Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Lightbulb,
  Search,
  Code,
  TestTube,
  Rocket,
  BarChart,
  ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Discovery & Consultation",
    description: "We start by understanding your business, challenges, and goals. Together we identify AI opportunities that deliver real value.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Search,
    step: "02",
    title: "Feasibility & Planning",
    description: "Assess technical requirements, data availability, and ROI. We create a detailed roadmap with clear milestones and deliverables.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    step: "03",
    title: "Development & Training",
    description: "Build and train custom AI models or configure existing solutions. Iterative development with your feedback at every stage.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: TestTube,
    step: "04",
    title: "Testing & Validation",
    description: "Rigorous testing to ensure accuracy, reliability, and security. Validate performance against your success criteria.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Deployment & Integration",
    description: "Seamless integration with your existing systems. Comprehensive training for your team and smooth rollout.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart,
    step: "06",
    title: "Monitoring & Optimization",
    description: "Continuous monitoring and improvement. Regular updates to maintain performance and adapt to changing needs.",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function AIProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Using fromTo to ensure elements are visible
      gsap.fromTo(".process-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".process-title",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".process-step",
        {
          opacity: 0,
          x: -50,
        },
        {
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
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
      id="ai-process"
      className="py-12 lg:py-20 bg-gradient-to-b from-background to-violet-950/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="process-title">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold border-violet-500/50 text-violet-500">
              Our Process
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              From Concept to Deployment
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology to deliver AI solutions that work. We guide you
              through every step with transparency and expertise.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="process-grid max-w-4xl mx-auto space-y-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="process-step">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-violet-500/50 bg-card/80 backdrop-blur">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-violet-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-violet-500">{step.step}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Connector Line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-violet-500/50 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground">
              Ready to transform your business with AI?
            </p>
          </div>
          <Link href="#contact">
            <Button size="lg" className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
              Start Your AI Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
