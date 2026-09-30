export default function FavoritesList({ favorites, onSelect, onRemove }) {
  if (favorites.length === 0) return null

  return (
    <div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="group relative overflow-hidden rounded-xl bg-slate-800 shadow-md"
          >
            <button
              onClick={() => onSelect(movie.id)}
              className="flex w-full flex-col text-left"
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

            <button
              onClick={() => onRemove(movie.id)}
              className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-xs text-red-400 hover:bg-slate-900"
              aria-label="Remove from favorites"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}