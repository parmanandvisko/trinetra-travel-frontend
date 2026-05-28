import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTABanner() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.cta-badge', {
      scale: 0, rotation: -15, opacity: 0, duration: 0.9, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: container.current, start: 'top 80%', toggleActions: 'play none none none' },
    })
    gsap.from('.cta-text', {
      y: 50, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 80%', toggleActions: 'play none none none' },
    })
    gsap.from('.cta-btn', {
      y: 30, opacity: 0, duration: 0.7, delay: 0.4, ease: 'power2.out',
      scrollTrigger: { trigger: container.current, start: 'top 80%', toggleActions: 'play none none none' },
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="cta-badge w-20 h-20 rounded-full bg-gold flex flex-col items-center justify-center text-white shadow-xl shrink-0">
              <span className="text-2xl font-extrabold leading-none">40%</span>
              <span className="text-xs font-semibold">Off</span>
            </div>
            <div className="cta-text">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Grab Up To <span className="text-gold">40% Off</span> On<br />
                Your Favorite Destination
              </h2>
            </div>
          </div>
          <Link
            to="/booking"
            className="cta-btn flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-dark transition-colors text-sm whitespace-nowrap shadow-xl"
          >
            Book Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
