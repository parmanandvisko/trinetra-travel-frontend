import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function PageHero({ title, subtitle, breadcrumb, bg }) {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.ph-sub', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' })
      .from('.ph-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from('.ph-bread', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  }, { scope: container })

  return (
    <section
      ref={container}
      className="relative h-72 md:h-80 flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {subtitle && (
          <p
            className="ph-sub text-gold text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {subtitle}
          </p>
        )}
        <h1 className="ph-title text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <div className="ph-bread flex items-center gap-2 text-sm text-gray-300">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gold">{breadcrumb || title}</span>
        </div>
      </div>
    </section>
  )
}
