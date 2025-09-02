import { Button } from "@/components/ui/button";
import { Moon, Sparkles, Users, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative px-6 py-20 text-center max-w-6xl mx-auto">
      <div className="float-animation">
        <Moon
          className="h-16 w-16 text-primary mx-auto mb-8 opacity-80"
          aria-hidden="true"
        />
      </div>

      <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
        Unlock the Meaning
        <br />
        <span className="text-primary">Behind Your Dreams</span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
        Discover the hidden insights in your dreams with AI-powered
        interpretation. Transform your nighttime visions into personal growth
        and self-understanding.
      </p>

      <Button
        size="lg"
        className="text-lg px-8 py-6 glow-animation neon-glow hover:scale-105 transition-transform duration-300"
        asChild
      >
        <a href="/dashboard">
          <Sparkles className="mr-2 h-5 w-5" />
          Start Your Dream Journey
        </a>
      </Button>

      <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" aria-hidden="true" />
          <span>15,000+ Dreams Interpreted</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4" aria-hidden="true" />
          <span>100% Private & Secure</span>
        </div>
      </div>
    </section>
  );
}
