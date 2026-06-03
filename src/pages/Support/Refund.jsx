import { Link } from 'react-router-dom'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const cancellationTable = [
  { period: '30 or more days before departure', domestic: '10%', international: '15%' },
  { period: '22–29 days before departure', domestic: '20%', international: '25%' },
  { period: '15–21 days before departure', domestic: '30%', international: '40%' },
  { period: '7–14 days before departure', domestic: '50%', international: '60%' },
  { period: '3–6 days before departure', domestic: '75%', international: '85%' },
  { period: 'Less than 3 days / No Show', domestic: '100%', international: '100%' },
]

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-primary rounded-full inline-block" />
      {title}
    </h3>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2 pl-3">{children}</div>
  </div>
)

export default function Refund() {
  return (
    <PageWrapper>
      <PageHero title="Refund & Cancellation Policy" subtitle="Know Your Rights" breadcrumb="Refund Policy" bg="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-10 text-sm text-yellow-800">
            ⚡ <strong>Important:</strong> All cancellation requests must be submitted in writing via email to info@trinetraglobalholidays.com or WhatsApp to +91 98924 94688. Verbal cancellations will not be accepted.
          </div>

          <Section title="1. Cancellation Charges">
            <p>The following cancellation charges apply based on the number of days before the departure date:</p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Cancellation Period</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Domestic Tours</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">International Tours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cancellationTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-700">{row.period}</td>
                      <td className="px-4 py-3 text-center font-semibold text-red-600">{row.domestic}</td>
                      <td className="px-4 py-3 text-center font-semibold text-red-600">{row.international}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">* Percentages are of the total tour package cost. Charges may differ during peak seasons (Diwali, Christmas–New Year, Summer Holidays, etc.).</p>
          </Section>

          <Section title="2. Refund Process">
            <p>Once a valid cancellation request is received, refunds are processed as follows:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Refund eligibility is calculated based on the cancellation policy above</li>
              <li>Refunds are initiated within <strong>5–7 business days</strong> of receiving the cancellation request</li>
              <li>Bank transfers (NEFT/RTGS): 3–5 additional working days after initiation</li>
              <li>UPI refunds: 1–3 business days</li>
              <li>Credit/Debit card refunds: 7–14 working days (as per bank processing time)</li>
            </ul>
            <p className="mt-2">You will receive a refund confirmation via email/WhatsApp once processed.</p>
          </Section>

          <Section title="3. Non-Refundable Components">
            <p>The following are strictly non-refundable regardless of the cancellation date:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Visa application fees and processing charges</li>
              <li>Travel insurance premiums (if purchased)</li>
              <li>Confirmed airline tickets (as per airline's own policy)</li>
              <li>Non-refundable hotel bookings (clearly stated in itinerary)</li>
              <li>Adventure activity bookings and special event tickets</li>
              <li>Booking processing fee (if applicable)</li>
            </ul>
          </Section>

          <Section title="4. Cancellation by Trinetra Global Holidays">
            <p>In rare circumstances, Trinetra Global Holidays may need to cancel a tour due to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Insufficient group size (for group departures)</li>
              <li>Force majeure events (natural disasters, political unrest, pandemic)</li>
              <li>Government travel advisories or restrictions</li>
            </ul>
            <p className="mt-2">In such cases:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Alternative tour dates</strong> will be offered first</li>
              <li>If not acceptable, a <strong>full refund</strong> will be provided within 10 business days</li>
              <li>No additional compensation is payable beyond the refund amount</li>
            </ul>
          </Section>

          <Section title="5. Amendment / Date Change Policy">
            <p>Changes to confirmed bookings (date changes, destination changes) are subject to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Availability at the time of amendment request</li>
              <li>Amendment fee: ₹500–₹2,000 per change depending on the type</li>
              <li>Any price difference between the original and new booking</li>
              <li>Airline/hotel amendment charges as applicable</li>
            </ul>
            <p className="mt-2">Amendment requests must be made at least <strong>15 days</strong> before the departure date.</p>
          </Section>

          <Section title="6. No Show Policy">
            <p>If a traveler fails to show up on the departure date without prior cancellation notice, <strong>100% of the tour cost will be forfeited</strong>. No refund will be applicable in such cases.</p>
          </Section>

          <Section title="7. How to Cancel">
            <p>To initiate a cancellation, please:</p>
            <ol className="list-decimal pl-5 space-y-1.5 mt-2">
              <li>Send an email to <strong>info@trinetraglobalholidays.com</strong> with your booking reference number</li>
              <li>OR send a WhatsApp message to <strong>+91 98924 94688</strong> with your booking details</li>
              <li>Our team will confirm receipt within 24 hours and process the cancellation</li>
              <li>You will receive a cancellation confirmation with the refund amount and timeline</li>
            </ol>
          </Section>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">📧</div>
              <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
              <p className="text-xs text-gray-500 mb-2">For cancellation requests</p>
              <a href="mailto:info@trinetraglobalholidays.com" className="text-primary text-sm font-semibold hover:underline">info@trinetraglobalholidays.com</a>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-bold text-gray-900 mb-1">WhatsApp</h4>
              <p className="text-xs text-gray-500 mb-2">Quick cancellation support</p>
              <a href="https://wa.me/919343088141" target="_blank" rel="noreferrer" className="text-green-600 text-sm font-semibold hover:underline">+91 93430 88141</a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
