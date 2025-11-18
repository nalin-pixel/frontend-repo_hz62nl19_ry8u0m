import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/S4k-6fqjuV5AuVZe/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full w-full bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent pointer-events-none" />
      <div className="relative z-20 h-full flex items-end p-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(234,88,12,0.35)]">
            ByteRize
          </h1>
          <p className="mt-3 text-slate-200 text-lg md:text-xl">
            Retro-tech inspired computer store. Explore gear, build your cart, and check out seamlessly.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
