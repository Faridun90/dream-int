import DiscoverSection from "@/components/DiscoverSection";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return <div className="bg-black max-w-screen-xl m-auto h-full" >
    <Navbar />
    <SearchBar />
    <Hero />
    <DiscoverSection />
    <h1>Hello World!</h1>
  </div>
}
