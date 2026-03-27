import { useMemo } from 'react'
import { LEADS, STUDENTS, INVOICES, CLASSES } from '../../lib/dummyData'
import { useCountry, COUNTRIES } from '../../context/CountryContext'
import { TrendingUp, Users, GraduationCap, DollarSign, BarChart3, PieChart } from 'lucide-react'

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount)
}

export default function ReportsPage() {
  const { selectedCountry } = useCountry()

  const stats = useMemo(() => {
    const leads = selectedCountry ? LEADS.filter((l) => l.country === selectedCountry) : LEADS
    const students = selectedCountry ? STUDENTS.filter((s) => s.country === selectedCountry) : STUDENTS
    const invoices = selectedCountry ? INVOICES.filter((i) => i.country === selectedCountry) : INVOICES
    const classes = selectedCountry ? CLASSES.filter((c) => c.country === selectedCountry) : CLASSES

    const totalRevenue = invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
    const attendanceRate = classes.length ? Math.round((classes.filter((c) => c.outcome === 'attended').length / classes.length) * 100) : 0

    return {
      totalLeads: leads.length,
      activeStudents: students.filter((s) => s.status === 'active').length,
      churnedStudents: students.filter((s) => s.status === 'churned').length,
      enrolled: leads.filter((l) => l.status === 'enrolled').length,
      conversionRate: leads.length ? Math.round((leads.filter((l) => l.status === 'enrolled').length / leads.length) * 100) : 0,
      totalRevenue,
      pendingInvoices: invoices.filter((i) => i.status === 'pending').length,
      overdueInvoices: invoices.filter((i) => i.status === 'overdue').length,
      attendanceRate,
    }
  }, [selectedCountry])

  const countryBreakdown = useMemo(() => {
    return COUNTRIES.map((c) => {
      const students = STUDENTS.filter((s) => s.country === c.code)
      const leads = LEADS.filter((l) => l.country === c.code)
      const revenue = INVOICES
        .filter((i) => i.country === c.code && i.status === 'paid')
        .reduce((sum, i) => sum + i.amount, 0)
      return {
        id: c.code,
        country: c.name,
        code: c.code,
        activeStudents: students.filter((s) => s.status === 'active').length,
        totalLeads: leads.length,
        revenue: formatCurrency(revenue, c.currency),
      }
    })
  }, [])

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Students', value: stats.activeStudents, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Churned', value: stats.churnedStudents, icon: Users, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Attendance Rate', value: `${stats.attendanceRate}%`, icon: PieChart, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Overdue Invoices', value: stats.overdueInvoices, icon: DollarSign, color: 'text-red-600', bg: 'bg-red-50' },
  ]

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-0.5">Enrolment, churn, and revenue insights</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg} mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Country breakdown */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">By Country</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Country</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Code</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Active Students</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Total Leads</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {countryBreakdown.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.country}</td>
                    <td className="px-4 py-3 text-gray-500">{row.code}</td>
                    <td className="px-4 py-3 text-gray-700">{row.activeStudents}</td>
                    <td className="px-4 py-3 text-gray-700">{row.totalLeads}</td>
                    <td className="px-4 py-3 text-gray-700">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
