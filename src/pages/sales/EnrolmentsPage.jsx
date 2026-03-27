import { useMemo } from 'react'
import { RECENT_ENROLMENTS } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { useCountry } from '../../context/CountryContext'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function EnrolmentsPage() {
  const { selectedCountry } = useCountry()

  const data = useMemo(() => {
    let list = RECENT_ENROLMENTS
    if (selectedCountry) list = list.filter((e) => e.country === selectedCountry)
    return list
  }, [selectedCountry])

  const columns = [
    { key: 'name', label: 'Name', render: (r) => <span className="font-medium text-gray-900">{r.name}</span> },
    { key: 'status', label: 'Status', render: () => <StatusBadge status="enrolled" /> },
    { key: 'country', label: 'Country' },
    { key: 'channel', label: 'Channel', render: (r) => <span className="capitalize">{r.channel}</span> },
    { key: 'child_age', label: 'Age' },
    { key: 'child_level', label: 'Level', render: (r) => <span className="capitalize">{r.child_level}</span> },
    { key: 'package', label: 'Package' },
    { key: 'enrolled_at', label: 'Enrolled', render: (r) => formatDate(r.enrolled_at) },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Enrolments</h1>
        <p className="text-sm text-gray-500 mt-0.5">Recently converted leads</p>
      </div>
      <DataTable columns={columns} data={data} emptyMessage="No recent enrolments." />
    </div>
  )
}
