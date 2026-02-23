import type { DailyLog } from '../../types'

interface Props {
  dailyLogs: Record<string, DailyLog>
}

function getLast7Days(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export default function WeeklyChart({ dailyLogs }: Props) {
  const days = getLast7Days()

  const maxWords = Math.max(
    1,
    ...days.map((d) => (dailyLogs[d]?.wordsReviewed ?? 0) + (dailyLogs[d]?.wordsLearned ?? 0)),
  )

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Hoạt động 7 ngày qua</h3>
      <div className="flex items-end justify-between gap-2">
        {days.map((day) => {
          const log = dailyLogs[day]
          const total = (log?.wordsReviewed ?? 0) + (log?.wordsLearned ?? 0)
          const height = total > 0 ? Math.max(8, (total / maxWords) * 100) : 4
          const date = new Date(day)
          const dayName = dayNames[date.getDay()]
          const isToday = day === new Date().toISOString().split('T')[0]

          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-gray-400">{total > 0 ? total : ''}</span>
              <div
                className={`w-full rounded-t-md transition-all ${
                  isToday ? 'bg-primary-500' : total > 0 ? 'bg-primary-300' : 'bg-gray-100'
                }`}
                style={{ height: `${height}px` }}
              />
              <span className={`text-xs ${isToday ? 'font-bold text-primary-600' : 'text-gray-400'}`}>
                {dayName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
