import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const DEFAULT = {
  businessName: 'Trinetra Global Holidays',
  tagline: 'Explore More, Worry Less.',
  phone: '+91 98924 94688',
  phone2: '',
  phone3: '',
  whatsapp: '919892494688',
  email: 'info@trinetraglobalholidays.com',
  address: '708, Mohan Nano Estates, Ambernath West, India 421505',
  logoUrl: '',
  gstNumber: 'GST Number: Available on Request',
  businessRegistration: 'Registered Travel Business',
  googleReviews: '4.8/5 Google Reviews',
  happyTravelers: '50+',
  securePaymentBadge: 'Secure Payments',
  customerPhotos: [],
  customerTestimonials: [],
  facebook: '', instagram: '', linkedin: '', twitter: '', youtube: '',
  heroTitle: 'Where Would You Like To Go?',
  heroSubtitle: 'One life. Many destinations',
  heroBg: '',
  aboutTitle: 'About Trinetra Global Holidays',
  aboutSubtitle: 'Your Trusted Travel Partner Since 2009',
  aboutDescription: 'Trinetra Global Holidays is a leading travel company based in Ambernath, Maharashtra. With over 15 years of experience, we have helped thousands of travelers explore the world with comfort, safety, and unforgettable memories.',
  aboutImage: '',
  teamMembers: [],
  stats: [{ value: '15+', label: 'Years Experience' }, { value: '5000+', label: 'Happy Travelers' }, { value: '200+', label: 'Destinations' }, { value: '100%', label: 'Satisfaction' }],
  faqs: [],
  termsContent: '',
  privacyContent: '',
  refundContent: '',
  paymentDetails: '',
  copyrightText: '© 2025 Trinetra Global Holidays. All Rights Reserved.',
  footerTagline: 'Designed with ❤️ for Travelers',
}

const normalize = (data) => {
  if (!data) return data
  const businessName = /^trinetra global holid/i.test(data.businessName || '')
    ? 'Trinetra Global Holidays'
    : data.businessName
  return {
    ...data,
    businessName,
    whatsapp: ['9343088141', '919343088141'].includes(data.whatsapp) ? '919892494688' : data.whatsapp,
  }
}

const cached = () => {
  try { return normalize(JSON.parse(localStorage.getItem('site_settings') || 'null')) } catch { return null }
}

export const fetchSettings = createAsyncThunk('settings/fetch', async () => {
  try {
    const res = await api.get(`/settings?_t=${Date.now()}`)
    const raw = res.data.data || {}
    const data = normalize({ ...DEFAULT, ...raw })
    localStorage.setItem('site_settings', JSON.stringify(data))
    return data
  } catch {
    return cached() || DEFAULT
  }
})

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { data: cached() || DEFAULT, loaded: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.data = action.payload
      state.loaded = true
    })
  },
})

export default settingsSlice.reducer
