const STORAGE_KEY = 'english-learning-progress'
const LEARNING_WORDS_STORAGE_KEY = 'english-learning-learning-words'
const BOOK_WORD_CACHE_STORAGE_KEY = 'english-learning-book-word-cache'

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn('Failed to save to localStorage')
  }
}

export { STORAGE_KEY, LEARNING_WORDS_STORAGE_KEY, BOOK_WORD_CACHE_STORAGE_KEY }
