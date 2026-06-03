import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBlogs } from '../../store/slices/blogsSlice'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function BlogDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { all: blogs, loading } = useSelector((s) => s.blogs)
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    if (blogs.length === 0) dispatch(fetchAllBlogs())
  }, [dispatch, blogs.length])

  useEffect(() => {
    if (blogs.length > 0) {
      setBlog(blogs.find((b) => b._id === id) || null)
    }
  }, [blogs, id])

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>
      </PageWrapper>
    )
  }

  if (!blog) {
    return (
      <PageWrapper>
        <PageHero title="Blog Not Found" subtitle="Oops!" breadcrumb="Blog" bg="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop" />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 mb-6">This blog post could not be found.</p>
          <Link to="/blogs" className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">← Back to Blogs</Link>
        </div>
      </PageWrapper>
    )
  }

  const related = blogs.filter((b) => b._id !== blog._id).slice(0, 3)

  return (
    <PageWrapper>
      <PageHero
        title={blog.title}
        subtitle={blog.tags?.[0] || 'Travel Stories'}
        breadcrumb="Blog"
        bg={blog.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop'}
      />

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {blog.author || 'Admin'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                {blog.readTime && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {blog.readTime}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {blog.image && (
                <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium border-l-4 border-primary pl-4 italic">{blog.excerpt}</p>
              )}

              {/* Content */}
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {blog.content}
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Plan Your Dream Trip</h3>
                <p className="text-gray-500 text-sm mb-4">Inspired by this article? Let us help you plan your perfect holiday!</p>
                <Link to="/booking" className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm inline-block">
                  Book a Package
                </Link>
              </div>

              <div className="mt-6 text-center">
                <Link to="/blogs" className="text-primary text-sm font-semibold hover:underline">← Back to All Blogs</Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Related Posts */}
              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map((post) => (
                      <Link key={post._id} to={`/blogs/${post._id}`} className="flex gap-3 group">
                        {post.image && (
                          <img src={post.image} alt={post.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{post.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{new Date(post.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-primary rounded-2xl p-5 text-white text-center">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="font-bold mb-2">Ready to Travel?</h3>
                <p className="text-white/80 text-xs mb-4">Get a free personalized itinerary from our experts</p>
                <a href="https://wa.me/919343088141" target="_blank" rel="noreferrer" className="block bg-white text-primary font-semibold text-sm py-2.5 rounded-full hover:bg-gray-100 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
