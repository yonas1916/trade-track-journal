import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — TradeTrack Pro" },
      { name: "description", content: "TradeTrack Pro is 100% free, forever. No subscriptions, no hidden fees." },
      { property: "og:title", content: "Pricing — TradeTrack Pro" },
      { property: "og:description", content: "Free forever. Everything included." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
