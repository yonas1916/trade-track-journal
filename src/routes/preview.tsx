import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Preview — TradeTrack Pro" },
      { name: "description", content: "See what's under the hood of the TradeTrack Pro Notion template." },
      { property: "og:title", content: "Preview — TradeTrack Pro" },
      { property: "og:description", content: "Trade log, analytics dashboard, and daily journal — inside the template." },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <ProductPreview />
      </main>
      <Footer />
    </div>
  );
}
