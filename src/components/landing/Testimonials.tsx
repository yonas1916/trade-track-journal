import { Star } from "lucide-react";

const reviews = [
  { name: "Marcus T.", role: "Forex Trader · 3 yrs", text: "Went from blowing accounts to consistent monthly profits. The emotion tracker alone was a game-changer.", initial: "M" },
  { name: "Priya S.", role: "Crypto Day Trader", text: "I finally see which setups actually make me money. Cut my losing strategies in week one.", initial: "P" },
  { name: "Devon K.", role: "Swing Trader", text: "Cleanest journal I've used. Notion makes it flexible and the analytics are surprisingly powerful.", initial: "D" },
  { name: "Lina H.", role: "Beginner Trader", text: "I'm 6 months in and already profitable. This taught me discipline before I could lose serious money.", initial: "L" },
];

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Loved by <span className="text-gradient-primary">2,400+ traders</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {reviews.map((r) => (
            <div key={r.name} className="p-7 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-smooth">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">
                  {r.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
