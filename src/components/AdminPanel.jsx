import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function AdminPanel() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ title: '', price: '', description: '', image: '' })
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    const res = await fetch(`${API}/api/products`)
    setProducts(await res.json())
    const resU = await fetch(`${API}/api/users`, { headers: { 'x-admin': 'true' } })
    setUsers(await resU.json())
  }

  useEffect(() => { fetchAll() }, [])

  const addProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { ...form, price: parseFloat(form.price || '0'), category: 'Computers', in_stock: true, stock_qty: 10 }
      const res = await fetch(`${API}/api/products`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin': 'true' }, body: JSON.stringify(body)
      })
      if (res.ok) {
        setForm({ title: '', price: '', description: '', image: '' })
        fetchAll()
      } else {
        const d = await res.json(); alert(d.detail || 'Failed')
      }
    } finally { setLoading(false) }
  }

  const delProduct = async (id) => {
    if (!confirm('Delete product?')) return
    const res = await fetch(`${API}/api/products/${id}`, { method: 'DELETE', headers: { 'x-admin': 'true' } })
    if (res.ok) fetchAll(); else alert('Delete failed')
  }

  const approve = async (email) => {
    const res = await fetch(`${API}/api/users/${email}/approve`, { method: 'POST', headers: { 'x-admin': 'true' } })
    if (res.ok) fetchAll(); else alert('Approve failed')
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3">Add Product</h3>
        <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="bg-slate-800 text-white px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
          <input className="bg-slate-800 text-white px-3 py-2 rounded" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
          <input className="bg-slate-800 text-white px-3 py-2 rounded" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
          <input className="bg-slate-800 text-white px-3 py-2 rounded md:col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <button disabled={loading} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded">{loading? 'Adding...' : 'Add Product'}</button>
        </form>
      </div>

      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3">Products</h3>
        <div className="space-y-2">
          {products.map(p => (
            <div key={p.id} className="flex items-center justify-between text-slate-200">
              <div>
                <span className="font-semibold">{p.title}</span>
                <span className="ml-2 text-orange-400">${p.price?.toFixed(2)}</span>
              </div>
              <button onClick={() => delProduct(p.id)} className="text-red-400 hover:text-red-300">Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3">Users</h3>
        <div className="space-y-2">
          {users.map(u => (
            <div key={u.id} className="flex items-center justify-between text-slate-200">
              <div>
                <span className="font-semibold">{u.name}</span> <span className="text-slate-400 text-sm">({u.email})</span>
                {!u.approved && <span className="ml-2 text-yellow-400 text-sm">Pending</span>}
              </div>
              {!u.approved && <button onClick={() => approve(u.email)} className="text-emerald-400 hover:text-emerald-300">Approve</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
