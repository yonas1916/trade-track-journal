import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TrendingUp, TrendingDown, Target, DollarSign } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: OverviewPage,
});

interface Trade {
  pnl: number | null;
  r_multiple: number | null;
  status: string;
}

function OverviewPage() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("trades")
      .select("pnl, r_multiple, status")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setTrades(data ?? []);
        setLoading(false);
      });
  }, [user]);

  const closed = trades.filter((t) => t.status === "closed");
  const totalPnl = closed.reduce((s, t) => s + (Number(t.pnl) || 0), 0);
  const wins = closed.filter((t) => (Number(t.pnl) || 0) > 0).length;
  const winRate = closed.length ? (wins / closed.length) * 100 : 0;
  const avgR = closed.length ? closed.reduce((s, t) => s + (Number(t.r_multiple) || 0), 0) / closed.length : 0;

  const stats = [
    { label: "Total P&L", value: `$${totalPnl.toFixed(2)}`, icon: DollarSign, accent: totalPnl >= 0 ? "text-primary" : "text-destructive" },
    { label: "Win Rate", value: `${winRate.toFixed(1)}%`, icon: Target, accent: "text-primary" },
    { label: "Avg R-Multiple", value: avgR.toFixed(2) + "R", icon: TrendingUp, accent: "text-primary" },
    { label: "Total Trades", value: String(closed.length), icon: TrendingDown, accent: "text-foreground" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Overview</h1>
      <p className="text-muted-foreground mt-1">Snapshot of your trading performance.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-border bg-gradient-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`size-4 ${s.accent}`} />
            </div>
            <div className={`mt-3 text-2xl font-bold ${s.accent}`}>{loading ? "—" : s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-8 rounded-xl border border-border bg-gradient-card text-center">
        <h2 className="text-xl font-semibold">Welcome to your trading journal</h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          Log your first trade in the Trade Log, plan setups with the R:R Calculator, and reflect daily in the Journal.
        </p>
      </div>
    </div>
  );
}
