import type { Achievement, UserProgress } from '../types'

export const ACHIEVEMENTS_LIST: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first-word', title: 'Từ đầu tiên!', description: 'Học từ vựng đầu tiên', icon: '🎉', condition: 'Learn 1 word' },
  { id: 'words-10', title: '10 từ vựng', description: 'Học được 10 từ vựng', icon: '📚', condition: 'Learn 10 words' },
  { id: 'words-25', title: '25 từ vựng', description: 'Học được 25 từ vựng', icon: '📖', condition: 'Learn 25 words' },
  { id: 'words-50', title: '50 từ vựng', description: 'Học được 50 từ vựng', icon: '🏆', condition: 'Learn 50 words' },
  { id: 'streak-3', title: '3 ngày liên tiếp', description: 'Học 3 ngày không nghỉ', icon: '🔥', condition: '3-day streak' },
  { id: 'streak-7', title: 'Một tuần kiên trì', description: 'Học 7 ngày liên tiếp', icon: '💪', condition: '7-day streak' },
  { id: 'streak-30', title: 'Một tháng tuyệt vời', description: 'Học 30 ngày liên tiếp', icon: '🌟', condition: '30-day streak' },
  { id: 'lesson-first', title: 'Bài học đầu tiên', description: 'Hoàn thành 1 bài học', icon: '🎓', condition: 'Complete 1 lesson' },
]

export function checkAchievements(progress: UserProgress): Record<string, Achievement> {
  const updated = { ...progress.achievements }
  const now = new Date().toISOString()

  for (const a of ACHIEVEMENTS_LIST) {
    if (updated[a.id]?.unlockedAt) continue

    let unlocked = false

    switch (a.id) {
      case 'first-word':
        unlocked = progress.totalWordsLearned >= 1
        break
      case 'words-10':
        unlocked = progress.totalWordsLearned >= 10
        break
      case 'words-25':
        unlocked = progress.totalWordsLearned >= 25
        break
      case 'words-50':
        unlocked = progress.totalWordsLearned >= 50
        break
      case 'streak-3':
        unlocked = progress.streak.currentStreak >= 3
        break
      case 'streak-7':
        unlocked = progress.streak.currentStreak >= 7
        break
      case 'streak-30':
        unlocked = progress.streak.currentStreak >= 30
        break
      case 'lesson-first':
        unlocked = Object.values(progress.lessonProgress).some((l) => l.completed)
        break
    }

    if (unlocked) {
      updated[a.id] = { ...a, unlockedAt: now }
    } else if (!updated[a.id]) {
      updated[a.id] = { ...a }
    }
  }

  return updated
}
