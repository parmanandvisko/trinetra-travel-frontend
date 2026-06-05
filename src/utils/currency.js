export function formatINR(amount) {
  const value = Number(amount || 0)
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
}
