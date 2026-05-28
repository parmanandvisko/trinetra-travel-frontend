import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ScrollToTop from '../components/ui/ScrollToTop'

import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Blogs from '../pages/Blogs/Blogs'
import Destinations from '../pages/Domestic/Destinations'
import Domestic from '../pages/Domestic/Domestic'
import International from '../pages/International/International'
import Booking from '../pages/Booking/Booking'
import Auth from '../pages/Auth/Auth'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth — no navbar/footer */}
        <Route path="/login" element={<Auth />} />

        {/* Main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blogs />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/domestic" element={<Domestic />} />
          <Route path="/destinations/international" element={<International />} />
          <Route path="/booking" element={<Booking />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <p className="text-7xl font-bold text-primary">404</p>
            <p className="text-gray-500 text-lg">Page not found</p>
            <a href="/" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">Go Home</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}
