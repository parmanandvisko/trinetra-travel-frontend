export default function FormattedText({ text, className = '' }) {
  const lines = String(text || '').split('\n')

  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((line, index) => {
        const value = line.trim()
        if (!value) return <div key={index} className="h-2" />
        if (value.startsWith('## ')) {
          return <h3 key={index} className="text-lg font-bold text-gray-900 mt-4">{formatInline(value.replace('## ', ''))}</h3>
        }
        if (value.startsWith('- ')) {
          return <p key={index} className="text-gray-500 leading-relaxed pl-4">• {formatInline(value.replace('- ', ''))}</p>
        }
        return <p key={index} className="text-gray-500 leading-relaxed">{formatInline(value)}</p>
      })}
    </div>
  )
}

function formatInline(text) {
  const parts = String(text).split(/(\*\*.*?\*\*|\*.*?\*)/g).filter(Boolean)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
    return <span key={index}>{part}</span>
  })
}
