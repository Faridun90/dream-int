"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function Page() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData = { dream: inputValue };
    try {
      const res = await fetch("http://localhost:3000/api/dream", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        setInputValue("");
        console.log("Dream submitted successfully!");
      } else {
        throw new Error("Failed to submit dream");
      }
    } catch (error) {
      console.error("Error submitting dream:", error);
    }
  };

  // const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  if (session.data?.user) {
    return (
      <div className="h-full flex gap-3 flex-col mx-auto items-center">
        <h2 className="text-3xl my-10">
          Admin page - Welcome back:
          <span className="font-semibold text-indigo-300">
            {session.data.user.username}
          </span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2  border-2 p-3 rounded-md"
        >
          <input
            type="text"
            name="dream"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your dream"
            className="text-black  border p-2 px-4 rounded outline-none"
          />
          <button
            type="submit"
            className="p-2 w-fit mx-auto hover:bg-indigo-400 border-2 border-indigo-400 rounded-md"
          >
            Submit Dream
          </button>
        </form>
      </div>
    );
  }

  return <h2 className="text-2xl">Please Log in to see Admin page</h2>;
}
