import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY } from '../lib/storage'
import { updateStreak } from '../lib/streak'
import { checkAchievements, ACHIEVEMENTS_LIST } from '../lib/achievements'
import type { UserProgress, UserSettings } from '../types'

const defaultProgress: UserProgress = {
  streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: null },
  dailyLogs: {},
  lessonProgress: {},
  wordProgress: {},
  achievements: Object.fromEntries(ACHIEVEMENTS_LIST.map((a) => [a.id, { ...a }])),
  settings: {
    speechRate: 1,
    dailyGoalWords: 5,
    showIPA: true,
  },
  totalWordsLearned: 0,
  createdAt: new Date().toISOString(),
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(STORAGE_KEY, defaultProgress)

  const recordActivity = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      streak: updateStreak(prev.streak),
      achievements: checkAchievements({ ...prev, streak: updateStreak(prev.streak) }),
    }))
  }, [setProgress])

  const updateWordProgress = useCallback(
    (wordId: string, sm2Data: import('../types').SM2Data) => {
      setProgress((prev) => {
        const isNew = !(wordId in prev.wordProgress)
        const newProgress = {
          ...prev,
          wordProgress: { ...prev.wordProgress, [wordId]: sm2Data },
          totalWordsLearned: isNew ? prev.totalWordsLearned + 1 : prev.totalWordsLearned,
          streak: updateStreak(prev.streak),
        }
        newProgress.achievements = checkAchievements(newProgress)
        return newProgress
      })
    },
    [setProgress],
  )

  const updateLessonProgress = useCallback(
    (lessonId: string, update: Partial<import('../types').LessonProgress>) => {
      setProgress((prev) => {
        const existing = prev.lessonProgress[lessonId] || {
          lessonId,
          started: false,
          completedSections: [],
          exerciseScores: {},
          completed: false,
        }
        const newProgress = {
          ...prev,
          lessonProgress: {
            ...prev.lessonProgress,
            [lessonId]: { ...existing, ...update, started: true },
          },
          streak: updateStreak(prev.streak),
        }
        newProgress.achievements = checkAchievements(newProgress)
        return newProgress
      })
    },
    [setProgress],
  )

  const updateSettings = useCallback(
    (update: Partial<UserSettings>) => {
      setProgress((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...update },
      }))
    },
    [setProgress],
  )

  const resetAll = useCallback(() => {
    setProgress(defaultProgress)
  }, [setProgress])

  return {
    progress,
    recordActivity,
    updateWordProgress,
    updateLessonProgress,
    updateSettings,
    resetAll,
  }
}
