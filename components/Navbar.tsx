import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import UserAccountnav from "./UserAccountnav";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  return (
    <div className="flex items-center gap-17 justify-between py-2 mb-2 border-b-[0.3px] border-zinc-700 ">
      <Link href={"/"} className="font-bold text-2xl">
        DI AI
      </Link>
      <ul className="flex gap-10">
        <li>
          <Link href={"#"}>Discover More About</Link>
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
        <UserAccountnav />
      ) : (
        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link>
      )}
    </div>
  );
};

export default Navbar;
