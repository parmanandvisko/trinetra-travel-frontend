import HeroSection from '../../components/home/HeroSection'
import TourDestinations from '../../components/home/TourDestinations'
import WelcomeSection from '../../components/home/WelcomeSection'
import PopularAdventures from '../../components/home/PopularAdventures'
import Testimonials from '../../components/home/Testimonials'
import BlogSection from '../../components/home/BlogSection'
import CTABanner from '../../components/home/CTABanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TourDestinations />
      <WelcomeSection />
      <PopularAdventures />
      <Testimonials />
      <BlogSection />
      <CTABanner />
    </>
  )
}
