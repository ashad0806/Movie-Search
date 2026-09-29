import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        disabled={loading}
        className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder-slate-500 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="rounded-lg bg-amber-500 px-5 py-2 font-medium text-slate-900 shadow-sm transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Search
      </button>
    </form>
  )
}