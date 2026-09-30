import { useState, useEffect } from 'react'
import { getMovieDetails } from '../services/MovieApi'
import MovieGrid from './MovieGrid'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

// Feel free to swap these IMDb IDs for whichever titles you'd like to feature.
const FEATURED_IDS = [
  'tt15398776', // Oppenheimer
  'tt1517268',  // Barbie
  'tt9362722',  // Spider-Man: Across the Spider-Verse
  'tt6710474',  // Everything Everywhere All at Once
  'tt13238346', // Wonka
  'tt15239678', // Poor Things
]

export default function NewMovies({ onSelect }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true)
      setError('')
      try {
        const results = await Promise.all(
          FEATURED_IDS.map((id) => getMovieDetails(id))
        )
        setMovies(results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadFeatured()
  }, [])

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-amber-400">🆕 Featured Movies</h2>
      {loading && <Loader />}
      {error && !loading && <ErrorMessage message={error} />}
      {!loading && !error && <MovieGrid movies={movies} onSelect={onSelect} />}
    </div>
  )
}