const WA_NUMBER = '919892494688'

function formatINRText(amount) {
  const value = Number(amount || 0)
  return `INR ${value.toLocaleString('en-IN')}`
}

export function openWhatsApp(message) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function packageInquiryMsg(pkg) {
  return `Hello Trinetra Tours!\n\nI'm interested in booking:\n\n*Package:* ${pkg.title}\n*Duration:* ${pkg.duration}\n*Price:* ${formatINRText(pkg.price)}/person\n\nPlease share more details and availability. Thank you!`
}

export function destinationQuotationMsg(destination) {
  return `Hello Trinetra Global Holidays!\n\nI want a quotation for:\n\n*Destination:* ${destination.name}\n*Type:* ${destination.category === 'domestic' ? 'Domestic' : 'International'}\n*Location:* ${destination.subtitle || destination.country}\n\nPlease share package options, itinerary, hotel details, inclusions and best price.`
}

export function bookingConfirmMsg(pkg, form) {
  return `Hello Trinetra Tours!\n\n*New Booking Inquiry*\n\n*Package:* ${pkg.title}\n*Duration:* ${pkg.duration}\n*Price:* ${formatINRText(pkg.price)}/person\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone || 'Not provided'}\n*Travel Date:* ${form.date || 'Flexible'}\n*Adults:* ${form.adults} | *Children:* ${form.children}${form.notes ? `\n*Notes:* ${form.notes}` : ''}\n\n*Total:* ${formatINRText((pkg.price || 0) * Number(form.adults))} (${form.adults} adults)\n\nPlease confirm my booking!`
}

export function contactInquiryMsg(form) {
  return `Hello Trinetra Tours!\n\n*New Message from Website*\n\n*Name:* ${form.name}${form.phone ? `\n*Phone:* ${form.phone}` : ''}${form.email ? `\n*Email:* ${form.email}` : ''}${form.subject ? `\n*Subject:* ${form.subject}` : ''}${form.message ? `\n\n*Message:*\n${form.message}` : ''}`
}
