import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useSelector } from 'react-redux'
import api from '../../services/api'
import { handleImageError } from '../../utils/image'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function HeroSection() {
  const container = useRef(null)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const s = useSelector((st) => st.settings.data)

  const [query, setQuery] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [guests, setGuests] = useState('2 Adults')
  const [results, setResults] = useState({ destinations: [], packages: [] })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const debouncedQuery = useDebounce(query, 350)

  // Fetch from API when query changes
  useEffect(() => {
    if (selected && debouncedQuery === (selected.item.name || selected.item.title)) {
      setResults({ destinations: [], packages: [] })
      setOpen(false)
      return
    }
    if (debouncedQuery.trim().length < 2) {
      setResults({ destinations: [], packages: [] })
      setOpen(false)
      return
    }
    setLoading(true)
    Promise.all([
      api.get(`/destinations?search=${debouncedQuery}&limit=4`).then(r => r.data.data || []).catch(() => []),
      api.get(`/packages?search=${debouncedQuery}&limit=4&isActive=true`).then(r => r.data.data || []).catch(() => []),
    ]).then(([destinations, packages]) => {
      setResults({ destinations, packages })
      setOpen(destinations.length > 0 || packages.length > 0)
    }).finally(() => setLoading(false))
  }, [debouncedQuery, selected])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const pick = (item, type) => {
    setQuery(item.name || item.title)
    setSelected({ item, type })
    setOpen(false)
  }

  const saveSearch = () => {
    api.post('/searches', {
      query: query.trim(),
      selectedType: selected?.type || 'general',
      selectedName: selected?.item?.name || selected?.item?.title || query.trim(),
      selectedId: selected?.item?._id || '',
      category: selected?.item?.category || selected?.item?.type || '',
      checkIn,
      guests,
      source: 'hero',
    }).catch(() => {})
  }

  const search = () => {
    saveSearch()
    if (!query.trim()) { navigate('/destinations'); return }
    if (selected?.type === 'package') {
      navigate(selected.item.type === 'domestic' ? '/destinations/domestic' : '/destinations/international')
    } else {
      navigate('/destinations')
    }
  }

  const planMyTrip = () => {
    window.open(`https://wa.me/${s.whatsapp || '919343088141'}?text=${encodeURIComponent('Hello Trinetra Global Holidays! I want to plan my trip.')}`, '_blank', 'noopener,noreferrer')
  }

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.from('.hero-label', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' })
      .from('.hero-title', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .from('.hero-search', { y: 50, opacity: 0, scale: 0.97, duration: 0.9, ease: 'power3.out' }, '-=0.5')
  }, { scope: container })

  const total = results.destinations.length + results.packages.length

  return (
    <section
      ref={container}
      className="relative min-h-[88vh] flex flex-col items-center justify-center text-white overflow-visible py-10"
      style={{
        backgroundImage: `url(${s.heroBg || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative SVG paths */}
      <div className="absolute top-10 left-10 opacity-40 pointer-events-none hidden md:block">
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
          <path d="M10 80 Q70 10 130 45" stroke="#D4A017" strokeWidth="2" strokeDasharray="6 5" fill="none" />
          <polygon points="127,40 136,47 124,50" fill="#D4A017" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-16 opacity-30 pointer-events-none hidden md:block">
        <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
          <path d="M5 50 Q50 5 95 30" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center px-4 mb-8 md:mb-10">
        <p className="hero-label text-gold text-2xl md:text-4xl mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
          {s.heroSubtitle}
        </p>
        <h1 className="hero-title text-3xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
          {s.heroTitle}
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base text-white/90 leading-relaxed">
          We plan domestic and international holidays with handpicked hotels, guided experiences, flights, visas, insurance and 24/7 travel assistance.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={planMyTrip} className="bg-green-500 text-white font-bold px-8 py-3 rounded-full hover:bg-green-600 transition-colors shadow-xl">
            Plan My Trip
          </button>
          <a href={`tel:${s.phone}`} className="bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors">
            Call {s.phone}
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {[
            ['What We Sell', 'Custom holidays, flights, hotels, visas and travel insurance.'],
            ['Why Trust Us', `${s.businessRegistration || 'Registered Travel Business'} · ${s.googleReviews || '4.8/5 Google Reviews'}`],
            ['Contact Fast', `WhatsApp or call us directly for a free trip plan.`],
          ].map(([title, text]) => (
            <div key={title} className="bg-white/12 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-left">
              <p className="text-gold text-xs font-bold uppercase tracking-wide">{title}</p>
              <p className="text-white/90 text-xs mt-1 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          {[s.gstNumber, s.businessRegistration, s.googleReviews, `${s.happyTravelers || '50+'} Happy Travelers`, s.securePaymentBadge].filter(Boolean).map((item) => (
            <span key={item} className="bg-white/90 text-gray-800 font-semibold px-3 py-1.5 rounded-full">{item}</span>
          ))}
        </div>
        {(s.customerPhotos || []).length > 0 && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              {s.customerPhotos.slice(0, 4).map((img, i) => (
                <img key={i} src={img} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
              ))}
            </div>
            <span className="text-xs text-white/85">Real traveler memories from recent holidays</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="hero-search relative z-[80] w-full max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Destination — searchable autocomplete */}
            <div className="relative z-[90] flex flex-col gap-1.5 lg:col-span-1" ref={dropdownRef}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destination or package..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(null) }}
                  onFocus={() => total > 0 && setOpen(true)}
                  onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 pr-8 text-sm text-gray-700 focus:outline-none focus:border-primary placeholder:text-gray-400"
                />
                {loading && (
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {query && !loading && (
                  <button onClick={() => { setQuery(''); setSelected(null); setOpen(false) }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {open && total > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden max-h-72 overflow-y-auto">
                  {results.destinations.length > 0 && (
                    <>
                      <p className="px-3 pt-2.5 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destinations</p>
                      {results.destinations.map((d) => (
                        <button key={d._id} onClick={() => pick(d, 'destination')}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary/5 transition-colors text-left">
                          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                            {d.image ? <img src={d.image} onError={handleImageError} alt={d.name} className="w-full h-full object-cover" /> :
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-base">🌍</div>}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{d.name}</p>
                            <p className="text-xs text-gray-400">{d.subtitle || d.country}</p>
                          </div>
                          <svg className="w-3.5 h-3.5 text-gray-300 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </>
                  )}
                  {results.packages.length > 0 && (
                    <>
                      <p className="px-3 pt-2.5 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 mt-1">Tour Packages</p>
                      {results.packages.map((p) => (
                        <button key={p._id} onClick={() => pick(p, 'package')}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary/5 transition-colors text-left">
                          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                            {p.image ? <img src={p.image} onError={handleImageError} alt={p.title} className="w-full h-full object-cover" /> :
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-base">📦</div>}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{p.title}</p>
                            <p className="text-xs text-gray-400">{p.duration} · <span className="text-primary font-semibold">${p.price}</span></p>
                          </div>
                          <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${p.type === 'domestic' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                            {p.type}
                          </span>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Check In */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:border-primary bg-white cursor-pointer"
              >
                {['1 Adult', '2 Adults', '3 Adults', '4 Adults', '5 Adults', '6+ Adults'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={search}
                className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
