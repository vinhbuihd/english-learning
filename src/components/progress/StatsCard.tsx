interface Props {
  icon: string
  value: number
  label: string
}

export default function StatsCard({ icon, value, label }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center shadow-sm">
      <span className="text-xl">{icon}</span>
      <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
