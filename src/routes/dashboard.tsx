import { createFileRoute, Outlet, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { TrendingUp, LayoutDashboard, ListChecks, Calculator, BookOpen, BarChart3, LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/trades", label: "Trade Log", icon: ListChecks },
  { to: "/dashboard/calculator", label: "R:R Calculator", icon: Calculator },
  { to: "/dashboard/journal", label: "Daily Journal", icon: BookOpen },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
] as const;

function DashboardLayout() {
  const { session, loading, signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-border bg-card/50 hidden md:flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-border">
          <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <TrendingUp className="size-4 text-primary-foreground" />
          </div>
          <span className="font-bold">TradeTrack Pro</span>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user?.email}</div>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b border-border px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="size-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">TradeTrack Pro</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="size-4" /></Button>
        </header>
        <nav className="md:hidden border-b border-border px-2 py-2 flex gap-1 overflow-x-auto">
          {nav.map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs whitespace-nowrap ${active ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <item.icon className="size-3.5" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
