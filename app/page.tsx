import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Moon, Star, Users, Shield, Zap } from "lucide-react";

export default function DreamIntLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Moon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-serif font-bold text-foreground">
            DreamInt
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Floating Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Star
          className="absolute top-20 left-10 h-4 w-4 text-primary/30 twinkle-animation"
          style={{ animationDelay: "0s" }}
        />
        <Star
          className="absolute top-40 right-20 h-3 w-3 text-primary/40 twinkle-animation"
          style={{ animationDelay: "1s" }}
        />
        <Star
          className="absolute top-60 left-1/4 h-5 w-5 text-primary/20 twinkle-animation"
          style={{ animationDelay: "2s" }}
        />
        <Star
          className="absolute bottom-40 right-1/3 h-4 w-4 text-primary/35 twinkle-animation"
          style={{ animationDelay: "0.5s" }}
        />
        <Star
          className="absolute bottom-60 left-1/2 h-3 w-3 text-primary/25 twinkle-animation"
          style={{ animationDelay: "1.5s" }}
        />
        <Star
          className="absolute top-32 left-1/3 h-2 w-2 text-primary/50 twinkle-animation"
          style={{ animationDelay: "0.8s" }}
        />
        <Star
          className="absolute top-80 right-1/4 h-6 w-6 text-primary/15 twinkle-animation"
          style={{ animationDelay: "2.5s" }}
        />
        <Star
          className="absolute bottom-20 left-20 h-3 w-3 text-primary/45 twinkle-animation"
          style={{ animationDelay: "1.2s" }}
        />
        <Star
          className="absolute top-96 left-3/4 h-4 w-4 text-primary/30 twinkle-animation"
          style={{ animationDelay: "3s" }}
        />
        <Star
          className="absolute bottom-80 right-10 h-2 w-2 text-primary/60 twinkle-animation"
          style={{ animationDelay: "0.3s" }}
        />
        <Star
          className="absolute top-16 right-1/2 h-5 w-5 text-primary/25 twinkle-animation"
          style={{ animationDelay: "1.8s" }}
        />
        <Star
          className="absolute bottom-32 left-1/4 h-3 w-3 text-primary/40 twinkle-animation"
          style={{ animationDelay: "2.2s" }}
        />
        <Star
          className="absolute top-72 right-16 h-4 w-4 text-primary/35 twinkle-animation"
          style={{ animationDelay: "0.7s" }}
        />
        <Star
          className="absolute bottom-96 left-3/4 h-2 w-2 text-primary/55 twinkle-animation"
          style={{ animationDelay: "1.9s" }}
        />
        <Star
          className="absolute top-48 left-16 h-6 w-6 text-primary/20 twinkle-animation"
          style={{ animationDelay: "2.8s" }}
        />
        <Star
          className="absolute bottom-16 right-1/4 h-3 w-3 text-primary/45 twinkle-animation"
          style={{ animationDelay: "0.4s" }}
        />
        <Star
          className="absolute top-88 left-1/2 h-4 w-4 text-primary/30 twinkle-animation"
          style={{ animationDelay: "1.6s" }}
        />
        <Star
          className="absolute bottom-48 right-3/4 h-2 w-2 text-primary/50 twinkle-animation"
          style={{ animationDelay: "2.7s" }}
        />
        <Star
          className="absolute top-12 left-1/5 h-3 w-3 text-primary/35 twinkle-animation"
          style={{ animationDelay: "3.2s" }}
        />
        <Star
          className="absolute top-36 right-1/5 h-2 w-2 text-primary/55 twinkle-animation"
          style={{ animationDelay: "0.9s" }}
        />
        <Star
          className="absolute top-52 left-3/5 h-4 w-4 text-primary/25 twinkle-animation"
          style={{ animationDelay: "2.1s" }}
        />
        <Star
          className="absolute top-68 right-2/5 h-5 w-5 text-primary/20 twinkle-animation"
          style={{ animationDelay: "1.3s" }}
        />
        <Star
          className="absolute top-84 left-4/5 h-3 w-3 text-primary/40 twinkle-animation"
          style={{ animationDelay: "3.5s" }}
        />
        <Star
          className="absolute bottom-12 right-1/5 h-2 w-2 text-primary/60 twinkle-animation"
          style={{ animationDelay: "0.6s" }}
        />
        <Star
          className="absolute bottom-28 left-3/5 h-4 w-4 text-primary/30 twinkle-animation"
          style={{ animationDelay: "2.4s" }}
        />
        <Star
          className="absolute bottom-44 right-3/5 h-3 w-3 text-primary/45 twinkle-animation"
          style={{ animationDelay: "1.7s" }}
        />
        <Star
          className="absolute bottom-64 left-4/5 h-6 w-6 text-primary/15 twinkle-animation"
          style={{ animationDelay: "3.1s" }}
        />
        <Star
          className="absolute bottom-72 right-4/5 h-2 w-2 text-primary/50 twinkle-animation"
          style={{ animationDelay: "0.2s" }}
        />
        <Star
          className="absolute top-24 left-2/5 h-4 w-4 text-primary/35 twinkle-animation"
          style={{ animationDelay: "2.9s" }}
        />
        <Star
          className="absolute top-56 right-3/4 h-3 w-3 text-primary/40 twinkle-animation"
          style={{ animationDelay: "1.1s" }}
        />
        <Star
          className="absolute bottom-8 left-1/3 h-5 w-5 text-primary/25 twinkle-animation"
          style={{ animationDelay: "3.3s" }}
        />
        <Star
          className="absolute bottom-24 right-2/3 h-2 w-2 text-primary/55 twinkle-animation"
          style={{ animationDelay: "0.1s" }}
        />
        <Star
          className="absolute top-4 right-1/6 h-3 w-3 text-primary/45 twinkle-animation"
          style={{ animationDelay: "2.6s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center max-w-6xl mx-auto">
        <div className="float-animation">
          <Moon className="h-16 w-16 text-primary mx-auto mb-8 opacity-80" />
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
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Start Your Dream Journey
        </Button>

        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>15000+ Dreams Interpreted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>650% Private & Secure</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
          <Card className="border-border/50 hover:border-primary/30 transition-colors duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms analyze your dreams using
                psychological frameworks and symbolic interpretation
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/30 transition-colors duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Personalized Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every interpretation is tailored to your unique experiences,
                emotions, and personal context for deeper meaning
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/30 transition-colors duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Instant Results
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Get comprehensive dream analysis in seconds, not days. Start
                understanding your subconscious immediately
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            Trusted by Dream Explorers Worldwide
          </Badge>

          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
            Join Thousands Who&apos;ve Unlocked Their Dream Meanings
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15000+</div>
              <div className="text-muted-foreground">Dreams Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
          </div>

          <Button
            size="lg"
            className="text-lg px-8 py-6 glow-animation neon-glow hover:scale-105 transition-transform duration-300"
          >
            <Moon className="mr-2 h-5 w-5" />
            Interpret My Dream Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Moon className="h-6 w-6 text-primary" />
            <span className="text-lg font-serif font-semibold text-foreground">
              DreamInt
            </span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
