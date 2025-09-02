// components/marketing/NavigationServer.tsx
import { Moon } from "lucide-react";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AuthMenu from "./AuthMenu";
import { Button } from "@/components/ui/button";

export default async function NavigationServer() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-2">
        <Moon className="h-8 w-8 text-primary" aria-hidden="true" />
        <Link
          href="/"
          className="text-2xl font-serif font-bold text-foreground"
        >
          DreamInt
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="#about"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
        <Link
          href="#features"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Features
        </Link>

        {/* Динамическая часть */}
        <AuthMenu user={user ?? null} />
      </div>

      {/* На мобильных можно позже добавить бургер-меню */}
      <div className="md:hidden">
        <Button asChild variant="outline" size="sm">
          <Link href={user ? "/dashboard" : "/signin"}>
            {user ? "Dashboard" : "Sign In"}
          </Link>
        </Button>
      </div>
    </nav>
  );
}
