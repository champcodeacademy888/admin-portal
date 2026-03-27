import { useMemo } from 'react'
import { CLASSES, SCHEDULES } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'

function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function MyClassesPage() {
  // Show upcoming schedule + recent classes
  const upcomingSchedules = useMemo(() => SCHEDULES.slice(0, 10), [])
  const recentClasses = useMemo(() => CLASSES.slice(0, 15), [])

  const scheduleColumns = [
    { key: 'student_name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.student_name}</span> },
    { key: 'day_of_week', label: 'Day', render: (r) => <span className="capitalize">{r.day_of_week}</span> },
    { key: 'time', label: 'Time' },
    { key: 'class_type', label: 'Class' },
    { key: 'frequency', label: 'Frequency', render: (r) => <span className="capitalize">{r.frequency}</span> },
    { key: 'country', label: 'Country' },
  ]

  const classColumns = [
    { key: 'student_name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.student_name}</span> },
    { key: 'scheduled_at', label: 'Date', render: (r) => formatDateTime(r.scheduled_at) },
    { key: 'type', label: 'Type', render: (r) => <StatusBadge status={r.type} /> },
    { key: 'outcome', label: 'Outcome', render: (r) => <StatusBadge status={r.outcome} /> },
    { key: 'notes', label: 'Notes', render: (r) => r.notes || '—' },
  ]

  return (
    <div className="max-w-full space-y-8">
      <div>
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-gray-900">My Classes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your upcoming sessions and recent history</p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Upcoming Schedule</h2>
        <DataTable columns={scheduleColumns} data={upcomingSchedules} />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Recent Classes</h2>
        <DataTable columns={classColumns} data={recentClasses} />
      </div>
    </div>
  )
}
