"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateReel } from "@/lib/api";

export default function GenerateForm() {
  const [idea, setIdea] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleGenerate() {
    if (!idea) return alert("Idea required");

    setLoading(true);
    const res = await generateReel(idea, seconds);
    router.push(`/status/${res.job_id}`);
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Create AI Reel</h2>

      <textarea
        placeholder="Enter your idea..."
        className="w-full p-3 rounded-lg bg-black/30 outline-none"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <input
        type="number"
        className="w-full mt-4 p-2 rounded-lg bg-black/30"
        value={seconds}
        min={5}
        max={60}
        onChange={(e) => setSeconds(+e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
      >
        {loading ? "Starting..." : "Generate Reel 🚀"}
      </button>
    </div>
  );
}
