import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full inline-block" />
      {title}
    </h3>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2 pl-3">{children}</div>
  </div>
)

export default function Terms() {
  return (
    <PageWrapper>
      <PageHero title="Terms & Conditions" subtitle="Please Read Carefully" breadcrumb="Terms & Conditions" bg="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&fit=crop" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-10 text-sm text-gray-600">
            <strong className="text-gray-900">Last Updated: January 2025</strong> — These Terms & Conditions govern your use of Trinetra Global Holidays services. By booking with us, you agree to these terms.
          </div>

          <Section title="1. Company Information">
            <p><strong>Trinetra Global Holidays</strong> is a registered travel company based in Ambernath West, Maharashtra, India – 421505. We are authorized to provide domestic and international tour packages, travel arrangements, and related services.</p>
            <p>Contact: info@trinetraglobalholidays.com | +91 98924 94688</p>
          </Section>

          <Section title="2. Booking & Confirmation">
            <p>All bookings are subject to availability and are confirmed only upon receipt of the required advance payment (minimum 25% of the total package cost).</p>
            <p>A booking confirmation will be sent via WhatsApp and email within 24 hours of receiving the advance payment.</p>
            <p>The company reserves the right to decline any booking at its discretion without providing a reason.</p>
          </Section>

          <Section title="3. Pricing & Payment">
            <p>All prices are quoted in Indian Rupees (INR) unless stated otherwise. Prices are subject to change without prior notice due to currency fluctuations, fuel surcharges, or government taxes.</p>
            <p>The confirmed booking price shall remain fixed once the advance is paid. Full payment must be completed at least 7 days prior to departure.</p>
            <p>GST and applicable taxes will be charged as per government regulations.</p>
          </Section>

          <Section title="4. Tour Package Inclusions">
            <p>Each package clearly states what is included (accommodation, meals, transport, sightseeing, etc.). Anything not mentioned in the package inclusions is excluded and may be available at extra cost.</p>
            <p>Personal expenses, tips, laundry, phone calls, optional excursions, and items of personal nature are always excluded.</p>
          </Section>

          <Section title="5. Cancellation Policy">
            <p>Cancellations must be notified in writing (email/WhatsApp) to our office. Verbal cancellations are not accepted.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>30+ days before departure: 10% of total cost</li>
              <li>15–29 days before departure: 25% of total cost</li>
              <li>7–14 days before departure: 50% of total cost</li>
              <li>Less than 7 days / No Show: 100% of total cost (No refund)</li>
            </ul>
            <p className="mt-2">Peak season bookings (Dec–Jan, Diwali, Holi, Summer) may have different cancellation terms as communicated at the time of booking.</p>
          </Section>

          <Section title="6. Changes & Amendments">
            <p>Any changes to a confirmed booking (dates, destinations, number of travelers) are subject to availability and may incur amendment charges of ₹500–₹2,000 per change depending on the nature of the amendment.</p>
            <p>Trinetra Global Holidays reserves the right to modify itineraries due to circumstances beyond our control (natural disasters, political unrest, weather conditions, etc.).</p>
          </Section>

          <Section title="7. Travel Documents">
            <p>It is the traveler's responsibility to ensure valid travel documents (passport, visa, permits, vaccination certificates) are in place before departure. Trinetra Global Holidays provides assistance but is not responsible for visa rejections or document errors.</p>
            <p>For domestic travel, a valid government-issued photo ID is mandatory for all travelers.</p>
          </Section>

          <Section title="8. Health & Safety">
            <p>Travelers are advised to consult a physician before undertaking strenuous tours or travel to high-altitude destinations. Any pre-existing medical conditions must be disclosed at the time of booking.</p>
            <p>We strongly recommend purchasing comprehensive travel insurance covering medical emergencies, trip cancellations, and baggage loss.</p>
          </Section>

          <Section title="9. Liability Limitations">
            <p>Trinetra Global Holidays acts as an agent for hotels, airlines, transport providers, and other service providers. We are not liable for any injury, loss, damage, accident, delay, or irregularity that may be caused by the negligence of such third-party service providers.</p>
            <p>Our liability is limited to the total amount paid for the tour package in all circumstances.</p>
          </Section>

          <Section title="10. Force Majeure">
            <p>Trinetra Global Holidays shall not be held liable for any loss or damage arising from circumstances beyond our reasonable control including acts of God, war, civil unrest, pandemic, government actions, natural disasters, or any other unforeseen events.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Ambernath, Maharashtra.</p>
          </Section>

          <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">For any queries regarding these Terms & Conditions, please <a href="/contact" className="text-primary font-semibold hover:underline">contact us</a>.</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
