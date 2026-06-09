import HeroSection from '../../components/home/HeroSection'
import TourDestinations from '../../components/home/TourDestinations'
import WelcomeSection from '../../components/home/WelcomeSection'
// Uncomment when gallery media is ready:
// import PopularAdventures from '../../components/home/PopularAdventures'
import PopularDestinationSections from '../../components/home/PopularDestinationSections'
import Testimonials from '../../components/home/Testimonials'
import BlogSection from '../../components/home/BlogSection'
import CTABanner from '../../components/home/CTABanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TourDestinations />
      <PopularDestinationSections />
      <WelcomeSection />
      {/* Uncomment when gallery media is ready: <PopularAdventures /> */}
      <Testimonials />
      <BlogSection />
      <CTABanner />
    </>
  )
}
