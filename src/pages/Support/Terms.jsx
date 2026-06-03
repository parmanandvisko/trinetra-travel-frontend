import { useSelector } from 'react-redux'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const STATIC = `## 1. Company Information
Trinetra Global Holidays is a registered travel company based in Ambernath West, Maharashtra, India – 421505. Contact: info@trinetraglobalholidays.com | +91 98924 94688

## 2. Booking & Confirmation
All bookings are subject to availability and confirmed only upon receipt of minimum 25% advance payment. Confirmation sent via WhatsApp and email within 24 hours.

## 3. Pricing & Payment
All prices are quoted in INR. GST and applicable taxes are charged as per government regulations. Full payment must be completed at least 7 days before departure.

## 4. Cancellation Policy
- 30+ days before departure: 10%
- 15–29 days before departure: 25%
- 7–14 days before departure: 50%
- Less than 7 days / No Show: 100% (No refund)

## 5. Liability Limitations
Trinetra Global Holidays acts as an agent for hotels, airlines, and transport providers. We are not liable for any injury, loss, or damage caused by third-party service providers. Our liability is limited to the total amount paid.

## 6. Governing Law
These Terms are governed by the laws of India. Disputes are subject to jurisdiction of courts in Ambernath, Maharashtra.`

function renderContent(text) {
  if (!text?.trim()) return null
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3 flex items-center gap-2"><span className="w-1 h-5 bg-primary rounded-full inline-block" />{line.replace('## ', '')}</h3>
    if (line.startsWith('- ')) return <li key={i} className="ml-5 text-gray-600 text-sm leading-relaxed">{line.replace('- ', '')}</li>
    if (line.trim() === '') return <div key={i} className="h-2" />
    return <p key={i} className="text-gray-600 text-sm leading-relaxed pl-3">{line}</p>
  })
}

export default function Terms() {
  const s = useSelector((st) => st.settings.data)
  const content = s.termsContent?.trim() ? s.termsContent : STATIC

  return (
    <PageWrapper>
      <PageHero title="Terms & Conditions" subtitle="Please Read Carefully" breadcrumb="Terms & Conditions"
        bg="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&fit=crop" />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-gray-600">
            <strong className="text-gray-900">Last Updated: 2025</strong> — By booking with us, you agree to these terms.
          </div>
          <div className="space-y-1">{renderContent(content)}</div>
          <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Questions? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a></p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
