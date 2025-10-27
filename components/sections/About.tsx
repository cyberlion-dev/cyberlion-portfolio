// Custom component - About section with GSAP scroll-triggered animations

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".about-description", {
        scrollTrigger: {
          trigger: ".about-description",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.out",
      });

      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".tech-category", {
        scrollTrigger: {
          trigger: ".tech-stack",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        immediateRender: false,
      });

      gsap.from(".tech-disclaimer", {
        scrollTrigger: {
          trigger: ".tech-disclaimer",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: <Code2 size={32} />,
      title: "Development",
      description:
        "Building responsive, performant web applications with modern frameworks and best practices.",
    },
    {
      icon: <Palette size={32} />,
      title: "Design",
      description:
        "Creating intuitive user interfaces with a focus on aesthetics and user experience.",
    },
    {
      icon: <Rocket size={32} />,
      title: "Performance",
      description:
        "Optimizing applications for speed, accessibility, and seamless user interactions.",
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description:
        "Working effectively with teams to bring ideas to life and solve complex problems.",
    },
  ];

  const techStack = [
    {
      category: "Frontend Frameworks",
      icon: "⚛️",
      technologies: ["React/Next.js", "Vue/Nuxt", "Angular", "Svelte", "Astro"],
    },
    {
      category: "Styling & Design",
      icon: "🎨",
      technologies: ["HTML/CSS", "Tailwind CSS", "Bootstrap", "SASS/SCSS"],
    },
    {
      category: "Languages",
      icon: "📝",
      technologies: ["JavaScript/TypeScript", "Python", "C#", "SQL"],
    },
    {
      category: "Backend & APIs",
      icon: "🔧",
      technologies: [
        "Node.js",
        "FastAPI",
        "Entity Framework",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      category: "Databases",
      icon: "💾",
      technologies: ["SQL", "NoSQL", "SQLite", "PocketBase"],
    },
    {
      category: "CMS & Tools",
      icon: "🛠️",
      technologies: ["WordPress", "Strapi", "PocketBase", "Electron"],
    },
    {
      category: "DevOps & Cloud",
      icon: "☁️",
      technologies: ["Docker", "Kubernetes", "CI/CD Pipelines"],
    },
    {
      category: "Automation & BI",
      icon: "📊",
      technologies: ["n8n", "Power BI"],
    },
    {
      category: "AI & ML Tools",
      icon: "🤖",
      technologies: ["Claude", "OpenAI", "Ollama", "Eleven Labs"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl w-full">
        <h2 className="about-title text-4xl md:text-5xl font-bold text-center mb-6 break-words">
          About Me
        </h2>
        <p className="about-description text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16 break-words px-2">
          I&apos;m a passionate developer and designer with a keen eye for
          detail and a love for creating meaningful digital experiences. With
          years of experience in the field, I specialize in building modern web
          applications that are both beautiful and functional.
        </p>

        <div className="my-8 text-center">
          <Button>
            <a className="btn" href="/risk-analyzer">
              Why Us?
            </a>
          </Button>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 text-primary">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        <div className="tech-stack">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Technology Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {techStack.map((stack, index) => (
              <div
                key={index}
                className="tech-category p-5 rounded-lg border border-border bg-card hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {stack.icon}
                  </span>
                  <h4 className="font-semibold text-base">{stack.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lifelong Learning Disclaimer */}
          <div className="tech-disclaimer flex items-center justify-center gap-3 p-6 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5">
            <span className="text-2xl">🚀</span>
            <p className="text-sm text-muted-foreground italic max-w-2xl text-center">
              This list is ever-evolving — I&apos;m a lifelong learner always
              exploring new technologies and expanding my toolkit. If you
              don&apos;t see a specific tech here, there&apos;s a good chance
              I&apos;m either learning it now or ready to dive in!
            </p>
            <span className="text-2xl">📚</span>
          </div>
        </div>
      </div>
    </section>
  );
}
