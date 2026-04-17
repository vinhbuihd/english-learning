interface Props {
  icon: string
  value: number
  label: string
}

export default function StatsCard({ icon, value, label }: Props) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 shadow-[0_10px_30px_rgba(37,99,235,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{icon}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  )
}
