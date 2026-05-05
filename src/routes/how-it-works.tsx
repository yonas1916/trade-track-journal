import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — TradeTrack Pro" },
      { name: "description", content: "Go from chaos to clarity in three simple steps with TradeTrack Pro." },
      { property: "og:title", content: "How It Works — TradeTrack Pro" },
      { property: "og:description", content: "Log, analyze, improve — your trading workflow simplified." },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
