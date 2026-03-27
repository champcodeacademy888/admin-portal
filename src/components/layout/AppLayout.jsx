import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import CountrySelector from './CountrySelector'
import { useAuth } from '../../context/AuthContext'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function AppLayout() {
  const { profile } = useAuth()
  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <p className="text-sm text-gray-600">
            {getGreeting()},{' '}
            <span className="font-semibold text-gray-900">{firstName}</span>
          </p>
          <div className="flex items-center gap-3">
            {profile?.country && !['management', 'super_admin'].includes(profile.role) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                {profile.country}
              </span>
            )}
            <CountrySelector />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
