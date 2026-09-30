export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 py-8 text-center text-sm text-slate-500">
      <p>Movie Search — built with React, Vite and Tailwind CSS</p>
      <p className="mt-1">
        Data provided by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400">OMDb API</a>
      </p>
    </footer>
  )
}