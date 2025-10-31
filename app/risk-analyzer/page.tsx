"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import RiskAnalyzer from "./RiskAnalyzer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RiskAnalyzerPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full bg-background text-foreground pt-24 px-6 sm:px-12">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="max-w-6xl mx-auto text-center mb-12 space-y-6"
        >
          <div className="space-y-4">
            <Badge variant="outline" className="text-sm px-4 py-2">
              Portfolio Demo Project
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold">
              Monte Carlo Risk Simulator
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              An interactive demonstration of quantitative risk analysis using Monte Carlo and Latin Hypercube sampling methods.
              Built to showcase statistical programming and financial modeling capabilities.
            </p>
          </div>

          {/* Disclaimer */}
          <Card className="max-w-4xl mx-auto bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="text-yellow-600 dark:text-yellow-400 text-xl">⚠️</div>
                <div className="text-left">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Educational Purpose Only
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                    This tool was created as a portfolio project to demonstrate programming skills in statistical analysis,
                    React development, and quantitative modeling. I am not a licensed financial advisor or risk management professional.
                    This simulator should not be used for actual investment decisions, financial planning, or business risk assessment.
                    Always consult qualified professionals for real financial advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What This Demonstrates */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Technical Skills</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monte Carlo simulation algorithms</li>
                  <li>• Statistical distribution sampling</li>
                  <li>• Interactive React components</li>
                  <li>• Real-time data visualization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Mathematical Concepts</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Probability distributions</li>
                  <li>• Value at Risk (VaR) calculation</li>
                  <li>• Statistical moments analysis</li>
                  <li>• Latin Hypercube Sampling</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Business Applications</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Portfolio risk modeling</li>
                  <li>• Project cost estimation</li>
                  <li>• Revenue forecasting</li>
                  <li>• Uncertainty quantification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Analyzer */}
        <section className="max-w-7xl mx-auto">
          <RiskAnalyzer />
        </section>

        {/* Footer Note */}
        <section className="max-w-4xl mx-auto mt-16 mb-8">
          <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Built with React, TypeScript, and Recharts. Source code demonstrates advanced statistical programming,
                interactive UI development, and mathematical modeling capabilities. Created for portfolio demonstration purposes.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
