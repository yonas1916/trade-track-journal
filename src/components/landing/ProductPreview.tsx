import trades from "@/assets/preview-trades.jpg";
import analytics from "@/assets/preview-analytics.jpg";
import journal from "@/assets/preview-journal.jpg";

const previews = [
  { img: trades, title: "Trade Log Table", caption: "Every trade tracked with entry, exit, R:R, and P&L — fully sortable." },
  { img: analytics, title: "Analytics Dashboard", caption: "Win rate, equity curve, and strategy breakdown updated live." },
  { img: journal, title: "Daily Journal Page", caption: "Reflect on emotions, mistakes, and lessons after every session." },
];

export function ProductPreview() {
  return (
    <section id="preview" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Inside the Template</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            See what's <span className="text-gradient-primary">under the hood</span>
          </h2>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {previews.map((p, i) => (
            <div
              key={p.title}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-card bg-gradient-card group">
                <div className="absolute -inset-2 bg-gradient-primary opacity-0 group-hover:opacity-30 blur-2xl transition-smooth -z-10" />
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={896} className="w-full h-auto" />
              </div>
              <div>
                <div className="text-xs font-mono text-primary mb-3">0{i + 1} / 03</div>
                <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
