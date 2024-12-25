"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { DreamSubmissionForm } from "@/components/dashboard/DreamSubmissionForm";
import { DreamLogHistory } from "@/components/dashboard/DreamLogHistory";

interface Dream {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function UserDashboard() {
  const { data: session } = useSession();
  const [dreams, setDreams] = useState<Dream[]>([]);

  // Fetch initial dream logs
  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const res = await fetch("/api/dreams");
        const data: Dream[] = await res.json();
        setDreams(data);
      } catch (err) {
        console.error("Error fetching dreams:", err);
      }
    };
    fetchDreams();
  }, []);

  // Handler to add a new dream to the logs
  const handleAddDream = (newDream: Dream) => {
    setDreams((prevDreams) => [newDream, ...prevDreams]); // Add the new dream at the top
  };

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl text-gray-600">
          Please log in to access your dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-4 min-h-screen mx-auto items-center  p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Welcome back,{" "}
        <span className="text-indigo-400">{session.user.username}</span>!
      </h1>
      <DreamSubmissionForm onDreamSubmit={handleAddDream} />
      <DreamLogHistory dreams={dreams} />
    </div>
  );
}
