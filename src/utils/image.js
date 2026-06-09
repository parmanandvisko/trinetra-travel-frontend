export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&auto=format&fit=crop'
export const HERO_FALLBACK_IMAGE = '/images/site/hero.jpg'
export const ABOUT_FALLBACK_IMAGE = '/images/site/about.jpg'

export function imageUrl(url, fallback = FALLBACK_IMAGE) {
  if (!url) return fallback

  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'api.trinetraglobalholidays.com') parsed.protocol = 'https:'
    return parsed.toString()
  } catch {
    return url || fallback
  }
}

export function handleImageError(e, fallback = FALLBACK_IMAGE) {
  if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback
}
