import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

interface Trade {
  pnl: number | null;
  r_multiple: number | null;
  closed_at: string | null;
  status: string;
  symbol: string;
}

function AnalyticsPage() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("trades")
      .select("pnl, r_multiple, closed_at, status, symbol")
      .eq("user_id", user.id)
      .eq("status", "closed")
      .order("closed_at", { ascending: true })
      .then(({ data }) => {
        setTrades((data ?? []) as Trade[]);
        setLoading(false);
      });
  }, [user]);

  // Equity curve
  let cum = 0;
  const equity = trades.map((t, i) => {
    cum += Number(t.pnl) || 0;
    return { i: i + 1, equity: Number(cum.toFixed(2)), date: t.closed_at?.slice(0, 10) ?? "" };
  });

  // Win/Loss
  const wins = trades.filter((t) => (Number(t.pnl) || 0) > 0).length;
  const losses = trades.filter((t) => (Number(t.pnl) || 0) < 0).length;
  const winRate = trades.length ? (wins / trades.length) * 100 : 0;
  const avgWin = wins ? trades.filter((t) => (Number(t.pnl) || 0) > 0).reduce((s, t) => s + (Number(t.pnl) || 0), 0) / wins : 0;
  const avgLoss = losses ? trades.filter((t) => (Number(t.pnl) || 0) < 0).reduce((s, t) => s + (Number(t.pnl) || 0), 0) / losses : 0;
  const profitFactor = avgLoss !== 0 ? Math.abs((avgWin * wins) / (avgLoss * losses)) : 0;

  // By symbol
  const bySymbol: Record<string, number> = {};
  trades.forEach((t) => {
    bySymbol[t.symbol] = (bySymbol[t.symbol] || 0) + (Number(t.pnl) || 0);
  });
  const symbolData = Object.entries(bySymbol).map(([symbol, pnl]) => ({ symbol, pnl: Number(pnl.toFixed(2)) }));

  if (loading) {
    return <div className="text-muted-foreground text-sm">Loading…</div>;
  }

  if (trades.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="mt-10 p-12 rounded-xl border border-border bg-gradient-card text-center">
          <p className="text-muted-foreground">Log some closed trades to see your analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="text-muted-foreground mt-1">Your edge, in numbers.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        <Stat label="Win Rate" value={`${winRate.toFixed(1)}%`} />
        <Stat label="Profit Factor" value={profitFactor.toFixed(2)} />
        <Stat label="Avg Win" value={`$${avgWin.toFixed(2)}`} />
        <Stat label="Avg Loss" value={`$${avgLoss.toFixed(2)}`} />
      </div>

      <div className="mt-10 p-6 rounded-xl border border-border bg-gradient-card">
        <h2 className="font-semibold mb-4">Equity Curve</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={equity}>
              <defs>
                <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.86 0.22 145)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.86 0.22 145)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" />
              <XAxis dataKey="i" stroke="oklch(0.6 0 0)" fontSize={12} />
              <YAxis stroke="oklch(0.6 0 0)" fontSize={12} />
              <Tooltip contentStyle={{ background: "oklch(0.18 0 0)", border: "1px solid oklch(0.3 0 0)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="equity" stroke="oklch(0.86 0.22 145)" fill="url(#eq)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-6 rounded-xl border border-border bg-gradient-card">
        <h2 className="font-semibold mb-4">P&L by Symbol</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={symbolData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" />
              <XAxis dataKey="symbol" stroke="oklch(0.6 0 0)" fontSize={12} />
              <YAxis stroke="oklch(0.6 0 0)" fontSize={12} />
              <Tooltip contentStyle={{ background: "oklch(0.18 0 0)", border: "1px solid oklch(0.3 0 0)", borderRadius: 8 }} />
              <Bar dataKey="pnl" fill="oklch(0.86 0.22 145)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 rounded-xl border border-border bg-gradient-card">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold text-primary">{value}</div>
    </div>
  );
}
