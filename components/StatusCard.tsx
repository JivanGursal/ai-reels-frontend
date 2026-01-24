import ProgressBar from "./ProgressBar";

export default function StatusCard({ job }: any) {
  return (
    <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl w-full max-w-xl">
      <h3 className="text-xl font-semibold mb-2">Status: {job.status}</h3>
      <p className="text-sm opacity-80 mb-2">Step: {job.step}</p>

      <ProgressBar progress={job.progress} />

      {job.status === "completed" && job.video && (
        <a
          href={job.video}
          target="_blank"
          className="block mt-4 text-center py-2 rounded-lg bg-green-500"
        >
          Download Video 🎬
        </a>
      )}

      {job.status === "failed" && (
        <p className="text-red-400 mt-3">{job.error}</p>
      )}
    </div>
  );
}
