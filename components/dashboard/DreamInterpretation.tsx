"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface DreamInterpretationProps {
  interpretation: string | null;
  isLoading: boolean;
}

export const DreamInterpretation = ({
  interpretation,
  isLoading,
}: DreamInterpretationProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-4">
        <Loader2 className="animate-spin text-indigo-500 w-6 h-6" />
        <span className="ml-2 text-gray-300">Interpreting your dream...</span>
      </div>
    );
  }

  if (interpretation) {
    return (
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-md shadow-lg mt-4 border border-indigo-400">
        <h2 className="text-xl font-semibold text-indigo-300 mb-2">
          AI Interpretation
        </h2>
        <p className="text-gray-100 whitespace-pre-line">{interpretation}</p>
      </div>
    );
  }

  return null;
};
