import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTheme, applyTheme } from './store/slices/themeSlice'
import AppRoutes from './routes/AppRoutes'

function App() {
  const dispatch = useDispatch()
  const activeTheme = useSelector((s) => s.theme.activeTheme)

  // Apply cached theme instantly on first render (no flash)
  useEffect(() => {
    const cached = localStorage.getItem('site_theme') || 'crimson-gold'
    applyTheme(cached)
  }, [])

  // Fetch from backend and apply if different
  useEffect(() => {
    dispatch(fetchTheme())
    const interval = setInterval(() => dispatch(fetchTheme()), 10000)
    return () => clearInterval(interval)
  }, [dispatch])

  // When Redux activeTheme changes, apply it to DOM
  useEffect(() => {
    applyTheme(activeTheme)
  }, [activeTheme])

  return <AppRoutes />
}

export default App
