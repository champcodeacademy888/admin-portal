import { useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCountry } from '../../context/CountryContext'
import { getRoleLabel } from '../../lib/navigation'
import { LEADS, STUDENTS, TRIALS, INVOICES, CLASSES } from '../../lib/dummyData'
import { ShieldCheck, Globe, TrendingUp, Users, GraduationCap, CalendarCheck, DollarSign, Activity } from 'lucide-react'

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)
}

export default function DashboardPage() {
  const { profile } = useAuth()
  const { selectedCountry } = useCountry()

  const stats = useMemo(() => {
    const filter = (arr) => selectedCountry ? arr.filter((r) => r.country === selectedCountry) : arr

    const leads = filter(LEADS)
    const students = filter(STUDENTS)
    const trials = filter(TRIALS)
    const invoices = filter(INVOICES)
    const classes = filter(CLASSES)

    return {
      newInquiries: leads.filter((l) => l.status === 'inquiry').length,
      activeLeads: leads.filter((l) => ['lead', 'trial_arranged'].includes(l.status)).length,
      upcomingTrials: trials.filter((t) => !t.outcome).length,
      activeStudents: students.filter((s) => s.status === 'active').length,
      churnedStudents: students.filter((s) => s.status === 'churned').length,
      pendingInvoices: invoices.filter((i) => i.status === 'pending').length,
      overdueInvoices: invoices.filter((i) => i.status === 'overdue').length,
      attendanceRate: classes.length
        ? Math.round((classes.filter((c) => c.outcome === 'attended').length / classes.length) * 100)
        : 0,
    }
  }, [selectedCountry])

  const infoCards = [
    { label: 'Your Role', value: getRoleLabel(profile?.role), icon: ShieldCheck, accent: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
    { label: 'Country', value: selectedCountry ?? profile?.country ?? 'All', icon: Globe, accent: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
    { label: 'Status', value: 'Active', icon: Activity, accent: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  ]

  const metricCards = [
    { label: 'New Inquiries', value: stats.newInquiries, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Leads', value: stats.activeLeads, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Upcoming Trials', value: stats.upcomingTrials, icon: CalendarCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Students', value: stats.activeStudents, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Overdue Invoices', value: stats.overdueInvoices, icon: DollarSign, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Attendance Rate', value: `${stats.attendanceRate}%`, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  // Recent leads for activity feed
  const recentLeads = useMemo(() => {
    const filtered = selectedCountry ? LEADS.filter((l) => l.country === selectedCountry) : LEADS
    return filtered.slice(0, 5)
  }, [selectedCountry])

  const overdueInvoices = useMemo(() => {
    return INVOICES.filter((i) => i.status === 'overdue' && (!selectedCountry || i.country === selectedCountry))
  }, [selectedCountry])

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Overview of your workspace</p>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {infoCards.map(({ label, value, icon: Icon, accent, border }) => (
          <div key={label} className={`bg-white rounded-xl border ${border} p-5 flex items-start gap-4 shadow-sm`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-lg font-semibold text-gray-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {metricCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg} mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Two-column: Recent + Overdue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent leads */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">Recent Leads</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-400">{lead.country} · <span className="capitalize">{lead.source.replace(/_/g, ' ')}</span></p>
                </div>
                <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md ${
                  lead.status === 'inquiry' ? 'bg-gray-100 text-gray-600' :
                  lead.status === 'enrolled' ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {lead.status.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue invoices */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">Overdue Invoices</h2>
          </div>
          {overdueInvoices.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">No overdue invoices</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {overdueInvoices.map((inv) => (
                <div key={inv.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inv.student_name}</p>
                    <p className="text-xs text-gray-400">{inv.package_name} · {inv.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">{inv.currency} {formatCurrency(inv.amount)}</p>
                    <p className="text-[10px] text-red-400">Overdue</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
