import { useState, useEffect } from 'react'
import { getMovieDetails } from '../services/MovieApi'

export default function GenreRow({ title, imdbIds, onSelect }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const results = await Promise.all(
          imdbIds.map((id) => getMovieDetails(id).catch(() => null))
        )
        setMovies(results.filter(Boolean))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [imdbIds])

  if (!loading && movies.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="mb-3 text-lg font-semibold text-slate-100">{title}</h3>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {imdbIds.map((id) => (
            <div
              key={id}
              className="h-48 w-32 shrink-0 animate-pulse rounded-xl bg-slate-800"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => onSelect(movie.id)}
              className="group w-32 shrink-0 text-left"
            >
              <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-800">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                    No Image
                  </div>
                )}
              </div>
              <p className="mt-2 truncate text-sm font-medium text-slate-200 group-hover:text-amber-400">
                {movie.title}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}