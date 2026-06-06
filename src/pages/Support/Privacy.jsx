import { useSelector } from 'react-redux'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const STATIC = `## 1. Information We Collect
We collect personal details (name, DOB, nationality), contact information (email, phone, address), travel documents (when required), payment information, and website data (IP, cookies).

## 2. How We Use Your Information
- Processing and confirming tour bookings
- Communicating travel arrangements and updates
- Processing refunds and cancellation requests
- Visa applications and hotel/airline reservations
- Sending promotional offers with your consent
- Legal and regulatory compliance

## 3. Information Sharing
We do not sell or trade your personal information. We share only with service providers (hotels, airlines, visa agencies) and when required by law.

## 4. Data Security
We implement appropriate security measures to protect your data. Sensitive files are stored in encrypted, password-protected systems. WhatsApp communications are end-to-end encrypted.

## 5. Your Rights
- Access: Request a copy of your data
- Correction: Request correction of inaccurate data
- Deletion: Request deletion (subject to legal requirements)
- Opt-out: Unsubscribe from marketing at any time

## 6. Contact
For privacy queries: info@trinetraglobalholidays.com | +91 98924 94688`

function renderContent(text) {
  if (!text?.trim()) return null
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3 flex items-center gap-2"><span className="w-1 h-5 bg-primary rounded-full inline-block" />{formatInline(line.replace('## ', ''))}</h3>
    if (line.startsWith('- ')) return <li key={i} className="ml-5 text-gray-600 text-sm leading-relaxed">{formatInline(line.replace('- ', ''))}</li>
    if (line.trim() === '') return <div key={i} className="h-2" />
    return <p key={i} className="text-gray-600 text-sm leading-relaxed pl-3">{formatInline(line)}</p>
  })
}

function formatInline(text) {
  return String(text).split(/(\*\*.*?\*\*|\*.*?\*)/g).filter(Boolean).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return <span key={i}>{part}</span>
  })
}

export default function Privacy() {
  const s = useSelector((st) => st.settings.data)
  const content = s.privacyContent?.trim() ? s.privacyContent : STATIC

  return (
    <PageWrapper>
      <PageHero title="Privacy Policy" subtitle="Your Privacy Matters" breadcrumb="Privacy Policy"
        bg="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&auto=format&fit=crop" />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-gray-600">
            <strong className="text-gray-900">Last Updated: 2025</strong> — We are committed to protecting your privacy.
          </div>
          <div className="space-y-1">{renderContent(content)}</div>
          <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Privacy questions? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a></p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
