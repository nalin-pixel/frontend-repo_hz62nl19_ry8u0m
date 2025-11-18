import { ShoppingCart } from 'lucide-react'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-900/60 border border-slate-700/40 rounded-xl p-4 flex flex-col hover:border-orange-400/60 transition-colors">
      <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 mb-3 grid place-items-center text-slate-400 text-sm">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span>{product.category}</span>
        )}
      </div>
      <h3 className="text-white font-semibold line-clamp-1">{product.title}</h3>
      <p className="text-slate-300/80 text-sm line-clamp-2 mb-3">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-orange-400 font-bold">${product.price?.toFixed(2)}</span>
        <button onClick={() => onAdd(product)} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-2 rounded-md transition-colors">
          <ShoppingCart size={16} /> Add
        </button>
      </div>
    </div>
  )
}

export default ProductCard
