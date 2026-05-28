import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecentBlogs } from '../../store/slices/blogsSlice'

const FALLBACK = [
  { _id: '1', title: 'The Ultimate Guide to Traveling', excerpt: 'Discover expert tips, top destinations, budget hacks, and everything you need for a perfect trip.', createdAt: '2025-05-20', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop', author: 'Admin' },
  { _id: '2', title: 'Hidden Gems You Must Visit', excerpt: 'Explore offbeat places that offer unique experiences away from the crowds.', createdAt: '2025-05-18', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop', author: 'Admin' },
  { _id: '3', title: 'Adventure Travel Made Easy', excerpt: 'Your guide to thrilling adventures and unforgettable travel experiences.', createdAt: '2025-05-15', image: 'https://images.unsplash.com/photo-1527004013197-933b09c3b0e9?w=500&auto=format&fit=crop', author: 'Admin' },
  { _id: '4', title: 'Packing Tips for Every Traveler', excerpt: 'Smart packing tips to make your journey comfortable and hassle-free.', createdAt: '2025-05-12', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&auto=format&fit=crop', author: 'Admin' },
]

export default function BlogSection() {
  const container = useRef(null)
  const dispatch = useDispatch()
  const { recent, loading } = useSelector((s) => s.blogs)

  useEffect(() => { dispatch(fetchRecentBlogs()) }, [dispatch])

  const blogs = recent.length > 0 ? recent : FALLBACK

  useGSAP(() => {
    gsap.from('.bs-header', {
      y: 40, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.bs-header', start: 'top 85%', toggleActions: 'play none none none' },
    })
    gsap.from('.bs-card', {
      y: 70, opacity: 0, stagger: 0.13, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.bs-grid', start: 'top 80%', toggleActions: 'play none none none' },
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bs-header flex items-start justify-between mb-10">
          <div>
            <p className="text-gold font-semibold text-sm mb-1 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              Our Blog
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Blog and Articles</h2>
          </div>
          <Link to="/blogs" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="bs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && blogs === FALLBACK ? (
            [1,2,3,4].map((i) => <div key={i} className="bs-card rounded-2xl bg-gray-100 h-72 animate-pulse" />)
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="bs-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-44 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {blog.author || 'Admin'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link to={`/blogs/${blog._id}`} className="flex items-center gap-1 text-primary text-xs font-semibold hover:gap-2 transition-all">
                    Read More
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
