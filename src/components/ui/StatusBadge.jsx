const STYLES = {
  // Lead statuses
  inquiry: 'bg-gray-100 text-gray-600',
  lead: 'bg-blue-50 text-blue-700',
  trial_arranged: 'bg-violet-50 text-violet-700',
  trial_attended: 'bg-emerald-50 text-emerald-700',
  no_show: 'bg-red-50 text-red-700',
  enrolled: 'bg-green-50 text-green-700',
  lost: 'bg-gray-100 text-gray-500',
  cold: 'bg-slate-100 text-slate-500',
  // Student statuses
  active: 'bg-green-50 text-green-700',
  churned: 'bg-red-50 text-red-600',
  return: 'bg-amber-50 text-amber-700',
  // Trial outcomes
  attended: 'bg-green-50 text-green-700',
  rescheduled: 'bg-amber-50 text-amber-700',
  // Makeup statuses
  scheduled: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  // Invoice statuses
  paid: 'bg-green-50 text-green-700',
  overdue: 'bg-red-50 text-red-700',
  // Class outcomes
  absent: 'bg-amber-50 text-amber-700',
  // Class types
  regular: 'bg-gray-100 text-gray-600',
  makeup: 'bg-violet-50 text-violet-700',
  trial: 'bg-blue-50 text-blue-700',
}

export default function StatusBadge({ status }) {
  const label = (status ?? '').replace(/_/g, ' ')
  const style = STYLES[status] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide rounded-md ${style}`}>
      {label}
    </span>
  )
}
