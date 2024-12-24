"use client";

import React, { useState, useEffect } from "react";

export const DreamLogHistory = () => {
  interface DreamLog {
    id: number;
    title: string;
    date: string;
  }

  const [dreamLogs, setDreamLogs] = useState<DreamLog[]>([]);

  useEffect(() => {
    const fetchDreamLogs = async () => {
      try {
        const response = await fetch("/api/dreams");
        if (!response.ok) {
          throw new Error("Failed to fetch dreams");
        }
        const logs = await response.json();
        setDreamLogs(logs.dreams);
      } catch (error) {
        console.error("Error fetching dreams:", error);
      }
    };
    fetchDreamLogs();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-300 mb-4">
        Dream Log History
      </h2>
      {dreamLogs.length === 0 ? (
        <p className="text-gray-500">No dreams logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {dreamLogs?.map((dream) => (
            <li
              key={dream.id}
              className="p-4 border rounded-lg bg-gray-700 text-white"
            >
              <h3 className="font-bold">{dream.title}</h3>
              <p className="text-sm">{dream.date}</p>
              <button
                className="mt-2 text-indigo-400 hover:underline"
                onClick={() => alert(`Viewing details for: ${dream.title}`)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
