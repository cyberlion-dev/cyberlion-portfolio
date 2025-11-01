// Custom component - Navigation bar with scroll effects and mobile menu

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const pipeRef = useRef<HTMLSpanElement>(null);
  const cyberlionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleLogoHover = (isEntering: boolean) => {
    if (isEntering) {
      // Animate pipe in
      gsap.to(pipeRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate Cyberlion letters with stagger
      const letters = cyberlionRef.current?.children || [];
      gsap.to(letters, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)",
      });
    } else {
      // Reverse animations
      gsap.to(pipeRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        ease: "power2.in",
      });

      const letters = cyberlionRef.current?.children || [];
      gsap.to(letters, {
        opacity: 0,
        x: -20,
        rotationY: -90,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Animated Extension */}
          <Link href="/" className="relative group">
            <div
              ref={logoRef}
              className="flex items-center text-2xl font-bold tracking-tight"
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
            >
              <span>JB</span>

              {/* Pipe Separator */}
              <span
                ref={pipeRef}
                className="mx-2 opacity-0 -translate-x-3"
                style={{ display: 'inline-block' }}
              >
                |
              </span>

              {/* Cyberlion Text with Letter Stagger */}
              <span
                ref={cyberlionRef}
                className="inline-flex"
                style={{ perspective: '1000px' }}
              >
                {'Cyberlion'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block opacity-0 -translate-x-5"
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <ThemeToggle />
                <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button>Get in Touch</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
