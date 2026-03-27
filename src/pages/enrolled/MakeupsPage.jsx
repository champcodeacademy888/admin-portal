import { useState, useMemo } from 'react'
import { MAKEUPS } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TabFilter from '../../components/ui/TabFilter'
import { useCountry } from '../../context/CountryContext'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function MakeupsPage() {
  const [tab, setTab] = useState('all')
  const { selectedCountry } = useCountry()

  const filtered = useMemo(() => {
    let data = MAKEUPS
    if (selectedCountry) data = data.filter((m) => m.country === selectedCountry)
    if (tab !== 'all') data = data.filter((m) => m.status === tab)
    return data
  }, [tab, selectedCountry])

  const all = MAKEUPS.filter((m) => !selectedCountry || m.country === selectedCountry)
  const tabs = [
    { key: 'all', label: 'All', count: all.length },
    { key: 'scheduled', label: 'Scheduled', count: all.filter((m) => m.status === 'scheduled').length },
    { key: 'completed', label: 'Completed', count: all.filter((m) => m.status === 'completed').length },
    { key: 'pending', label: 'Pending', count: all.filter((m) => m.status === 'pending').length },
    { key: 'no_show', label: 'No Show', count: all.filter((m) => m.status === 'no_show').length },
  ]

  const columns = [
    { key: 'student_name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.student_name}</span> },
    { key: 'class_type', label: 'Class' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'reason', label: 'Reason' },
    { key: 'original_class_date', label: 'Original Date', render: (r) => formatDate(r.original_class_date) },
    { key: 'scheduled_at', label: 'Makeup Date', render: (r) => formatDate(r.scheduled_at) },
    { key: 'tutor_name', label: 'Tutor' },
    { key: 'country', label: 'Country' },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Makeups</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage makeup class requests and scheduling</p>
      </div>
      <div className="mb-4">
        <TabFilter tabs={tabs} active={tab} onChange={setTab} />
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  )
}
