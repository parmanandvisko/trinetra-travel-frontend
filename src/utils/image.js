export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&auto=format&fit=crop'

export function imageUrl(url) {
  return url || FALLBACK_IMAGE
}

export function handleImageError(e) {
  if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE
}
