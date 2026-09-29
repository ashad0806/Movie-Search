import { useState } from 'react'
import { searchMovies } from './services/MovieApi'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    try {
      const results = await searchMovies(query)
      console.log(results) // temporary: MovieGrid comes in a later step
    } catch (err) {
      console.error(err.message)
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
        <div className="mt-6">{loading && <Loader />}</div>
      </div>
    </div>
  )
}