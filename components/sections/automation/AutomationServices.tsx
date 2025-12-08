// Automation Services Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  Lightbulb,
  MessageSquare,
  Workflow,
  Mic,
  Zap,
  Sparkles,
} from "lucide-react";

const automationServices = [
  {
    icon: Home,
    title: "Home Assistant Setup",
    description: "Complete Home Assistant installation and configuration. Control all your smart devices from one powerful platform.",
    features: ["Installation & Setup", "Device Integration", "Custom Automations", "Dashboard Design"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Smart Home Integration",
    description: "Connect and automate your smart lights, thermostats, cameras, and more. Make your home work for you.",
    features: ["Device Setup", "Scene Creation", "Smart Schedules", "Energy Monitoring"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    description: "Custom AI chatbots for your business website. Answer customer questions 24/7 and capture leads automatically.",
    features: ["Custom Training", "Website Integration", "Lead Capture", "24/7 Support"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description: "Automate repetitive tasks and streamline your business processes. Save time and reduce errors.",
    features: ["Process Analysis", "Workflow Design", "Integration Setup", "Efficiency Gains"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Mic,
    title: "Voice Control Setup",
    description: "Alexa, Google Home, or Apple HomeKit integration. Control your home with your voice.",
    features: ["Voice Assistant Setup", "Custom Commands", "Multi-Room Audio", "Smart Routines"],
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Connect your apps and automate tasks with Zapier, Make, or n8n. No coding required.",
    features: ["App Integrations", "Custom Workflows", "Data Syncing", "Task Automation"],
    color: "from-violet-500 to-purple-500",
  },
];

export default function AutomationServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".service-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, stagger: 0.15, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="services-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Automation Services</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Smart Solutions That Work for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From smart home setups to business automation, we make technology work smarter so you don&apos;t have to work harder.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {automationServices.map((service, index) => {
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
    </section>
  );
}
