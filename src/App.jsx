import { useState, useEffect } from 'react'
import { searchMovies, getMovieDetails } from './services/movieApi'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import MovieGrid from './components/MovieGrid'
import MovieModal from './components/MovieModal'
import FavoritesList from './components/FavoritesList'

const FAVORITES_KEY = 'movie-favorites'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const handleSearch = async (query) => {
    setLoading(true)
    setError('')

    try {
      const results = await searchMovies(query)
      setMovies(results)
    } catch (err) {
      setMovies([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectMovie = async (id) => {
    setModalOpen(true)
    setDetailsLoading(true)
    setSelectedMovie(null)

    try {
      const details = await getMovieDetails(id)
      setSelectedMovie(details)
    } catch (err) {
      setModalOpen(false)
      setError(err.message)
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedMovie(null)
  }

  const handleToggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id)
      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id)
      }
      return [
        ...prev,
        {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          poster: movie.poster,
        },
      ]
    })
  }

  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
  }

  const isFavorite = selectedMovie
    ? favorites.some((fav) => fav.id === selectedMovie.id)
    : false

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar favoritesCount={favorites.length} />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mx-auto max-w-md">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        <div className="mt-6">
          <FavoritesList
            favorites={favorites}
            onSelect={handleSelectMovie}
            onRemove={handleRemoveFavorite}
          />

          {loading && <Loader />}
          {error && !loading && <ErrorMessage message={error} />}
          {!loading && !error && movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={handleSelectMovie} />
          )}
          {!loading && !error && movies.length === 0 && favorites.length === 0 && (
            <p className="text-center text-slate-400">
              Search for a movie to get started.
            </p>
          )}
        </div>

        {modalOpen && (
          <MovieModal
            movie={selectedMovie}
            loading={detailsLoading}
            onClose={handleCloseModal}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </div>
    </div>
  )
}