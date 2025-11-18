import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'

function App() {
  const [tab, setTab] = useState('shop')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Hero />

        <div className="flex items-center justify-between mt-4">
          <div className="inline-flex rounded-lg overflow-hidden border border-slate-700/60">
            <button onClick={() => setTab('shop')} className={`px-4 py-2 ${tab==='shop'?'bg-orange-500 text-white':'bg-slate-900 text-slate-200'}`}>Customer Dashboard</button>
            <button onClick={() => setTab('admin')} className={`px-4 py-2 ${tab==='admin'?'bg-orange-500 text-white':'bg-slate-900 text-slate-200'}`}>Admin Dashboard</button>
          </div>
          <a href="/test" className="text-sm text-slate-400 hover:text-slate-200 underline">Backend status</a>
        </div>

        {tab === 'shop' ? (
          <Dashboard />
        ) : (
          <AdminPanel />
        )}

        <footer className="pt-10 text-center text-slate-500 text-sm">
          ByteRize • Computer Store • Retro-tech vibes
        </footer>
      </div>
    </div>
  )
}

export default App
