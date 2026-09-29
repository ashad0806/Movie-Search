export default function MovieModal({ movie, onClose, loading }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-slate-800 shadow-2xl"
      >
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16" role="status">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-400" />
            <p className="text-sm text-slate-400">Loading details...</p>
          </div>
        )}

        {!loading && movie && (
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3">
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-64 w-full object-cover sm:h-full"
                />
              ) : (
                <div className="flex h-64 w-full items-center justify-center bg-slate-700 text-slate-500 sm:h-full">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1 p-6">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="text-2xl font-semibold text-slate-100">
                  {movie.title}{' '}
                  <span className="font-normal text-slate-400">({movie.year})</span>
                </h2>
                <button
                  onClick={onClose}
                  className="shrink-0 text-slate-400 hover:text-slate-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {movie.rating && movie.rating !== 'N/A' && (
                <p className="mb-3 inline-block rounded bg-amber-500/20 px-2 py-1 text-sm font-medium text-amber-400">
                  ⭐ {movie.rating}/10
                </p>
              )}

              <p className="mb-4 text-slate-300">{movie.plot}</p>

              <dl className="grid grid-cols-1 gap-2 text-sm text-slate-400 sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-slate-300">Genre</dt>
                  <dd>{movie.genre}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-300">Runtime</dt>
                  <dd>{movie.runtime}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-300">Director</dt>
                  <dd>{movie.director}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-300">Actors</dt>
                  <dd>{movie.actors}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}