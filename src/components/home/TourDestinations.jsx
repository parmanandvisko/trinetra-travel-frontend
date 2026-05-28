import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedDestinations } from '../../store/slices/destinationsSlice'

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

  useEffect(() => { dispatch(fetchFeaturedDestinations()) }, [dispatch])

  const destinations = featured.length > 0 ? featured : FALLBACK

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
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                <span className="w-14 h-14 rounded-full bg-blue-500 flex flex-col items-center justify-center text-white font-bold text-xs leading-tight">
                  <span className="text-lg font-extrabold">30%</span><span>Off</span>
                </span>
                <Link to="/destinations" className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                  See All <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="td-promo relative rounded-2xl overflow-hidden h-44"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end p-6 gap-4">
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Flight Bookings</h3>
                <p className="text-gray-200 text-xs leading-relaxed">Find the best deals on domestic & international flights.</p>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <span className="w-14 h-14 rounded-full bg-blue-500 flex flex-col items-center justify-center text-white font-bold text-xs leading-tight">
                  <span className="text-lg font-extrabold">30%</span><span>Off</span>
                </span>
                <Link to="/booking" className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                  Book Now <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
