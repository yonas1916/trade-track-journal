import { AlertTriangle, Repeat, BarChart3, Brain, ArrowRight } from "lucide-react";

const problems = [
  { icon: AlertTriangle, title: "No clear tracking system", desc: "Scattered notes and forgotten trades" },
  { icon: Repeat, title: "Repeating the same mistakes", desc: "No system to learn from past errors" },
  { icon: BarChart3, title: "No data-driven decisions", desc: "Trading on feel, not on facts" },
  { icon: Brain, title: "Emotional trading losses", desc: "Revenge trades wipe out your gains" },
];

export function Problem() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">The Problem</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Why most traders <span className="text-destructive">stay stuck</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            If any of these sound familiar, you're not alone — and there's a fix.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-destructive/40 transition-smooth"
            >
              <div className="size-11 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <p.icon className="size-5 text-destructive" />
              </div>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
            This journal solves all of that <ArrowRight className="size-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
