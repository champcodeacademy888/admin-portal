import { useState, useMemo } from 'react'
import { CLASSES } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TabFilter from '../../components/ui/TabFilter'
import { useCountry } from '../../context/CountryContext'

function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function AttendancePage() {
  const [tab, setTab] = useState('all')
  const { selectedCountry } = useCountry()

  const filtered = useMemo(() => {
    let data = CLASSES
    if (selectedCountry) data = data.filter((c) => c.country === selectedCountry)
    if (tab !== 'all') data = data.filter((c) => c.outcome === tab)
    return data
  }, [tab, selectedCountry])

  const all = CLASSES.filter((c) => !selectedCountry || c.country === selectedCountry)
  const tabs = [
    { key: 'all', label: 'All', count: all.length },
    { key: 'attended', label: 'Attended', count: all.filter((c) => c.outcome === 'attended').length },
    { key: 'absent', label: 'Absent', count: all.filter((c) => c.outcome === 'absent').length },
    { key: 'no_show', label: 'No Show', count: all.filter((c) => c.outcome === 'no_show').length },
  ]

  const columns = [
    { key: 'student_name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.student_name}</span> },
    { key: 'scheduled_at', label: 'Date', render: (r) => formatDateTime(r.scheduled_at) },
    { key: 'type', label: 'Type', render: (r) => <StatusBadge status={r.type} /> },
    { key: 'outcome', label: 'Outcome', render: (r) => <StatusBadge status={r.outcome} /> },
    { key: 'tutor_name', label: 'Tutor' },
    { key: 'country', label: 'Country' },
    { key: 'notes', label: 'Notes', render: (r) => r.notes || '—' },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Attendance</h1>
        <p className="text-sm text-gray-500 mt-0.5">Mark and review class attendance</p>
      </div>
      <div className="mb-4">
        <TabFilter tabs={tabs} active={tab} onChange={setTab} />
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  )
}
