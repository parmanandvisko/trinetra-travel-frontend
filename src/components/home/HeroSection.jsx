import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const searchFields = [
  {
    id: 'destination',
    label: 'Destination',
    placeholder: 'Ex: Paris, Thailand',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'tourType',
    label: 'Tour Type',
    isSelect: true,
    options: ['All Tours', 'Family Tours', 'Adventure', 'Temple Yatras', 'Honeymoon'],
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'checkIn',
    label: 'Check In',
    type: 'date',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'guests',
    label: 'Guests',
    isSelect: true,
    options: ['1 Adult', '2 Adults', '3 Adults', '4+ Adults'],
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

export default function HeroSection() {
  const container = useRef(null)
  const [formData, setFormData] = useState({ destination: '', tourType: 'All Tours', checkIn: '', guests: '2 Adults' })

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.from('.hero-label', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' })
      .from('.hero-title', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .from('.hero-search', { y: 50, opacity: 0, scale: 0.97, duration: 0.9, ease: 'power3.out' }, '-=0.5')
  }, { scope: container })

  return (
    <section
      ref={container}
      className="relative min-h-[88vh] flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative path */}
      <div className="absolute top-10 left-10 opacity-40 pointer-events-none">
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
          <path d="M10 80 Q70 10 130 45" stroke="#D4A017" strokeWidth="2" strokeDasharray="6 5" fill="none" />
          <polygon points="127,40 136,47 124,50" fill="#D4A017" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-16 opacity-30 pointer-events-none">
        <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
          <path d="M5 50 Q50 5 95 30" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mb-10">
        <p
          className="hero-label text-gold text-3xl md:text-4xl mb-3"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          One life. Many destinations
        </p>
        <h1 className="hero-title text-4xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
          Where Would You Like To go?
        </h1>
      </div>

      {/* Search Bar */}
      <div className="hero-search relative z-10 w-full max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 lg:mb-4">
            {searchFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="text-gray-400">{field.icon}</span>
                  {field.label}
                </label>
                {field.isSelect ? (
                  <select
                    value={formData[field.id]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:border-primary bg-white cursor-pointer"
                  >
                    {field.options.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:border-primary placeholder:text-gray-400"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2">
            <button className="w-full lg:w-auto bg-primary text-white font-semibold px-12 py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
