import { useState } from 'react'
import { searchMovies, getMovieDetails } from './services/MovieApi'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import MovieGrid from './components/MovieGrid'
import MovieModal from './components/MovieModal'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-amber-400">
          Movie Search
        </h1>

        <div className="mx-auto max-w-md">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        <div className="mt-6">
          {loading && <Loader />}
          {error && !loading && <ErrorMessage message={error} />}
          {!loading && !error && movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={handleSelectMovie} />
          )}
          {!loading && !error && movies.length === 0 && (
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
          />
        )}
      </div>
    </div>
  )
}