// CyberLion Web Solutions - Why Not DIY Section

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Wrench
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const diyRisks = [
  {
    icon: AlertTriangle,
    title: "Security & Privacy? What's That?",
    description: "DIY platforms often lag on security patches. One misconfiguration can expose your business to data breaches, malware, and costly downtime. And privacy? WordPress and Squarespace treat your visitors' data like it's their business—because it is. They're collecting, tracking, and monetizing everything while you're stuck with their terms of service.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: TrendingDown,
    title: "Bloated Code & Poor SEO",
    description: "WordPress and Squarespace sites are more bloated than your uncle after Thanksgiving dinner. All that excess weight slows your site down, tanks your SEO, and makes Google wonder if you're running a website or a buffet. You might rank on page 3 when you should be on page 1.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Clock,
    title: "The Maintenance Burnout",
    description: "Studies show 43% of small business websites go unmaintained after 3 months. Just like the milk in your fridge, websites get old—you need to keep them fresh. The initial excitement fades when you realize the ongoing work: updates, backups, security patches, content changes. Most business owners simply don't have the time.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Wrench,
    title: "Limited & Locked-In",
    description: "Hit a wall when you need custom functionality. And when you outgrow the platform? Your site can't be migrated. You're stuck or starting over.",
    color: "from-purple-500 to-pink-500",
  },
];

const professionalAdvantages = [
  "Custom solutions built for YOUR business",
  "Enterprise-grade security from day one",
  "Optimized for speed and search engines",
  "Mobile-first responsive design",
  "Scalable as your business grows",
  "Expert support when you need it",
];

export default function WhyNotDIY() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(".diy-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".diy-title",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Animate risk cards
      gsap.fromTo(".diy-risk-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          scrollTrigger: {
            trigger: ".diy-risks-grid",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Animate professional section
      gsap.fromTo(".professional-section",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".professional-section",
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
      id="why-not-diy"
      className="py-12 lg:py-20 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Glowing orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="diy-title">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-500">The DIY Trap</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Yes, You <span className="italic">Can</span> Do It Yourself...
              <br />
              <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">But Should You?</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              DIY website builders make it <span className="font-semibold text-foreground">easy to start</span>, but also{" "}
              <span className="font-semibold text-orange-500">easy to mess up</span>. What seems simple today
              can become expensive problems tomorrow.
            </p>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-rose-500/10 border-2 border-orange-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">43%</div>
                <div className="text-sm text-muted-foreground">
                  of small business websites are never updated after the first 3 months
                </div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">60%</div>
                <div className="text-sm text-muted-foreground">
                  of DIY website owners cite &quot;lack of time&quot; as why their site is outdated or broken
                </div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-rose-500 mb-2">38%</div>
                <div className="text-sm text-muted-foreground">
                  of visitors will leave a website if the content or layout is unattractive or outdated
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-orange-500/20">
              <p className="text-sm text-muted-foreground italic text-center mb-4">
                The initial excitement of building your own site fades fast when you realize the ongoing work required.
              </p>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Here&apos;s the difference: <span className="text-primary">We genuinely love building websites.</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  What feels like tedious maintenance to you is exciting, problem-solving work to us. You lose interest
                  after a few months because you have a business to run. We stay energized because this IS our business.
                  Every security patch, every optimization, every bug fix—we enjoy it. That&apos;s why we&apos;re good at it.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* DIY Risks Grid */}
        <div className="diy-risks-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {diyRisks.map((risk, index) => {
            const Icon = risk.icon;
            return (
              <Card
                key={index}
                className="diy-risk-card group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-border hover:border-orange-500/50 bg-card/80 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${risk.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                      {risk.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {risk.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Professional Advantage Section */}
        <div className="professional-section max-w-5xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 backdrop-blur">
            <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Left side - Message */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    The Professional Advantage
                  </span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  We Actually Love This Stuff
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here&apos;s the truth: <span className="font-semibold text-foreground">we genuinely enjoy building and maintaining websites.</span> The
                  technical challenges that frustrate you? They energize us. The ongoing updates that feel like
                  drudgery to business owners? That&apos;s the work we find fulfilling.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We&apos;ve built hundreds of websites. We know the pitfalls, the best practices, and how to
                  avoid costly mistakes. But more importantly, we stay passionate about it. While you focus on
                  what YOU love (running your business), we focus on what WE love (building and maintaining
                  exceptional websites). No burnout. No loss of interest. Just consistent, expert care.
                </p>
                <div className="p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-2 border-violet-500/20 mb-6">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Here&apos;s our secret: <span className="text-violet-500">I&apos;m only happy when I&apos;m miserable.</span>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Those stressful debugging sessions, complex integrations, and technical headaches that make most people
                    want to quit? That&apos;s where I thrive. And with my AI-enhanced workflow, I can tackle 10x more
                    challenges without breaking a sweat. Your stress becomes my puzzle. And I love solving puzzles.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Fast, secure, and built to scale with your business</span>
                </div>
              </div>

              {/* Right side - Checklist */}
              <div className="flex flex-col justify-center">
                <div className="space-y-3">
                  {professionalAdvantages.map((advantage, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-sm font-medium">{advantage}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="#pricing">
                    <Button size="lg" className="w-full group">
                      See Our Pricing
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 border-2 border-primary/20">
              <div className="space-y-6">
                <div>
                  <p className="text-2xl font-bold text-foreground mb-2">
                    The Perfect Match
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    You love running your business. We love building websites. You shouldn&apos;t waste time on
                    technical work you don&apos;t enjoy. We shouldn&apos;t miss out on work we&apos;re passionate about.
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-xl font-semibold text-foreground mb-3">
                    Our Promise to You
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Your time is valuable.</span> We handle the
                    technical details with genuine enthusiasm, not obligation. And here&apos;s the thing:{" "}
                    <span className="font-semibold text-primary">
                      if we&apos;re not providing you a service that&apos;s valuable to you, then we aren&apos;t doing our job.
                    </span>{" "}
                    Your success is our success. And we genuinely love helping you get there.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
