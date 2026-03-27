import { useMemo } from 'react'
import { SCHEDULES } from '../../lib/dummyData'
import DataTable from '../../components/ui/DataTable'
import { useCountry } from '../../context/CountryContext'

export default function SchedulePage() {
  const { selectedCountry } = useCountry()

  const data = useMemo(() => {
    let list = SCHEDULES
    if (selectedCountry) list = list.filter((s) => s.country === selectedCountry)
    return list
  }, [selectedCountry])

  const columns = [
    { key: 'student_name', label: 'Student', render: (r) => <span className="font-medium text-gray-900">{r.student_name}</span> },
    { key: 'day_of_week', label: 'Day', render: (r) => <span className="capitalize">{r.day_of_week}</span> },
    { key: 'time', label: 'Time' },
    { key: 'frequency', label: 'Frequency', render: (r) => <span className="capitalize">{r.frequency}</span> },
    { key: 'class_type', label: 'Class' },
    { key: 'tutor_name', label: 'Tutor' },
    { key: 'country', label: 'Country' },
    { key: 'is_active', label: 'Active', render: (r) => (
      <span className={`inline-block w-2 h-2 rounded-full ${r.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
    )},
  ]

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Schedule</h1>
        <p className="text-sm text-gray-500 mt-0.5">Class schedules per student</p>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
