// CyberLion Web Solutions - Services Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Code2,
  Users,
  Home,
  ShieldCheck,
  Laptop,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, responsive websites built with modern frameworks. From landing pages to complex web applications, we create digital experiences that convert.",
    features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Mobile-First"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Full-stack software solutions tailored to your business needs. We build scalable, maintainable applications using cutting-edge technologies.",
    features: ["Custom Solutions", "API Development", "Database Design", "Cloud Integration"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Consulting Services",
    description: "Expert guidance on web strategy, architecture, and digital transformation. We help you make informed decisions about your technology stack.",
    features: ["Tech Stack Selection", "Architecture Planning", "Best Practices", "Code Reviews"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Home,
    title: "Home Privacy Audits",
    description: "Comprehensive assessments of your home network and smart devices. Identify vulnerabilities and secure your personal digital ecosystem.",
    features: ["Network Analysis", "IoT Security", "Privacy Assessment", "Security Recommendations"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Assessments",
    description: "Professional security audits for businesses and individuals. Penetration testing, vulnerability assessments, and security hardening.",
    features: ["Penetration Testing", "Vulnerability Scans", "Security Hardening", "Compliance Audits"],
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Laptop,
    title: "All Web Tasks",
    description: "From domain setup to deployment, maintenance to migrations. Whatever web-related challenge you're facing, we've got you covered.",
    features: ["Domain Management", "Hosting Setup", "Maintenance", "Technical Support"],
    color: "from-indigo-500 to-blue-500",
  },
];

export default function BusinessServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".services-title", {
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // Animate service cards
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
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
      id="services"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="services-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Services</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Comprehensive Web Solutions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer a full spectrum of services to power your digital presence,
              from development to security—everything you need under one roof.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="service-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card/50 backdrop-blur"
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

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="#contact">
            <Button size="lg" className="group">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
