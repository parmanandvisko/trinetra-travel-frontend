import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPackages } from '../../store/slices/packagesSlice'
import api from '../../services/api'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'

const steps = ['Select Package', 'Traveler Info', 'Review & Pay']

export default function Booking() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', adults: '2', children: '0', date: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const formRef = useRef(null)

  const dispatch = useDispatch()
  const { all: packages, loading } = useSelector((s) => s.packages)

  useEffect(() => { dispatch(fetchAllPackages()) }, [dispatch])

  useGSAP(() => {
    gsap.from('.step-content', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' })
  }, { scope: formRef, dependencies: [step] })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const selectedPkg = packages.find((p) => p._id === selected)

  const confirm = async () => {
    if (!selectedPkg || !form.name || !form.email) return
    setSubmitting(true)
    try {
      await api.post('/bookings', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        package: selectedPkg._id,
        packageTitle: selectedPkg.title,
        travelDate: form.date,
        adults: Number(form.adults),
        children: Number(form.children),
        notes: form.notes,
        totalAmount: selectedPkg.price * Number(form.adults),
      })
      setDone(true)
    } catch {
      alert('Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <PageWrapper>
        <PageHero title="Book Your Trip" subtitle="Plan Your Journey" breadcrumb="Booking" bg="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&auto=format&fit=crop" />
        <section className="py-20 bg-gray-50">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-2">Thank you, <strong>{form.name}</strong>!</p>
            <p className="text-gray-500 text-sm mb-8">Our travel expert will call you within 24 hours to confirm your booking for <strong>{selectedPkg?.title}</strong>.</p>
            <button onClick={() => { setDone(false); setStep(0); setSelected(null); setForm({ name: '', email: '', phone: '', adults: '2', children: '0', date: '', notes: '' }) }}
              className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
              Book Another Trip
            </button>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageHero title="Book Your Trip" subtitle="Plan Your Journey" breadcrumb="Booking" bg="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&auto=format&fit=crop" />

      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-0 mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${i <= step ? 'text-primary' : 'text-gray-400'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-20 sm:w-32 h-0.5 mx-2 mb-5 transition-all ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div ref={formRef}>
            {/* Step 0: Select Package */}
            {step === 0 && (
              <div className="step-content">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Choose Your Package</h2>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[1,2,3,4].map((i) => <div key={i} className="h-24 rounded-2xl bg-gray-200 animate-pulse" />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {packages.map((pkg) => (
                      <div
                        key={pkg._id}
                        onClick={() => setSelected(pkg._id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selected === pkg._id ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/40'}`}
                      >
                        <img src={pkg.image} alt={pkg.title} className="w-20 h-16 object-cover rounded-xl shrink-0" />
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{pkg.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{pkg.duration}</p>
                          <p className="text-primary font-bold mt-1">${pkg.price} <span className="text-gray-400 font-normal text-xs">/person</span></p>
                        </div>
                        {selected === pkg._id && (
                          <div className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-center">
                  <button disabled={!selected} onClick={() => setStep(1)} className="bg-primary text-white font-semibold px-10 py-3 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Traveler Info */}
            {step === 1 && (
              <div className="step-content bg-white rounded-3xl shadow-md p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Traveler Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name *</label>
                      <input name="name" value={form.name} onChange={handle} placeholder="John Doe" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone *</label>
                      <input name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Travel Date</label>
                      <input name="date" type="date" value={form.date} onChange={handle} className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Adults</label>
                      <select name="adults" value={form.adults} onChange={handle} className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary bg-white">
                        {['1','2','3','4','5','6+'].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Children</label>
                      <select name="children" value={form.children} onChange={handle} className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary bg-white">
                        {['0','1','2','3','4+'].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Special Requests</label>
                    <textarea name="notes" value={form.notes} onChange={handle} rows={3} placeholder="Any dietary needs, room preferences..." className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary resize-none" />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(0)} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-full hover:border-primary hover:text-primary transition-colors">← Back</button>
                  <button disabled={!form.name || !form.email} onClick={() => setStep(2)} className="flex-1 bg-primary text-white font-semibold py-3 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Continue →</button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="step-content bg-white rounded-3xl shadow-md p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
                <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Package</span><span className="font-semibold text-gray-900">{selectedPkg?.title}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Duration</span><span className="font-semibold text-gray-900">{selectedPkg?.duration}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Traveler</span><span className="font-semibold text-gray-900">{form.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Email</span><span className="font-semibold text-gray-900">{form.email}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Guests</span><span className="font-semibold text-gray-900">{form.adults} Adults, {form.children} Children</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Travel Date</span><span className="font-semibold text-gray-900">{form.date || '—'}</span></div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-primary text-lg">${(selectedPkg?.price || 0) * Number(form.adults)} <span className="text-sm font-normal text-gray-400">({form.adults} adults)</span></span></div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mb-6">
                  ⚡ Our travel expert will call you within 24 hours to confirm your booking and process payment.
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-full hover:border-primary hover:text-primary transition-colors">← Back</button>
                  <button onClick={confirm} disabled={submitting} className="flex-1 bg-primary text-white font-semibold py-3 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-70">
                    {submitting ? 'Confirming...' : 'Confirm Booking ✓'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
