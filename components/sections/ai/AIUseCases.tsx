// AI Solutions - Use Cases Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  Stethoscope,
  Building2,
  GraduationCap,
  Wrench,
  TrendingUp
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: ShoppingCart,
    industry: "E-Commerce",
    title: "AI-Powered Shopping Experience",
    examples: [
      "Product recommendation engines",
      "Smart chatbots for customer support",
      "Automated inventory management",
      "Personalized marketing campaigns"
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Stethoscope,
    industry: "Healthcare",
    title: "Intelligent Patient Care",
    examples: [
      "Appointment scheduling automation",
      "Patient data analysis",
      "Symptom checking assistants",
      "Medical documentation automation"
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Building2,
    industry: "Real Estate",
    title: "Smart Property Solutions",
    examples: [
      "Property valuation models",
      "Lead qualification automation",
      "Virtual property assistants",
      "Market trend analysis"
    ],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: GraduationCap,
    industry: "Education",
    title: "Enhanced Learning Experience",
    examples: [
      "Personalized tutoring systems",
      "Automated grading & feedback",
      "Student performance prediction",
      "Content generation for courses"
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Wrench,
    industry: "Manufacturing",
    title: "Optimized Operations",
    examples: [
      "Predictive maintenance",
      "Quality control automation",
      "Supply chain optimization",
      "Production forecasting"
    ],
    color: "from-gray-500 to-slate-500",
  },
  {
    icon: TrendingUp,
    industry: "Finance",
    title: "Intelligent Financial Services",
    examples: [
      "Fraud detection systems",
      "Automated risk assessment",
      "Customer service chatbots",
      "Market analysis & predictions"
    ],
    color: "from-emerald-500 to-teal-500",
  },
];

export default function AIUseCases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".use-cases-title", {
        scrollTrigger: {
          trigger: ".use-cases-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".use-case-card", {
        scrollTrigger: {
          trigger: ".use-cases-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-use-cases"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="use-cases-title">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI Across Industries
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how businesses across different sectors are leveraging AI to
              innovate, automate, and stay ahead of the competition.
            </p>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="use-cases-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card
                key={index}
                className="use-case-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-violet-500/50 bg-card/80 backdrop-blur"
              >
                <div className={`inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br ${useCase.color} mb-4`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div className="text-sm font-semibold text-violet-500 mb-2">
                  {useCase.industry}
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {useCase.title}
                </h3>
                <ul className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                      <span>{example}</span>
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
