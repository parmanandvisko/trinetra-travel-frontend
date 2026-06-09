import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedDestinations } from '../../store/slices/destinationsSlice'
import { imageUrl, handleImageError } from '../../utils/image'
import { openWhatsApp } from '../../utils/whatsapp'
import api from '../../services/api'

const FALLBACK = [
  { _id: '1', name: 'Passionate-Paris', subtitle: 'France', image: 'https://images.unsplash.com/photo-1778159242389-00f28329cc16?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&auto=format&fit=crop' },
  { _id: '2', name: 'Netherlands', subtitle: 'Amsterdam', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&auto=format&fit=crop' },
  { _id: '3', name: 'Himachal', subtitle: 'India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&auto=format&fit=crop' },
  { _id: '4', name: 'Australia', subtitle: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop' },
]

export default function TourDestinations() {
  const container = useRef(null)
  const dispatch = useDispatch()
  const { featured, loading } = useSelector((s) => s.destinations)
  const [holidayDiscount, setHolidayDiscount] = useState(0)

  useEffect(() => { dispatch(fetchFeaturedDestinations()) }, [dispatch])
  useEffect(() => {
    api.get('/packages?hasDiscount=true&isActive=true&limit=100')
      .then((res) => {
        const discounts = (res.data.data || []).map((pkg) => Number(pkg.discount) || 0)
        setHolidayDiscount(discounts.length ? Math.max(...discounts) : 0)
      })
      .catch(() => setHolidayDiscount(0))
  }, [])

  const destinations = featured.length > 0 ? featured : FALLBACK
  const openFlightBooking = () => openWhatsApp(
    'Hello Trinetra Global Holidays! I want help booking a domestic or international flight. Please share the best available fares.'
  )

  useGSAP(() => {
    gsap.from('.td-label', {
      x: -40, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.td-label', start: 'top 85%', toggleActions: 'play none none none' },
    })
    gsap.from('.td-title', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.td-title', start: 'top 85%', toggleActions: 'play none none none' },
    })
    gsap.from('.td-card', {
      y: 70, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.td-grid', start: 'top 80%', toggleActions: 'play none none none' },
    })
    gsap.from('.td-promo', {
      y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.td-promo', start: 'top 85%', toggleActions: 'play none none none' },
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="td-label text-gold font-semibold text-sm mb-1 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Explore The World
            </p>
            <h2 className="td-title text-2xl md:text-3xl font-bold text-gray-900">Our Latest Tour Destinations</h2>
          </div>
          <Link to="/destinations" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Destination Cards */}
        <div className="td-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading && destinations === FALLBACK ? (
            [1,2,3,4].map((i) => <div key={i} className="td-card rounded-2xl bg-gray-100 h-48 md:h-56 animate-pulse" />)
          ) : (
            destinations.map((dest) => (
              <Link
                key={dest._id}
                to="/destinations"
                className="td-card relative rounded-2xl overflow-hidden group cursor-pointer h-48 md:h-56"
              >
                <img src={imageUrl(dest.image)} onError={handleImageError} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 gradient-overlay" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-bold text-base">{dest.name}</h3>
                  <p className="text-gray-300 text-xs">{dest.subtitle || dest.country}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Promo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="td-promo relative rounded-2xl overflow-hidden h-44"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end p-6 gap-4">
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Holiday Packages</h3>
                <p className="text-gray-200 text-xs leading-relaxed">Curated holiday packages for a perfect vacation experience.</p>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                {holidayDiscount > 0 && <span className="w-14 h-14 rounded-full bg-blue-500 flex flex-col items-center justify-center text-white font-bold text-xs leading-tight">
                  <span className="text-lg font-extrabold">{holidayDiscount}%</span><span>Off</span>
                </span>}
                <Link to="/packages/discounts" className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                  See All <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="td-promo group relative h-44 cursor-pointer overflow-hidden rounded-2xl"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            role="link"
            tabIndex={0}
            onClick={openFlightBooking}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openFlightBooking()
              }
            }}
          >
            <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-end p-6 gap-4">
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Flight Bookings</h3>
                <p className="text-gray-200 text-xs leading-relaxed">Find the best deals on domestic & international flights.</p>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button type="button" className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.44 0 .07 5.37.07 11.97c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.93 11.93 0 0 0 5.83 1.48h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.24-6.18-3.49-8.4Zm-8.48 18.35h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.91 9.91 0 1 1 8.35 4.58Zm5.43-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.91 8.91 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                  Flight Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
