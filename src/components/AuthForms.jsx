import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function AuthForms({ onSuccess }) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // login | register
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
        onSuccess?.()
      } else {
        const res = await register(form.name, form.email, form.password, form.role)
        setMessage(res.approved ? 'Registered and approved. You can now log in.' : 'Registered. Awaiting admin approval.')
        if (res.approved) setMode('login')
      }
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">{mode === 'login' ? 'Login' : 'Register'}</h3>
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-orange-400 hover:text-orange-300">
          {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mode === 'register' && (
          <input className="bg-slate-800 text-white px-3 py-2 rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        )}
        <input className="bg-slate-800 text-white px-3 py-2 rounded md:col-span-1" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="bg-slate-800 text-white px-3 py-2 rounded md:col-span-1" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        {mode === 'register' && (
          <select className="bg-slate-800 text-white px-3 py-2 rounded md:col-span-2" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="customer">Customer</option>
            <option value="admin">Admin (requires approval)</option>
          </select>
        )}
        <button disabled={loading} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded md:col-span-2">{loading ? 'Please wait...' : (mode==='login'?'Login':'Register')}</button>
      </form>

      {message && <p className="mt-3 text-sm text-slate-200">{message}</p>}
    </div>
  )
}

export default AuthForms
