"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
};

export default function AuthMenu({ user }: Props) {
  // Гость → показываем Sign In
  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }

  // Авторизован → показываем аватар и меню
  const initials = (
    user.name
      ?.split(" ")
      .map((s) => s[0])
      .join("") ||
    user.email?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "User"} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">
          {user.name || user.email || "Signed in"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
