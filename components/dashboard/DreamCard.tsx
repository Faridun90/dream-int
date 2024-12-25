import { useState } from "react";

interface Dream {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function DreamCard({ dream }: { dream: Dream }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!dream.title || !dream.content) {
    return null;
  }

  return (
    <div className="p-4 border border-gray-600 rounded-md bg-gray-800">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-200">{dream.title}</h3>
          <p className="text-sm text-gray-400">
            {new Date(dream.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          {isOpen ? "Hide Details" : "View Details"}
        </button>
      </div>
      {isOpen && <div className="mt-4 text-gray-300">{dream.content}</div>}
    </div>
  );
}
