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

export default function Privacy() {
  return (
    <PageWrapper>
      <PageHero title="Privacy Policy" subtitle="Your Privacy Matters" breadcrumb="Privacy Policy" bg="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&auto=format&fit=crop" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-10 text-sm text-gray-600">
            <strong className="text-gray-900">Last Updated: January 2025</strong> — Trinetra Global Holidays is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.
          </div>

          <Section title="1. Information We Collect">
            <p>When you interact with Trinetra Global Holidays through our website, WhatsApp, email, or in person, we may collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Personal Details:</strong> Full name, date of birth, gender, nationality</li>
              <li><strong>Contact Information:</strong> Email address, phone number, WhatsApp number, postal address</li>
              <li><strong>Travel Documents:</strong> Passport details, visa copies, ID proof (only when required for bookings)</li>
              <li><strong>Payment Information:</strong> Bank details, transaction IDs (we do not store card numbers)</li>
              <li><strong>Travel Preferences:</strong> Meal preferences, accommodation preferences, special requirements</li>
              <li><strong>Website Data:</strong> IP address, browser type, pages visited, cookies (for improving user experience)</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Processing and confirming your tour bookings</li>
              <li>Communicating about your travel arrangements, itinerary, and updates</li>
              <li>Sending booking confirmations, vouchers, and travel documents</li>
              <li>Processing refunds and handling cancellation requests</li>
              <li>Visa applications and hotel/airline reservations on your behalf</li>
              <li>Sending promotional offers, newsletters (with your consent)</li>
              <li>Improving our services based on feedback</li>
              <li>Complying with legal and regulatory requirements</li>
            </ul>
          </Section>

          <Section title="3. Information Sharing">
            <p>Trinetra Global Holidays does not sell, rent, or trade your personal information to third parties. We share your information only in the following situations:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Service Providers:</strong> Hotels, airlines, transport companies, and visa agencies — only information necessary for your booking</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, with appropriate privacy protections</li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            <p>Your travel documents and payment information are handled with strict confidentiality. Sensitive files are stored in encrypted, password-protected systems.</p>
            <p>WhatsApp communications are end-to-end encrypted. Email communications are transmitted over secure connections.</p>
          </Section>

          <Section title="5. Cookies Policy">
            <p>Our website uses cookies to enhance your browsing experience. Cookies help us remember your preferences, analyze website traffic, and improve our services.</p>
            <p>You can control cookie settings through your browser. Disabling cookies may affect some website functionality. We use cookies strictly for legitimate business purposes and do not use tracking cookies for advertising.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Booking records are typically retained for 7 years for legal and financial compliance.</p>
            <p>You may request deletion of your data at any time by contacting us, subject to any legal retention requirements.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at info@trinetraglobalholidays.com</p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>Our website may contain links to third-party websites (airlines, hotels, government portals). We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
          </Section>

          <Section title="10. Contact Us">
            <p>For any privacy-related questions, concerns, or requests, please contact our Data Protection Officer:</p>
            <p>📧 info@trinetraglobalholidays.com</p>
            <p>📞 +91 98924 94688</p>
            <p>📍 708, Mohan Nano Estates, Ambernath West, Maharashtra – 421505</p>
          </Section>

          <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Questions about our privacy practices? <a href="/contact" className="text-primary font-semibold hover:underline">Get in touch</a></p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
