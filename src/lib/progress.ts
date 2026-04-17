import { ACHIEVEMENTS_LIST } from './achievements'
import { getOrCreateDeviceId } from './device'
import type {
  Achievement,
  DailyLog,
  LessonProgress,
  SM2Data,
  StreakData,
  UserProgress,
  UserSettings,
} from '../types'

export const PROGRESS_SCHEMA_VERSION = 1

function nowIso() {
  return new Date().toISOString()
}

function compareIsoDates(a?: string | null, b?: string | null): number {
  if (!a && !b) return 0
  if (!a) return -1
  if (!b) return 1
  return a.localeCompare(b)
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}

function normalizeStreak(streak?: StreakData | null): StreakData {
  return {
    currentStreak: streak?.currentStreak ?? 0,
    longestStreak: streak?.longestStreak ?? 0,
    lastActiveDate: streak?.lastActiveDate ?? null,
  }
}

function normalizeDailyLogs(dailyLogs?: Record<string, DailyLog> | null): Record<string, DailyLog> {
  return dailyLogs ?? {}
}

function normalizeWordProgress(
  wordProgress?: Record<string, SM2Data> | null,
  fallbackUpdatedAt?: string,
): Record<string, SM2Data> {
  const entries = Object.entries(wordProgress ?? {}).map(([wordId, value]) => [
    wordId,
    {
      ...value,
      wordId: value.wordId ?? wordId,
      updatedAt: value.updatedAt ?? value.lastReviewDate ?? fallbackUpdatedAt ?? nowIso(),
    },
  ])

  return Object.fromEntries(entries)
}

function normalizeLessonProgress(
  lessonProgress?: Record<string, LessonProgress> | null,
  fallbackUpdatedAt?: string,
): Record<string, LessonProgress> {
  const entries = Object.entries(lessonProgress ?? {}).map(([lessonId, value]) => [
    lessonId,
    {
      lessonId: value.lessonId ?? lessonId,
      started: value.started ?? false,
      completedSections: value.completedSections ?? [],
      exerciseScores: value.exerciseScores ?? {},
      completed: value.completed ?? false,
      completedAt: value.completedAt,
      updatedAt: value.updatedAt ?? value.completedAt ?? fallbackUpdatedAt ?? nowIso(),
    },
  ])

  return Object.fromEntries(entries)
}

function normalizeSettings(settings?: UserSettings | null, fallbackUpdatedAt?: string): UserSettings {
  return {
    speechRate: settings?.speechRate ?? 1,
    speechVoiceURI: settings?.speechVoiceURI,
    dailyGoalWords: settings?.dailyGoalWords ?? 5,
    showIPA: settings?.showIPA ?? true,
    updatedAt: settings?.updatedAt ?? fallbackUpdatedAt ?? nowIso(),
  }
}

function normalizeAchievements(
  achievements?: Record<string, Achievement> | null,
  fallbackUpdatedAt?: string,
): Record<string, Achievement> {
  const source = achievements ?? {}

  return Object.fromEntries(
    ACHIEVEMENTS_LIST.map((achievement) => {
      const existing = source[achievement.id]

      return [
        achievement.id,
        {
          ...achievement,
          ...existing,
          unlockedAt: existing?.unlockedAt,
          updatedAt:
            existing?.updatedAt ??
            existing?.unlockedAt ??
            fallbackUpdatedAt ??
            nowIso(),
        },
      ]
    }),
  )
}

export function createDefaultProgress(deviceId = getOrCreateDeviceId()): UserProgress {
  const createdAt = nowIso()

  return {
    streak: normalizeStreak(),
    dailyLogs: {},
    lessonProgress: {},
    wordProgress: {},
    achievements: normalizeAchievements({}, createdAt),
    settings: normalizeSettings(undefined, createdAt),
    totalWordsLearned: 0,
    createdAt,
    updatedAt: createdAt,
    lastSyncedAt: null,
    syncVersion: PROGRESS_SCHEMA_VERSION,
    deviceId,
  }
}

export function normalizeProgress(
  progress?: Partial<UserProgress> | null,
  deviceId = getOrCreateDeviceId(),
): UserProgress {
  if (!progress) {
    return createDefaultProgress(deviceId)
  }

  const createdAt = progress.createdAt ?? nowIso()
  const updatedAt = progress.updatedAt ?? createdAt
  const wordProgress = normalizeWordProgress(progress.wordProgress, updatedAt)

  return {
    streak: normalizeStreak(progress.streak),
    dailyLogs: normalizeDailyLogs(progress.dailyLogs),
    lessonProgress: normalizeLessonProgress(progress.lessonProgress, updatedAt),
    wordProgress,
    achievements: normalizeAchievements(progress.achievements, updatedAt),
    settings: normalizeSettings(progress.settings, updatedAt),
    totalWordsLearned: Object.keys(wordProgress).length,
    createdAt,
    updatedAt,
    lastSyncedAt: progress.lastSyncedAt ?? null,
    syncVersion: PROGRESS_SCHEMA_VERSION,
    deviceId: progress.deviceId ?? deviceId,
  }
}

function mergeDailyLog(local?: DailyLog, remote?: DailyLog): DailyLog {
  return {
    date: local?.date ?? remote?.date ?? '',
    wordsReviewed: Math.max(local?.wordsReviewed ?? 0, remote?.wordsReviewed ?? 0),
    wordsLearned: Math.max(local?.wordsLearned ?? 0, remote?.wordsLearned ?? 0),
    lessonsCompleted: unique([...(local?.lessonsCompleted ?? []), ...(remote?.lessonsCompleted ?? [])]),
    exercisesDone: Math.max(local?.exercisesDone ?? 0, remote?.exercisesDone ?? 0),
  }
}

function mergeLesson(local?: LessonProgress, remote?: LessonProgress): LessonProgress {
  if (!local) return remote as LessonProgress
  if (!remote) return local

  const exerciseScores = Object.fromEntries(
    unique([...Object.keys(local.exerciseScores), ...Object.keys(remote.exerciseScores)]).map((key) => [
      key,
      Math.max(local.exerciseScores[key] ?? 0, remote.exerciseScores[key] ?? 0),
    ]),
  )

  return {
    lessonId: local.lessonId || remote.lessonId,
    started: local.started || remote.started,
    completedSections: unique([...local.completedSections, ...remote.completedSections]),
    exerciseScores,
    completed: local.completed || remote.completed,
    completedAt:
      compareIsoDates(local.completedAt, remote.completedAt) >= 0
        ? local.completedAt ?? remote.completedAt
        : remote.completedAt ?? local.completedAt,
    updatedAt:
      compareIsoDates(local.updatedAt, remote.updatedAt) >= 0
        ? local.updatedAt
        : remote.updatedAt,
  }
}

function getWordPriority(item: SM2Data): string {
  return item.lastReviewDate ?? item.nextReviewDate ?? item.updatedAt ?? ''
}

function mergeWord(local?: SM2Data, remote?: SM2Data): SM2Data {
  if (!local) return remote as SM2Data
  if (!remote) return local

  return compareIsoDates(getWordPriority(local), getWordPriority(remote)) >= 0 ? local : remote
}

function mergeAchievement(local?: Achievement, remote?: Achievement): Achievement {
  if (!local) return remote as Achievement
  if (!remote) return local

  const unlockedAt =
    compareIsoDates(local.unlockedAt, remote.unlockedAt) >= 0
      ? local.unlockedAt ?? remote.unlockedAt
      : remote.unlockedAt ?? local.unlockedAt

  return {
    ...local,
    ...remote,
    unlockedAt,
    updatedAt:
      compareIsoDates(local.updatedAt, remote.updatedAt) >= 0
        ? local.updatedAt
        : remote.updatedAt,
  }
}

export function markProgressSynced(progress: UserProgress, syncedAt = nowIso()): UserProgress {
  return normalizeProgress(
    {
      ...progress,
      lastSyncedAt: syncedAt,
    },
    progress.deviceId,
  )
}

export function mergeProgress(
  localProgress?: Partial<UserProgress> | null,
  remoteProgress?: Partial<UserProgress> | null,
  deviceId = getOrCreateDeviceId(),
): UserProgress {
  const local = normalizeProgress(localProgress, deviceId)
  const remote = normalizeProgress(remoteProgress, deviceId)

  const dailyLogKeys = unique([...Object.keys(local.dailyLogs), ...Object.keys(remote.dailyLogs)])
  const lessonKeys = unique([...Object.keys(local.lessonProgress), ...Object.keys(remote.lessonProgress)])
  const wordKeys = unique([...Object.keys(local.wordProgress), ...Object.keys(remote.wordProgress)])
  const achievementKeys = unique([...Object.keys(local.achievements), ...Object.keys(remote.achievements)])

  const updatedAt = compareIsoDates(local.updatedAt, remote.updatedAt) >= 0 ? local.updatedAt : remote.updatedAt
  const settings =
    compareIsoDates(local.settings.updatedAt, remote.settings.updatedAt) >= 0
      ? local.settings
      : remote.settings
  const streak =
    compareIsoDates(local.streak.lastActiveDate, remote.streak.lastActiveDate) >= 0
      ? {
          currentStreak: local.streak.currentStreak,
          longestStreak: Math.max(local.streak.longestStreak, remote.streak.longestStreak),
          lastActiveDate: local.streak.lastActiveDate,
        }
      : {
          currentStreak: remote.streak.currentStreak,
          longestStreak: Math.max(local.streak.longestStreak, remote.streak.longestStreak),
          lastActiveDate: remote.streak.lastActiveDate,
        }

  return normalizeProgress(
    {
      streak,
      dailyLogs: Object.fromEntries(
        dailyLogKeys.map((key) => [key, mergeDailyLog(local.dailyLogs[key], remote.dailyLogs[key])]),
      ),
      lessonProgress: Object.fromEntries(
        lessonKeys.map((key) => [key, mergeLesson(local.lessonProgress[key], remote.lessonProgress[key])]),
      ),
      wordProgress: Object.fromEntries(
        wordKeys.map((key) => [key, mergeWord(local.wordProgress[key], remote.wordProgress[key])]),
      ),
      achievements: Object.fromEntries(
        achievementKeys.map((key) => [key, mergeAchievement(local.achievements[key], remote.achievements[key])]),
      ),
      settings,
      totalWordsLearned: 0,
      createdAt:
        compareIsoDates(local.createdAt, remote.createdAt) <= 0 ? local.createdAt : remote.createdAt,
      updatedAt,
      lastSyncedAt:
        compareIsoDates(local.lastSyncedAt, remote.lastSyncedAt) >= 0
          ? local.lastSyncedAt ?? remote.lastSyncedAt
          : remote.lastSyncedAt ?? local.lastSyncedAt,
      syncVersion: PROGRESS_SCHEMA_VERSION,
      deviceId,
    },
    deviceId,
  )
}

export function touchProgress(progress: UserProgress, updatedAt = nowIso()): UserProgress {
  return normalizeProgress(
    {
      ...progress,
      updatedAt,
      totalWordsLearned: Object.keys(progress.wordProgress).length,
      syncVersion: PROGRESS_SCHEMA_VERSION,
      deviceId: progress.deviceId || getOrCreateDeviceId(),
    },
    progress.deviceId,
  )
}
