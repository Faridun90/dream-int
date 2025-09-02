import { Moon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Moon className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-lg font-serif font-semibold text-foreground">
            DreamInt
          </span>
        </div>
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
