import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — TradeTrack Pro" },
      { name: "description", content: "Answers to common questions about TradeTrack Pro." },
      { property: "og:title", content: "FAQ — TradeTrack Pro" },
      { property: "og:description", content: "Got questions? We've got answers." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
