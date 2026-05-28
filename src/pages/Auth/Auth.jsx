import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PageWrapper from '../../components/ui/PageWrapper'

export default function Auth() {
  const [tab, setTab] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const cardRef = useRef(null)

  useGSAP(() => {
    gsap.from('.auth-card', { y: 50, opacity: 0, scale: 0.97, duration: 0.7, ease: 'power3.out' })
  }, { scope: cardRef })

  useGSAP(() => {
    gsap.from('.tab-content', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
  }, { scope: cardRef, dependencies: [tab] })

  return (
    <PageWrapper>
      <div
        ref={cardRef}
        className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="auth-card relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Logo */}
          <div className="bg-primary p-6 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
              </svg>
            </div>
            <p className="text-white font-bold text-xl">Trinetra</p>
            <p className="text-white/70 text-xs">Explore More, Worry Less.</p>
          </div>

          <div className="p-8">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button onClick={() => setTab('login')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === 'login' ? 'bg-white text-primary shadow' : 'text-gray-500'}`}>Login</button>
              <button onClick={() => setTab('register')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === 'register' ? 'bg-white text-primary shadow' : 'text-gray-500'}`}>Register</button>
            </div>

            {tab === 'login' ? (
              <div className="tab-content space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                  <input type="email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} placeholder="john@example.com" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                  <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} placeholder="••••••••" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-primary" /><span className="text-gray-600">Remember me</span></label>
                  <Link to="#" className="text-primary font-semibold hover:underline">Forgot password?</Link>
                </div>
                <button className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">Sign In</button>
                <p className="text-center text-sm text-gray-500">
                  Don't have an account? <button onClick={() => setTab('register')} className="text-primary font-semibold hover:underline">Register</button>
                </p>
              </div>
            ) : (
              <div className="tab-content space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                  <input value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} placeholder="John Doe" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                    <input type="email" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} placeholder="Email" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</label>
                    <input value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} placeholder="Phone" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                  <input type="password" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} placeholder="••••••••" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirm Password</label>
                  <input type="password" value={regForm.confirm} onChange={e => setRegForm({...regForm, confirm: e.target.value})} placeholder="••••••••" className="mt-1.5 w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" />
                </div>
                <button className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">Create Account</button>
                <p className="text-center text-sm text-gray-500">
                  Already have an account? <button onClick={() => setTab('login')} className="text-primary font-semibold hover:underline">Login</button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
