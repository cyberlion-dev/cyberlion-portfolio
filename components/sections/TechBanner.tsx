// Technology Banner - Infinite scrolling logos

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const technologies = [
  { name: "Starlink", logo: "🛰️" },
  { name: "Pi-hole", logo: "🔒" },
  { name: "pfSense", logo: "🔥" },
  { name: "UniFi", logo: "📡" },
  { name: "Google Cloud", logo: "☁️" },
  { name: "Home Assistant", logo: "🏠" },
  { name: "Angular", logo: "🅰️" },
  { name: "Nuxt", logo: "💚" },
  { name: "Tailwind CSS", logo: "🎨" },
  { name: "Docker", logo: "🐳" },
  { name: "Raspberry Pi", logo: "🥧" },
  { name: "TP-Link", logo: "📶" },
  { name: "Plex", logo: "▶️" },
  { name: "Ubiquiti", logo: "📡" },
  { name: "Google Wifi", logo: "📶" },
  { name: "AWS", logo: "☁️" },
];

export default function TechBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    const banner = bannerRef.current;
    const scrollWidth = banner.scrollWidth / 2;

    // Create infinite scroll animation
    gsap.to(banner, {
      x: -scrollWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(banner);
    };
  }, []);

  // Duplicate technologies for seamless loop
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section className="py-12 bg-muted/30 overflow-hidden border-y border-border">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Some Technologies We Work With
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          ref={bannerRef}
          className="flex gap-12 items-center whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:scale-105"
            >
              <span className="text-3xl">{tech.logo}</span>
              <span className="font-semibold text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
