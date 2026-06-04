import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDestinations } from '../../store/slices/destinationsSlice'
import { imageUrl, handleImageError } from '../../utils/image'

export default function PopularDestinationSections() {
  const dispatch = useDispatch()
  const { all, loading } = useSelector((s) => s.destinations)

  useEffect(() => { dispatch(fetchAllDestinations()) }, [dispatch])

  const international = all.filter((d) => d.category === 'international').slice(0, 5)
  const domestic = all.filter((d) => d.category === 'domestic').slice(0, 5)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <DestinationGroup
          title="Popular International Destinations"
          subtitle="Handpicked global holidays for families, couples and groups"
          items={international}
          loading={loading}
          to="/destinations/international/all"
        />
        <DestinationGroup
          title="Popular Domestic Destinations"
          subtitle="India's most loved spiritual, hill, beach and heritage journeys"
          items={domestic}
          loading={loading}
          to="/destinations/domestic/all"
        />
      </div>
    </section>
  )
}

function DestinationGroup({ title, subtitle, items, loading, to }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Explore More</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <Link to={to} className="hidden sm:inline-flex text-primary text-sm font-semibold hover:underline">View All</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          [1,2,3,4,5].map((i) => <div key={i} className="h-44 rounded-2xl bg-gray-200 animate-pulse" />)
        ) : (
          items.map((item) => (
            <Link key={item._id} to={to} className="relative h-44 rounded-2xl overflow-hidden group shadow-md bg-gray-200">
              <img src={imageUrl(item.image)} onError={handleImageError} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-bold text-sm leading-tight">{item.name}</h3>
                <p className="text-white/75 text-xs mt-0.5">{item.subtitle || item.country}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
