import { useState } from 'react'
import { searchMovies } from './services/movieApi'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import MovieGrid from './components/MovieGrid'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const handleSelectMovie = (id) => {
    console.log('Selected movie:', id) // temporary: details view comes next step
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
      </div>
    </div>
  )
}