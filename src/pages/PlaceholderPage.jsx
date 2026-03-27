import { Construction } from 'lucide-react'

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3">
          <Construction className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-400">
          This page will be built in a later phase.
        </p>
      </div>
    </div>
  )
}
