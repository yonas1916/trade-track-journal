import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/calculator")({
  component: CalculatorPage,
});

function CalculatorPage() {
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [accountSize, setAccountSize] = useState("10000");
  const [riskPct, setRiskPct] = useState("1");
  const [entry, setEntry] = useState("");
  const [stop, setStop] = useState("");
  const [target, setTarget] = useState("");

  const calc = useMemo(() => {
    const acct = Number(accountSize) || 0;
    const risk = (Number(riskPct) / 100) * acct;
    const e = Number(entry);
    const s = Number(stop);
    const t = Number(target);
    if (!e || !s) return null;
    const stopDist = Math.abs(e - s);
    const positionSize = stopDist > 0 ? risk / stopDist : 0;
    const reward = t ? Math.abs(t - e) : 0;
    const rr = stopDist > 0 ? reward / stopDist : 0;
    const potentialProfit = positionSize * reward;
    const validDirection =
      direction === "long" ? s < e && (!t || t > e) : s > e && (!t || t < e);
    return { risk, stopDist, positionSize, rr, potentialProfit, validDirection };
  }, [accountSize, riskPct, entry, stop, target, direction]);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold">Risk : Reward Calculator</h1>
      <p className="text-muted-foreground mt-1">Plan your position size before you click buy.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-xl border border-border bg-gradient-card space-y-4">
          <div>
            <Label>Direction</Label>
            <Select value={direction} onValueChange={(v) => setDirection(v as "long" | "short")}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Account size ($)</Label>
            <Input type="number" value={accountSize} onChange={(e) => setAccountSize(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Risk per trade (%)</Label>
            <Input type="number" step="0.1" value={riskPct} onChange={(e) => setRiskPct(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Entry price</Label>
            <Input type="number" step="any" value={entry} onChange={(e) => setEntry(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Stop loss</Label>
            <Input type="number" step="any" value={stop} onChange={(e) => setStop(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Take profit (optional)</Label>
            <Input type="number" step="any" value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1" />
          </div>
        </div>

        <div className="p-6 rounded-xl border border-primary/30 bg-gradient-card space-y-5">
          <h2 className="font-semibold">Results</h2>
          {!calc ? (
            <p className="text-muted-foreground text-sm">Enter entry and stop to calculate.</p>
          ) : (
            <>
              {!calc.validDirection && (
                <p className="text-xs text-destructive">Stop / target placement doesn't match {direction} direction.</p>
              )}
              <Stat label="Risk amount" value={`$${calc.risk.toFixed(2)}`} />
              <Stat label="Stop distance" value={calc.stopDist.toFixed(4)} />
              <Stat label="Position size (units)" value={calc.positionSize.toFixed(2)} highlight />
              <Stat label="Risk : Reward" value={calc.rr ? `1 : ${calc.rr.toFixed(2)}` : "—"} highlight />
              <Stat label="Potential profit" value={calc.potentialProfit ? `$${calc.potentialProfit.toFixed(2)}` : "—"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-semibold ${highlight ? "text-primary text-lg" : ""}`}>{value}</span>
    </div>
  );
}
