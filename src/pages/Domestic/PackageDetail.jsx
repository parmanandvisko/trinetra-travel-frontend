import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPackages } from '../../store/slices/packagesSlice'
import { formatINR } from '../../utils/currency'
import { openWhatsApp, packageInquiryMsg } from '../../utils/whatsapp'
import { imageUrl, handleImageError } from '../../utils/image'
import WaIcon from '../../components/ui/WaIcon'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function PackageDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { all, loading } = useSelector((s) => s.packages)

  useEffect(() => {
    if (all.length === 0) dispatch(fetchAllPackages())
  }, [all.length, dispatch])

  const pkg = all.find((item) => item._id === id)

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>
      </PageWrapper>
    )
  }

  if (!pkg) {
    return (
      <PageWrapper>
        <PageHero title="Package Not Found" subtitle="Oops!" breadcrumb="Package" bg="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop" />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 mb-6">This tour package could not be found.</p>
          <Link to="/destinations" className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">Back to Destinations</Link>
        </div>
      </PageWrapper>
    )
  }

  const backTo = pkg.type === 'domestic' ? '/destinations/domestic' : '/destinations/international'
  const itinerary = pkg.itinerary || []
  const inclusions = pkg.inclusions || []
  const exclusions = pkg.exclusions || []

  return (
    <PageWrapper>
      <PageHero title={pkg.title} subtitle={pkg.duration || 'Tour Package'} breadcrumb="Package Details" bg={imageUrl(pkg.image)} />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-72 md:h-96 bg-gray-100 mb-8">
                <img src={imageUrl(pkg.image)} onError={handleImageError} alt={pkg.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                {pkg.tag && <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">{pkg.tag}</span>}
                {pkg.type && <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full capitalize">{pkg.type}</span>}
                <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full">{pkg.rating || '4.8'} Rating</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{pkg.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{pkg.description || pkg.desc || 'Connect with our travel experts for a complete itinerary and availability.'}</p>

              {itinerary.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Itinerary</h3>
                  <div className="space-y-4">
                    {itinerary.map((day, index) => (
                      <div key={`${day.day || index}-${day.title || index}`} className="border border-gray-100 rounded-2xl p-5">
                        <p className="text-primary text-xs font-bold mb-1">Day {day.day || index + 1}</p>
                        <h4 className="font-bold text-gray-900 mb-2">{day.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Inclusions</h3>
                    <ul className="space-y-2">
                      {inclusions.map((item) => <li key={item} className="text-sm text-gray-600">Included: {item}</li>)}
                    </ul>
                  </div>
                )}
                {exclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Exclusions</h3>
                    <ul className="space-y-2">
                      {exclusions.map((item) => <li key={item} className="text-sm text-gray-600">Not included: {item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 border border-gray-100 rounded-2xl p-6 shadow-lg">
                <p className="text-xs text-gray-400 font-semibold mb-1">Starting From</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">{formatINR(pkg.price)}</span>
                  <span className="text-sm text-gray-400 mb-1">/person</span>
                </div>
                {pkg.originalPrice && <p className="text-sm text-gray-400 line-through mb-4">{formatINR(pkg.originalPrice)}</p>}
                <div className="space-y-3 text-sm text-gray-600 mb-6 border-t border-gray-100 pt-5">
                  <p><span className="font-semibold text-gray-900">Duration:</span> {pkg.duration}</p>
                  <p><span className="font-semibold text-gray-900">Package Type:</span> <span className="capitalize">{pkg.type}</span></p>
                </div>
                <button onClick={() => openWhatsApp(packageInquiryMsg(pkg))} className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors">
                  <WaIcon className="w-4 h-4" />
                  Book Now
                </button>
                <Link to={backTo} className="mt-4 block text-center text-primary text-sm font-semibold hover:underline">Back to Packages</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
