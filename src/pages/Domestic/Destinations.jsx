import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDestinations } from '../../store/slices/destinationsSlice'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const categories = [
  { label: 'Domestic Tours', desc: 'Discover the beauty of India — from the Himalayas to the beaches of Goa.', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop', to: '/destinations/domestic', count: '50+ Packages', color: 'from-orange-500/70' },
  { label: 'International Tours', desc: 'Explore global destinations — Bali, Paris, Dubai, Switzerland, and more.', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop', to: '/destinations/international', count: '80+ Packages', color: 'from-blue-600/70' },
]

const FALLBACK = [
  { _id: '1', name: 'Passionate-Paris', subtitle: 'France', image: 'https://images.unsplash.com/photo-1743797295463-14f8fba97b88?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&auto=format&fit=crop' },
  { _id: '2', name: 'Netherlands', subtitle: 'Amsterdam', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&auto=format&fit=crop' },
  { _id: '3', name: 'Himachal', subtitle: 'India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&auto=format&fit=crop' },
  { _id: '4', name: 'Australia', subtitle: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&auto=format&fit=crop' },
  { _id: '5', name: 'Bali', subtitle: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop' },
  { _id: '6', name: 'Dubai', subtitle: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&auto=format&fit=crop' },
  { _id: '7', name: 'Switzerland', subtitle: 'Europe', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&auto=format&fit=crop' },
  { _id: '8', name: 'Thailand', subtitle: 'Asia', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&auto=format&fit=crop' },
]

export default function Destinations() {
  const catRef = useRef(null)
  const destRef = useRef(null)
  const dispatch = useDispatch()
  const { all, loading } = useSelector((s) => s.destinations)

  useEffect(() => { dispatch(fetchAllDestinations()) }, [dispatch])

  const destinations = all.length > 0 ? all : FALLBACK

  useGSAP(() => {
    gsap.from('.cat-card', { y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: catRef.current, start: 'top 80%', toggleActions: 'play none none none' } })
  }, { scope: catRef })

  useGSAP(() => {
    gsap.from('.dest-card', { y: 50, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: destRef.current, start: 'top 80%', toggleActions: 'play none none none' } })
  }, { scope: destRef })

  return (
    <PageWrapper>
      <PageHero title="Destinations" subtitle="Explore The World" breadcrumb="Destinations" bg="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop" />

      {/* Categories */}
      <section ref={catRef} className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Where To?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Choose Your Journey Type</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Link key={cat.label} to={cat.to} className="cat-card relative rounded-3xl overflow-hidden h-64 group">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{cat.count}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.label}</h3>
                  <p className="text-white/80 text-sm max-w-xs">{cat.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-white text-sm font-semibold">
                    Explore Now <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations from API */}
      <section ref={destRef} className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Popular Picks</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Destinations</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading && destinations === FALLBACK ? (
              [1,2,3,4,5,6,7,8].map((i) => <div key={i} className="dest-card rounded-2xl bg-gray-200 h-44 animate-pulse" />)
            ) : (
              destinations.map((d) => (
                <Link key={d._id} to="/booking" className="dest-card relative rounded-2xl overflow-hidden h-44 group">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 gradient-overlay" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-bold text-sm">{d.name}</h3>
                    <p className="text-gray-300 text-xs">{d.subtitle || d.country}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
