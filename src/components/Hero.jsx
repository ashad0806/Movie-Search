import { useState, useEffect } from 'react'
import { getMovieDetails } from '../services/MovieApi'

const FEATURED_ID = 'tt1375666' // Inception — swap for any IMDb ID you like

export default function Hero({ onSelect, onToggleFavorite, isFavorite }) {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    getMovieDetails(FEATURED_ID)
      .then(setMovie)
      .catch(() => setMovie(null))
  }, [])

  if (!movie) return null

  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl bg-slate-800">
      {movie.poster && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
      )}
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-64 w-44 shrink-0 rounded-xl object-cover shadow-2xl sm:h-72 sm:w-48"
          />
        )}
        <div className="min-w-0">
          <p className="mb-1 text-sm font-medium uppercase tracking-wide text-amber-400">
            Featured
          </p>
          <h2 className="mb-2 text-3xl font-bold text-slate-100 sm:text-4xl">
            {movie.title}{' '}
            <span className="font-normal text-slate-400">({movie.year})</span>
          </h2>
          {movie.rating && movie.rating !== 'N/A' && (
            <p className="mb-3 inline-block rounded bg-amber-500/20 px-2 py-1 text-sm font-medium text-amber-400">
              ⭐ {movie.rating}/10
            </p>
          )}
          <p className="mb-5 max-w-2xl text-slate-300 line-clamp-3">{movie.plot}</p>
          <div className="flex gap-3">
            <button
              onClick={() => onSelect(movie.id)}
              className="rounded-lg bg-amber-500 px-5 py-2 font-medium text-slate-900 shadow-sm transition hover:bg-amber-400"
            >
              View Details
            </button>
            <button
              onClick={() =>
                onToggleFavorite({
                  id: movie.id,
                  title: movie.title,
                  year: movie.year,
                  poster: movie.poster,
                })
              }
              className={`rounded-lg border px-5 py-2 font-medium transition ${
                isFavorite
                  ? 'border-amber-400 text-amber-400'
                  : 'border-slate-600 text-slate-300 hover:border-slate-400'
              }`}
            >
              {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}