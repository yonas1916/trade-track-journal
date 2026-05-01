import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is this beginner friendly?", a: "Absolutely. The template comes with onboarding instructions and is designed to be intuitive even if you've never journaled a trade before." },
  { q: "Do I need Notion experience?", a: "Not at all. If you can copy/paste, you can use this. Notion is free and we include a quick-start video." },
  { q: "Is it really free?", a: "Yes — TradeTrack Pro is 100% free, forever. No subscriptions, no hidden fees, and every future update is included at no cost." },
  { q: "Does it work for crypto and forex?", a: "Yes. It's market-agnostic — works for forex, crypto, stocks, futures, and options." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Got <span className="text-gradient-primary">questions?</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-gradient-card px-5 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
