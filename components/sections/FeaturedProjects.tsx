"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Impact Finder",
    description: "Interactive tool that helps businesses find the right AI opportunities",
    tags: ["Assessment Tool", "Interactive"],
    link: "/ai-impact-finder",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Risk Analyzer",
    description: "Visual risk analysis with interactive flowcharts and data mapping",
    tags: ["Data Viz", "Analysis"],
    link: "/risk-analyzer",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Christmas Drawing",
    description: "Automated gift exchange with email notifications for the family",
    tags: ["Fun Project", "Automation"],
    link: "/christmas-drawing",
    gradient: "from-red-500 to-orange-500",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for project cards
      gsap.fromTo(".project-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top center+=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Parallax effect on hover
      document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A few recent projects
          </p>
        </div>

        {/* Projects grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              className="project-card group block"
            >
              <div className="relative h-full p-6 rounded-xl border-2 border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-secondary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Arrow icon */}
                  <div className="flex items-center text-sm font-medium text-primary">
                    <span className="mr-2">View project</span>
                    <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:gap-4 transition-all duration-300"
          >
            <span>View all projects</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
