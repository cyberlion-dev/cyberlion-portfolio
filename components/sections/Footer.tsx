// Enhanced Footer Component

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Local IT Services", href: "/#services" },
      { label: "Web Development", href: "/#services" },
      { label: "AI & Automation", href: "/ai-automation" },
    ],
    projects: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Risk Analyzer", href: "/risk-analyzer" },
      { label: "AI Solutions", href: "/ai-solutions" },
      { label: "AI-Amplified Team", href: "/ai-amplified-team" },
    ],
    company: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo variant="icon" className="h-8 w-8" />
              <h3 className="font-bold text-lg">CyberLion</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Technology that just works.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+14803605964" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(480) 360-5964</span>
              </a>
              <a href="mailto:jordan.boyce@cyberlion.dev" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>jordan.boyce@cyberlion.dev</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Chandler, AZ</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={`service-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Projects</h3>
            <ul className="space-y-2">
              {footerLinks.projects.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} CyberLion Web Solutions. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ in Chandler, AZ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
