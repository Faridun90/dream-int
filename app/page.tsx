import DiscoverSection from "@/components/DiscoverSection";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { db } from "@/lib/db";

export default async function Home() {
  const user = await db.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });
  return (
    <div className="bg-black max-w-screen-xl m-auto h-full">
      <SearchBar />
      <Hero />
      <DiscoverSection />
      <h1>Hello {user?.username}!</h1>
    </div>
  );
}
