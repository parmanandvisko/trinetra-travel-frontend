import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDestinations } from '../../store/slices/destinationsSlice'
import { openWhatsApp, destinationQuotationMsg } from '../../utils/whatsapp'
import WaIcon from '../../components/ui/WaIcon'
import { imageUrl, handleImageError } from '../../utils/image'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function DestinationList() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { all, loading } = useSelector((s) => s.destinations)

  useEffect(() => { dispatch(fetchAllDestinations()) }, [dispatch])

  const title = category === 'domestic' ? 'All Domestic Destinations' : 'All International Destinations'
  const subtitle = category === 'domestic' ? 'Explore India' : 'Explore The World'
  const items = all.filter((d) => d.category === category)

  return (
    <PageWrapper>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb="Destinations"
        bg={category === 'domestic' ? 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop'}
      />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Admin Curated</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">These destinations are managed from the admin panel.</p>
            </div>
            <Link to="/destinations" className="hidden sm:inline-flex text-primary text-sm font-semibold hover:underline">Back</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1,2,3,4,5,6,7,8].map((i) => <div key={i} className="rounded-2xl bg-gray-100 h-72 animate-pulse" />)
            ) : items.length === 0 ? (
              <div className="col-span-4 text-center py-20 text-gray-400">No destinations found</div>
            ) : (
              items.map((item) => (
                <div key={item._id} role="button" tabIndex={0} onClick={() => navigate(`/destinations/detail/${item._id}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/destinations/detail/${item._id}`)} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img src={imageUrl(item.image)} onError={handleImageError} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2.5 py-1 flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-xs font-semibold text-gray-700">{item.rating || '4.8'}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gold font-semibold mb-1">{item.subtitle || item.country}</p>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{item.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-4">{item.description}</p>
                    <button onClick={(e) => { e.stopPropagation(); openWhatsApp(destinationQuotationMsg(item)) }} className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
                      <WaIcon className="w-3.5 h-3.5" />
                      Book Now
                    </button>
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
