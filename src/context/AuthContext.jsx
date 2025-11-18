import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('byterize:user')
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem('byterize:user', JSON.stringify(user))
    else localStorage.removeItem('byterize:user')
  }, [user])

  const login = async (email, password) => {
    setError('')
    const res = await fetch(`${API}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || 'Login failed')
    setUser(data)
    return data
  }

  const register = async (name, email, password, role = 'customer') => {
    setError('')
    const res = await fetch(`${API}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || 'Registration failed')
    return data
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, loading, error, login, register, logout, API }), [user, loading, error])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
