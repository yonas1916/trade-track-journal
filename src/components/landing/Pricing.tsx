import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with the essentials",
    features: ["Trade logging dashboard", "Basic R:R calculator", "Simple win rate tracker", "Daily journal page"],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$49",
    sub: "one-time",
    desc: "Everything to trade like a pro",
    features: [
      "Everything in Free",
      "Full analytics dashboard",
      "Strategy tracking system",
      "Psychology & emotion tracker",
      "Weekly & monthly reviews",
      "Lifetime updates",
      "Priority support",
    ],
    cta: "Get Pro Now",
    variant: "hero" as const,
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Simple, <span className="text-gradient-primary">one-time</span> pricing
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">No subscriptions. Pay once, use forever.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative p-8 rounded-2xl bg-gradient-card border transition-smooth ${
                t.popular ? "border-primary/50 shadow-glow" : "border-border"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold">{t.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gradient-primary">{t.price}</span>
                {t.sub && <span className="text-muted-foreground text-sm">{t.sub}</span>}
              </div>
              <Button variant={t.variant} size="lg" className="w-full mt-6">{t.cta}</Button>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="size-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
