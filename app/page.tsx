import DiscoverSection from "@/components/DiscoverSection";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const user = await db.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-black max-w-screen-xl m-auto h-full">
      <SearchBar />
      <div>
        <h1 className="text-4xl">Home</h1>
        <Link className={buttonVariants()} href="/admin">
          Open My Admin
        </Link>

        <h2>Client Session</h2>
        <User />

        <h2>Server Session</h2>
        {JSON.stringify(session)}
      </div>
      <Hero />
      <DiscoverSection />
      <h1>Hello {user?.username}!</h1>
    </div>
  );
}
