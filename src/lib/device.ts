const DEVICE_ID_STORAGE_KEY = 'english-learning-device-id'

function generateDeviceId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `device-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`
}

export function getOrCreateDeviceId(): string {
  const existing = localStorage.getItem(DEVICE_ID_STORAGE_KEY)
  if (existing) return existing

  const next = generateDeviceId()
  localStorage.setItem(DEVICE_ID_STORAGE_KEY, next)
  return next
}
