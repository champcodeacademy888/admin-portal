import { useState, useMemo } from 'react'
import { LEADS } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TabFilter from '../../components/ui/TabFilter'
import { useCountry } from '../../context/CountryContext'
import { Search } from 'lucide-react'

const STATUSES = ['all', 'inquiry', 'lead', 'trial_arranged', 'trial_attended', 'no_show', 'enrolled', 'lost', 'cold']

const STATUS_LABELS = {
  all: 'All',
  inquiry: 'Inquiry',
  lead: 'Lead',
  trial_arranged: 'Trial Arranged',
  trial_attended: 'Trial Attended',
  no_show: 'No Show',
  enrolled: 'Enrolled',
  lost: 'Lost',
  cold: 'Cold',
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const { selectedCountry } = useCountry()

  const filtered = useMemo(() => {
    let data = LEADS
    if (selectedCountry) data = data.filter((l) => l.country === selectedCountry)
    if (statusFilter !== 'all') data = data.filter((l) => l.status === statusFilter)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter((l) => l.name.toLowerCase().includes(q) || l.contact_number.includes(q))
    }
    return data
  }, [statusFilter, search, selectedCountry])

  const tabs = STATUSES.map((s) => {
    const count = s === 'all'
      ? LEADS.filter((l) => !selectedCountry || l.country === selectedCountry).length
      : LEADS.filter((l) => l.status === s && (!selectedCountry || l.country === selectedCountry)).length
    return { key: s, label: STATUS_LABELS[s], count }
  })

  const columns = [
    { key: 'name', label: 'Name', render: (r) => <span className="font-medium text-gray-900">{r.name}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'country', label: 'Country' },
    { key: 'channel', label: 'Channel', render: (r) => <span className="capitalize">{r.channel}</span> },
    { key: 'source', label: 'Source', render: (r) => <span className="capitalize">{r.source.replace(/_/g, ' ')}</span> },
    { key: 'child_age', label: 'Age' },
    { key: 'child_level', label: 'Level', render: (r) => <span className="capitalize">{r.child_level}</span> },
    { key: 'package_interest', label: 'Package' },
    { key: 'lost_reason', label: 'Lost Reason', render: (r) => r.lost_reason ? <span className="capitalize text-red-500">{r.lost_reason}</span> : '—' },
    { key: 'created_at', label: 'Created', render: (r) => formatDate(r.created_at) },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage leads pipeline — inquiry to enrolment</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="mb-4 overflow-x-auto">
        <TabFilter tabs={tabs} active={statusFilter} onChange={setStatusFilter} />
      </div>

      <DataTable columns={columns} data={filtered} emptyMessage="No leads match your filters." />
    </div>
  )
}
