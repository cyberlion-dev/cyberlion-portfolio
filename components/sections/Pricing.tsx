// CyberLion Web Solutions - Pricing Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Check,
  Sparkles,
  Zap,
  Rocket,
  Crown,
  ArrowRight,
  Infinity
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pricingTiers = [
  {
    name: "Starter",
    tagline: "Beat DIY Platforms",
    price: "$997",
    priceDetail: "one-time build",
    annualFee: "$297/year",
    comparison: "vs Squarespace $432/year",
    description: "Professional website for less than DIY platforms. Custom-built, not templated.",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Up to 5 custom pages (not templates!)",
      "Mobile-responsive design",
      "Contact form integration",
      "Professional SEO setup",
      "Vulnerability management",
      "Content updates as needed",
      "Bug fixes & software upgrades",
      "Expert support (not chatbots)",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    tagline: "Most Popular Choice",
    price: "$2,497",
    priceDetail: "one-time build",
    annualFee: "$597/year",
    comparison: "vs WordPress Premium $900/year",
    description: "Full-featured website with custom CMS. Better than WordPress, easier to use.",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    features: [
      "Up to 15 custom pages",
      "Custom CMS (update content yourself)",
      "Advanced SEO & analytics",
      "Blog or news section",
      "Contact & booking forms",
      "Social media integration",
      "Vulnerability management",
      "Priority support & training",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "E-Commerce",
    tagline: "Sell Online",
    price: "$3,997",
    priceDetail: "one-time build",
    annualFee: "$897/year",
    comparison: "vs Shopify Basic $468/year + transaction fees",
    description: "Full e-commerce store with payment processing, inventory, and order management.",
    icon: Crown,
    color: "from-emerald-500 to-green-500",
    features: [
      "Shopify or WooCommerce integration",
      "Product catalog & inventory",
      "Secure payment processing",
      "Order management system",
      "Customer accounts & wishlists",
      "Shipping & tax calculators",
      "Advanced vulnerability management",
      "Priority e-commerce support",
    ],
    cta: "Start Selling",
    popular: false,
  },
  {
    name: "Enterprise",
    tagline: "Custom Solutions",
    price: "$7,500+",
    priceDetail: "custom quote",
    annualFee: "$1,497+/year",
    comparison: "Enterprise-grade for less",
    description: "Complex applications, custom integrations, or multi-site solutions.",
    icon: Sparkles,
    color: "from-orange-500 to-red-500",
    features: [
      "Unlimited pages & features",
      "Custom backend development",
      "API integrations (CRM, ERP, etc.)",
      "Multi-site management",
      "Advanced security & compliance",
      "Performance optimization",
      "Dedicated account manager",
      "Major rebuilds included",
    ],
    cta: "Request Quote",
    popular: false,
  },
];

const addOns = [
  "AI Chatbot Integration: +$997",
  "Advanced Analytics Dashboard: +$497",
  "Email Marketing Integration: +$397",
  "Custom Booking System: +$797",
  "Multilingual Support: +$697",
  "Mobile App (PWA): +$1,497",
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(".pricing-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".pricing-title",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Animate pricing cards
      gsap.fromTo(".pricing-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Animate add-ons
      gsap.fromTo(".addons-section",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".addons-section",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-12 lg:py-20 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="pricing-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Standard Packages</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Or Choose a Ready-Made Package
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Not into sliders? No problem. Here are our standard packages with everything included.
              <br />
              <span className="text-primary font-semibold">Professional websites for less than DIY platforms. Custom-built, not templated.</span>
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card
                key={index}
                className={`pricing-card group relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur ${
                  tier.popular
                    ? "border-2 border-primary shadow-lg ring-2 ring-primary/20"
                    : "border-2 hover:border-primary/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <div className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tier.color} mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-sm mb-4">{tier.tagline}</CardDescription>
                  <div className="mb-2">
                    <div className="text-4xl font-bold text-foreground">{tier.price}</div>
                    <div className="text-sm text-muted-foreground">{tier.priceDetail}</div>
                  </div>
                  <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="text-lg font-semibold text-primary">{tier.annualFee}</div>
                    <div className="text-xs text-muted-foreground">support & maintenance</div>
                  </div>
                  <div className="mb-4 text-xs text-muted-foreground italic">
                    {tier.comparison}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span className={feature.includes("Website for Life") ? "font-semibold text-primary" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <Link href="#contact" className="w-full">
                    <Button
                      size="lg"
                      className={`w-full group ${
                        tier.popular
                          ? "bg-primary hover:bg-primary/90"
                          : ""
                      }`}
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Annual Support Highlight */}
        <div className="addons-section max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 border-2 border-primary/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Infinity className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">What&apos;s Included in Annual Support?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your annual support fee ensures your website stays secure, functional, and up-to-date. We handle
                  all the technical heavy lifting so you can focus on running your business. Think of it as having
                  a dedicated web developer on retainer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-card border-2 border-primary/20">
                    <div className="font-semibold text-primary mb-1">Vulnerability Management</div>
                    <div className="text-sm text-muted-foreground">
                      Proactive security monitoring, patching vulnerabilities, and protecting against threats
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border-2 border-primary/20">
                    <div className="font-semibold text-primary mb-1">Periodic Content Updates</div>
                    <div className="text-sm text-muted-foreground">
                      We handle content changes and updates as needed throughout the year
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border-2 border-primary/20">
                    <div className="font-semibold text-primary mb-1">Bug Fixes & Upgrades</div>
                    <div className="text-sm text-muted-foreground">
                      Routine maintenance, bug fixes, and software upgrades to keep everything running smoothly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Add-ons */}
        <div className="addons-section max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Popular Add-Ons</h3>
          <p className="text-muted-foreground mb-6">
            Enhance your website with these optional features
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border-2 border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium">{addon}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="#contact">
              <Button size="lg" variant="outline">
                Discuss Custom Requirements
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
