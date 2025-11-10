// Root layout - Based on create-next-app template with custom modifications

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberLion Web Solutions | Web Design & Development in Chandler, AZ",
  description: "Small but mighty web development team serving Chandler, Gilbert, Mesa, and Phoenix, AZ. AI-amplified development doing the work of 10+ developers. Custom websites beating DIY platform prices with enterprise quality. Website for Life guarantee included.",
  keywords: [
    "web design Chandler AZ",
    "web development Chandler",
    "website design Phoenix",
    "Chandler web developer",
    "custom website Chandler",
    "web design Gilbert AZ",
    "web design Mesa AZ",
    "affordable web design Arizona",
    "small business website Chandler",
    "e-commerce website Chandler",
    "AI web development",
    "AI-enhanced web development",
    "lean development team",
    "small but mighty web agency",
    "Phoenix metro web design",
    "boutique web development",
    "efficient web development team",
  ],
  authors: [{ name: "CyberLion Web Solutions" }],
  creator: "CyberLion Web Solutions",
  publisher: "CyberLion Web Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberlionwebsolutions.com",
    siteName: "CyberLion Web Solutions",
    title: "CyberLion Web Solutions | Web Design & Development in Chandler, AZ",
    description: "Professional web development serving Chandler, Gilbert, Mesa, and Phoenix. Custom websites starting at $997. Website for Life guarantee.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CyberLion Web Solutions - Chandler AZ Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberLion Web Solutions | Web Design Chandler, AZ",
    description: "Professional web development serving Chandler & Phoenix metro. Custom websites with lifetime support.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // User will need to add this from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://cyberlionwebsolutions.com",
    "name": "CyberLion Web Solutions",
    "description": "Professional web development and design serving Chandler, Gilbert, Mesa, and Phoenix, AZ. Custom websites with AI-enhanced development and lifetime support.",
    "url": "https://cyberlionwebsolutions.com",
    "telephone": "+1-XXX-XXX-XXXX", // User needs to add real phone
    "email": "contact@cyberlionwebsolutions.com", // User needs to add real email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address", // User needs to add
      "addressLocality": "Chandler",
      "addressRegion": "AZ",
      "postalCode": "85224", // User needs to verify
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.3062", // Chandler, AZ approximate
      "longitude": "-111.8413"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Chandler",
        "sameAs": "https://en.wikipedia.org/wiki/Chandler,_Arizona"
      },
      {
        "@type": "City",
        "name": "Gilbert"
      },
      {
        "@type": "City",
        "name": "Mesa"
      },
      {
        "@type": "City",
        "name": "Phoenix"
      },
      {
        "@type": "City",
        "name": "Tempe"
      },
      {
        "@type": "City",
        "name": "Scottsdale"
      }
    ],
    "priceRange": "$997 - $10,000+",
    "openingHours": "Mo-Fr 09:00-17:00",
    "sameAs": [
      "https://www.linkedin.com/company/cyberlion-web-solutions",
      // User should add other social profiles
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Website Package",
            "description": "Custom website up to 5 pages with professional design and mobile responsiveness"
          },
          "price": "997",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Website Package",
            "description": "Full-featured website up to 15 pages with custom CMS and advanced SEO"
          },
          "price": "2497",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Commerce Website",
            "description": "Full online store with payment processing and inventory management"
          },
          "price": "3997",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
