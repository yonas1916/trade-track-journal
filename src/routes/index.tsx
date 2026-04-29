import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TradeTrack Pro — Notion Trading Journal for Serious Traders" },
      { name: "description", content: "Track every trade, analyze your performance, and build the discipline of a pro trader. The #1 Notion trading journal for forex and crypto." },
      { property: "og:title", content: "TradeTrack Pro — Notion Trading Journal" },
      { property: "og:description", content: "Track every trade. Improve every day. The Notion journal that transforms how you trade." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <ProductPreview />
        <Benefits />
        <Testimonials />
        <Pricing />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
