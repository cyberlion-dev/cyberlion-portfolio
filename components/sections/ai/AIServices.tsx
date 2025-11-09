// AI Solutions - Services Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot,
  Workflow,
  Brain,
  MessageSquare,
  Database,
  Sparkles,
  LineChart,
  Settings
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const aiServices = [
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    description: "Intelligent conversational AI that handles customer inquiries 24/7. Custom-trained on your business data to provide accurate, helpful responses.",
    features: [
      "24/7 Customer Support",
      "Natural Language Understanding",
      "Multi-platform Integration",
      "Custom Training on Your Data"
    ],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Automate repetitive tasks with AI-powered workflows. From data entry to content generation, save time and reduce errors.",
    features: [
      "Intelligent Document Processing",
      "Automated Email Responses",
      "Data Extraction & Analysis",
      "Workflow Optimization"
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "Custom AI Models",
    description: "Tailored machine learning models trained specifically for your use case. Whether it's prediction, classification, or generation.",
    features: [
      "Predictive Analytics",
      "Image/Text Classification",
      "Recommendation Systems",
      "Custom Training Pipelines"
    ],
    color: "from-blue-500 to-violet-500",
  },
  {
    icon: MessageSquare,
    title: "Content Generation",
    description: "AI-powered content creation for marketing, product descriptions, documentation, and more. Consistent brand voice at scale.",
    features: [
      "Marketing Copy",
      "Product Descriptions",
      "Blog Post Generation",
      "Social Media Content"
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Database,
    title: "AI Integration Services",
    description: "Seamlessly integrate AI capabilities into your existing systems. APIs, embeddings, and custom solutions.",
    features: [
      "API Integration",
      "Custom Embeddings",
      "RAG Implementation",
      "Legacy System Enhancement"
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: LineChart,
    title: "AI Analytics & Insights",
    description: "Advanced analytics powered by machine learning. Uncover patterns, predict trends, and make data-driven decisions.",
    features: [
      "Predictive Analytics",
      "Pattern Recognition",
      "Trend Forecasting",
      "Anomaly Detection"
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Settings,
    title: "AI Strategy Consulting",
    description: "Expert guidance on implementing AI in your business. From feasibility analysis to deployment strategy.",
    features: [
      "AI Readiness Assessment",
      "Use Case Identification",
      "Technology Stack Selection",
      "Implementation Roadmap"
    ],
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Sparkles,
    title: "AI Fine-Tuning & Training",
    description: "Optimize existing AI models for your specific needs. Fine-tune open-source or proprietary models on your data.",
    features: [
      "Model Fine-Tuning",
      "Custom Dataset Preparation",
      "Performance Optimization",
      "Continuous Improvement"
    ],
    color: "from-yellow-500 to-orange-500",
  },
];

export default function AIServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ai-services-title", {
        scrollTrigger: {
          trigger: ".ai-services-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".ai-service-card", {
        scrollTrigger: {
          trigger: ".ai-services-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-services"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-violet-950/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="ai-services-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Brain className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-semibold text-violet-500">AI Capabilities</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Comprehensive AI Services
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              From intelligent chatbots to custom machine learning models, we deliver
              AI solutions that transform how you work and serve your customers.
            </p>
          </div>
        </div>

        {/* AI Services Grid */}
        <div className="ai-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="ai-service-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-violet-500/50 bg-card/50 backdrop-blur"
              >
                <CardHeader>
                  <div className={`inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-violet-500 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-violet-500" />
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
    </section>
  );
}
