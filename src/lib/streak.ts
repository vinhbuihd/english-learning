import type { StreakData } from '../types'

export function updateStreak(streak: StreakData): StreakData {
  const today = todayStr()
  const yesterday = getYesterday()

  if (streak.lastActiveDate === today) {
    return streak
  }

  let newCurrent: number

  if (streak.lastActiveDate === yesterday) {
    newCurrent = streak.currentStreak + 1
  } else if (streak.lastActiveDate === null) {
    newCurrent = 1
  } else {
    newCurrent = 1
  }

  return {
    currentStreak: newCurrent,
    longestStreak: Math.max(streak.longestStreak, newCurrent),
    lastActiveDate: today,
  }
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}
