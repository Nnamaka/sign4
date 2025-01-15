"use client";

import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/mail");
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Something went wrong!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test server
      </button>
      {response && (
        <p className="mt-4 text-lg text-gray-700">
          Response: {response}
        </p>
      )}
    </main>
  );
}
