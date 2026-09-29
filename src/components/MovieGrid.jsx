import MovieCard from './MovieCard'

export default function MovieGrid({ movies, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  )
}