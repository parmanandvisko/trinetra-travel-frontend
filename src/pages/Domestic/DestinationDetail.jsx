import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDestinations } from '../../store/slices/destinationsSlice'
import { openWhatsApp, destinationQuotationMsg } from '../../utils/whatsapp'
import { imageUrl, handleImageError } from '../../utils/image'
import WaIcon from '../../components/ui/WaIcon'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function DestinationDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { all, loading } = useSelector((s) => s.destinations)

  useEffect(() => {
    if (all.length === 0) dispatch(fetchAllDestinations())
  }, [all.length, dispatch])

  const destination = all.find((item) => item._id === id)

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>
      </PageWrapper>
    )
  }

  if (!destination) {
    return (
      <PageWrapper>
        <PageHero title="Destination Not Found" subtitle="Oops!" breadcrumb="Destination" bg="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop" />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 mb-6">This destination could not be found.</p>
          <Link to="/destinations" className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">Back to Destinations</Link>
        </div>
      </PageWrapper>
    )
  }

  const backTo = destination.category ? `/destinations/${destination.category}/all` : '/destinations'

  return (
    <PageWrapper>
      <PageHero title={destination.name} subtitle={destination.subtitle || destination.country || 'Destination'} breadcrumb="Destination Details" bg={imageUrl(destination.image)} />

      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-72 md:h-96 bg-gray-100 mb-8">
                <img src={imageUrl(destination.image)} onError={handleImageError} alt={destination.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {destination.category && <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full capitalize">{destination.category}</span>}
                {(destination.subtitle || destination.country) && <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">{destination.subtitle || destination.country}</span>}
                <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full">{destination.rating || '4.8'} Rating</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{destination.name}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{destination.description || 'Connect with our travel experts for package options, itinerary, hotels, inclusions and best pricing.'}</p>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 border border-gray-100 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-2">Plan This Trip</h3>
                <p className="text-sm text-gray-500 mb-5">Get package options, hotels, itinerary and best price from our travel team.</p>
                <button onClick={() => openWhatsApp(destinationQuotationMsg(destination))} className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors">
                  <WaIcon className="w-4 h-4" />
                  Book Now
                </button>
                <Link to={backTo} className="mt-4 block text-center text-primary text-sm font-semibold hover:underline">Back to Destinations</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
