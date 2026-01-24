"use client";
import { useEffect, useState } from "react";
import { getJobStatus } from "@/lib/api";
import StatusCard from "@/components/StatusCard";

export default function StatusPage({ params }: any) {
  const { jobId } = params;
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getJobStatus(jobId);
      setJob(data);

      if (data.status === "completed" || data.status === "failed") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  if (!job) return <p className="text-white">Loading...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <StatusCard job={job} />
    </main>
  );
}
