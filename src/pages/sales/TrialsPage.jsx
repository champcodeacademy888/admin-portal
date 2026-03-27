import { useState, useMemo } from 'react'
import { TRIALS } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TabFilter from '../../components/ui/TabFilter'
import { useCountry } from '../../context/CountryContext'

function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function TrialsPage() {
  const [tab, setTab] = useState('all')
  const { selectedCountry } = useCountry()

  const filtered = useMemo(() => {
    let data = TRIALS
    if (selectedCountry) data = data.filter((t) => t.country === selectedCountry)
    if (tab === 'upcoming') data = data.filter((t) => !t.outcome || t.outcome === 'rescheduled')
    else if (tab === 'attended') data = data.filter((t) => t.outcome === 'attended')
    else if (tab === 'no_show') data = data.filter((t) => t.outcome === 'no_show')
    return data
  }, [tab, selectedCountry])

  const all = TRIALS.filter((t) => !selectedCountry || t.country === selectedCountry)
  const tabs = [
    { key: 'all', label: 'All', count: all.length },
    { key: 'upcoming', label: 'Upcoming', count: all.filter((t) => !t.outcome || t.outcome === 'rescheduled').length },
    { key: 'attended', label: 'Attended', count: all.filter((t) => t.outcome === 'attended').length },
    { key: 'no_show', label: 'No Show', count: all.filter((t) => t.outcome === 'no_show').length },
  ]

  const columns = [
    { key: 'lead_name', label: 'Lead', render: (r) => <span className="font-medium text-gray-900">{r.lead_name}</span> },
    { key: 'class_type', label: 'Class' },
    { key: 'scheduled_at', label: 'Scheduled', render: (r) => formatDateTime(r.scheduled_at) },
    { key: 'country', label: 'Country' },
    { key: 'channel', label: 'Channel', render: (r) => <span className="capitalize">{r.channel}</span> },
    { key: 'tutor_name', label: 'Tutor' },
    { key: 'outcome', label: 'Outcome', render: (r) => r.outcome ? <StatusBadge status={r.outcome} /> : <span className="text-gray-400 text-xs">Upcoming</span> },
    { key: 'tutor_notes', label: 'Notes', render: (r) => r.tutor_notes ? <span className="text-xs text-gray-500 max-w-[200px] truncate block">{r.tutor_notes}</span> : '—' },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Trials</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage trial classes and outcomes</p>
      </div>
      <div className="mb-4">
        <TabFilter tabs={tabs} active={tab} onChange={setTab} />
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  )
}
