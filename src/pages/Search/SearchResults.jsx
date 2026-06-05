import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../services/api'
import { formatINR } from '../../utils/currency'
import { imageUrl, handleImageError } from '../../utils/image'
import { openWhatsApp, destinationQuotationMsg, packageInquiryMsg } from '../../utils/whatsapp'
import WaIcon from '../../components/ui/WaIcon'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function SearchResults() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') || ''
  const checkIn = params.get('checkIn') || ''
  const guests = params.get('guests') || ''
  const selectedId = params.get('selectedId') || ''
  const selectedType = params.get('selectedType') || ''

  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const search = encodeURIComponent(query)
    Promise.all([
      api.get(`/destinations?search=${search}&limit=100`).then((r) => r.data.data || []).catch(() => []),
      api.get(`/packages?search=${search}&limit=100&isActive=true`).then((r) => r.data.data || []).catch(() => []),
    ]).then(([destinationRows, packageRows]) => {
      setDestinations(destinationRows)
      setPackages(packageRows)
    }).finally(() => setLoading(false))
  }, [query])

  const sortedDestinations = useMemo(() => {
    if (selectedType !== 'destination' || !selectedId) return destinations
    return [...destinations].sort((a, b) => (b._id === selectedId) - (a._id === selectedId))
  }, [destinations, selectedId, selectedType])

  const sortedPackages = useMemo(() => {
    if (selectedType !== 'package' || !selectedId) return packages
    return [...packages].sort((a, b) => (b._id === selectedId) - (a._id === selectedId))
  }, [packages, selectedId, selectedType])

  const total = sortedDestinations.length + sortedPackages.length

  return (
    <PageWrapper>
      <PageHero
        title={query ? `Search: ${query}` : 'Search Results'}
        subtitle="Matched Trips"
        breadcrumb="Search"
        bg="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop"
      />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Your Search</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{total} Matching Options</h2>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {query && <span className="bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full">{query}</span>}
                {checkIn && <span className="bg-gray-100 text-gray-600 font-semibold px-3 py-1.5 rounded-full">Check in: {new Date(checkIn).toLocaleDateString('en-IN')}</span>}
                {guests && <span className="bg-gray-100 text-gray-600 font-semibold px-3 py-1.5 rounded-full">{guests}</span>}
              </div>
            </div>
            <Link to="/" className="text-primary text-sm font-semibold hover:underline">Change Search</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} className="rounded-2xl bg-gray-100 h-72 animate-pulse" />)}
            </div>
          ) : total === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No destination or package found for this search.</p>
              <Link to="/destinations" className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">Browse All Destinations</Link>
            </div>
          ) : (
            <div className="space-y-12">
              {sortedDestinations.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-5">Destinations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sortedDestinations.map((item) => (
                      <div key={item._id} role="button" tabIndex={0} onClick={() => navigate(`/destinations/detail/${item._id}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/destinations/detail/${item._id}`)} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img src={imageUrl(item.image)} onError={handleImageError} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full capitalize">{item.category}</span>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gold font-semibold mb-1">{item.subtitle || item.country}</p>
                          <h4 className="font-bold text-gray-900 text-sm mb-2">{item.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-3 mb-4">{item.description}</p>
                          <button onClick={(e) => { e.stopPropagation(); openWhatsApp(destinationQuotationMsg(item)) }} className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
                            <WaIcon className="w-3.5 h-3.5" />
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sortedPackages.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-5">Packages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sortedPackages.map((pkg) => (
                      <div key={pkg._id} role="button" tabIndex={0} onClick={() => navigate(`/packages/${pkg._id}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/packages/${pkg._id}`)} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                        <div className="relative h-44 overflow-hidden">
                          <img src={imageUrl(pkg.image)} onError={handleImageError} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <span className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full capitalize">{pkg.type}</span>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gold font-semibold mb-1">{pkg.duration}</p>
                          <h4 className="font-bold text-gray-900 text-sm mb-1.5">{pkg.title}</h4>
                          <p className="text-xs text-gray-500 mb-4 line-clamp-2">{pkg.description || pkg.desc}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-primary font-bold">{formatINR(pkg.price)}</span>
                              <span className="text-gray-400 text-xs"> /person</span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); openWhatsApp(packageInquiryMsg(pkg)) }} className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-green-600 transition-colors">
                              <WaIcon className="w-3.5 h-3.5" />
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
