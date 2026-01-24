"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://ai-reels-backend.onrender.com";

  const generateReel = async () => {
    if (!idea.trim()) return;

    setLoading(true);
    setStatus(null);

    const res = await fetch(
      `${BACKEND_URL}/generate?idea=${encodeURIComponent(
        idea
      )}&seconds=${seconds}`,
      { method: "POST" }
    );

    const data = await res.json();
    setJobId(data.job_id);
    setLoading(false);
  };

  const checkStatus = async () => {
    if (!jobId) return;

    const res = await fetch(`${BACKEND_URL}/status/${jobId}`);
    const data = await res.json();
    setStatus(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 text-white">
        <h1 className="text-3xl font-semibold text-center">
          🎬 AI Reels Generator
        </h1>
        <p className="mt-2 text-center text-sm text-white/60">
          Generate cinematic reels with AI — script, voice & visuals
        </p>

        {/* IDEA */}
        <div className="mt-6">
          <label className="text-sm text-white/70">Reel Idea</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Never give up, even when things are hard..."
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
            rows={3}
          />
        </div>

        {/* DURATION */}
        <div className="mt-4">
          <label className="text-sm text-white/70">
            Duration (seconds)
          </label>
          <input
            type="number"
            min={5}
            max={60}
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={generateReel}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-white text-black py-3 font-semibold hover:bg-zinc-200 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "🚀 Generate Reel"}
        </button>

        {/* STATUS */}
        {jobId && (
          <div className="mt-6 rounded-xl bg-black/40 border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">
                Job ID: <span className="text-white">{jobId}</span>
              </p>
              <button
                onClick={checkStatus}
                className="text-sm underline text-white/80 hover:text-white"
              >
                Refresh
              </button>
            </div>

            {status && (
              <div className="mt-3 text-sm text-white/80 space-y-1">
                <p>Status: {status.status}</p>
                <p>Step: {status.step}</p>
                <p>Progress: {status.progress}%</p>

                {status.video && (
                  <a
                    href={status.video}
                    target="_blank"
                    className="inline-block mt-2 underline text-green-400"
                  >
                    ▶ View Video
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
