// Website for Life Guarantee Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Infinity,
  RefreshCw,
  HeartHandshake,
  Sparkles,
  Check,
  ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const guaranteeFeatures = [
  {
    icon: Infinity,
    title: "Lifetime Ownership",
    description: "Your website is yours forever. No recurring fees, no surprise charges, no expiration dates."
  },
  {
    icon: RefreshCw,
    title: "Free Rebuilds",
    description: "Technology evolves. When your site needs a complete rebuild, we handle it—at no additional cost."
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "Questions? Updates? Changes? We're here for the life of your website, not just the launch."
  },
];

const includedServices = [
  "Complete website rebuilds when needed",
  "Security updates and patches",
  "Bug fixes and troubleshooting",
  "Content updates and changes",
  "Technical support",
  "Performance optimization",
  "Compatibility updates",
  "Domain and hosting assistance"
];

export default function LifetimeGuarantee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".guarantee-title", {
        scrollTrigger: {
          trigger: ".guarantee-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".guarantee-feature", {
        scrollTrigger: {
          trigger: ".guarantee-features",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".guarantee-list-item", {
        scrollTrigger: {
          trigger: ".guarantee-list",
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lifetime-guarantee"
      className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="guarantee-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Infinity className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Unique Promise</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Website for Life
              </span>
              <br />
              <span className="text-foreground">Guarantee</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlike other agencies that charge ongoing fees or disappear after launch,
              we believe in building lasting partnerships. Your success is our success,
              and we&apos;re committed for the long haul.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="guarantee-features grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {guaranteeFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="guarantee-feature p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card/80 backdrop-blur"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-500 mb-6">
                  <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* What's Included */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 lg:p-12 border-2 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold">What&apos;s Included for Life</h3>
            </div>

            <div className="guarantee-list grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {includedServices.map((service, index) => (
                <div
                  key={index}
                  className="guarantee-list-item flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-foreground font-medium">{service}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6 mb-8">
              <p className="text-lg font-semibold text-foreground mb-2">
                Real Example:
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;ve rebuilt entire websites for clients when new technologies emerged
                or their business evolved—at zero cost. That&apos;s our commitment to you.
              </p>
            </div>

            <div className="text-center">
              <Link href="#contact">
                <Button size="lg" className="group">
                  Start Your Lifetime Partnership
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
