"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Code, Wrench, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Impact Finder",
    category: "Assessment Tool",
    description: "Interactive questionnaire that helps businesses identify high-value AI opportunities. Features transparent scoring, downloadable results, and customer-facing AI gating.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "/ai-impact-finder",
    type: "tool",
    icon: Sparkles,
    highlights: ["6-question assessment", "12 AI use cases", "Copy & download results"],
  },
  {
    title: "Risk Analyzer",
    category: "Data Tool",
    description: "Visual risk analysis tool with interactive flowcharts. Helps businesses map and understand their risk landscape.",
    tech: ["React Flow", "TypeScript", "Tailwind"],
    link: "/risk-analyzer",
    type: "tool",
    icon: Wrench,
    highlights: ["Interactive flowcharts", "Visual risk mapping", "Data export"],
  },
  {
    title: "Quote Calculator",
    category: "Business Tool",
    description: "Custom pricing calculator for service businesses. Configured with your rates and services for instant, accurate quotes.",
    tech: ["Next.js", "React", "Tailwind"],
    link: "#", // Update with actual link
    type: "tool",
    icon: Wrench,
    highlights: ["Custom pricing logic", "Professional output", "Easy to configure"],
  },
  {
    title: "Service Business Sites",
    category: "Client Work",
    description: "Clean, conversion-focused websites for local service businesses. Fast, mobile-first, and SEO-optimized.",
    tech: ["Next.js", "Tailwind", "Firebase"],
    link: "#",
    type: "website",
    icon: Code,
    highlights: ["Landing pages", "Lead capture", "Mobile-optimized"],
  },
];

const funProjects = [
  {
    title: "Christmas Drawing Generator",
    description: "Fun holiday project for the Boyce family. Automated gift exchange drawing with email notifications.",
    link: "/christmas-drawing",
    tech: ["Next.js", "Email API"],
  },
];

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.portfolio-card').forEach((card, index) => {
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
      id="portfolio"
      className="relative py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Things I&apos;ve Built
          </h2>
          <p className="text-lg text-muted-foreground">
            A mix of client projects, practical tools, and the occasional fun side project.
            All built to solve real problems.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center md:text-left">
            Web Tools & Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Card
                  key={project.title}
                  className="portfolio-card group hover:shadow-2xl transition-all duration-300 border-border hover:border-primary/50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Highlights */}
                    <div>
                      <p className="text-sm font-semibold mb-2">Key Features:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-secondary border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {project.link !== "#" && (
                      <Link href={project.link}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <span>View Project</span>
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Fun Projects */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center md:text-left">
            Fun Side Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funProjects.map((project) => (
              <Card
                key={project.title}
                className="portfolio-card hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-secondary border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href={project.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      Check it out
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Want to see something built for you?
          </p>
          <Link href="#contact">
            <Button size="lg" className="text-lg px-8 py-6">
              Start a Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
