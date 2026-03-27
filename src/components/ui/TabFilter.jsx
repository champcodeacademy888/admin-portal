export default function TabFilter({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
      {tabs.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            active === key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
          {count != null && (
            <span className={`ml-1.5 ${active === key ? 'text-indigo-600' : 'text-gray-400'}`}>
              {count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
