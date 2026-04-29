import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

const NOTION_TEMPLATE_URL = "https://www.notion.so/templates";

interface EmailCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailCaptureDialog({ open, onOpenChange }: EmailCaptureDialogProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setError("");
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-card border-primary/30 sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                <Mail className="size-6 text-primary" />
              </div>
              <DialogTitle className="text-center text-2xl">Get TradeTrack Pro Free</DialogTitle>
              <DialogDescription className="text-center">
                Drop your email and we'll send the Notion template link instantly.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                  autoFocus
                />
                {error && <p className="text-destructive text-xs mt-2">{error}</p>}
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Me the Template <ArrowRight />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
              <CheckCircle2 className="size-7 text-primary" />
            </div>
            <DialogTitle className="text-2xl">You're in! 🎉</DialogTitle>
            <DialogDescription className="mt-2">
              Click below to access your Notion trading journal.
            </DialogDescription>
            <a href={NOTION_TEMPLATE_URL} target="_blank" rel="noopener noreferrer" className="block mt-6">
              <Button variant="hero" size="lg" className="w-full">
                Open Notion Template <ArrowRight />
              </Button>
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
