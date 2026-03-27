import { useCountry } from '../../context/CountryContext'
import { Globe } from 'lucide-react'

export default function CountrySelector() {
  const { selectedCountry, setSelectedCountry, isMultiCountry, countries } = useCountry()

  if (!isMultiCountry) return null

  return (
    <div className="relative flex items-center">
      <Globe className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
      <select
        value={selectedCountry ?? ''}
        onChange={(e) => setSelectedCountry(e.target.value || null)}
        className="appearance-none pl-9 pr-8 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <option value="">All Countries</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <svg
        className="w-4 h-4 text-gray-400 absolute right-2 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
