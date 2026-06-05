import { useState } from 'react'
import { useSelector } from 'react-redux'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'
import FormattedText from '../../components/ui/FormattedText'

const STATIC_FAQS = [
  { category: 'Booking & Payment', question: 'How do I book a tour package?', answer: 'You can book by clicking "Book Now" on any package to send a WhatsApp inquiry, or use the booking form. Our team will confirm within 24 hours.' },
  { category: 'Booking & Payment', question: 'What payment methods do you accept?', answer: 'We accept Bank Transfer (NEFT/RTGS/IMPS), UPI (PhonePe, GPay, Paytm), Credit/Debit Cards, and Cash at our office.' },
  { category: 'Booking & Payment', question: 'How much advance do I need to pay?', answer: 'A minimum advance of 25% of the total package cost is required. The balance must be paid at least 7 days before departure.' },
  { category: 'Tour Packages', question: 'What is included in your tour packages?', answer: 'Our packages include accommodation, transportation, sightseeing, breakfast/meals (as mentioned). Personal expenses and tips are excluded.' },
  { category: 'Tour Packages', question: 'Can I customize a tour package?', answer: 'Absolutely! Contact us via WhatsApp or the inquiry form with your preferences, budget, and travel dates — we will design a personalized itinerary.' },
  { category: 'Cancellation & Refund', question: 'What is your cancellation policy?', answer: '30+ days: 10% charge. 15–29 days: 25%. 7–14 days: 50%. Less than 7 days: 100%. See our Refund Policy for complete details.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const s = useSelector((st) => st.settings.data)

  // Use FAQs from settings if available, else fall back to static
  const rawFaqs = s.faqs?.length > 0 ? s.faqs : STATIC_FAQS

  // Group by category
  const grouped = rawFaqs.reduce((acc, faq) => {
    const cat = faq.category || 'General'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(faq)
    return acc
  }, {})

  const toggle = (key) => setOpen(open === key ? null : key)

  return (
    <PageWrapper>
      <PageHero title="Frequently Asked Questions" subtitle="Got Questions?" breadcrumb="FAQ"
        bg="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&auto=format&fit=crop" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>We're Here to Help</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Common Questions Answered</h2>
            <p className="text-gray-500 text-sm mt-3">Can't find your answer? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us directly</a></p>
          </div>

          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-primary/20">{category}</h3>
                <div className="space-y-3">
                  {items.map((item, i) => {
                    const key = `${category}-${i}`
                    return (
                      <div key={key} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => toggle(key)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                          <span className="font-semibold text-gray-900 text-sm pr-4">{item.question}</span>
                          <svg className={`w-5 h-5 text-primary shrink-0 transition-transform ${open === key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {open === key && (
                          <div className="px-5 pb-4 text-sm border-t border-gray-100 pt-3 bg-gray-50">
                            <FormattedText text={item.answer} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Still have questions?</h3>
            <p className="text-gray-500 text-sm mb-5">Our travel experts are available Mon–Sat, 9am–7pm</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">Contact Us</a>
              <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors text-sm">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
