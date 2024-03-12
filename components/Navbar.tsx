"use client";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center gap-17 justify-between py-2 mb-2 border-b-[0.3px] border-zinc-700">
      <span className="font-bold text-2xl">DI AI</span>
      <ul className="flex gap-10 ">
        <li>
          <Link href={"#"}>Discover More About </Link>
        </li>
        <li>
          <Link href={"#"}>Get Started</Link>
        </li>
        <li>
          <Link href={"#"}>Explore Now</Link>
        </li>
        <li>
          <Link href={"#"}>Menu</Link>
        </li>
      </ul>
      {session?.user ? (
        <Button> Sign Out </Button>
      ) : (
        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link>
      )}
    </div>
  );
}
