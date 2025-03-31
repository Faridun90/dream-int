"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Dream } from "@/types/dream";

interface DreamSubmissionFormProps {
  onDreamSubmit: (newDream: Dream) => void;
  setInterpretation: (value: string | null) => void;
  setIsLoading: (value: boolean) => void;
}

export const DreamSubmissionForm = ({
  onDreamSubmit,
  setInterpretation,
  setIsLoading,
}: DreamSubmissionFormProps) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      setTitleError(value.trim() ? "" : "Title is required");
    }

    if (name === "content") {
      if (!value.trim()) {
        setContentError("Content is required");
      } else if (value.length < 10) {
        setContentError("Content should be at least 10 characters long");
      } else if (value.length > 1000) {
        setContentError("Content should be at most 1000 characters long");
      } else {
        setContentError("");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleError || contentError) return;
    setErrorMessage("");

    const { title, content } = formData;

    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    setInterpretation(null);

    try {
      const res = await fetch("/api/dreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        const newDream: Dream = await res.json();
        onDreamSubmit(newDream);
        setFormData({ title: "", content: "" });

        // Poll for interpretation
        const poll = async (retries = 20, delay = 3000) => {
          for (let i = 0; i < retries; i++) {
            const res = await fetch(`/api/dreams/${newDream.id}`);
            if (res.ok) {
              const updatedDream: Dream = await res.json();
              if (updatedDream.interpretation) {
                setInterpretation(updatedDream.interpretation);
                break;
              }
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
          setIsLoading(false);
        };

        poll();

        toast({
          title: "Dream submitted",
          description: "Your dream is being interpreted...",
        });
      } else {
        const { error } = await res
          .json()
          .catch(() => ({ error: "Failed to submit dream" }));
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error submitting dream:", error);
      setErrorMessage("An error occurred while submitting your dream");
      setIsLoading(false);
    } finally {
      setIsSubmitting(false);
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
          className={`p-3 border-[1.5px] ${!formData.title.trim() ? "border-red-500" : "border-gray-300"} rounded-md text-gray-900 outline-none w-full`}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
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
          className="p-3 border border-gray-300 rounded-md text-gray-900 outline-none w-full"
        />
        {contentError && (
          <p className="text-red-500 text-sm mt-1">{contentError}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`p-2 ${isSubmitting ? "bg-gray-500" : "bg-indigo-500 hover:bg-indigo-600"} text-white rounded-md`}
      >
        {isSubmitting ? "Submitting..." : "Submit Dream"}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
    </form>
  );
};
