import { useState } from 'react'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const faqs = [
  {
    category: 'Booking & Payment',
    items: [
      { q: 'How do I book a tour package?', a: 'You can book a tour package by browsing our Domestic or International packages, clicking "Book Now" to send a WhatsApp inquiry, or filling out the booking form on our website. Our travel expert will contact you within 24 hours to confirm your booking.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major payment modes including Bank Transfer (NEFT/RTGS/IMPS), UPI (PhonePe, GPay, Paytm), Credit/Debit Cards, and Cash payments at our office. Full payment or advance booking options are available.' },
      { q: 'How much advance do I need to pay to confirm a booking?', a: 'A minimum advance of 25% of the total package cost is required to confirm your booking. The remaining balance must be paid at least 7 days before the departure date.' },
      { q: 'Will I receive a confirmation after booking?', a: 'Yes, you will receive a booking confirmation via WhatsApp and email within 24 hours of your booking and advance payment. The confirmation includes your itinerary, hotel details, and travel vouchers.' },
    ],
  },
  {
    category: 'Tour Packages',
    items: [
      { q: 'What is included in your tour packages?', a: 'Our standard packages include accommodation, transportation (as per itinerary), sightseeing, breakfast/meals (as mentioned), and travel escort. Specific inclusions are listed on each package page.' },
      { q: 'Can I customize a tour package?', a: 'Absolutely! Trinetra Global Holidays specializes in customized holidays. Contact us via WhatsApp or the inquiry form, share your preferences, budget, and travel dates — we will design a personalized itinerary for you.' },
      { q: 'Do you offer group tour packages?', a: 'Yes, we offer specially curated group tour packages with attractive group discounts. Groups of 10+ travelers get additional benefits. Contact us for group booking inquiries.' },
      { q: 'What is the minimum group size for a private tour?', a: 'Private tours can be arranged for any group size, even for a couple or family of 2. Pricing varies based on the number of travelers.' },
    ],
  },
  {
    category: 'Travel & Accommodation',
    items: [
      { q: 'What type of hotels do you book?', a: 'We book hotels ranging from 3-star to 5-star properties depending on your chosen package and budget. All hotels are handpicked for quality, cleanliness, and location. Hotel names are shared in the final itinerary.' },
      { q: 'Are flights included in the tour packages?', a: 'Flight tickets are included in packages clearly mentioning "with flights." For packages without flights, we can assist with flight bookings separately. Please check the package details or contact us.' },
      { q: 'Do you arrange visa assistance for international tours?', a: 'Yes, we provide complete visa assistance for all international destinations including document checklist, application guidance, and follow-up. Visa fees are charged separately as per actual government fees.' },
      { q: 'What if my travel dates do not match the listed package dates?', a: 'We operate both fixed departure and customized departure tours. If listed dates do not suit you, we can arrange the same tour on your preferred dates. Contact us with your desired travel dates.' },
    ],
  },
  {
    category: 'Cancellation & Refund',
    items: [
      { q: 'What is your cancellation policy?', a: 'Cancellations made 30+ days before departure: 10% charge. 15–29 days before: 25% charge. 7–14 days before: 50% charge. Less than 7 days: 100% charge. Please refer to our Refund Policy page for complete details.' },
      { q: 'How long does the refund take?', a: 'Approved refunds are processed within 7–14 business days to the original payment method. Bank transfer refunds may take 3–5 additional working days.' },
      { q: 'Can I transfer my booking to someone else?', a: 'Yes, booking transfers are allowed up to 15 days before the departure date subject to a transfer fee of ₹500 per person and availability of the new traveler\'s documents.' },
    ],
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (key) => setOpen(open === key ? null : key)

  return (
    <PageWrapper>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Got Questions?"
        breadcrumb="FAQ"
        bg="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&auto=format&fit=crop"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>We're Here to Help</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Common Questions Answered</h2>
            <p className="text-gray-500 text-sm mt-3">Can't find your answer? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us directly</a></p>
          </div>

          <div className="space-y-10">
            {faqs.map((section) => (
              <div key={section.category}>
                <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-primary/20">{section.category}</h3>
                <div className="space-y-3">
                  {section.items.map((item, i) => {
                    const key = `${section.category}-${i}`
                    return (
                      <div key={key} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 text-sm pr-4">{item.q}</span>
                          <svg className={`w-5 h-5 text-primary shrink-0 transition-transform ${open === key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {open === key && (
                          <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                            {item.a}
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
              <a href="https://wa.me/919343088141" target="_blank" rel="noreferrer" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors text-sm flex items-center justify-center gap-2">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
