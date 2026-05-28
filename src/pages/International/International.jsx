import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const regions = ['All', 'Asia', 'Europe', 'Middle East', 'Oceania', 'Americas']

const packages = [
  { id: 1, title: 'Bali Tour Package', region: 'Asia', duration: '5 Days / 4 Nights', price: 750, originalPrice: 990, rating: 4.8, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop', desc: 'Beaches, temples, rice terraces and vibrant Balinese culture.' },
  { id: 2, title: 'Japan Explorer', region: 'Asia', duration: '8 Days / 7 Nights', price: 1299, originalPrice: 1800, rating: 4.9, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop', desc: "Sakura, sushi, samurai — Japan's magic awaits you." },
  { id: 3, title: 'Dubai Extravaganza', region: 'Middle East', duration: '5 Days / 4 Nights', price: 899, originalPrice: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop', desc: 'Burj Khalifa, desert safari, gold souk and world-class shopping.' },
  { id: 4, title: 'Paris Romance', region: 'Europe', duration: '6 Days / 5 Nights', price: 1499, originalPrice: 2000, rating: 4.9, image: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=500&auto=format&fit=crop', desc: 'The Eiffel Tower, Louvre, Seine river and exquisite French cuisine.' },
  { id: 5, title: 'Switzerland Alpine Tour', region: 'Europe', duration: '7 Days / 6 Nights', price: 1799, originalPrice: 2400, rating: 4.9, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop', desc: 'Snow-capped Alps, chocolate, cheese and fairytale villages.' },
  { id: 6, title: 'Thailand Adventure', region: 'Asia', duration: '6 Days / 5 Nights', price: 649, originalPrice: 890, rating: 4.7, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&auto=format&fit=crop', desc: 'Bangkok temples, Phuket beaches and Chiang Mai hill tribes.' },
  { id: 7, title: 'Sydney & Melbourne', region: 'Oceania', duration: '9 Days / 8 Nights', price: 1999, originalPrice: 2700, rating: 4.8, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop', desc: 'The Opera House, Great Barrier Reef and the Outback.' },
  { id: 8, title: 'New York City Break', region: 'Americas', duration: '7 Days / 6 Nights', price: 1699, originalPrice: 2200, rating: 4.7, image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=500&auto=format&fit=crop', desc: 'Times Square, Central Park, Statue of Liberty and Broadway.' },
]

export default function International() {
  const [active, setActive] = useState('All')
  const gridRef = useRef(null)

  const filtered = active === 'All' ? packages : packages.filter((p) => p.region === active)

  useGSAP(() => {
    gsap.from('.int-card', {
      y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    })
  }, { scope: gridRef, dependencies: [active] })

  return (
    <PageWrapper>
      <PageHero title="International Tours" subtitle="See The World" breadcrumb="Destinations" bg="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop" />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Around the Globe</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">International Tour Packages</h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {regions.map((r) => (
              <button key={r} onClick={() => setActive(r)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${active === r ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {r}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((pkg) => (
              <div key={pkg.id} className="int-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">{pkg.region}</span>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2.5 py-1 flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-semibold text-gray-700">{pkg.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gold font-semibold mb-1">{pkg.duration}</p>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">{pkg.title}</h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{pkg.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-primary font-bold">${pkg.price}</span>
                      <span className="text-gray-400 text-xs"> /person</span>
                      <p className="text-gray-400 text-xs line-through">${pkg.originalPrice}</p>
                    </div>
                    <Link to="/booking" className="flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-primary-dark transition-colors">
                      Book Now <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
