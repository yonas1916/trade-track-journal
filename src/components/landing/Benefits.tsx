import { Check } from "lucide-react";

const benefits = [
  "Stop guessing, start analyzing",
  "Identify your most profitable strategy",
  "Control emotions and avoid revenge trading",
  "Build discipline like a professional trader",
  "Spot losing patterns before they drain your account",
  "Compound small daily improvements into massive gains",
];

export function Benefits() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-card border border-border p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 size-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Outcomes</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
                What changes when you <span className="text-gradient-primary">use this</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                This isn't just another template. It's a system designed to rewire how you trade.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
