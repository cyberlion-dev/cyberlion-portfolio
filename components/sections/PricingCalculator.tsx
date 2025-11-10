// CyberLion Web Solutions - Interactive Pricing Calculator

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calculator,
  Users,
  Clock,
  Smile,
  FileText,
  Zap,
  Package,
  Info,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface PriceBreakdown {
  base: number;
  pages: number;
  features: number;
  clientInvolvement: number;
  urgency: number;
  sarcasm: number;
  total: number;
}

const websiteTypes = [
  { value: "starter", label: "Starter", base: 997, pages: 5 },
  { value: "professional", label: "Professional", base: 2497, pages: 15 },
  { value: "ecommerce", label: "E-Commerce", base: 3997, pages: 25 },
  { value: "enterprise", label: "Enterprise", base: 7500, pages: 50 },
];

const features = [
  { id: "cms", label: "Custom CMS", price: 500 },
  { id: "blog", label: "Blog Section", price: 300 },
  { id: "ecommerce", label: "E-Commerce", price: 1500 },
  { id: "booking", label: "Booking System", price: 797 },
  { id: "analytics", label: "Advanced Analytics", price: 497 },
  { id: "chatbot", label: "AI Chatbot", price: 997 },
  { id: "multilingual", label: "Multilingual", price: 697 },
];

const clientInvolvementLevels = [
  { value: 0, label: "I Trust You Completely", multiplier: 1.0, emoji: "😇" },
  { value: 1, label: "Minimal Check-ins", multiplier: 1.05, emoji: "😊" },
  { value: 2, label: "Regular Updates", multiplier: 1.15, emoji: "🙂" },
  { value: 3, label: "I Have Opinions", multiplier: 1.3, emoji: "🤔" },
  { value: 4, label: "My Cousin Does Web Design", multiplier: 1.5, emoji: "😅" },
  { value: 5, label: "I'll Be Project Managing This", multiplier: 2.0, emoji: "😰" },
];

const urgencyLevels = [
  { value: 0, label: "Whenever It's Ready", multiplier: 1.0, emoji: "😌" },
  { value: 1, label: "4-6 Weeks", multiplier: 1.0, emoji: "🙂" },
  { value: 2, label: "2-3 Weeks", multiplier: 1.2, emoji: "⚡" },
  { value: 3, label: "1 Week (Possible but Painful)", multiplier: 1.5, emoji: "😬" },
  { value: 4, label: "Yesterday (Time Machine Not Included)", multiplier: 2.5, emoji: "🚀💸" },
];

const sarcasmLevels = [
  { value: 0, label: "Professional & Boring", price: 0, emoji: "😐" },
  { value: 1, label: "Subtle Wit", price: 100, emoji: "😏" },
  { value: 2, label: "Clever & Edgy", price: 300, emoji: "😎" },
  { value: 3, label: "Full Snark Mode", price: 500, emoji: "🤣" },
];

export default function PricingCalculator() {
  const [websiteType, setWebsiteType] = useState(websiteTypes[1]); // Professional default
  const [pageCount, setPageCount] = useState(10);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [clientInvolvement, setClientInvolvement] = useState(1);
  const [urgency, setUrgency] = useState(1);
  const [sarcasm, setSarcasm] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculatePrice = (): PriceBreakdown => {
    // Base price for website type
    const base = websiteType.base;

    // Extra pages beyond included amount
    const extraPages = Math.max(0, pageCount - websiteType.pages);
    const pagePrice = extraPages * 50; // $50 per extra page

    // Features total
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);

    // Sarcasm level
    const sarcasmPrice = sarcasmLevels[sarcasm].price;

    // Calculate subtotal before multipliers
    const subtotal = base + pagePrice + featuresPrice + sarcasmPrice;

    // Apply multipliers
    const involvementMultiplier = clientInvolvementLevels[clientInvolvement].multiplier;
    const urgencyMultiplier = urgencyLevels[urgency].multiplier;

    const involvementCost = subtotal * (involvementMultiplier - 1);
    const urgencyCost = subtotal * (urgencyMultiplier - 1);

    const total = Math.round(subtotal * involvementMultiplier * urgencyMultiplier);

    return {
      base,
      pages: pagePrice,
      features: featuresPrice,
      clientInvolvement: Math.round(involvementCost),
      urgency: Math.round(urgencyCost),
      sarcasm: sarcasmPrice,
      total,
    };
  };

  const breakdown = calculatePrice();

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold border-primary/50 text-primary">
            <Calculator className="w-4 h-4 mr-2 inline" />
            Interactive Pricing
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build Your{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Custom Quote
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Honesty meets humor. Slide the controls to see how your choices (and your &quot;help&quot;) affect the price.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Calculator Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Website Type */}
            <Card className="p-6 bg-card/80 backdrop-blur border-2">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Website Type</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {websiteTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setWebsiteType(type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      websiteType.value === type.value
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-bold text-lg">{type.label}</div>
                    <div className="text-sm text-muted-foreground">${type.base.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground mt-1">Up to {type.pages} pages</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Page Count */}
            <Card className="p-6 bg-card/80 backdrop-blur border-2">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Number of Pages</h3>
                <div className="ml-auto text-2xl font-bold text-primary">{pageCount}</div>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1 page</span>
                {pageCount > websiteType.pages && (
                  <span className="text-orange-500 font-medium">
                    +${(pageCount - websiteType.pages) * 50} for {pageCount - websiteType.pages} extra pages
                  </span>
                )}
                <span>50 pages</span>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6 bg-card/80 backdrop-blur border-2">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Features & Add-ons</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedFeatures.includes(feature.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{feature.label}</span>
                      <span className="text-sm text-primary">+${feature.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Client Involvement (Humorous) */}
            <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-bold">Client Involvement Level</h3>
                <div className="ml-auto text-3xl">{clientInvolvementLevels[clientInvolvement].emoji}</div>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">{clientInvolvementLevels[clientInvolvement].label}</span>
                  {clientInvolvement > 2 && (
                    <Badge variant="outline" className="border-orange-500 text-orange-500">
                      {Math.round((clientInvolvementLevels[clientInvolvement].multiplier - 1) * 100)}% markup
                    </Badge>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={clientInvolvement}
                onChange={(e) => setClientInvolvement(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>😇 Dream Client</span>
                <span>😰 &quot;I&apos;ll manage&quot;</span>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-background/50 border border-orange-500/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Info className="w-4 h-4 inline mr-1 text-orange-500" />
                  We love collaboration! But extensive revisions, scope changes, and &quot;my nephew said...&quot;
                  feedback loops do extend timelines. This helps us stay honest about the cost.
                </p>
              </div>
            </Card>

            {/* Urgency */}
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-bold">Timeline / Urgency</h3>
                <div className="ml-auto text-3xl">{urgencyLevels[urgency].emoji}</div>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">{urgencyLevels[urgency].label}</span>
                  {urgency > 1 && (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      {Math.round((urgencyLevels[urgency].multiplier - 1) * 100)}% rush fee
                    </Badge>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={urgency}
                onChange={(e) => setUrgency(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>😌 Normal pace</span>
                <span>🚀 Yesterday!</span>
              </div>
            </Card>

            {/* Sarcasm Level */}
            <Card className="p-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Smile className="w-5 h-5 text-violet-500" />
                <h3 className="text-xl font-bold">Website Personality / Sarcasm Level</h3>
                <div className="ml-auto text-3xl">{sarcasmLevels[sarcasm].emoji}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sarcasmLevels.map((level, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSarcasm(idx)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      sarcasm === idx
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-border hover:border-violet-500/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{level.emoji}</div>
                    <div className="font-medium text-sm">{level.label}</div>
                    {level.price > 0 && (
                      <div className="text-xs text-violet-500 mt-1">+${level.price}</div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-background/50 border border-violet-500/20">
                <p className="text-sm text-muted-foreground">
                  Want copy that makes people smile? We can sprinkle in wit, humor, and personality that matches your brand.
                </p>
              </div>
            </Card>
          </div>

          {/* Price Display - Sticky */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-2 border-primary/50 bg-card/90 backdrop-blur sticky top-24">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Estimated Total</span>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  ${breakdown.total.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">One-time build cost</p>
              </div>

              {/* Annual Support */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Annual Support</span>
                  <span className="text-lg font-bold text-primary">
                    ${Math.round(breakdown.total * 0.15)}/year
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Security, updates, bug fixes, content changes
                </p>
              </div>

              {/* Show Breakdown Toggle */}
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full mb-4 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors text-sm font-medium flex items-center justify-between"
              >
                <span>View Price Breakdown</span>
                <AlertCircle className="w-4 h-4" />
              </button>

              {/* Breakdown */}
              {showBreakdown && (
                <div className="space-y-2 mb-6 p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex justify-between text-sm">
                    <span>Base ({websiteType.label})</span>
                    <span className="font-medium">${breakdown.base.toLocaleString()}</span>
                  </div>
                  {breakdown.pages > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Extra Pages</span>
                      <span className="font-medium">+${breakdown.pages.toLocaleString()}</span>
                    </div>
                  )}
                  {breakdown.features > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Features</span>
                      <span className="font-medium">+${breakdown.features.toLocaleString()}</span>
                    </div>
                  )}
                  {breakdown.sarcasm > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Personality/Wit</span>
                      <span className="font-medium">+${breakdown.sarcasm.toLocaleString()}</span>
                    </div>
                  )}
                  {breakdown.clientInvolvement > 0 && (
                    <div className="flex justify-between text-sm text-orange-500">
                      <span>&quot;Help&quot; Multiplier 😅</span>
                      <span className="font-medium">+${breakdown.clientInvolvement.toLocaleString()}</span>
                    </div>
                  )}
                  {breakdown.urgency > 0 && (
                    <div className="flex justify-between text-sm text-blue-500">
                      <span>Rush Fee</span>
                      <span className="font-medium">+${breakdown.urgency.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-border flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">${breakdown.total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link href="#contact">
                <Button size="lg" className="w-full group">
                  Get Started with This Quote
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <p className="text-xs text-center text-muted-foreground mt-4">
                This is an estimate. Final pricing may vary based on specific requirements.
              </p>
            </Card>
          </div>
        </div>

        {/* Fun Disclaimer */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-6 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 border-2 border-primary/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-2">About This Calculator</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yes, we&apos;re being a bit cheeky with the &quot;client involvement&quot; slider. But here&apos;s the truth:
                  the more clarity you have about your vision upfront, the faster and cheaper your project will be.
                  Collaborative clients who trust our expertise get amazing results. Micromanagement and constant scope
                  changes? That genuinely does increase cost and timeline. We&apos;d rather be honest than surprise you later!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
