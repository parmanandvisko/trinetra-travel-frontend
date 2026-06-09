import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ScrollToTop from '../components/ui/ScrollToTop'

import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Blogs from '../pages/Blogs/Blogs'
import SearchResults from '../pages/Search/SearchResults'
import Destinations from '../pages/Domestic/Destinations'
import DestinationList from '../pages/Domestic/DestinationList'
import DestinationDetail from '../pages/Domestic/DestinationDetail'
import PackageDetail from '../pages/Domestic/PackageDetail'
import Domestic from '../pages/Domestic/Domestic'
import International from '../pages/International/International'
import Booking from '../pages/Booking/Booking'
import Auth from '../pages/Auth/Auth'
import BlogDetail from '../pages/Blogs/BlogDetail'
import FAQ from '../pages/Support/FAQ'
import Terms from '../pages/Support/Terms'
import Privacy from '../pages/Support/Privacy'
import Refund from '../pages/Support/Refund'
import PaymentDetails from '../pages/Support/PaymentDetails'
import DiscountPackages from '../pages/Domestic/DiscountPackages'

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
          <Route path="/search" element={<SearchResults />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/travel-insurance" element={<Contact />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:category/all" element={<DestinationList />} />
          <Route path="/destinations/detail/:id" element={<DestinationDetail />} />
          <Route path="/destinations/domestic" element={<Domestic />} />
          <Route path="/destinations/international" element={<International />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/packages/discounts" element={<DiscountPackages />} />
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
