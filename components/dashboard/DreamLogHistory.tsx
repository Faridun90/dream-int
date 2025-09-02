"use client";

import React, { useEffect, useState } from "react";
import DreamCard from "./DreamCard";

interface Dream {
  id: number;
  title: string;
  content: string;
  interpretation: string | null;
  createdAt: string;
}

interface DreamLogHistoryProps {
  dreams: Dream[];
}

export const DreamLogHistory = ({ dreams }: DreamLogHistoryProps) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-300">
        Dream Log History
      </h2>
      {dreams.length === 0 ? (
        <p className="text-gray-400">
          No dreams logged yet. Start submitting your dreams!
        </p>
      ) : (
        <div className="space-y-4">
          {dreams.map((dream) => (
            <DreamCard key={dream.id} dream={dream} />
          ))}
        </div>
      )}
    </div>
  );
};
