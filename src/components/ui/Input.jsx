export default function Input({ label, icon, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        )}
        <input
          className={`w-full border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary placeholder:text-gray-400 ${icon ? 'pl-9 pr-3' : 'px-3'}`}
          {...props}
        />
      </div>
    </div>
  )
}
