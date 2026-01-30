"use client";

import { useState } from "react";

const LANGUAGES = [
  "english",
  "hindi",
  "marathi",
  "gujarati",
  "kannada",
  "tamil",
  "rajasthani",
];

export default function ReelWizard() {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("english");
  const [mode, setMode] = useState("script_to_video");
  const [seconds, setSeconds] = useState(10);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  const submit = async () => {
    setLoading(true);
    const res = await fetch("https://ai-reels-backend.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        language,
        mode,
        seconds,
      }),
    });

    const data = await res.json();
    setJobId(data.job_id);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">AI Reel Generator</h1>

        {step === 1 && (
          <>
            <label className="block mb-2">Topic</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800"
              placeholder="Enter reel topic"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!topic}
              className="mt-4 w-full bg-blue-600 p-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
            <button
              onClick={() => setStep(3)}
              className="mt-4 w-full bg-blue-600 p-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block mb-2">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800"
            >
              <option value="script_to_video">Script → Video</option>
              <option value="image_to_video">Image → Video</option>
            </select>

            <label className="block mt-4 mb-2">Duration (seconds)</label>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(+e.target.value)}
              className="w-full p-2 rounded bg-zinc-800"
            />

            <button
              onClick={submit}
              className="mt-6 w-full bg-green-600 p-2 rounded"
            >
              {loading ? "Generating..." : "Generate Reel"}
            </button>
          </>
        )}

        {jobId && (
          <p className="mt-4 text-sm text-green-400">Job ID: {jobId}</p>
        )}
      </div>
    </div>
  );
}
