import { Star } from "lucide-react";

const STARS: Array<{ cls: string; delay: string }> = [
  { cls: "top-20 left-10 h-4 w-4 text-primary/30", delay: "0s" },
  { cls: "top-40 right-20 h-3 w-3 text-primary/40", delay: "1s" },
  { cls: "top-60 left-1/4 h-5 w-5 text-primary/20", delay: "2s" },
  { cls: "bottom-40 right-1/3 h-4 w-4 text-primary/35", delay: "0.5s" },
  { cls: "bottom-60 left-1/2 h-3 w-3 text-primary/25", delay: "1.5s" },
  { cls: "top-32 left-1/3 h-2 w-2 text-primary/50", delay: "0.8s" },
  { cls: "top-80 right-1/4 h-6 w-6 text-primary/15", delay: "2.5s" },
  { cls: "bottom-20 left-20 h-3 w-3 text-primary/45", delay: "1.2s" },
  { cls: "top-96 left-3/4 h-4 w-4 text-primary/30", delay: "3s" },
  { cls: "bottom-80 right-10 h-2 w-2 text-primary/60", delay: "0.3s" },
  { cls: "top-16 right-1/2 h-5 w-5 text-primary/25", delay: "1.8s" },
  { cls: "bottom-32 left-1/4 h-3 w-3 text-primary/40", delay: "2.2s" },
  { cls: "top-72 right-16 h-4 w-4 text-primary/35", delay: "0.7s" },
  { cls: "bottom-96 left-3/4 h-2 w-2 text-primary/55", delay: "1.9s" },
  { cls: "top-48 left-16 h-6 w-6 text-primary/20", delay: "2.8s" },
  { cls: "bottom-16 right-1/4 h-3 w-3 text-primary/45", delay: "0.4s" },
  { cls: "top-24 left-2/5 h-4 w-4 text-primary/35", delay: "2.9s" },
  { cls: "top-56 right-3/4 h-3 w-3 text-primary/40", delay: "1.1s" },
  { cls: "bottom-8 left-1/3 h-5 w-5 text-primary/25", delay: "3.3s" },
  { cls: "bottom-24 right-2/3 h-2 w-2 text-primary/55", delay: "0.1s" },
  { cls: "top-4 right-1/6 h-3 w-3 text-primary/45", delay: "2.6s" },
];

export default function FloatingStars() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {STARS.map((s, i) => (
        <Star
          key={i}
          className={`absolute ${s.cls} twinkle-animation`}
          style={{ animationDelay: s.delay }}
        />
      ))}
    </div>
  );
}
