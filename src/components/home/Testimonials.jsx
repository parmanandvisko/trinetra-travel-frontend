import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = [
  { id: 1, name: 'Andre Patil', location: 'Mumbai, India', rating: 5, text: '"The team planned our vacation perfectly! From smooth bookings to amazing experiences, everything was well-organized. Highly recommended for anyone looking for a stress-free trip."', avatar: 'https://picsum.photos/seed/user1/60/60' },
]

export default function Testimonials() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.tm-left', {
      x: -80, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 75%', toggleActions: 'play none none none' },
    })
    gsap.from('.tm-right', {
      x: 80, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: container.current, start: 'top 75%', toggleActions: 'play none none none' },
    })
    gsap.from('.tm-card', {
      y: 40, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
      scrollTrigger: { trigger: container.current, start: 'top 75%', toggleActions: 'play none none none' },
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="tm-left relative rounded-3xl overflow-hidden h-72 md:h-80 shadow-xl">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&auto=format&fit=crop" alt="Destination" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 right-6 bg-primary rounded-2xl p-5 text-white text-center shadow-xl">
              <p className="text-4xl font-extrabold leading-none">15+</p>
              <p className="text-xs font-semibold mt-1 opacity-90">Years of Trust</p>
            </div>
          </div>

          {/* Right Testimonial */}
          <div className="tm-right">
            <p className="text-gold font-semibold text-sm mb-1 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              Testimonials
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              What Our Tourist Say!
            </h2>

            <div className="tm-card bg-white rounded-2xl shadow-md p-6 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              {testimonials.map((t) => (
                <div key={t.id}>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic mb-4">{t.text}</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= t.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
