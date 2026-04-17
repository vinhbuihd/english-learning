import { STORAGE_KEY, loadFromStorage, saveToStorage } from './storage'
import { getOrCreateDeviceId } from './device'
import { markProgressSynced, normalizeProgress } from './progress'
import { supabase } from './supabase'
import type { UserProgress } from '../types'

interface RemoteProgressRow {
  progress_json: UserProgress
}

function getProgressStorageKey(userId?: string | null): string {
  return userId ? `${STORAGE_KEY}:${userId}` : STORAGE_KEY
}

export function loadLocalProgress(userId?: string | null): UserProgress {
  return normalizeProgress(
    loadFromStorage<UserProgress | null>(getProgressStorageKey(userId), null),
    getOrCreateDeviceId(),
  )
}

export function saveLocalProgress(progress: UserProgress, userId?: string | null): UserProgress {
  const normalized = normalizeProgress(progress, progress.deviceId)
  saveToStorage(getProgressStorageKey(userId), normalized)
  return normalized
}

export async function fetchRemoteProgress(userId: string): Promise<UserProgress | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('user_progress')
    .select('progress_json')
    .eq('user_id', userId)
    .maybeSingle<RemoteProgressRow>()

  if (error) {
    throw error
  }

  if (!data?.progress_json) {
    return null
  }

  return normalizeProgress(data.progress_json)
}

export async function saveRemoteProgress(userId: string, progress: UserProgress): Promise<UserProgress> {
  if (!supabase) {
    return progress
  }

  const syncedProgress = markProgressSynced(progress)
  const { error } = await supabase.from('user_progress').upsert(
    {
      user_id: userId,
      progress_json: syncedProgress,
      updated_at: new Date().toISOString(),
      schema_version: syncedProgress.syncVersion,
    },
    { onConflict: 'user_id' },
  )

  if (error) {
    throw error
  }

  return syncedProgress
}
