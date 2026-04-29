import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-dashboard.jpg";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium text-primary mb-8">
            <TrendingUp className="size-3" />
            Built for serious traders · 100% free
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Track Every Trade.<br />
            <span className="text-gradient-primary">Improve Every Day.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful trading journal to help you analyze performance,
            control emotions, and grow your account — one trade at a time.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="hero" size="xl">
                Start Free <ArrowRight />
              </Button>
            </Link>
            <a href="#preview">
              <Button variant="outline" size="xl">
                <Play /> View Demo
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>⭐ 4.9/5 from 2,400+ traders</span>
            <span className="hidden sm:inline">· Lifetime updates · Works on any device</span>
          </div>
        </div>

        <div className="mt-20 max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-elevated bg-gradient-card">
            <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-2xl -z-10" />
            <img
              src={heroImg}
              alt="TradeTrack Pro trading journal dashboard preview"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
