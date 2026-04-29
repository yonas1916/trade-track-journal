import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Trade logging dashboard",
  "Basic R:R calculator",
  "Win rate tracker",
  "Daily journal page",
  "Full analytics dashboard",
  "Strategy tracking system",
  "Psychology & emotion tracker",
  "Weekly & monthly reviews",
  "Lifetime updates",
  "Priority support",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            100% <span className="text-gradient-primary">Free</span> — Forever
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">No subscriptions. No catch. Get the full template at no cost.</p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="relative p-8 rounded-2xl bg-gradient-card border border-primary/50 shadow-glow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
              EVERYTHING INCLUDED
            </div>
            <h3 className="text-2xl font-bold">Free Forever</h3>
            <p className="text-muted-foreground text-sm mt-1">The complete TradeTrack Pro experience</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-gradient-primary">$0</span>
              <span className="text-muted-foreground text-sm">forever</span>
            </div>
            <Button variant="hero" size="lg" className="w-full mt-6">Get It Free</Button>
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="size-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
