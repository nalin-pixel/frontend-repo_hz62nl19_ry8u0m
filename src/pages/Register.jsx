import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await register(form.name, form.email, form.password, form.role)
      if (res.approved) {
        setMessage('Registered successfully. You can now login.')
        setTimeout(()=>navigate('/login'), 800)
      } else {
        setMessage('Registered. Awaiting admin approval.')
      }
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900/60 border border-slate-700/40 rounded-xl p-6">
      <h2 className="text-white text-2xl font-bold mb-4">Create account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full bg-slate-800 text-white px-3 py-2 rounded" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="w-full bg-slate-800 text-white px-3 py-2 rounded" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="w-full bg-slate-800 text-white px-3 py-2 rounded" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <select className="w-full bg-slate-800 text-white px-3 py-2 rounded" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="customer">Customer</option>
          <option value="admin">Admin (requires approval)</option>
        </select>
        <button disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded">{loading? 'Please wait...' : 'Register'}</button>
      </form>
      {message && <p className="mt-3 text-sm text-slate-200">{message}</p>}
      <p className="mt-3 text-sm text-slate-300">Already have an account? <a href="/login" className="text-orange-400 hover:text-orange-300">Login</a></p>
    </div>
  )
}

export default Register
