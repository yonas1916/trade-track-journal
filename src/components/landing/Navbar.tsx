import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LineChart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const links = [
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/preview", label: "Preview" },
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
  ] as const;

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <LineChart className="size-4 text-primary-foreground" />
          </div>
          TradeTrack <span className="text-primary">Pro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-foreground transition-smooth" activeProps={{ className: "text-foreground font-semibold" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login"><Button variant="hero" size="sm">Sign in</Button></Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground">
              {l.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button variant="hero" size="sm" className="w-full">Sign in</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
