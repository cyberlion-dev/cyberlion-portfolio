// CyberLion Web Solutions - Milk Analogy Callout

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Milk, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function MilkJoke() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".milk-joke",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".milk-joke",
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
      className="py-12 lg:py-16 bg-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="milk-joke max-w-4xl mx-auto">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-primary/10 border-2 border-primary/30 overflow-hidden relative">
            {/* Milk icon decoration */}
            <div className="absolute -right-8 -top-8 opacity-5">
              <Milk className="w-64 h-64" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Milk className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    Here&apos;s the Reality About Websites
                  </h3>
                  <p className="text-xl lg:text-2xl font-semibold text-primary mb-4 leading-relaxed">
                    Just like the milk in your fridge, websites get old. You need fresh ones.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Design trends change. Technology evolves. Security standards get stricter. That sleek site you
                    built 3 years ago? It&apos;s starting to smell funny. Most agencies charge you thousands for a
                    rebuild. We don&apos;t. It&apos;s part of the deal.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-background/80 border border-border">
                      <p className="font-semibold mb-2">❌ The Old Way</p>
                      <p className="text-sm text-muted-foreground">
                        Pay $5,000 for a site. It gets outdated. Pay another $5,000 to rebuild. Repeat forever.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/30">
                      <p className="font-semibold text-primary mb-2">✓ Our Way</p>
                      <p className="text-sm text-muted-foreground">
                        Pay once. We keep it fresh. Rebuilds included. Like having milk delivered, not buying a cow.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="#pricing">
                      <Button size="lg" className="group">
                        See How It Works
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
