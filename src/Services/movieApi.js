const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

export async function searchMovies(query) {
  const url = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Something went wrong. Please try again.')
  }

  const data = await res.json()

  // OMDb always returns 200 OK, even on failure — errors show up as
  // { Response: "False", Error: "..." } instead of an HTTP error code.
  if (data.Response === 'False') {
    throw new Error(data.Error || 'No movies found.')
  }

  return data.Search.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster !== 'N/A' ? movie.Poster : null,
    type: movie.Type,
  }))
}

export async function getMovieDetails(imdbID) {
  const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Something went wrong. Please try again.')
  }

  const data = await res.json()

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie details not found.')
  }

  return {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
    plot: data.Plot,
    rating: data.imdbRating,
    genre: data.Genre,
    director: data.Director,
    actors: data.Actors,
    runtime: data.Runtime,
  }
}