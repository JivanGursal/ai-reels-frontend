export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 bg-gradient-to-r from-green-400 to-blue-500 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
