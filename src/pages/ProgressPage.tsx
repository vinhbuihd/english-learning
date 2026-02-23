import { useProgress } from '../hooks/useProgress'
import StreakCounter from '../components/progress/StreakCounter'
import StatsCard from '../components/progress/StatsCard'
import WeeklyChart from '../components/progress/WeeklyChart'
import AchievementBadge from '../components/progress/AchievementBadge'

export default function ProgressPage() {
  const { progress } = useProgress()

  const achievements = Object.values(progress.achievements)
  const unlocked = achievements.filter((a) => a.unlockedAt)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Tiến độ học tập</h1>

      <StreakCounter />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard
          icon="📚"
          value={progress.totalWordsLearned}
          label="Từ đã học"
        />
        <StatsCard
          icon="🎓"
          value={
            Object.values(progress.lessonProgress).filter((l) => l.completed)
              .length
          }
          label="Bài hoàn thành"
        />
        <StatsCard
          icon="🔥"
          value={progress.streak.currentStreak}
          label="Streak hiện tại"
        />
        <StatsCard
          icon="🏆"
          value={progress.streak.longestStreak}
          label="Streak cao nhất"
        />
      </div>

      <WeeklyChart dailyLogs={progress.dailyLogs} />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Thành tích ({unlocked.length}/{achievements.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  )
}
