"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Dream {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface DreamSubmissionFormProps {
  onDreamSubmit: (newDream: Dream) => void;
}

export const DreamSubmissionForm = ({
  onDreamSubmit,
}: DreamSubmissionFormProps) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const { title, content } = formData;

    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content are required");
      return;
    }

    setIsSubmitting(true); // Set loading state
    try {
      const res = await fetch("/api/dreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        const newDream: Dream = await res.json();
        console.log("New dream from API:", newDream);
        onDreamSubmit(newDream);
        setFormData({ title: "", content: "" });
        toast({
          title: "Dream submitted successfully",
          description: "Your dream has been submitted successfully",
          variant: "default",
        });
      } else {
        const { error } = await res.json().catch(() => ({
          error: "Failed to submit dream",
        }));
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error submitting dream:", error);
      setErrorMessage("An error occurred while submitting your dream");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border-2 p-6 rounded-lg w-full max-w-md bg-slate-800 shadow-md"
    >
      <div>
        <label htmlFor="title" className="block text-gray-300 mb-2 font-medium">
          Dream Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title for your dream"
          className={`p-3 border ${
            !formData.title.trim() ? "border-red-500" : "border-gray-300"
          } rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none w-full`}
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-gray-300 mb-2 font-medium"
        >
          Dream Content
        </label>
        <textarea
          id="content"
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
        disabled={isSubmitting}
        className={`p-2 ${
          isSubmitting ? "bg-gray-500" : "bg-indigo-500 hover:bg-indigo-600"
        } text-white rounded-md`}
      >
        {isSubmitting ? "Submitting..." : "Submit Dream"}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
    </form>
  );
};
