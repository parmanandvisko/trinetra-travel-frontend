import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import api from '../../services/api'
import { handleImageError, imageUrl } from '../../utils/image'

export default function PopularAdventures() {
  const container = useRef(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/gallery?isActive=true')
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  useGSAP(() => {
    if (loading) return
    gsap.from('.gallery-card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 82%', toggleActions: 'play none none none' },
    })
  }, { scope: container, dependencies: [loading, items.length] })

  if (!loading && items.length === 0) return null

  return (
    <section ref={container} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-gold font-semibold text-sm mb-1">Travel Gallery</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Memories From Our Journeys</h2>
          <p className="mt-2 text-sm text-gray-500">Photos and videos from unforgettable travel experiences.</p>
        </div>

        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            [1, 2, 3].map((item) => <div key={item} className="h-72 rounded-2xl bg-gray-100 animate-pulse" />)
          ) : items.map((item) => (
            <article key={item._id} className="gallery-card group relative h-72 overflow-hidden rounded-2xl bg-gray-100 shadow-md">
              {item.mediaType === 'video' ? (
                <video
                  src={imageUrl(item.mediaUrl)}
                  poster={item.thumbnailUrl ? imageUrl(item.thumbnailUrl) : undefined}
                  controls
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src={imageUrl(item.mediaUrl)} onError={handleImageError} alt={item.title || 'Travel gallery'} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              {item.title && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12">
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
