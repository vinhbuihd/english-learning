import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { checkAchievements } from '../lib/achievements'
import { createDefaultProgress, mergeProgress, normalizeProgress, touchProgress } from '../lib/progress'
import { fetchRemoteProgress, loadLocalProgress, saveLocalProgress, saveRemoteProgress } from '../lib/progress-repository'
import { updateStreak } from '../lib/streak'
import { useAuth } from '../hooks/useAuth'
import { ProgressContext, type ProgressContextValue } from './progress-context'
import type { LessonProgress, UserProgress, UserSettings, SM2Data, SyncStatus } from '../types'

const SYNC_DEBOUNCE_MS = 1200
const SYNC_RETRY_MS = 5000

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function mergeDailyLogEntry(progress: UserProgress, update: Partial<UserProgress['dailyLogs'][string]>) {
  const date = todayStr()
  const current = progress.dailyLogs[date] ?? {
    date,
    wordsReviewed: 0,
    wordsLearned: 0,
    lessonsCompleted: [],
    exercisesDone: 0,
  }

  return {
    ...progress.dailyLogs,
    [date]: {
      ...current,
      ...update,
      wordsReviewed: update.wordsReviewed ?? current.wordsReviewed,
      wordsLearned: update.wordsLearned ?? current.wordsLearned,
      exercisesDone: update.exercisesDone ?? current.exercisesDone,
      lessonsCompleted: update.lessonsCompleted ?? current.lessonsCompleted,
    },
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const [progress, setProgress] = useState<UserProgress>(() => loadLocalProgress())
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(
    auth.isConfigured ? 'signed_out' : 'unavailable',
  )
  const progressRef = useRef(progress)
  const debounceTimerRef = useRef<number | null>(null)
  const retryTimerRef = useRef<number | null>(null)
  const syncInFlightRef = useRef(false)
  const pendingSyncRef = useRef(false)
  const performSyncRef = useRef<() => Promise<void>>(async () => {})

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const performSync = useCallback(async () => {
    if (!auth.isConfigured || !auth.user) {
      setSyncStatus(auth.isConfigured ? 'signed_out' : 'unavailable')
      return
    }

    if (syncInFlightRef.current) {
      pendingSyncRef.current = true
      return
    }

    syncInFlightRef.current = true
    setSyncStatus('syncing')

    try {
      const syncedProgress = await saveRemoteProgress(auth.user.id, progressRef.current)
      const localProgress = saveLocalProgress(syncedProgress)
      progressRef.current = localProgress
      setProgress(localProgress)
      setSyncStatus('synced')
    } catch (error) {
      console.error('Failed to sync progress', error)
      setSyncStatus('error')

      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current)
      }
      retryTimerRef.current = window.setTimeout(() => {
        retryTimerRef.current = null
        void performSyncRef.current()
      }, SYNC_RETRY_MS)
    } finally {
      syncInFlightRef.current = false

      if (pendingSyncRef.current) {
        pendingSyncRef.current = false
        void performSyncRef.current()
      }
    }
  }, [auth.isConfigured, auth.user])

  useEffect(() => {
    performSyncRef.current = performSync
  }, [performSync])

  const clearTimers = useCallback(() => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    if (retryTimerRef.current) {
      window.clearTimeout(retryTimerRef.current)
      retryTimerRef.current = null
    }
  }, [])

  const commitProgress = useCallback(
    (next: UserProgress, scheduleSync = true) => {
      const normalized = saveLocalProgress(next, auth.user?.id)
      progressRef.current = normalized
      setProgress(normalized)

      if (scheduleSync && auth.isConfigured && auth.user) {
        setSyncStatus('syncing')
        if (debounceTimerRef.current) {
          window.clearTimeout(debounceTimerRef.current)
        }
        debounceTimerRef.current = window.setTimeout(() => {
          debounceTimerRef.current = null
          void performSync()
        }, SYNC_DEBOUNCE_MS)
      } else if (!auth.isConfigured) {
        setSyncStatus('unavailable')
      } else if (!auth.user) {
        setSyncStatus('signed_out')
      }
    },
    [auth.isConfigured, auth.user, performSync],
  )

  useEffect(() => {
    if (!auth.isConfigured) {
      return
    }

    if (!auth.user) {
      clearTimers()
      const guestProgress = loadLocalProgress()
      progressRef.current = guestProgress
      startTransition(() => {
        setProgress(guestProgress)
        setSyncStatus('signed_out')
      })
      return
    }

    let cancelled = false
    const userId = auth.user.id
    const localUserProgress = loadLocalProgress(userId)
    progressRef.current = localUserProgress
    startTransition(() => {
      setProgress(localUserProgress)
    })

    const bootstrapSync = async () => {
      setSyncStatus('syncing')

      try {
        const remoteProgress = await fetchRemoteProgress(userId)
        if (cancelled) return

        const merged = mergeProgress(localUserProgress, remoteProgress ?? localUserProgress)
        const synced = await saveRemoteProgress(userId, merged)
        if (cancelled) return

        const localProgress = saveLocalProgress(synced, userId)
        progressRef.current = localProgress
        setProgress(localProgress)
        setSyncStatus('synced')
      } catch (error) {
        console.error('Failed to bootstrap synced progress', error)
        if (!cancelled) {
          setSyncStatus('error')
        }
      }
    }

    void bootstrapSync()

    return () => {
      cancelled = true
    }
  }, [auth.isConfigured, auth.user, clearTimers])

  const effectiveSyncStatus = auth.isConfigured ? syncStatus : 'unavailable'

  useEffect(() => {
    const handleOnline = () => {
      if (auth.isConfigured && auth.user) {
        void performSync()
      }
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [auth.isConfigured, auth.user, performSync])

  useEffect(() => () => clearTimers(), [clearTimers])

  const applyUpdate = useCallback(
    (updater: (prev: UserProgress) => UserProgress, scheduleSync = true) => {
      const next = normalizeProgress(updater(progressRef.current), progressRef.current.deviceId)
      commitProgress(next, scheduleSync)
    },
    [commitProgress],
  )

  const recordActivity = useCallback(() => {
    applyUpdate((prev) => {
      const updatedAt = new Date().toISOString()
      const next = touchProgress(
        {
          ...prev,
          streak: updateStreak(prev.streak),
          dailyLogs: mergeDailyLogEntry(prev, {
            wordsReviewed: (prev.dailyLogs[todayStr()]?.wordsReviewed ?? 0) + 1,
          }),
        },
        updatedAt,
      )

      next.achievements = checkAchievements(next)
      return next
    })
  }, [applyUpdate])

  const updateWordProgress = useCallback(
    (wordId: string, sm2Data: SM2Data) => {
      applyUpdate((prev) => {
        const updatedAt = new Date().toISOString()
        const isNew = !(wordId in prev.wordProgress)
        const next = touchProgress(
          {
            ...prev,
            wordProgress: {
              ...prev.wordProgress,
              [wordId]: { ...sm2Data, updatedAt },
            },
            dailyLogs: mergeDailyLogEntry(prev, {
              wordsLearned: (prev.dailyLogs[todayStr()]?.wordsLearned ?? 0) + (isNew ? 1 : 0),
            }),
          },
          updatedAt,
        )

        next.achievements = checkAchievements(next)
        return next
      })
    },
    [applyUpdate],
  )

  const updateLessonProgress = useCallback(
    (lessonId: string, update: Partial<LessonProgress>) => {
      applyUpdate((prev) => {
        const updatedAt = new Date().toISOString()
        const existing = prev.lessonProgress[lessonId] || {
          lessonId,
          started: false,
          completedSections: [],
          exerciseScores: {},
          completed: false,
        }

        const mergedLesson: LessonProgress = {
          ...existing,
          ...update,
          updatedAt,
          started: true,
          completed: update.completed ?? existing.completed ?? false,
          completedSections: Array.from(
            new Set([...(existing.completedSections ?? []), ...(update.completedSections ?? [])]),
          ),
          exerciseScores: {
            ...existing.exerciseScores,
            ...(update.exerciseScores ?? {}),
          },
          completedAt:
            update.completed || existing.completed
              ? update.completedAt ?? existing.completedAt ?? updatedAt
              : undefined,
        }

        const currentDailyLog = prev.dailyLogs[todayStr()]
        const lessonCompletions =
          mergedLesson.completed && !currentDailyLog?.lessonsCompleted?.includes(lessonId)
            ? [...(currentDailyLog?.lessonsCompleted ?? []), lessonId]
            : currentDailyLog?.lessonsCompleted

        const next = touchProgress(
          {
            ...prev,
            lessonProgress: {
              ...prev.lessonProgress,
              [lessonId]: mergedLesson,
            },
            dailyLogs: mergeDailyLogEntry(prev, {
              exercisesDone: (currentDailyLog?.exercisesDone ?? 0) + (update.exerciseScores ? 1 : 0),
              lessonsCompleted: lessonCompletions,
            }),
          },
          updatedAt,
        )

        next.achievements = checkAchievements(next)
        return next
      })
    },
    [applyUpdate],
  )

  const updateSettings = useCallback(
    (update: Partial<UserSettings>) => {
      applyUpdate((prev) => {
        const updatedAt = new Date().toISOString()
        return touchProgress(
          {
            ...prev,
            settings: { ...prev.settings, ...update, updatedAt },
          },
          updatedAt,
        )
      })
    },
    [applyUpdate],
  )

  const resetAll = useCallback(async () => {
    const resetProgress = createDefaultProgress(progressRef.current.deviceId)
    commitProgress(resetProgress, auth.isConfigured && Boolean(auth.user))

    if (auth.isConfigured && auth.user) {
      await performSync()
    }
  }, [auth.isConfigured, auth.user, commitProgress, performSync])

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      syncStatus: effectiveSyncStatus,
      lastSyncedAt: progress.lastSyncedAt ?? null,
      isAuthenticated: Boolean(auth.user),
      isSyncConfigured: auth.isConfigured,
      userEmail: auth.user?.email ?? null,
      recordActivity,
      updateWordProgress,
      updateLessonProgress,
      updateSettings,
      resetAll,
      signIn: auth.signInWithGoogle,
      signOut: auth.signOut,
      syncNow: performSync,
    }),
    [
      auth.isConfigured,
      auth.signInWithGoogle,
      auth.signOut,
      auth.user,
      performSync,
      progress,
      recordActivity,
      resetAll,
      effectiveSyncStatus,
      updateLessonProgress,
      updateSettings,
      updateWordProgress,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
