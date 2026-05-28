import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const adventures = [
  { id: 1, title: 'Bali Tour Packages', duration: '5 Days / 4 Nights', description: 'Explore the beauty of Bali with beaches, temples, and culture.', price: 750, originalPrice: 990, rating: 4.8, reviews: 320, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop' },
  { id: 2, title: 'Japan Tour Packages', duration: '6 Days / 5 Nights', description: "Discover Japan's beauty, culture, and traditions.", price: 760, originalPrice: 990, rating: 4.8, reviews: 320, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop' },
  { id: 3, title: 'Vietnam Tour Packages', duration: '4 Days / 3 Nights', description: "Explore Vietnam's stunning landscapes and rich heritage.", price: 760, originalPrice: 990, rating: 4.8, reviews: 320, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&auto=format&fit=crop' },
  { id: 4, title: 'Switzerland Tour Packages', duration: '7 Days / 6 Nights', description: "Experience Switzerland's breathtaking beauty.", price: 760, originalPrice: 990, rating: 4.8, reviews: 320, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop' },
]

export default function PopularAdventures() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.pa-header', {
      y: 40, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.pa-header', start: 'top 85%', toggleActions: 'play none none none' },
    })
    gsap.from('.pa-card', {
      y: 70, opacity: 0, stagger: 0.13, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.pa-grid', start: 'top 80%', toggleActions: 'play none none none' },
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pa-header flex items-start justify-between mb-10">
          <div>
            <p className="text-gold font-semibold text-sm mb-1 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              Popular Adventures
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Most Popular Adventures</h2>
          </div>
          <Link to="/destinations" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="pa-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adventures.map((pkg) => (
            <div key={pkg.id} className="pa-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-44 overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-700">{pkg.rating} ({pkg.reviews})</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gold font-semibold mb-1">{pkg.duration}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{pkg.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary font-bold text-base">${pkg.price}</span>
                    <span className="text-gray-400 text-xs"> /person</span>
                    <p className="text-gray-400 text-xs line-through">${pkg.originalPrice}</p>
                  </div>
                  <Link to="/booking" className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                    Book Now
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
