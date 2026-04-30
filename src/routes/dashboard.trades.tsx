import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, ImageIcon, X, Pencil, ClipboardPaste } from "lucide-react";

export const Route = createFileRoute("/dashboard/trades")({
  component: TradesPage,
});

interface Trade {
  id: string;
  symbol: string;
  direction: "long" | "short";
  entry_price: number;
  exit_price: number | null;
  position_size: number;
  stop_loss: number | null;
  take_profit: number | null;
  pnl: number | null;
  r_multiple: number | null;
  strategy: string | null;
  emotion: string | null;
  notes: string | null;
  closed_at: string | null;
  opened_at: string;
  screenshot_before_url: string | null;
  screenshot_after_url: string | null;
}

const BUCKET = "trade-screenshots";

async function getSignedUrl(path: string | null) {
  if (!path) return null;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

function TradesPage() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const load = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("opened_at", { ascending: false });
    if (error) toast.error(error.message);
    setTrades((data ?? []) as Trade[]);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const handleDelete = async (t: Trade) => {
    const paths = [t.screenshot_before_url, t.screenshot_after_url].filter(Boolean) as string[];
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    const { error } = await supabase.from("trades").delete().eq("id", t.id);
    if (error) return toast.error(error.message);
    toast.success("Trade deleted");
    load();
  };

  const openPreview = async (path: string | null) => {
    const url = await getSignedUrl(path);
    if (url) setPreviewUrl(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trade Log</h1>
          <p className="text-muted-foreground mt-1">Every trade. Every detail.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus /> Log Trade</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gradient-card border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>New Trade</DialogTitle></DialogHeader>
            <TradeForm onSaved={() => { setOpen(false); load(); }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-gradient-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Loading…</div>
        ) : trades.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No trades yet. Log your first trade above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Symbol</th>
                  <th className="text-left px-4 py-3">Side</th>
                  <th className="text-right px-4 py-3">Entry</th>
                  <th className="text-right px-4 py-3">Exit</th>
                  <th className="text-right px-4 py-3">P&L</th>
                  <th className="text-right px-4 py-3">R</th>
                  <th className="text-left px-4 py-3">Charts</th>
                  <th className="text-left px-4 py-3">Strategy</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {trades.map((t) => (
                  <tr key={t.id} className="border-t border-border hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold">{t.symbol}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 ${t.direction === "long" ? "text-primary" : "text-destructive"}`}>
                        {t.direction === "long" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {t.direction}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{Number(t.entry_price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{t.exit_price != null ? Number(t.exit_price).toFixed(2) : "—"}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${(Number(t.pnl) || 0) >= 0 ? "text-primary" : "text-destructive"}`}>
                      {t.pnl != null ? `$${Number(t.pnl).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">{t.r_multiple != null ? `${Number(t.r_multiple).toFixed(2)}R` : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {t.screenshot_before_url ? (
                          <button
                            onClick={() => openPreview(t.screenshot_before_url)}
                            className="text-xs px-2 py-1 rounded bg-muted/40 hover:bg-muted text-muted-foreground inline-flex items-center gap-1"
                            title="Before entry"
                          >
                            <ImageIcon className="size-3" /> Before
                          </button>
                        ) : null}
                        {t.screenshot_after_url ? (
                          <button
                            onClick={() => openPreview(t.screenshot_after_url)}
                            className="text-xs px-2 py-1 rounded bg-muted/40 hover:bg-muted text-muted-foreground inline-flex items-center gap-1"
                            title="After trade"
                          >
                            <ImageIcon className="size-3" /> After
                          </button>
                        ) : null}
                        {!t.screenshot_before_url && !t.screenshot_after_url ? (
                          <span className="text-muted-foreground">—</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.strategy ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(t.opened_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEditing(t)} title="Edit">
                          <Pencil className="size-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(t)} title="Delete">
                          <Trash2 className="size-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl bg-gradient-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Trade</DialogTitle></DialogHeader>
          {editing && (
            <TradeForm
              trade={editing}
              onSaved={() => { setEditing(null); load(); }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!previewUrl} onOpenChange={(o) => !o && setPreviewUrl(null)}>
        <DialogContent className="max-w-4xl bg-background border-border">
          <DialogHeader><DialogTitle>Chart screenshot</DialogTitle></DialogHeader>
          {previewUrl && <img src={previewUrl} alt="Chart screenshot" className="w-full h-auto rounded-lg" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ImageField({
  label,
  file,
  existingPath,
  onChange,
  onClearExisting,
}: {
  label: string;
  file: File | null;
  existingPath?: string | null;
  onChange: (f: File | null) => void;
  onClearExisting?: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [existingUrl, setExistingUrl] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    let active = true;
    if (existingPath && !file) {
      getSignedUrl(existingPath).then((u) => { if (active) setExistingUrl(u); });
    } else {
      setExistingUrl(null);
    }
    return () => { active = false; };
  }, [existingPath, file]);

  const handlePaste = (e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"));
    if (item) {
      const f = item.getAsFile();
      if (f) {
        onChange(f);
        toast.success(`Pasted ${label.toLowerCase()}`);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) onChange(f);
  };

  const showUrl = preview || existingUrl;

  return (
    <div>
      <Label>{label}</Label>
      <div
        ref={dropRef}
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        tabIndex={0}
        className="mt-1 rounded-lg border border-dashed border-border bg-muted/10 p-3 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {showUrl ? (
          <div className="relative">
            <img src={showUrl} alt={label} className="w-full max-h-40 object-contain rounded" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 bg-background/80"
              onClick={() => { onChange(null); onClearExisting?.(); }}
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground flex items-center gap-1 py-2">
            <ClipboardPaste className="size-3" /> Paste, drop, or choose a file
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="cursor-pointer mt-2"
        />
      </div>
    </div>
  );
}

function TradeForm({ trade, onSaved }: { trade?: Trade; onSaved: () => void }) {
  const { user } = useAuth();
  const isEdit = !!trade;
  const [form, setForm] = useState({
    symbol: trade?.symbol ?? "",
    direction: (trade?.direction ?? "long") as "long" | "short",
    entry_price: trade?.entry_price?.toString() ?? "",
    exit_price: trade?.exit_price?.toString() ?? "",
    position_size: trade?.position_size?.toString() ?? "1",
    stop_loss: trade?.stop_loss?.toString() ?? "",
    take_profit: trade?.take_profit?.toString() ?? "",
    strategy: trade?.strategy ?? "",
    emotion: trade?.emotion ?? "",
    notes: trade?.notes ?? "",
  });
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [keepBefore, setKeepBefore] = useState<string | null>(trade?.screenshot_before_url ?? null);
  const [keepAfter, setKeepAfter] = useState<string | null>(trade?.screenshot_after_url ?? null);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const uploadShot = async (file: File, kind: "before" | "after") => {
    if (!user) return null;
    const ext = (file.name.split(".").pop() || file.type.split("/")[1] || "png").toLowerCase();
    const path = `${user.id}/${Date.now()}-${kind}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      toast.error(`Upload failed: ${error.message}`);
      return null;
    }
    return path;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const entry = Number(form.entry_price);
    const exit = form.exit_price ? Number(form.exit_price) : null;
    const size = Number(form.position_size) || 1;
    const stop = form.stop_loss ? Number(form.stop_loss) : null;

    let pnl: number | null = null;
    let r: number | null = null;
    if (exit != null) {
      pnl = (form.direction === "long" ? exit - entry : entry - exit) * size;
      if (stop != null) {
        const risk = Math.abs(entry - stop) * size;
        r = risk > 0 ? pnl / risk : null;
      }
    }

    // Determine final image paths
    let beforePath = keepBefore;
    let afterPath = keepAfter;

    if (beforeFile) {
      // remove old if replacing
      if (trade?.screenshot_before_url && trade.screenshot_before_url !== keepBefore) {
        await supabase.storage.from(BUCKET).remove([trade.screenshot_before_url]);
      } else if (trade?.screenshot_before_url) {
        await supabase.storage.from(BUCKET).remove([trade.screenshot_before_url]);
      }
      beforePath = await uploadShot(beforeFile, "before");
    } else if (trade?.screenshot_before_url && !keepBefore) {
      await supabase.storage.from(BUCKET).remove([trade.screenshot_before_url]);
      beforePath = null;
    }

    if (afterFile) {
      if (trade?.screenshot_after_url) {
        await supabase.storage.from(BUCKET).remove([trade.screenshot_after_url]);
      }
      afterPath = await uploadShot(afterFile, "after");
    } else if (trade?.screenshot_after_url && !keepAfter) {
      await supabase.storage.from(BUCKET).remove([trade.screenshot_after_url]);
      afterPath = null;
    }

    const payload = {
      user_id: user.id,
      symbol: form.symbol.toUpperCase(),
      direction: form.direction,
      entry_price: entry,
      exit_price: exit,
      position_size: size,
      stop_loss: stop,
      take_profit: form.take_profit ? Number(form.take_profit) : null,
      pnl,
      r_multiple: r,
      strategy: form.strategy || null,
      emotion: form.emotion || null,
      notes: form.notes || null,
      status: exit != null ? "closed" : "open",
      closed_at: exit != null ? (trade?.closed_at ?? new Date().toISOString()) : null,
      screenshot_before_url: beforePath,
      screenshot_after_url: afterPath,
    };

    const { error } = isEdit
      ? await supabase.from("trades").update(payload).eq("id", trade!.id)
      : await supabase.from("trades").insert(payload);

    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success(isEdit ? "Trade updated" : "Trade saved");
    onSaved();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Symbol</Label>
          <Input value={form.symbol} onChange={(e) => set("symbol", e.target.value)} required placeholder="EURUSD" className="mt-1" />
        </div>
        <div>
          <Label>Direction</Label>
          <Select value={form.direction} onValueChange={(v) => set("direction", v)}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Entry price</Label>
          <Input type="number" step="any" value={form.entry_price} onChange={(e) => set("entry_price", e.target.value)} required className="mt-1" />
        </div>
        <div>
          <Label>Exit price (leave blank if open)</Label>
          <Input type="number" step="any" value={form.exit_price} onChange={(e) => set("exit_price", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Position size</Label>
          <Input type="number" step="any" value={form.position_size} onChange={(e) => set("position_size", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Stop loss</Label>
          <Input type="number" step="any" value={form.stop_loss} onChange={(e) => set("stop_loss", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Take profit</Label>
          <Input type="number" step="any" value={form.take_profit} onChange={(e) => set("take_profit", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Strategy</Label>
          <Input value={form.strategy} onChange={(e) => set("strategy", e.target.value)} placeholder="Breakout, Pullback…" className="mt-1" />
        </div>
        <div className="col-span-2">
          <Label>Emotion</Label>
          <Input value={form.emotion} onChange={(e) => set("emotion", e.target.value)} placeholder="Calm, FOMO, revenge…" className="mt-1" />
        </div>
        <div className="col-span-2">
          <Label>Notes</Label>
          <Textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} className="mt-1" />
        </div>
        <ImageField
          label="Chart before entry"
          file={beforeFile}
          existingPath={keepBefore}
          onChange={setBeforeFile}
          onClearExisting={() => setKeepBefore(null)}
        />
        <ImageField
          label="Chart after trade"
          file={afterFile}
          existingPath={keepAfter}
          onChange={setAfterFile}
          onClearExisting={() => setKeepAfter(null)}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Tip: copy a screenshot (e.g. Win+Shift+S / Cmd+Ctrl+Shift+4) then click an image box and press Ctrl/Cmd+V to paste.
      </p>
      <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
        {submitting ? "Saving…" : isEdit ? "Update trade" : "Save trade"}
      </Button>
    </form>
  );
}
