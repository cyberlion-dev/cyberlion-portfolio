// Custom component - Hero section with GSAP entrance animations

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power4.out',
      });

      // Animate CTA buttons
      gsap.from(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.1,
        ease: 'power4.out',
      });

      // Animate social icons
      gsap.from(socialsRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });

      // Animate floating shapes
      const shapes = shapesRef.current?.children || [];
      Array.from(shapes).forEach((shape, index) => {
        // Initial animation
        gsap.from(shape, {
          scale: 0,
          opacity: 0,
          duration: 1,
          delay: 0.8 + index * 0.1,
          ease: 'back.out(1.7)',
        });

        // Continuous floating animation
        gsap.to(shape, {
          y: `${gsap.utils.random(-30, 30)}`,
          x: `${gsap.utils.random(-20, 20)}`,
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      const shapes = shapesRef.current?.children || [];
      Array.from(shapes).forEach((shape, index) => {
        const speed = (index + 1) * 0.15;
        gsap.to(shape, {
          x: `+=${xPercent * 30 * speed}`,
          y: `+=${yPercent * 30 * speed}`,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Animated Floating Shapes */}
      <div ref={shapesRef} className="absolute inset-0 -z-5 pointer-events-none">
        {/* Circle 1 */}
        <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl" />

        {/* Triangle 2 */}
        <div className="absolute top-40 right-[15%] w-24 h-24 rotate-45 bg-gradient-to-br from-pink-500/15 to-primary/15 blur-xl" />

        {/* Circle 3 */}
        <div className="absolute bottom-40 left-[20%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-primary/20 blur-3xl" />

        {/* Square 4 */}
        <div className="absolute bottom-32 right-[25%] w-28 h-28 bg-gradient-to-br from-primary/15 to-pink-500/15 blur-2xl" />

        {/* Circle 5 */}
        <div className="absolute top-[50%] right-[10%] w-36 h-36 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-2xl" />

        {/* Triangle 6 */}
        <div className="absolute top-[30%] left-[5%] w-20 h-20 rotate-12 bg-gradient-to-br from-primary/10 to-purple-500/10 blur-xl" />
      </div>

      <div className="container mx-auto max-w-5xl text-center">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Developer, Designer &<br />
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Architect
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Hi, I&apos;m <span className="font-semibold text-foreground">Jordan Boyce</span>.
          I craft beautiful digital experiences that blend creativity with functionality.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" asChild>
            <a href="#projects">View My Work</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        <div ref={socialsRef} className="flex gap-4 justify-center">
          <a
            href="https://github.com/cyberlion-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:bg-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/jordan-the-joyce-boyce/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:bg-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:hello@jordanboyce.com"
            className="p-3 rounded-full border border-border hover:bg-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={24} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
