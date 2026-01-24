const BASE_URL = "https://ai-reels-backend.onrender.com";

export async function generateReel(idea: string, seconds: number) {
  const res = await fetch(
    `${BASE_URL}/generate?idea=${encodeURIComponent(idea)}&seconds=${seconds}`,
    { method: "POST" }
  );
  return res.json();
}

export async function getJobStatus(jobId: string) {
  const res = await fetch(`${BASE_URL}/status/${jobId}`);
  return res.json();
}
