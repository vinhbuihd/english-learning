import { createContext } from 'react'
import type { LessonProgress, SM2Data, SyncStatus, UserProgress, UserSettings } from '../types'

export interface ProgressContextValue {
  progress: UserProgress
  syncStatus: SyncStatus
  lastSyncedAt: string | null
  isAuthenticated: boolean
  isSyncConfigured: boolean
  userEmail: string | null
  recordActivity: () => void
  updateWordProgress: (wordId: string, sm2Data: SM2Data) => void
  updateLessonProgress: (lessonId: string, update: Partial<LessonProgress>) => void
  updateSettings: (update: Partial<UserSettings>) => void
  resetAll: () => Promise<void>
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  syncNow: () => Promise<void>
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)
