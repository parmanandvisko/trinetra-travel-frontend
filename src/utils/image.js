export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&auto=format&fit=crop'

export function imageUrl(url) {
  if (!url) return FALLBACK_IMAGE

  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'api.trinetraglobalholidays.com') parsed.protocol = 'https:'
    return parsed.toString()
  } catch {
    return url
  }
}

export function handleImageError(e) {
  if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE
}
