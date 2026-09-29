import { useState } from 'react'
import SearchBar from './components/SearchBar'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleSearch = (query) => {
    console.log('Searching:', query)
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-amber-400">
          Movie Search
        </h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>
    </div>
  )
}