import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — TradeTrack Pro" },
      { name: "description", content: "Seven powerful systems built into a beautifully designed Notion trading workspace." },
      { property: "og:title", content: "Features — TradeTrack Pro" },
      { property: "og:description", content: "Everything you need to trade smarter." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Features />
      </main>
      <Footer />
    </div>
  );
}
