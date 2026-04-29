import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — TradeTrack Pro" },
      { name: "description", content: "Sign in to your TradeTrack Pro trading journal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/dashboard" });
  }, [loading, session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="size-9 rounded-lg bg-gradient-primary flex items-center justify-center">
            <TrendingUp className="size-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">TradeTrack Pro</span>
        </Link>

        <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-elevated">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your trading dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
