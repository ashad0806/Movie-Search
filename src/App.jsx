import { useState } from 'react'
import { searchMovies } from './services/MovieApi'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (query) => {
    setLoading(true)
    setError('')

    try {
      const results = await searchMovies(query)
      console.log(results) // temporary: MovieGrid comes in the next step
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-amber-400">
          Movie Search
        </h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
        <div className="mt-6">
          {loading && <Loader />}
          {error && !loading && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  )
}