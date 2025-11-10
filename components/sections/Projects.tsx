// Custom component - Projects section with GSAP scroll-triggered animations

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Lock, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Project type definition
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  role: string;
  liveUrl: string;
  isPrivateRepo?: boolean;
  githubUrl?: string;
  featured?: boolean;
}

// Real client projects and websites
const projects: Project[] = [
  {
    id: 1,
    title: 'Oaken Cupboards',
    description: 'Local Idaho Falls cabinet company website recently rebuilt with modern architecture. Features dynamic product galleries, real-time inventory management, and blazing-fast performance using Astro\'s island architecture with Firebase backend.',
    image: '/screenshots/oakenCupboard.png',
    tags: ['Astro', 'Firebase', 'Firestore', 'Google Cloud', 'TypeScript', 'SEO'],
    category: 'Client Site',
    role: 'Full-Stack Development & Rebuild',
    liveUrl: 'https://oakencupboard.com',
    isPrivateRepo: true,
  },
  {
    id: 2,
    title: 'Eagle Rock Timber',
    description: 'Idaho Falls construction contractor company placeholder website. Lightweight static site built with Vue.js for fast load times and easy maintenance. Features company information and simple contact form for lead generation.',
    image: '/screenshots/eagleRockTimber.jpg',
    tags: ['Vue.js', 'Static Site', 'Contact Form', 'Responsive Design'],
    category: 'Client Site',
    role: 'Static Site Development',
    liveUrl: 'https://eaglerocktimber.com',
    isPrivateRepo: true,
  },
  {
    id: 3,
    title: 'MyTBrite',
    description: 'Rigby, Idaho window cleaning and home services company website. Built with modern stack featuring Svelte for reactive UI, PocketBase for backend services, and Firebase for real-time data synchronization. Includes service booking and customer management.',
    image: '/screenshots/mytbrite.jpg',
    tags: ['Svelte', 'PocketBase', 'Firebase', 'Real-time DB', 'Booking System'],
    category: 'Client Site',
    role: 'Full-Stack Development',
    liveUrl: 'https://mytbrite.com',
    isPrivateRepo: true,
  },
  {
    id: 4,
    title: 'MyTBrite Lights',
    description: 'Permanent lighting company website, a branch of MyTBrite. Built with Nuxt for SSR performance and SEO, Netlify CMS for content management, and hosted on Firebase. Features automated lead generation system that captures and routes customer inquiries to sales team.',
    image: '/screenshots/mytbrite-lights.jpg',
    tags: ['Nuxt', 'Netlify CMS', 'Firebase Hosting', 'Lead Generation', 'SSR'],
    category: 'Client Site',
    role: 'Full-Stack Development & CMS Integration',
    liveUrl: 'https://mytbrite-lights.com',
    isPrivateRepo: true,
  },
  {
    id: 5,
    title: 'Beehive Window Cleaning',
    description: 'Professional window cleaning service lead generation website. Built with Angular and styled using DaisyUI and Tailwind CSS for modern, responsive design. Static site hosted on Firebase for optimal performance and reliability.',
    image: '/screenshots/beehive.png',
    tags: ['Angular', 'DaisyUI', 'Tailwind CSS', 'Firebase Hosting', 'Lead Generation'],
    category: 'Client Site',
    role: 'Frontend Development',
    liveUrl: 'https://beehivewindowcleaning.com',
    isPrivateRepo: true,
  },
  {
    id: 6,
    title: 'ML Serv',
    description: 'Service company information website built as a static Angular application. Clean, straightforward design featuring company information and contact form for customer inquiries. Hosted on Firebase for fast, reliable delivery.',
    image: '/screenshots/mlServ.jpg',
    tags: ['Angular', 'Static Site', 'Firebase Hosting', 'Contact Form'],
    category: 'Client Site',
    role: 'Frontend Development',
    liveUrl: 'https://mlserv.com',
    isPrivateRepo: true,
  },
  {
    id: 7,
    title: 'Hidden Treasures',
    description: 'Antiques and collectibles showcase website built with Nuxt and styled with Tailwind CSS. Features custom-built CMS using PocketBase (hosted on Railway) allowing admin authentication and dynamic content updates. Self-managed backend for flexible content control.',
    image: '/screenshots/hiddenTreasures.jpg',
    tags: ['Nuxt', 'Tailwind CSS', 'PocketBase', 'Railway', 'Custom CMS', 'Authentication'],
    category: 'Client Site',
    role: 'Full-Stack Development & CMS Architecture',
    liveUrl: 'https://hiddentreasures.com',
    isPrivateRepo: true,
  },
  {
    id: 8,
    title: 'Shelley Legion',
    description: 'Club baseball website built with Next.js for optimal performance and SEO. Features custom PocketBase CMS (hosted on Railway) enabling team administrators to manage rosters, schedules, news, and events through secure authentication. Dynamic content updates without developer intervention.',
    image: '/screenshots/shelleyLegion.jpg',
    tags: ['Next.js', 'PocketBase', 'Railway', 'Custom CMS', 'Authentication', 'SSR'],
    category: 'Client Site',
    role: 'Full-Stack Development & CMS Architecture',
    liveUrl: 'https://shelleylegion.com',
    isPrivateRepo: true,
  },
  {
    id: 9,
    title: 'Walkup Beats',
    description: 'AI-powered baseball walkup song platform combining voice synthesis and audio management. Features custom beat creation, AI voice integration (Eleven Labs), and personalized audio mixing for baseball players.',
    image: '/screenshots/walkupbeats.png',
    tags: ['AI Voice Synthesis', 'Audio Processing', 'Eleven Labs', 'Custom Player', 'E-Commerce', 'SaaS'],
    category: 'Personal Project',
    role: 'Creator & Lead Developer',
    liveUrl: 'https://walkupbeats.web.app',
    isPrivateRepo: true,
    featured: true,
  },
  {
    id: 10,
    title: 'CommishCrunch',
    description: 'No-BS Commission Calculators for Sales Pros',
    image: '/screenshots/commishcrunch.png',
    tags: ['Next.js', 'IndexedDB', 'shadcn/ui', 'Local Storage', 'Firebase', 'TypeScript'],
    category: 'Personal Project',
    role: 'Creator & Lead Developer',
    liveUrl: 'https://commishcrunch.web.app',
    isPrivateRepo: false,
    featured: true,
  },
  {
    id: 11,
    title: 'Monte Carlo Risk Analyzer',
    description: 'Advanced quantitative risk simulation tool using Monte Carlo and Latin Hypercube sampling methods. Features interactive parameter controls, real-time statistical analysis, and comprehensive risk metrics for portfolio management, project planning, and financial modeling.',
    image: '/screenshots/riskAnalyzer.png',
    tags: ['Monte Carlo', 'Statistical Analysis', 'React', 'TypeScript', 'Recharts', 'Risk Management'],
    category: 'Personal Project',
    role: 'Quantitative Developer',
    liveUrl: '/risk-analyzer',
    isPrivateRepo: false,
    featured: true,
  },
  {
    id: 12,
    title: 'This Portfolio',
    description: 'Modern portfolio website built with Next.js featuring GSAP animations, dark mode, interactive contact form with spam protection, and responsive design.',
    image: '/screenshots/cyberlion.png',
    tags: ['Next.js', 'React', 'GSAP', 'Tailwind CSS', 'TypeScript', 'EmailJS'],
    category: 'Personal Project',
    role: 'Solo Development',
    liveUrl: '#home',
    githubUrl: 'https://github.com/cyberlion-dev',
  },
];

const categories = ['All', 'Client Site', 'Personal Project'];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        immediateRender: false,
      });

      gsap.from('.filter-button', {
        scrollTrigger: {
          trigger: '.filter-buttons',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power4.out',
        immediateRender: false,
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.project-card',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power4.out',
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when category changes (smoother transition)
  useEffect(() => {
    if (activeCategory !== 'All') {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/50 overflow-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <h2 className="projects-title text-4xl md:text-5xl font-bold text-center mb-12 break-words">
          Featured Projects
        </h2>

        <div className="filter-buttons flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="filter-button"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`project-card overflow-hidden group hover:shadow-xl transition-all ${project.featured ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                {project.featured && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      <Star size={12} className="mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className={`break-words ${project.featured ? 'text-primary' : ''}`}>
                    {project.title}
                  </CardTitle>
                  {project.isPrivateRepo && (
                    <Badge variant="outline" className="shrink-0">
                      <Lock size={12} className="mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
                <CardDescription className="break-words">{project.description}</CardDescription>
                {project.role && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.role}
                    </Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.liveUrl && (
                  <Button size="sm" className="flex-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      View Live Site
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
