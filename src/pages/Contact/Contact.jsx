import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import api from '../../services/api'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const contactInfo = [
  { icon: '📞', title: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 9am–7pm' },
  { icon: '✉️', title: 'Email Us', value: 'info@trinetra.com', sub: 'We reply within 24 hours' },
  { icon: '📍', title: 'Visit Us', value: '123, Travel Street', sub: 'Mumbai, India 400001' },
]

export default function Contact() {
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useGSAP(() => {
    gsap.from('.ci-card', { y: 50, opacity: 0, stagger: 0.13, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: infoRef.current, start: 'top 80%', toggleActions: 'play none none none' } })
  }, { scope: infoRef })

  useGSAP(() => {
    gsap.from('.form-left', { x: -70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 78%', toggleActions: 'play none none none' } })
    gsap.from('.form-right', { x: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 78%', toggleActions: 'play none none none' } })
  }, { scope: formRef })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitting(true)
    try {
      await api.post('/contacts', form)
      setSent(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      <PageHero title="Contact Us" subtitle="Get In Touch" breadcrumb="Contact" bg="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1600&auto=format&fit=crop" />

      {/* Info Cards */}
      <section ref={infoRef} className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactInfo.map((c) => (
              <div key={c.title} className="ci-card text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-primary font-semibold text-sm">{c.value}</p>
                <p className="text-gray-400 text-xs mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section ref={formRef} className="py-14 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="form-left bg-white rounded-3xl shadow-md p-8">
              <p className="text-gold text-2xl mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Send a Message</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">We'd Love to Hear From You</h2>

              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={submit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name *</label>
                      <input name="name" value={form.name} onChange={handle} placeholder="John Doe" required className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</label>
                      <input name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" required className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</label>
                    <input name="subject" value={form.subject} onChange={handle} placeholder="Tour inquiry..." className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Message *</label>
                    <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="Tell us about your travel plans..." required className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-dark transition-colors text-sm disabled:opacity-70">
                    {submitting ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="form-right flex flex-col gap-6">
              <div className="bg-gray-200 rounded-3xl overflow-hidden flex-1 min-h-64 relative">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="text-white text-center">
                    <div className="text-5xl mb-2">📍</div>
                    <p className="font-bold">123, Travel Street</p>
                    <p className="text-sm opacity-80">Mumbai, India 400001</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Working Hours</h3>
                <div className="space-y-2 text-sm opacity-90">
                  <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 7:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>9:00 AM – 5:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-gold">Closed</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
