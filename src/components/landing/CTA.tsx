import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-primary/30 bg-gradient-card p-12 md:p-20 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-96 bg-primary/20 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Start Trading Like a <span className="text-gradient-primary">Professional</span>
            </h2>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your results won't change until your system does.
            </p>
            <div className="mt-10">
              <Button variant="hero" size="xl" className="animate-glow">
                Get the Journal Now <ArrowRight />
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Instant access · Lifetime updates · 30-day guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
}
