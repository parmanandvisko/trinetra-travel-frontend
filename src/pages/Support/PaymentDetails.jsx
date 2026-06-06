import { useSelector } from 'react-redux'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'
import FormattedText from '../../components/ui/FormattedText'

const STATIC = `## Payment Details
Please contact our travel team for updated bank account, UPI, QR code, and payment instructions before making any transfer.

## Important Notes
- Confirm package availability before payment
- Share your payment screenshot on WhatsApp
- Mention traveler name and package name in payment reference`

export default function PaymentDetails() {
  const s = useSelector((st) => st.settings.data)
  const content = s.paymentDetails?.trim() ? s.paymentDetails : STATIC

  return (
    <PageWrapper>
      <PageHero
        title="Payment Details"
        subtitle="Secure Payments"
        breadcrumb="Payment Details"
        bg="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 mb-8">
            <h2 className="font-bold text-gray-900 mb-2">Official Payment Information</h2>
            <p className="text-sm text-gray-500">Use only the payment details published here or confirmed by our travel expert.</p>
          </div>
          <FormattedText text={content} />
          <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 text-center">
            <p className="text-sm text-gray-600 mb-4">Need confirmation before payment?</p>
            <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors text-sm">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
