import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function PageWrapper({ children }) {
  const el = useRef(null)
  useGSAP(() => {
    gsap.from(el.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', clearProps: 'all' })
  }, { scope: el })
  return <div ref={el}>{children}</div>
}
