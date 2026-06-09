import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { formatINR } from '../../utils/currency'
import { imageUrl, handleImageError } from '../../utils/image'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

export default function DiscountPackages() {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/packages?hasDiscount=true&isActive=true&limit=100')
      .then((res) => setPackages(res.data.data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageWrapper>
      <PageHero title="Discount Holiday Packages" subtitle="Limited Time Offers" breadcrumb="Packages" bg="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop" />
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-gold text-sm font-semibold">Special Savings</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Discounted Packages</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? [1, 2, 3, 4].map((item) => <div key={item} className="h-72 rounded-2xl bg-gray-100 animate-pulse" />) : packages.length === 0 ? (
              <p className="col-span-full py-16 text-center text-gray-400">No discounted packages are available right now.</p>
            ) : packages.map((pkg) => (
              <article key={pkg._id} onClick={() => navigate(`/packages/${pkg._id}`)} className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl">
                <div className="relative h-44 overflow-hidden">
                  <img src={imageUrl(pkg.image)} onError={handleImageError} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">{pkg.discount}% Off</span>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-gold">{pkg.duration}</p>
                  <h3 className="mt-1 font-bold text-gray-900">{pkg.title}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-bold text-primary">{formatINR(pkg.price)}</span>
                    {pkg.originalPrice && <span className="text-xs text-gray-400 line-through">{formatINR(pkg.originalPrice)}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
