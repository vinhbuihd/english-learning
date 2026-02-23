import { useProgress } from '../../hooks/useProgress'

export default function StreakCounter() {
  const { progress } = useProgress()
  const { currentStreak, longestStreak } = progress.streak

  return (
    <div className="flex items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 p-4 text-white shadow-md">
      <span className="text-4xl">🔥</span>
      <div>
        <p className="text-2xl font-bold">{currentStreak} ngày</p>
        <p className="text-sm text-orange-100">
          {currentStreak > 0 ? 'Streak liên tiếp' : 'Bắt đầu streak hôm nay!'}
          {longestStreak > currentStreak && ` · Kỷ lục: ${longestStreak} ngày`}
        </p>
      </div>
    </div>
  )
}
