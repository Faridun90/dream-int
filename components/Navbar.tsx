"use client"
import logo from "@/public/logo3.png"
import React from "react"
import Image from "next/image"
import Button from "./Button"
import Link from "next/link"

export function Navbar() {
  return <div className="flex items-center gap-17 justify-between py-2 mb-2 border-b-[0.3px] border-zinc-700">
    <span className="font-bold text-2xl">DI AI</span>
    <ul className="flex gap-10 ">
      <li><Link href={"#"}>Discover More</Link></li>
      <li><Link href={"#"}>Get Started</Link></li>
      <li><Link href={"#"}>Explore Now</Link></li>
      <li><Link href={"#"}>Menu</Link></li>
    </ul>
    <Button text="Join" onClick={() => console.log("Button clicked!")} />
  </div>
}
