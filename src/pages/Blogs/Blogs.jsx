import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBlogs } from '../../store/slices/blogsSlice'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function Blogs() {
  const [active, setActive] = useState('All')
  const gridRef = useRef(null)
  const dispatch = useDispatch()
  const { all: allBlogs, loading } = useSelector((s) => s.blogs)

  useEffect(() => { dispatch(fetchAllBlogs()) }, [dispatch])

  // Collect unique tags from API data
  const tags = ['All', ...new Set(allBlogs.flatMap((b) => b.tags || []))]

  const filtered = active === 'All' ? allBlogs : allBlogs.filter((b) => (b.tags || []).includes(active))

  useGSAP(() => {
    if (!loading) {
      gsap.from('.blog-card', {
        y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }
  }, { scope: gridRef, dependencies: [active, loading] })

  return (
    <PageWrapper>
      <PageHero title="Blog & Articles" subtitle="Travel Stories" breadcrumb="Blog" bg="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop" />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters from tags */}
          {tags.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {tags.map((cat) => (
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
          )}

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="blog-card rounded-2xl bg-gray-100 h-72 animate-pulse" />
              ))
            ) : filtered.length === 0 ? (
              <div className="col-span-4 text-center py-20 text-gray-400">No blogs found</div>
            ) : (
              filtered.map((blog) => (
                <div key={blog._id} className="blog-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="h-44 overflow-hidden relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {blog.tags?.length > 0 && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{blog.tags[0]}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{blog.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <Link to={`/blogs/${blog._id}`} className="flex items-center gap-1 text-primary text-xs font-semibold hover:gap-2 transition-all">
                      Read More <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
