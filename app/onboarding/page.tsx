"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          additionalInfo: additionalInfo,
        }),
      });

      if (response.ok) {
        router.push("/main");
      } else {
        throw new Error("Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error during ondoarding", error);
    }
  };

  return (
    <div className="h-full flex flex-col gap-3 items-center">
      <h2 className="text-3xl my-10">Complete Onboarding</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border-2 p-3 rounded-md"
      >
        <input
          type="text"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Enter additional information"
          className="text-black"
        />
        <button
          type="submit"
          className="p-2 w-fit mx-auto hover:bg-indigo-400 border-2 border-indigo-400 rounded-md"
        >
          Complete Onboarding
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
