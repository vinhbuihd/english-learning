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

export interface LookupResult {
  term: string
  ipa: string
  audioUrl?: string
  definitionsEn: string[]
  definitionsVi: string[]
  examples: string[]
  relatedWords: string[]
  wordFamily: string[]
  searchedAt: string
  source: string
}

export type LearningWord = LookupResult

export interface BookWordDetail {
  term: string
  ipa: string
  audioUrl?: string
  partOfSpeech: string
  definition: string
  definitionVi: string
  example: string
  source: string
}

export interface LookupMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  result?: LookupResult
  status?: 'success' | 'loading' | 'error' | 'not-found'
  createdAt: string
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
