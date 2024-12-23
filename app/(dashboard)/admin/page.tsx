"use client"; // Ensures this component runs on the client side

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession(); // Get session data
  const [inputValue, setInputValue] = useState(""); // Input state
  const [errorMessage, setErrorMessage] = useState(""); // Error state for better feedback

  console.log("Session data:", session);
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(""); // Reset error state before submission

    if (!inputValue.trim()) {
      setErrorMessage("Please enter a valid dream.");
      return;
    }

    const submitData = { dream: inputValue };

    try {
      const res = await fetch(
        process.env.DREAM_PROD_API || "/api/dream", // Use environment variable or fallback to local API
        {
          method: "POST",
          body: JSON.stringify(submitData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.ok) {
        setInputValue(""); // Clear the input on success
        console.log("Dream submitted successfully!");
      } else {
        throw new Error("Failed to submit dream");
      }
    } catch (error) {
      console.error("Error submitting dream:", error);
      setErrorMessage("An error occurred while submitting your dream.");
    }
  };

  // Rendered UI
  if (session?.user) {
    return (
      <div className="h-full flex flex-col gap-4 mx-auto items-center mt-10">
        <h2 className="text-3xl mb-6">
          Admin page - Welcome back:
          <span className="font-semibold text-indigo-300 ml-2">
            {session.user.username}
          </span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-2 p-6 rounded-lg w-96 bg-slate-800 shadow-md"
        >
          <input
            type="text"
            name="dream"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your dream"
            className="p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Submit Dream
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    );
  }

  // Fallback if the user is not logged in
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-2xl text-gray-600">
        Please log in to see the Admin page.
      </h2>
    </div>
  );
}
