import { useState, useMemo } from 'react'
import { STUDENTS } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TabFilter from '../../components/ui/TabFilter'
import { useCountry } from '../../context/CountryContext'
import { Search } from 'lucide-react'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function StudentsPage() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const { selectedCountry } = useCountry()

  const filtered = useMemo(() => {
    let data = STUDENTS
    if (selectedCountry) data = data.filter((s) => s.country === selectedCountry)
    if (tab !== 'all') data = data.filter((s) => s.status === tab)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter((s) => s.name.toLowerCase().includes(q) || s.contact_number.includes(q))
    }
    return data
  }, [tab, search, selectedCountry])

  const all = STUDENTS.filter((s) => !selectedCountry || s.country === selectedCountry)
  const tabs = [
    { key: 'all', label: 'All', count: all.length },
    { key: 'active', label: 'Active', count: all.filter((s) => s.status === 'active').length },
    { key: 'churned', label: 'Churned', count: all.filter((s) => s.status === 'churned').length },
    { key: 'return', label: 'Return', count: all.filter((s) => s.status === 'return').length },
  ]

  const columns = [
    { key: 'name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.name}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'country', label: 'Country' },
    { key: 'class_type', label: 'Class' },
    { key: 'child_age', label: 'Age' },
    { key: 'child_level', label: 'Level', render: (r) => <span className="capitalize">{r.child_level}</span> },
    { key: 'assigned_to_name', label: 'Teacher' },
    {
      key: 'lessons_remaining', label: 'Lessons Left',
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${r.lessons_remaining <= 3 ? 'bg-red-500' : r.lessons_remaining <= 6 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, (r.lessons_remaining / r.lessons_total) * 100)}%` }}
            />
          </div>
          <span className={`text-xs font-medium ${r.lessons_remaining <= 3 ? 'text-red-600' : 'text-gray-600'}`}>
            {r.lessons_remaining}/{r.lessons_total}
          </span>
        </div>
      ),
    },
    { key: 'package_expiry', label: 'Expiry', render: (r) => formatDate(r.package_expiry) },
    { key: 'churn_reason', label: 'Churn Reason', render: (r) => r.churn_reason ? <span className="capitalize text-red-500 text-xs">{r.churn_reason}</span> : '—' },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Students</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage enrolled students</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
          />
        </div>
      </div>
      <div className="mb-4">
        <TabFilter tabs={tabs} active={tab} onChange={setTab} />
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  )
}
