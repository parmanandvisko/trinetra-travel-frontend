import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function WelcomeSection() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.ws-left', {
      x: -80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 75%', toggleActions: 'play none none none' },
    })
    gsap.from('.ws-right', {
      x: 80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 75%', toggleActions: 'play none none none' },
    })
    gsap.from('.ws-stat', {
      y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.ws-stat', start: 'top 85%', toggleActions: 'play none none none' },
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="ws-left order-2 lg:order-1">
            <p className="text-gold text-3xl md:text-4xl mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Welcome
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
              Trusted Experts in Family Tours &amp; Temple Yatras
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
              We at WanderNest Tour and Travels craft tours with care — whether it's family trips, temple journeys, or
              adventure getaways. Explore new places with comfort and trust.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { value: '15+', label: 'Years of Trust' },
                { value: '5K+', label: 'Happy Travelers' },
                { value: '200+', label: 'Tour Packages' },
              ].map((stat) => (
                <div key={stat.label} className="ws-stat text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link to="/about" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
              Know More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Image */}
          <div className="ws-right order-1 lg:order-2 relative">
            <div className="absolute -top-6 right-10 opacity-50 z-10 pointer-events-none">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                <path d="M5 55 Q50 5 95 30" stroke="#D4A017" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                <polygon points="92,26 100,32 90,36" fill="#D4A017" />
              </svg>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96">
              <img
                src="https://images.unsplash.com/photo-1522163182402-834f871fd851?w=700&auto=format&fit=crop"
                alt="Adventure travel"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">4.9 / 5.0</p>
                  <p className="text-xs text-gray-500">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
