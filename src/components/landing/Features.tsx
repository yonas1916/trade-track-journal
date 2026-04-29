import {
  Table, Calculator, PieChart, Target, HeartPulse, BookOpen, CalendarRange,
} from "lucide-react";

const features = [
  { icon: Table, title: "Trade Logging Dashboard", desc: "Capture every entry, exit, and setup in a structured, searchable table." },
  { icon: Calculator, title: "Auto Risk-to-Reward", desc: "Calculates R:R automatically so you can size positions with confidence." },
  { icon: PieChart, title: "Win Rate & Analytics", desc: "Real-time win rate, profit factor, and equity curve at a glance." },
  { icon: Target, title: "Strategy Tracking", desc: "Tag setups and discover which strategies actually print money." },
  { icon: HeartPulse, title: "Psychology & Emotion", desc: "Log mood, FOMO, and discipline to master your inner game." },
  { icon: BookOpen, title: "Daily Trading Journal", desc: "Reflection prompts that turn every session into a lesson." },
  { icon: CalendarRange, title: "Weekly & Monthly Reviews", desc: "Built-in review system to spot patterns and compound progress." },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Features</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Everything you need to <span className="text-gradient-primary">trade smarter</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Seven powerful systems, one beautifully designed Notion workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-7 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-smooth overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 size-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="relative">
                <div className="size-12 rounded-xl bg-gradient-primary/10 border border-primary/30 flex items-center justify-center mb-5 group-hover:shadow-glow transition-smooth">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
              {i === 6 && (
                <div className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                  PRO
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
