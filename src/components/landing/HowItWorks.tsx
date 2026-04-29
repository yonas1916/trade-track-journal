import { ClipboardList, LineChart, Rocket } from "lucide-react";

const steps = [
  { icon: ClipboardList, num: "01", title: "Log your trades", desc: "Drop your entries, exits, and setups into the dashboard in seconds." },
  { icon: LineChart, num: "02", title: "Analyze your performance", desc: "Watch your win rate, R:R, and equity curve update in real time." },
  { icon: Rocket, num: "03", title: "Improve your strategy", desc: "Use weekly reviews to double down on what works, kill what doesn't." },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">How It Works</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            From chaos to <span className="text-gradient-primary">clarity</span> in 3 steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s) => (
            <div key={s.num} className="relative p-8 rounded-2xl bg-gradient-card border border-border text-center">
              <div className="size-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6">
                <s.icon className="size-7 text-primary-foreground" />
              </div>
              <div className="text-xs font-mono text-primary mb-2">STEP {s.num}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
