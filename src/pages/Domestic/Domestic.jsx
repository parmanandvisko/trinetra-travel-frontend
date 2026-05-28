import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const tabs = ['All', 'Hill Stations', 'Beach', 'Heritage', 'Wildlife', 'Spiritual']

const packages = [
  { id: 1, title: 'Kashmir Valley Tour', tag: 'Hill Stations', duration: '6 Days / 5 Nights', price: 299, originalPrice: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&auto=format&fit=crop', desc: 'Explore the paradise on earth with breathtaking valleys and Mughal gardens.' },
  { id: 2, title: 'Goa Beach Holiday', tag: 'Beach', duration: '4 Days / 3 Nights', price: 199, originalPrice: 320, rating: 4.7, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop', desc: 'Sun, sand, and sea — the perfect escape to Goa\'s golden beaches.' },
  { id: 3, title: 'Rajasthan Heritage Tour', tag: 'Heritage', duration: '7 Days / 6 Nights', price: 349, originalPrice: 500, rating: 4.8, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&auto=format&fit=crop', desc: 'Journey through majestic forts and vibrant desert culture of Rajasthan.' },
  { id: 4, title: 'Kerala Backwaters', tag: 'Beach', duration: '5 Days / 4 Nights', price: 249, originalPrice: 380, rating: 4.9, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&auto=format&fit=crop', desc: 'Drift through emerald backwaters on a traditional houseboat.' },
  { id: 5, title: 'Jim Corbett Wildlife Safari', tag: 'Wildlife', duration: '3 Days / 2 Nights', price: 189, originalPrice: 280, rating: 4.6, image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop', desc: "Experience India's oldest national park and spot the majestic Bengal tiger." },
  { id: 6, title: 'Char Dham Yatra', tag: 'Spiritual', duration: '12 Days / 11 Nights', price: 599, originalPrice: 850, rating: 5.0, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&auto=format&fit=crop', desc: 'A sacred pilgrimage to the four holy shrines of Uttarakhand.' },
  { id: 7, title: 'Shimla & Manali Package', tag: 'Hill Stations', duration: '8 Days / 7 Nights', price: 389, originalPrice: 550, rating: 4.8, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop', desc: 'Snow-capped peaks, apple orchards, and crisp mountain air.' },
  { id: 8, title: 'Varanasi Spiritual Tour', tag: 'Spiritual', duration: '3 Days / 2 Nights', price: 149, originalPrice: 220, rating: 4.7, image: 'https://images.unsplash.com/photo-1561361058-c24e021e32f5?w=500&auto=format&fit=crop', desc: 'Witness the eternal city on the Ganges with ghats, aarti, and history.' },
]

export default function Domestic() {
  const [active, setActive] = useState('All')
  const gridRef = useRef(null)

  const filtered = active === 'All' ? packages : packages.filter((p) => p.tag === active)

  useGSAP(() => {
    gsap.from('.pkg-card', {
      y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    })
  }, { scope: gridRef, dependencies: [active] })

  return (
    <PageWrapper>
      <PageHero title="Domestic Tours" subtitle="Explore India" breadcrumb="Destinations" bg="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&auto=format&fit=crop" />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Discover India</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Domestic Tour Packages</h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActive(tab)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${active === tab ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((pkg) => (
              <div key={pkg.id} className="pkg-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full">{pkg.tag}</span>
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
