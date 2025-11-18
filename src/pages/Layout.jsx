import Navbar from '../components/Navbar'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <Navbar />
        {children}
        <footer className="pt-10 text-center text-slate-500 text-sm">ByteRize • Computer Store • Retro-tech vibes</footer>
      </div>
    </div>
  )
}

export default Layout
