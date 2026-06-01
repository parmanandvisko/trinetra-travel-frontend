import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

// RGB space-separated values for Tailwind CSS variable compatibility
export const THEMES = {
  'crimson-gold':   { primary: '139 26 26',   primaryLight: '165 36 36',  primaryDark: '107 18 18',  gold: '212 160 23',  dark: false },
  'ocean-blue':     { primary: '30 64 175',    primaryLight: '37 99 235',  primaryDark: '30 58 138',  gold: '14 165 233',  dark: false },
  'forest-green':   { primary: '22 101 52',    primaryLight: '22 163 74',  primaryDark: '20 83 45',   gold: '101 163 13',  dark: false },
  'rose-pink':      { primary: '157 23 77',    primaryLight: '190 24 93',  primaryDark: '131 24 67',  gold: '236 72 153',  dark: false },
  'warm-sunset':    { primary: '194 65 12',    primaryLight: '234 88 12',  primaryDark: '154 52 18',  gold: '245 158 11',  dark: false },
  'royal-sapphire': { primary: '29 78 216',    primaryLight: '37 99 235',  primaryDark: '30 58 138',  gold: '124 58 237',  dark: false },
  'dark-violet':    { primary: '124 58 237',   primaryLight: '139 92 246', primaryDark: '109 40 217', gold: '16 185 129',  dark: true  },
  'dark-navy':      { primary: '59 130 246',   primaryLight: '96 165 250', primaryDark: '37 99 235',  gold: '56 189 248',  dark: true  },
  'neon-cyber':     { primary: '34 211 238',   primaryLight: '103 232 249',primaryDark: '6 182 212',  gold: '163 230 53',  dark: true  },
  'pure-black':     { primary: '245 158 11',   primaryLight: '251 191 36', primaryDark: '217 119 6',  gold: '234 179 8',   dark: true  },
}

export function applyTheme(themeId) {
  const theme = THEMES[themeId] || THEMES['crimson-gold']
  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-primary-light', theme.primaryLight)
  root.style.setProperty('--color-primary-dark', theme.primaryDark)
  root.style.setProperty('--color-gold', theme.gold)

  const body = document.body
  body.classList.remove('dark-theme')
  if (theme.dark) body.classList.add('dark-theme')
  localStorage.setItem('site_theme', themeId)
}

export const fetchTheme = createAsyncThunk('theme/fetch', async () => {
  try {
    const res = await api.get('/settings')
    return res.data.data?.activeTheme || 'crimson-gold'
  } catch {
    return localStorage.getItem('site_theme') || 'crimson-gold'
  }
})

const themeSlice = createSlice({
  name: 'theme',
  initialState: { activeTheme: localStorage.getItem('site_theme') || 'crimson-gold' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTheme.fulfilled, (state, action) => {
      state.activeTheme = action.payload
    })
  },
})

export default themeSlice.reducer
