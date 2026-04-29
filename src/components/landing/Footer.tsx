import { LineChart, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <LineChart className="size-4 text-primary-foreground" />
              </div>
              TradeTrack <span className="text-primary">Pro</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              The Notion trading journal that turns scattered trades into consistent profits.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-smooth">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-smooth">Pricing</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-smooth">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Connect</h4>
            <div className="flex gap-3">
              {[Twitter, Instagram, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-smooth"
                  aria-label="social"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">hello@tradetrackpro.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 TradeTrack Pro. All rights reserved.</span>
          <span>Built for traders who refuse to stay average.</span>
        </div>
      </div>
    </footer>
  );
}
