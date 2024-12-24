"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const DreamSubmissionForm = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  //Handle input change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const { title, content } = formData;

    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content are required");
      return;
    }

    try {
      const res = await fetch("/api/dreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to submit dream");
      }

      setFormData({ title: "", content: "" });

      toast({
        title: "Dream submitted successfully",
        description: "Your dream has been submitted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting dream:", error);
      setErrorMessage("An error occurred while submitting your dream");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border-2 p-6 rounded-lg w-full max-w-md bg-slate-800 shadow-md"
    >
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Dream Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title for your dream"
          className="p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none w-full"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Dream Content
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Describe your dream..."
          rows={5}
          className="p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none w-full"
        />
      </div>
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
  );
};
