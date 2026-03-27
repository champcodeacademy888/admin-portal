import { useMemo } from 'react'
import { CLASSES, TUTORS } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { useCountry } from '../../context/CountryContext'

function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function CoverPage() {
  const { selectedCountry } = useCountry()

  // Simulate some classes needing cover (absent tutor scenarios)
  const coverRecords = useMemo(() => {
    const records = CLASSES.filter((_, i) => i % 7 === 0).map((c, i) => {
      const coverTutor = TUTORS[(i + 3) % TUTORS.length]
      const needsCover = i % 3 === 0
      return {
        ...c,
        cover_status: needsCover ? 'needs_cover' : 'covered',
        cover_tutor_name: needsCover ? null : coverTutor.full_name,
      }
    })
    if (selectedCountry) return records.filter((r) => r.country === selectedCountry)
    return records
  }, [selectedCountry])

  const columns = [
    { key: 'student_name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.student_name}</span> },
    { key: 'scheduled_at', label: 'Class Date', render: (r) => formatDateTime(r.scheduled_at) },
    { key: 'tutor_name', label: 'Original Tutor' },
    { key: 'cover_status', label: 'Status', render: (r) => (
      <StatusBadge status={r.cover_status === 'covered' ? 'completed' : 'pending'} />
    )},
    { key: 'cover_tutor_name', label: 'Cover Tutor', render: (r) => r.cover_tutor_name ?? <span className="text-amber-600 text-xs font-medium">Unassigned</span> },
    { key: 'country', label: 'Country' },
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Cover</h1>
        <p className="text-sm text-gray-500 mt-0.5">Arrange cover teachers for classes</p>
      </div>
      <DataTable columns={columns} data={coverRecords} />
    </div>
  )
}
