export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-3 py-8" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-400" />
      <p className="text-sm text-slate-400">Fetching movies...</p>
    </div>
  )
}