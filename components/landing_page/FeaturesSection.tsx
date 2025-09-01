import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    text: "Advanced machine learning algorithms analyze your dreams using psychological frameworks and symbolic interpretation",
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    text: "Every interpretation is tailored to your unique experiences, emotions, and personal context for deeper meaning",
  },
  {
    icon: Zap,
    title: "Instant Results",
    text: "Get comprehensive dream analysis in seconds, not days. Start understanding your subconscious immediately",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
          Why Choose DreamInt?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered platform combines cutting-edge technology with deep
          psychological insights
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <Card
            key={title}
            className="border-border/50 hover:border-primary/30 transition-colors duration-300 group"
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon
                  className="h-12 w-12 text-primary mx-auto"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
