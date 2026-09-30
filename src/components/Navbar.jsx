const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'newMovies', label: 'New Movies' },
]

export default function Navbar({ activeView, onNavigate, favoritesCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <h1 className="text-xl font-bold text-amber-400">Movie Search</h1>
        </div>

        <nav className="flex items-center gap-1 rounded-full bg-slate-800 p-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeView === item.id
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              {item.label}
              {item.id === 'favorites' && favoritesCount > 0 && (
                <span className="ml-1.5 rounded-full bg-slate-900/30 px-1.5 py-0.5 text-xs">
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}