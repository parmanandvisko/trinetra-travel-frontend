import { useSelector } from 'react-redux'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const STATIC = `## Cancellation Charges
| Period | Domestic | International |
| 30+ days before departure | 10% | 15% |
| 15-29 days before departure | 25% | 30% |
| 7-14 days before departure | 50% | 60% |
| Less than 7 days / No Show | 100% | 100% |

## Refund Process
Refunds are processed within 5-7 business days of receiving the cancellation request. Bank transfers take 3-5 additional working days. UPI refunds take 1-3 business days.

## Non-Refundable Components
- Visa application fees
- Travel insurance premiums
- Non-refundable airline tickets
- Non-refundable hotel bookings
- Adventure activity bookings

## How to Cancel
Send an email to info@trinetraglobalholidays.com with your booking reference number, or WhatsApp us at +91 93430 88141. Our team will confirm receipt within 24 hours.

## Cancellation by Company
In rare cases (force majeure, insufficient group size), we will offer alternative dates or a full refund within 10 business days.`

function renderContent(text) {
  if (!text?.trim()) return null
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3 flex items-center gap-2"><span className="w-1 h-5 bg-primary rounded-full inline-block" />{formatInline(line.replace('## ', ''))}</h3>
    if (line.startsWith('| ') && !line.startsWith('| Period')) {
      const cols = line.split('|').filter(c => c.trim())
      return <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100 text-sm"><span className="text-gray-700">{cols[0]?.trim()}</span><span className="text-red-600 font-semibold text-center">{cols[1]?.trim()}</span><span className="text-red-600 font-semibold text-center">{cols[2]?.trim()}</span></div>
    }
    if (line.startsWith('| Period')) {
      const cols = line.split('|').filter(c => c.trim())
      return <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b-2 border-gray-300 text-xs font-bold text-gray-500 uppercase bg-gray-50 px-2 rounded-t-lg">{cols.map((c, j) => <span key={j}>{c.trim()}</span>)}</div>
    }
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

export default function Refund() {
  const s = useSelector((st) => st.settings.data)
  const content = s.refundContent?.trim() ? s.refundContent : STATIC
  const phones = [s.phone, s.phone2, s.phone3].filter(Boolean)

  return (
    <PageWrapper>
      <PageHero title="Refund & Cancellation Policy" subtitle="Know Your Rights" breadcrumb="Refund Policy"
        bg="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop" />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-sm text-yellow-800">
            ⚡ All cancellations must be submitted in writing via email or WhatsApp. Verbal cancellations are not accepted.
          </div>
          <div className="space-y-1">{renderContent(content)}</div>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">📧</div>
              <a href={`mailto:${s.email}`} className="text-primary text-sm font-semibold hover:underline">{s.email}</a>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">💬</div>
              <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" className="text-green-600 text-sm font-semibold hover:underline">{phones.join(' / ')}</a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
