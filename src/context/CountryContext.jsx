import { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'

const CountryContext = createContext({})

export function useCountry() {
  return useContext(CountryContext)
}

export const COUNTRIES = [
  { code: 'SG', name: 'Singapore', currency: 'SGD', timezone: 'UTC+8' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', timezone: 'UTC+8' },
  { code: 'PH', name: 'Philippines', currency: 'PHP', timezone: 'UTC+8' },
  { code: 'ID', name: 'Indonesia', currency: 'IDR', timezone: 'UTC+7' },
  { code: 'AE', name: 'Dubai', currency: 'AED', timezone: 'UTC+4' },
  { code: 'HK', name: 'Hong Kong', currency: 'HKD', timezone: 'UTC+8' },
  { code: 'LK', name: 'Sri Lanka', currency: 'LKR', timezone: 'UTC+5:30' },
]

export function CountryProvider({ children }) {
  const { profile } = useAuth()
  const [selectedCountry, setSelectedCountry] = useState(null)

  const isMultiCountry = profile?.role === 'management' || profile?.role === 'super_admin'
  const effectiveCountry = isMultiCountry ? selectedCountry : profile?.country

  const value = {
    selectedCountry: effectiveCountry,
    setSelectedCountry,
    isMultiCountry,
    countries: COUNTRIES,
  }

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
}
