"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Server,
  Wifi,
  Shield,
  Wrench,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Websites & Web Apps",
    description: "Custom websites that look great and actually work. From simple business sites to complex web applications that solve real problems.",
    color: "from-blue-500 to-cyan-500",
    features: ["Business Websites", "Landing Pages", "Web Applications", "E-commerce"],
  },
  {
    icon: Server,
    title: "Hosting & Domains",
    description: "Reliable hosting and domain management without the headaches. I handle the technical stuff so your site stays up and running.",
    color: "from-purple-500 to-pink-500",
    features: ["Web Hosting", "Domain Registration", "SSL Certificates", "Email Setup"],
  },
  {
    icon: Wifi,
    title: "SOHO Networking",
    description: "Small office and home office network setup done right. Fast, secure, and reliable connections for your business.",
    color: "from-green-500 to-emerald-500",
    features: ["Network Setup", "WiFi Optimization", "Router Configuration", "Cable Management"],
  },
  {
    icon: Shield,
    title: "Cybersecurity Assessments",
    description: "Find out where you're vulnerable before the bad guys do. Plain-English reports with actionable steps to protect your business.",
    color: "from-red-500 to-orange-500",
    features: ["Security Audits", "Vulnerability Scans", "Risk Assessment", "Security Training"],
  },
  {
    icon: Wrench,
    title: "Tech Support & Maintenance",
    description: "Ongoing support when things go sideways. Updates, backups, troubleshooting—I keep your tech running smooth.",
    color: "from-amber-500 to-yellow-500",
    features: ["Remote Support", "Regular Maintenance", "Backups", "Updates"],
  },
  {
    icon: Cloud,
    title: "Cloud & Integrations",
    description: "Connect your tools and move to the cloud without the confusion. Streamline your workflow and access your stuff from anywhere.",
    color: "from-indigo-500 to-blue-500",
    features: ["Cloud Migration", "Software Setup", "API Integrations", "Automation"],
  },
];

export default function NewServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(".services-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-header",
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate cards on scroll
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-32 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            IT Services That{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Make Sense
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complicated contracts or confusing tech jargon. Just straightforward solutions for your business technology needs. Call me, tell me what&apos;s wrong, and I&apos;ll fix it.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="service-card group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 bg-background"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-green-500/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Not Sure What You Need?
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              No problem. Give me a call and we&apos;ll figure it out together. Free consultations, honest advice, and no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+14803605964">
                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  Call (480) 360-5964
                </Button>
              </a>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                  Send a Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
