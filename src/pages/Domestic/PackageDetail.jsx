import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPackages } from '../../store/slices/packagesSlice'
import { formatINR } from '../../utils/currency'
import { openWhatsApp, packageInquiryMsg } from '../../utils/whatsapp'
import { imageUrl, handleImageError } from '../../utils/image'
import { downloadPackageQuotation } from '../../utils/packageQuotationPdf'
import api from '../../services/api'
import WaIcon from '../../components/ui/WaIcon'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const extractLegacyPackageDetails = (description = '') => {
  const lines = description.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)

  return {
    inclusions: lines.filter((line) => line.startsWith('✅')).map((line) => line.replace(/^✅\s*/u, '')),
    exclusions: lines.filter((line) => line.startsWith('❌')).map((line) => line.replace(/^❌\s*/u, '')),
  }
}

const getPackageDescription = (description = '') => {
  const detailSectionPattern = /^\s*(?:package\s+)?(?:inclusions?|includes?)\b/im
  const firstDetailLine = description.search(detailSectionPattern)

  if (firstDetailLine === -1 && !/[✅❌]/u.test(description)) return description
  if (firstDetailLine <= 0) return ''
  return description.slice(0, firstDetailLine).trim()
}

export default function PackageDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { all, loading } = useSelector((s) => s.packages)
  const settings = useSelector((s) => s.settings.data)
  const themeId = useSelector((s) => s.theme.activeTheme)
  const [detailsTab, setDetailsTab] = useState('inclusions')
  const [showAllDetails, setShowAllDetails] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [quotationModalOpen, setQuotationModalOpen] = useState(false)
  const [quotationPhone, setQuotationPhone] = useState(() => localStorage.getItem('quotation_phone') || '')
  const [quotationError, setQuotationError] = useState('')

  useEffect(() => {
    if (all.length === 0) dispatch(fetchAllPackages())
  }, [all.length, dispatch])

  const pkg = all.find((item) => item._id === id)

  useEffect(() => {
    const hasInclusions = (pkg?.inclusions || []).length > 0
    const hasExclusions = (pkg?.exclusions || []).length > 0
    setDetailsTab(hasInclusions || !hasExclusions ? 'inclusions' : 'exclusions')
    setShowAllDetails(false)
  }, [id, pkg])

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
  const legacyDetails = extractLegacyPackageDetails(pkg.description)
  const inclusions = pkg.inclusions?.length ? pkg.inclusions : legacyDetails.inclusions
  const exclusions = pkg.exclusions?.length ? pkg.exclusions : legacyDetails.exclusions
  const packageDescription = getPackageDescription(pkg.description || pkg.desc)
  const activeDetails = detailsTab === 'inclusions' ? inclusions : exclusions
  const visibleDetails = showAllDetails ? activeDetails : activeDetails.slice(0, 3)

  const changeDetailsTab = (tab) => {
    setDetailsTab(tab)
    setShowAllDetails(false)
  }

  const requestQuotationDownload = async (event) => {
    event.preventDefault()
    const phone = quotationPhone.replace(/[^\d+]/g, '')

    if (!/^\+?\d{10,15}$/.test(phone)) {
      setQuotationError('Please enter a valid 10 to 15 digit mobile number.')
      return
    }

    setQuotationError('')
    setDownloadingPdf(true)
    try {
      await api.post('/quotation-downloads', {
        phone,
        packageId: pkg._id,
        sourceUrl: window.location.href,
      })
      localStorage.setItem('quotation_phone', phone)
      setQuotationModalOpen(false)
      await downloadPackageQuotation({
        pkg,
        settings,
        themeId,
        description: packageDescription,
        inclusions,
        exclusions,
      })
    } catch (error) {
      console.error('Quotation request failed:', error)
      setQuotationError(error.response?.data?.message || 'Unable to download quotation. Please try again.')
    } finally {
      setDownloadingPdf(false)
    }
  }

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
              {packageDescription && (
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">{packageDescription}</p>
              )}

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

              {(inclusions.length > 0 || exclusions.length > 0) && (
                <div className="rounded border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center gap-4 sm:gap-8 mb-5">
                    <button
                      type="button"
                      onClick={() => changeDetailsTab('inclusions')}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        detailsTab === 'inclusions'
                          ? 'border border-primary text-primary font-semibold'
                          : 'border border-transparent text-gray-400 hover:text-primary'
                      }`}
                    >
                      Inclusion
                    </button>
                    <button
                      type="button"
                      onClick={() => changeDetailsTab('exclusions')}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        detailsTab === 'exclusions'
                          ? 'border border-primary text-primary font-semibold'
                          : 'border border-transparent text-gray-400 hover:text-primary'
                      }`}
                    >
                      Exclusion
                    </button>
                  </div>

                  {activeDetails.length > 0 ? (
                    <>
                      <ul className="space-y-4 border-l border-dotted border-gray-300">
                        {visibleDetails.map((item, index) => (
                          <li key={`${item}-${index}`} className="relative pl-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-primary shadow-sm" />
                            {item.replace(/^[✅❌]\s*/u, '')}
                          </li>
                        ))}
                      </ul>
                      {activeDetails.length > 3 && (
                        <button
                          type="button"
                          onClick={() => setShowAllDetails((current) => !current)}
                          className="mt-4 ml-5 text-sm font-semibold text-primary hover:text-primary-dark"
                        >
                          {showAllDetails ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">No {detailsTab} added for this package.</p>
                  )}
                </div>
              )}
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
                <button
                  type="button"
                  onClick={() => {
                    setQuotationError('')
                    setQuotationModalOpen(true)
                  }}
                  disabled={downloadingPdf}
                  className="mt-3 w-full flex items-center justify-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors disabled:cursor-wait disabled:opacity-60"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14" />
                  </svg>
                  {downloadingPdf ? 'Preparing PDF...' : 'Download Quotation'}
                </button>
                <Link to={backTo} className="mt-4 block text-center text-primary text-sm font-semibold hover:underline">Back to Packages</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {quotationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Download Package Quotation</h3>
                <p className="mt-1 text-sm text-gray-500">Enter your mobile number to download the complete branded PDF.</p>
              </div>
              <button
                type="button"
                onClick={() => setQuotationModalOpen(false)}
                disabled={downloadingPdf}
                className="text-2xl leading-none text-gray-400 hover:text-gray-600"
                aria-label="Close quotation form"
              >
                &times;
              </button>
            </div>

            <div className="mb-5 rounded-xl bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Selected Package</p>
              <p className="mt-1 font-bold text-gray-900">{pkg.title}</p>
              <p className="mt-1 text-sm text-gray-500">{pkg.duration} · {formatINR(pkg.price)} per person</p>
            </div>

            <form onSubmit={requestQuotationDownload}>
              <label htmlFor="quotation-phone" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Mobile Number
              </label>
              <input
                id="quotation-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={quotationPhone}
                onChange={(event) => setQuotationPhone(event.target.value)}
                placeholder="+91 98924 94688"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-primary"
                autoFocus
              />
              {quotationError && <p className="mt-2 text-sm text-red-600">{quotationError}</p>}
              <p className="mt-3 text-xs leading-relaxed text-gray-400">
                Our travel team may contact you regarding this package and updated availability.
              </p>
              <button
                type="submit"
                disabled={downloadingPdf}
                className="mt-5 w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60"
              >
                {downloadingPdf ? 'Preparing Quotation...' : 'Submit & Download PDF'}
              </button>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
