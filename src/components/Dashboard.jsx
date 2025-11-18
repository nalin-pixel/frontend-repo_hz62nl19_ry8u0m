import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('byterize:cart') || '[]') } catch { return [] }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    try { localStorage.setItem('byterize:cart', JSON.stringify(cart)) } catch {}
  }, [cart])

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id)
      if (existing) {
        return prev.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...p, quantity: 1 }]
    })
  }

  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart])

  const checkout = async () => {
    try {
      const email = user?.email || 'guest@byterize.dev'
      const items = cart.map((c) => ({ product_id: c.id, title: c.title, price: c.price, quantity: c.quantity }))
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: email, items, total })
      })
      const data = await res.json()
      if (res.ok) {
        alert('Order placed! id: ' + data.id)
        setCart([])
      } else {
        alert(data.detail || 'Checkout failed')
      }
    } catch (e) {
      alert('Checkout error')
    }
  }

  if (loading) return <div className="text-slate-200">Loading...</div>
  if (error) return <div className="text-red-400">{error}</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <h2 className="text-xl font-bold text-white">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4 sticky top-4">
          <h3 className="text-white font-semibold mb-2">Cart</h3>
          <div className="space-y-2 max-h-72 overflow-auto pr-2">
            {cart.length === 0 && <p className="text-slate-400 text-sm">Your cart is empty</p>}
            {cart.map((c) => (
              <div key={c.id} className="flex items-center justify-between text-slate-200 text-sm">
                <span className="line-clamp-1 pr-2">{c.title}</span>
                <div className="flex items-center gap-2">
                  <span>x{c.quantity}</span>
                  <span className="text-orange-400 font-semibold">${(c.price * c.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700/50 mt-3 pt-3 flex items-center justify-between text-white">
            <span>Total</span>
            <span className="text-orange-400 font-bold">${total.toFixed(2)}</span>
          </div>
          <button disabled={!cart.length} onClick={checkout} className="mt-3 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-2 rounded-md">Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
