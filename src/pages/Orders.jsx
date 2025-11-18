import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Orders() {
  const { user, API } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const url = user?.role === 'admin' ? `${API}/api/orders` : `${API}/api/orders?email=${encodeURIComponent(user?.email || '')}`
        const res = await fetch(url, { headers: user?.role === 'admin' ? { 'x-admin': 'true' } : {} })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Failed to load orders')
        setOrders(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (user) load()
  }, [user, API])

  if (!user) return <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4 text-slate-200">Please login to view your orders.</div>

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
        <h2 className="text-white text-2xl font-bold">{user.role==='admin' ? 'All Orders' : 'My Orders'}</h2>
      </div>
      {loading ? (
        <div className="text-slate-200">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="space-y-3">
          {orders.length === 0 && <p className="text-slate-300">No orders yet.</p>}
          {orders.map(o => (
            <div key={o.id} className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">Order #{o.id?.slice(-6)}</div>
                <div className="text-orange-400 font-semibold">${Number(o.total || 0).toFixed(2)}</div>
              </div>
              <div className="text-slate-300 text-sm mt-2">{new Date(o.created_at).toLocaleString()} • {o.status}</div>
              <div className="mt-3 text-slate-200 text-sm space-y-1">
                {o.items?.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="truncate pr-2">{it.title}</span>
                    <span>x{it.quantity} • ${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
