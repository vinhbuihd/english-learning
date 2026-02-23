export interface SM2Data {
  wordId: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: string
  lastReviewDate: string | null
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5

export interface FlashcardSession {
  startedAt: string
  wordsReviewed: number
  wordsCorrect: number
  wordsFailed: number
}

export interface DailyLog {
  date: string
  wordsReviewed: number
  wordsLearned: number
  lessonsCompleted: string[]
  exercisesDone: number
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
}

export interface LessonProgress {
  lessonId: string
  started: boolean
  completedSections: string[]
  exerciseScores: Record<string, number>
  completed: boolean
  completedAt?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  condition: string
}

export interface UserSettings {
  speechRate: number
  speechVoiceURI?: string
  dailyGoalWords: number
  showIPA: boolean
}

export interface UserProgress {
  streak: StreakData
  dailyLogs: Record<string, DailyLog>
  lessonProgress: Record<string, LessonProgress>
  wordProgress: Record<string, SM2Data>
  achievements: Record<string, Achievement>
  settings: UserSettings
  totalWordsLearned: number
  createdAt: string
}
