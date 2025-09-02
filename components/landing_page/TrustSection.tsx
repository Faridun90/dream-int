import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";

const METRICS = [
  { value: "15,000+", label: "Dreams Analyzed" },
  { value: "98%", label: "User Satisfaction" },
  { value: "24/7", label: "Available" },
];

export default function TrustSection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
          Trusted by Dream Explorers Worldwide
        </Badge>

        <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
          Join Thousands Who&apos;ve Unlocked Their Dream Meanings
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {m.value}
              </div>
              <div className="text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="text-lg px-8 py-6 glow-animation neon-glow hover:scale-105 transition-transform duration-300"
          asChild
        >
          <a href="/dashboard">
            <Moon className="mr-2 h-5 w-5" />
            Interpret My Dream Now
          </a>
        </Button>
      </div>
    </section>
  );
}
