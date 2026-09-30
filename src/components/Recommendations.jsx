import GenreRow from './GenreRow'

// Curated IMDb IDs per genre. Swap these out anytime for different picks.
const GENRES = [
  {
    title: 'Adventure',
    imdbIds: ['tt1631867', 'tt0120737', 'tt0325980', 'tt0499549', 'tt2015381'],
  },
  {
    title: 'Comedy',
    imdbIds: ['tt0110357', 'tt1229340', 'tt0454921', 'tt0119116', 'tt0093779'],
  },
  {
    title: 'Horror',
    imdbIds: ['tt1457767', 'tt0081505', 'tt2078778', 'tt1179904', 'tt0947798'],
  },
  {
    title: 'Sci-Fi',
    imdbIds: ['tt0816692', 'tt1375666', 'tt0083658', 'tt0470752', 'tt1856101'],
  },
  {
    title: 'Drama',
    imdbIds: ['tt0111161', 'tt0068646', 'tt0109830', 'tt0137523', 'tt0120815'],
  },
]

export default function Recommendations({ onSelect }) {
  return (
    <div>
      {GENRES.map((genre) => (
        <GenreRow
          key={genre.title}
          title={genre.title}
          imdbIds={genre.imdbIds}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}