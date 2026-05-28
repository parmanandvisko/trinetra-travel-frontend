import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const categories = ['All', 'Travel Tips', 'Destinations', 'Adventure', 'Culture', 'Food']

const allBlogs = [
  { id: 1, title: 'The Ultimate Guide to Traveling', category: 'Travel Tips', excerpt: 'Discover expert tips, top destinations, budget hacks, and everything you need for a perfect trip.', date: 'May 20, 2025', read: '5 min read', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop' },
  { id: 2, title: 'Hidden Gems You Must Visit', category: 'Destinations', excerpt: 'Explore offbeat places that offer unique experiences away from the crowds.', date: 'May 18, 2025', read: '4 min read', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop' },
  { id: 3, title: 'Adventure Travel Made Easy', category: 'Adventure', excerpt: 'Your guide to thrilling adventures and unforgettable travel experiences.', date: 'May 15, 2025', read: '6 min read', image: 'https://images.unsplash.com/photo-1527004013197-933b09c3b0e9?w=600&auto=format&fit=crop' },
  { id: 4, title: 'Packing Tips for Every Traveler', category: 'Travel Tips', excerpt: 'Smart packing tips to make your journey comfortable and hassle-free.', date: 'May 12, 2025', read: '3 min read', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop' },
  { id: 5, title: 'Best Street Food Around the World', category: 'Food', excerpt: 'From Bangkok to Barcelona — discover street food that will blow your mind.', date: 'May 10, 2025', read: '5 min read', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop' },
  { id: 6, title: 'Top 10 Cultural Festivals to Attend', category: 'Culture', excerpt: "Immerse yourself in the world's most vibrant and colorful festivals.", date: 'May 8, 2025', read: '7 min read', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop' },
  { id: 7, title: 'Solo Travel: A Complete Beginner Guide', category: 'Travel Tips', excerpt: 'Everything first-time solo travelers need to know before their first trip.', date: 'May 5, 2025', read: '8 min read', image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&auto=format&fit=crop' },
  { id: 8, title: 'Mountains vs. Beaches: Which to Choose?', category: 'Destinations', excerpt: 'A fun comparison to help you decide your next holiday type.', date: 'May 2, 2025', read: '4 min read', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop' },
]

export default function Blogs() {
  const [active, setActive] = useState('All')
  const gridRef = useRef(null)

  const filtered = active === 'All' ? allBlogs : allBlogs.filter((b) => b.category === active)

  useGSAP(() => {
    gsap.from('.blog-card', {
      y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    })
  }, { scope: gridRef, dependencies: [active] })

  return (
    <PageWrapper>
      <PageHero title="Blog & Articles" subtitle="Travel Stories" breadcrumb="Blog" bg="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop" />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((blog) => (
              <div key={blog.id} className="blog-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="h-44 overflow-hidden relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{blog.category}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-400">{blog.date}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{blog.read}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                  <Link to={`/blogs/${blog.id}`} className="flex items-center gap-1 text-primary text-xs font-semibold hover:gap-2 transition-all">
                    Read More <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
