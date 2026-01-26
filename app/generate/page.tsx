"use client";

import { useState } from "react";

const LANGUAGES = [
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Tamil",
  "Rajasthani",
];

const GENERATION_TYPES = [
  { id: "script_to_video", label: "Script → Video" },
  { id: "image_to_video", label: "Image → Video" },
];

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [generationType, setGenerationType] = useState("");

  const canSelectLanguage = topic.trim().length > 0;
  const canSelectType = language.length > 0;
  const canGenerate = generationType.length > 0;

  const handleGenerate = () => {
    const payload = {
      topic,
      language,
      generation_type: generationType,
    };

    console.log("FINAL PAYLOAD →", payload);
    // 👉 yahi payload backend /generate API ko jayega
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <div className="w-full max-w-xl p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">

        <h1 className="text-2xl font-bold text-center">
          AI Reel Generator
        </h1>

        {/* 1️⃣ Topic */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">
            Topic
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter reel topic..."
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 2️⃣ Language */}
        {canSelectLanguage && (
          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select language</option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 3️⃣ Generation Type */}
        {canSelectType && (
          <div className="space-y-3">
            <label className="text-sm text-gray-300">
              Generation Type
            </label>

            <div className="grid grid-cols-2 gap-4">
              {GENERATION_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setGenerationType(type.id)}
                  className={`p-4 rounded-xl border transition ${
                    generationType === type.id
                      ? "border-indigo-500 bg-indigo-500/20"
                      : "border-white/20 bg-black/30 hover:bg-white/10"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4️⃣ Generate */}
        <button
          disabled={!canGenerate}
          onClick={handleGenerate}
          className={`w-full py-4 rounded-xl font-semibold transition ${
            canGenerate
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Generate Reel
        </button>
      </div>
    </main>
  );
}
