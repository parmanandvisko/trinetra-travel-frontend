import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSelector } from 'react-redux'
import PageHero from '../../components/ui/PageHero'
import PageWrapper from '../../components/ui/PageWrapper'
import FormattedText from '../../components/ui/FormattedText'
import { ABOUT_FALLBACK_IMAGE, handleImageError, imageUrl } from '../../utils/image'

const STATIC_VALUES = [
  { icon: '🧭', title: 'Expert Guidance', desc: 'Our experienced travel experts craft every trip with precision and personal care.' },
  { icon: '💎', title: 'Premium Quality', desc: 'We partner with the best hotels and services to give you premium experiences.' },
  { icon: '🤝', title: 'Trusted Since 2009', desc: 'Over 15 years of building trust with thousands of satisfied travelers.' },
  { icon: '🌍', title: '200+ Destinations', desc: 'From local gems to global wonders — we cover it all with expertise.' },
]

export default function About() {
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)
  const s = useSelector((st) => st.settings.data)

  const team = s.teamMembers?.length > 0 ? s.teamMembers : []
  const stats = s.stats?.length > 0 ? s.stats : [
    { value: '15+', label: 'Years Experience' },
    { value: '5000+', label: 'Happy Travelers' },
    { value: '200+', label: 'Destinations' },
  ]

  useGSAP(() => {
    gsap.from('.mission-left', { x: -80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: missionRef.current, start: 'top 78%', toggleActions: 'play none none none' } })
    gsap.from('.mission-right', { x: 80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: missionRef.current, start: 'top 78%', toggleActions: 'play none none none' } })
  }, { scope: missionRef })

  useGSAP(() => {
    gsap.from('.value-card', { y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: valuesRef.current, start: 'top 80%', toggleActions: 'play none none none' } })
  }, { scope: valuesRef })

  useGSAP(() => {
    gsap.from('.team-card', { y: 60, opacity: 0, stagger: 0.13, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: teamRef.current, start: 'top 80%', toggleActions: 'play none none none' } })
  }, { scope: teamRef })

  return (
    <PageWrapper>
      <PageHero
        title={s.aboutTitle || 'About Us'}
        subtitle={s.aboutSubtitle || 'Our Story'}
        breadcrumb="About Us"
        bg={imageUrl(s.aboutImage, ABOUT_FALLBACK_IMAGE)}
      />

      {/* Mission Section */}
      <section ref={missionRef} className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="mission-left">
              <p className="text-gold text-3xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>Who We Are</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">{s.aboutTitle || 'Crafting Journeys That Last a Lifetime'}</h2>
              <FormattedText
                text={s.aboutDescription || 'Trinetra Global Holidays is a leading travel company based in Ambernath, Maharashtra. With over 15 years of experience, we have helped thousands of travelers explore the world with comfort, safety, and unforgettable memories.'}
                className="mb-8"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.slice(0, 4).map((st, i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-2xl font-bold text-primary">{st.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mission-right relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96">
                <img
                  src={imageUrl(s.aboutImage, ABOUT_FALLBACK_IMAGE)}
                  onError={(event) => handleImageError(event, ABOUT_FALLBACK_IMAGE)}
                  alt="About"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>What Drives Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATIC_VALUES.map((v) => (
              <div key={v.title} className="value-card bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — show only if team members are set in admin */}
      {team.length > 0 && (
        <section ref={teamRef} className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold font-semibold text-sm mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>The People</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div key={i} className="team-card text-center group">
                  <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    {member.img ? (
                      <img src={imageUrl(member.img)} onError={handleImageError} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-3xl">👤</div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gold mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 bg-primary text-white text-center">
        <p className="text-3xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>Ready to explore?</p>
        <h2 className="text-2xl font-bold mb-6">Start Your Journey with {s.businessName}</h2>
        <Link to="/booking" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
          Plan My Trip <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
      </section>
    </PageWrapper>
  )
}
