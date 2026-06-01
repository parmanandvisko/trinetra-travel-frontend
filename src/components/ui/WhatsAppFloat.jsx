import { openWhatsApp } from '../../utils/whatsapp'
import WaIcon from './WaIcon'

export default function WhatsAppFloat() {
  return (
    <button
      onClick={() => openWhatsApp('Hello Trinetra Tours! 👋\nI want to inquire about your tour packages.')}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      title="Chat on WhatsApp"
    >
      <WaIcon className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </button>
  )
}
