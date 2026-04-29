import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/journal")({
  component: JournalPage,
});

interface Entry {
  id: string;
  entry_date: string;
  mindset_rating: number | null;
  market_notes: string | null;
  lessons: string | null;
  mistakes: string | null;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function JournalPage() {
  const { user } = useAuth();
  const [date, setDate] = useState(todayStr());
  const [entry, setEntry] = useState<Entry | null>(null);
  const [form, setForm] = useState({ mindset_rating: "5", market_notes: "", lessons: "", mistakes: "" });
  const [recent, setRecent] = useState<Entry[]>([]);
  const [saving, setSaving] = useState(false);

  const loadEntry = async (d: string) => {
    if (!user) return;
    const { data } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("entry_date", d)
      .maybeSingle();
    if (data) {
      setEntry(data as Entry);
      setForm({
        mindset_rating: String(data.mindset_rating ?? 5),
        market_notes: data.market_notes ?? "",
        lessons: data.lessons ?? "",
        mistakes: data.mistakes ?? "",
      });
    } else {
      setEntry(null);
      setForm({ mindset_rating: "5", market_notes: "", lessons: "", mistakes: "" });
    }
  };

  const loadRecent = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("entry_date", { ascending: false })
      .limit(7);
    setRecent((data ?? []) as Entry[]);
  };

  useEffect(() => { loadEntry(date); /* eslint-disable-next-line */ }, [user, date]);
  useEffect(() => { loadRecent(); /* eslint-disable-next-line */ }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const payload = {
      user_id: user.id,
      entry_date: date,
      mindset_rating: Number(form.mindset_rating) || null,
      market_notes: form.market_notes || null,
      lessons: form.lessons || null,
      mistakes: form.mistakes || null,
    };
    const { error } = entry
      ? await supabase.from("journal_entries").update(payload).eq("id", entry.id)
      : await supabase.from("journal_entries").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Journal saved");
    loadEntry(date);
    loadRecent();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Daily Journal</h1>
      <p className="text-muted-foreground mt-1">Reflect, learn, repeat.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <form onSubmit={save} className="p-6 rounded-xl border border-border bg-gradient-card space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Mindset (1–10)</Label>
              <Input type="number" min="1" max="10" value={form.mindset_rating} onChange={(e) => setForm((f) => ({ ...f, mindset_rating: e.target.value }))} className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Market notes</Label>
            <Textarea rows={4} value={form.market_notes} onChange={(e) => setForm((f) => ({ ...f, market_notes: e.target.value }))} placeholder="What did the market do today?" className="mt-1" />
          </div>
          <div>
            <Label>Lessons learned</Label>
            <Textarea rows={3} value={form.lessons} onChange={(e) => setForm((f) => ({ ...f, lessons: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <Label>Mistakes to avoid</Label>
            <Textarea rows={3} value={form.mistakes} onChange={(e) => setForm((f) => ({ ...f, mistakes: e.target.value }))} className="mt-1" />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={saving}>
            {saving ? "Saving…" : entry ? "Update entry" : "Save entry"}
          </Button>
        </form>

        <aside>
          <h2 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Recent</h2>
          <div className="space-y-2">
            {recent.length === 0 && <p className="text-sm text-muted-foreground">No entries yet.</p>}
            {recent.map((r) => (
              <button
                key={r.id}
                onClick={() => setDate(r.entry_date)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  r.entry_date === date ? "border-primary/50 bg-primary/5" : "border-border bg-gradient-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{r.entry_date}</span>
                  <span className="text-xs text-muted-foreground">Mood {r.mindset_rating ?? "—"}/10</span>
                </div>
                {r.market_notes && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.market_notes}</p>}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
