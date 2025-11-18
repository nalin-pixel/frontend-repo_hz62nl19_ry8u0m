import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const loc = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => loc.pathname === path

  return (
    <header className="flex items-center justify-between py-4">
      <Link to="/" className="text-white font-extrabold text-2xl tracking-tight">
        <span className="text-orange-500">Byte</span>Rize
      </Link>

      <nav className="flex items-center gap-3">
        <Link to="/" className={`px-3 py-1.5 rounded ${isActive('/')?'bg-orange-500 text-white':'text-slate-200 hover:text-white hover:bg-slate-800/70'}`}>Shop</Link>
        <Link to="/test" className={`px-3 py-1.5 rounded ${isActive('/test')?'bg-orange-500 text-white':'text-slate-200 hover:text-white hover:bg-slate-800/70'}`}>Status</Link>
        {user && (
          <Link to="/orders" className={`px-3 py-1.5 rounded ${isActive('/orders')?'bg-orange-500 text-white':'text-slate-200 hover:text-white hover:bg-slate-800/70'}`}>Orders</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className={`px-3 py-1.5 rounded ${isActive('/admin')?'bg-orange-500 text-white':'text-slate-200 hover:text-white hover:bg-slate-800/70'}`}>Admin</Link>
        )}
      </nav>

      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link to="/login" className="text-slate-200 hover:text-white">Login</Link>
            <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded">Register</Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm hidden sm:inline">{user.name || user.email} {user.role==='admin' && <span className="ml-1 text-orange-400">(admin)</span>}</span>
            <button onClick={() => { logout(); navigate('/') }} className="text-slate-200 hover:text-white">Logout</button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
