import { THEMES } from '../store/slices/themeSlice'

const PAGE = {
  width: 210,
  height: 297,
  margin: 16,
  footerTop: 282,
}

const toAscii = (value = '') => String(value)
  .replace(/[✅❌]/gu, '')
  .replace(/[–—]/gu, '-')
  .replace(/₹/gu, 'Rs. ')
  .replace(/[^\x20-\x7E\n]/gu, '')
  .trim()

const safeFilename = (value) => toAscii(value)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '') || 'tour-package'

const imageToDataUrl = async (url) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Unable to load quotation logo')
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const getImageFormat = (dataUrl) => {
  if (dataUrl.startsWith('data:image/jpeg')) return 'JPEG'
  if (dataUrl.startsWith('data:image/webp')) return 'WEBP'
  return 'PNG'
}

const formatPrice = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-IN')}`

const getBusinessName = (value = '') => {
  const name = String(value).trim()
  if (/^trinetra global holid/i.test(name)) return 'Trinetra Global Holidays'
  return name || 'Trinetra Global Holidays'
}

export async function downloadPackageQuotation({
  pkg,
  settings,
  themeId,
  description,
  inclusions,
  exclusions,
}) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const theme = THEMES[themeId] || THEMES['crimson-gold']
  const primary = theme.primary.split(' ').map(Number)
  const gold = theme.gold.split(' ').map(Number)
  const contentWidth = PAGE.width - (PAGE.margin * 2)
  const businessName = getBusinessName(settings.businessName)
  const phones = [settings.phone, settings.phone2, settings.phone3].filter(Boolean)
  const quotationDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  let y = 16
  let pageNumber = 1

  const addFooter = () => {
    doc.setDrawColor(225, 225, 225)
    doc.line(PAGE.margin, PAGE.footerTop, PAGE.width - PAGE.margin, PAGE.footerTop)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(105, 105, 105)
    doc.text(toAscii(businessName), PAGE.margin, 288)
    doc.text(`Page ${pageNumber}`, PAGE.width - PAGE.margin, 288, { align: 'right' })
  }

  const addPage = () => {
    addFooter()
    doc.addPage()
    pageNumber += 1
    y = 18
  }

  const ensureSpace = (height) => {
    if (y + height > PAGE.footerTop - 4) addPage()
  }

  const addSectionTitle = (title) => {
    ensureSpace(14)
    y += 3
    doc.setFillColor(...primary)
    doc.roundedRect(PAGE.margin, y, contentWidth, 9, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(255, 255, 255)
    doc.text(toAscii(title).toUpperCase(), PAGE.margin + 4, y + 6)
    y += 14
  }

  const addParagraph = (text, options = {}) => {
    const cleanText = toAscii(text)
    if (!cleanText) return
    const fontSize = options.fontSize || 10
    const lineHeight = options.lineHeight || 5
    const indent = options.indent || 0
    const lines = doc.splitTextToSize(cleanText, contentWidth - indent)
    ensureSpace((lines.length * lineHeight) + 2)
    doc.setFont('helvetica', options.bold ? 'bold' : 'normal')
    doc.setFontSize(fontSize)
    doc.setTextColor(...(options.color || [65, 65, 65]))
    doc.text(lines, PAGE.margin + indent, y)
    y += (lines.length * lineHeight) + 2
  }

  const addList = (items) => {
    items.filter(Boolean).forEach((item) => {
      const lines = doc.splitTextToSize(toAscii(item), contentWidth - 9)
      ensureSpace((lines.length * 5) + 3)
      doc.setFillColor(...primary)
      doc.circle(PAGE.margin + 2, y - 1, 1, 'F')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(65, 65, 65)
      doc.text(lines, PAGE.margin + 7, y)
      y += (lines.length * 5) + 3
    })
  }

  doc.setFillColor(...primary)
  doc.rect(0, 0, PAGE.width, 44, 'F')

  try {
    let logo
    try {
      logo = await imageToDataUrl(settings.logoUrl || '/images/logo/trinetralogo.png')
    } catch {
      logo = await imageToDataUrl('/images/logo/trinetralogo.png')
    }
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(PAGE.margin, 9, 56, 22, 2, 2, 'F')
    doc.addImage(logo, getImageFormat(logo), PAGE.margin + 2, 12, 52, 15.5, undefined, 'NONE')
  } catch {
    // The business name below remains as the branding fallback.
  }

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text(toAscii(businessName), 77, 17)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(toAscii(settings.tagline), 77, 23)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('PACKAGE QUOTATION', PAGE.width - PAGE.margin, 17, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`Date: ${quotationDate}`, PAGE.width - PAGE.margin, 24, { align: 'right' })

  y = 53
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(19)
  doc.setTextColor(...primary)
  const titleLines = doc.splitTextToSize(toAscii(pkg.title), 118)
  doc.text(titleLines, PAGE.margin, y)

  const summaryTop = y - 6
  const summaryHeight = Math.max(28, (titleLines.length * 7) + 14)
  doc.setDrawColor(...gold)
  doc.setLineWidth(0.7)
  doc.roundedRect(140, summaryTop, 54, summaryHeight, 2, 2, 'S')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 100, 100)
  doc.text('COST PER PERSON', 167, summaryTop + 7, { align: 'center' })
  doc.setFontSize(16)
  doc.setTextColor(...primary)
  doc.text(formatPrice(pkg.price), 167, summaryTop + 16, { align: 'center' })
  if (pkg.originalPrice) {
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(135, 135, 135)
    doc.text(`Original: ${formatPrice(pkg.originalPrice)}`, 167, summaryTop + 23, { align: 'center' })
  }

  y += (titleLines.length * 7) + 2
  addParagraph(`Duration: ${pkg.duration || 'On request'}`, { bold: true, color: [65, 65, 65] })
  addParagraph(`Package Type: ${pkg.type || 'Tour package'}`)
  y = Math.max(y + 2, summaryTop + summaryHeight + 7)

  if (description) {
    addSectionTitle('Package Description')
    addParagraph(description)
  }

  const itinerary = pkg.itinerary || []
  if (itinerary.length > 0) {
    addSectionTitle('Tour Itinerary')
    itinerary.forEach((day, index) => {
      addParagraph(`Day ${day.day || index + 1}: ${day.title || ''}`, { bold: true, color: primary })
      addParagraph(day.description, { indent: 3 })
    })
  }

  if (inclusions.length > 0) {
    addSectionTitle('Package Inclusions')
    addList(inclusions)
  }

  if (exclusions.length > 0) {
    addSectionTitle('Package Exclusions')
    addList(exclusions)
  }

  addSectionTitle('Costing')
  addParagraph(`Package cost: ${formatPrice(pkg.price)} per person`, { bold: true, color: primary })
  if (pkg.originalPrice) addParagraph(`Original listed price: ${formatPrice(pkg.originalPrice)} per person`)
  addParagraph('Final total depends on the number of travelers, travel dates, hotel selection, and availability.')

  addSectionTitle('Contact Details')
  addParagraph(businessName, { bold: true, color: primary })
  if (phones.length) addParagraph(`Phone: ${phones.join(' / ')}`)
  if (settings.whatsapp) addParagraph(`WhatsApp: +${String(settings.whatsapp).replace(/^\+/, '')}`)
  if (settings.email) addParagraph(`Email: ${settings.email}`)
  if (settings.address) addParagraph(`Address: ${settings.address}`)
  if (typeof window !== 'undefined') addParagraph(`Website: ${window.location.origin}`)
  if (settings.gstNumber) addParagraph(settings.gstNumber)

  ensureSpace(18)
  y += 3
  doc.setDrawColor(...gold)
  doc.setFillColor(250, 248, 242)
  doc.roundedRect(PAGE.margin, y, contentWidth, 15, 2, 2, 'FD')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(90, 90, 90)
  doc.text(
    doc.splitTextToSize(
      'Thank you for choosing us as your travel partner. Package rates and services are subject to availability at the time of confirmation.',
      contentWidth - 8,
    ),
    PAGE.margin + 4,
    y + 6,
  )

  addFooter()
  doc.save(`${safeFilename(pkg.title)}-quotation.pdf`)
}
