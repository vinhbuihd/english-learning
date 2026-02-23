import type { Achievement } from '../../types'

interface Props {
  achievement: Achievement
}

export default function AchievementBadge({ achievement }: Props) {
  const isUnlocked = !!achievement.unlockedAt

  return (
    <div
      className={`rounded-xl border p-3 text-center transition-all ${
        isUnlocked
          ? 'border-yellow-300 bg-yellow-50 shadow-sm'
          : 'border-gray-200 bg-gray-50 opacity-50 grayscale'
      }`}
    >
      <span className="text-2xl">{achievement.icon}</span>
      <p className="mt-1 text-sm font-semibold text-gray-900">{achievement.title}</p>
      <p className="text-xs text-gray-500">{achievement.description}</p>
    </div>
  )
}
