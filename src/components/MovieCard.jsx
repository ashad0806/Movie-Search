export default function MovieCard({ movie, onSelect }) {
  return (
    <button
      onClick={() => onSelect(movie.id)}
      className="group flex flex-col overflow-hidden rounded-xl bg-slate-800 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[2/3] w-full bg-slate-700">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="truncate font-medium text-slate-100 group-hover:text-amber-400">
          {movie.title}
        </h3>
        <p className="text-sm text-slate-400">{movie.year}</p>
      </div>
    </button>
  )
}