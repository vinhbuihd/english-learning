import { useCallback, useState } from 'react'
import { DictionaryNotFoundError, lookupWord, upsertLearningWord } from '../lib/dictionary'
import { LEARNING_WORDS_STORAGE_KEY } from '../lib/storage'
import type { LearningWord, LookupMessage } from '../types'
import { useLocalStorage } from './useLocalStorage'

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useDictionaryLookup() {
  const [messages, setMessages] = useState<LookupMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [learningWords, setLearningWords] = useLocalStorage<LearningWord[]>(
    LEARNING_WORDS_STORAGE_KEY,
    [],
  )

  const search = useCallback(
    async (term: string) => {
      const query = term.trim()

      if (!query || loading) return

      const createdAt = new Date().toISOString()
      const loadingMessageId = createId()

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'user',
          content: query,
          createdAt,
        },
        {
          id: loadingMessageId,
          role: 'assistant',
          content: `Đang tra từ "${query}"...`,
          status: 'loading',
          createdAt,
        },
      ])

      setLoading(true)

      try {
        const result = await lookupWord(query)

        setMessages((prev) =>
          prev.map((message) =>
            message.id === loadingMessageId
              ? {
                  ...message,
                  content: `Đã tìm thấy thông tin cho "${result.term}".`,
                  result,
                  status: 'success',
                }
              : message,
          ),
        )
        setLearningWords((prev) => upsertLearningWord(prev, result))
      } catch (error) {
        const notFound = error instanceof DictionaryNotFoundError

        setMessages((prev) =>
          prev.map((message) =>
            message.id === loadingMessageId
              ? {
                  ...message,
                  content: notFound
                    ? `Không tìm thấy từ "${query}". Hãy thử một từ khác.`
                    : 'Không thể tra từ lúc này. Vui lòng kiểm tra kết nối và thử lại.',
                  status: notFound ? 'not-found' : 'error',
                }
              : message,
          ),
        )
      } finally {
        setLoading(false)
      }
    },
    [loading, setLearningWords],
  )

  const removeLearningWord = useCallback(
    (term: string) => {
      const normalizedTerm = term.trim().toLowerCase()
      setLearningWords((prev) => prev.filter((word) => word.term.toLowerCase() !== normalizedTerm))
    },
    [setLearningWords],
  )

  return {
    messages,
    loading,
    learningWords,
    search,
    removeLearningWord,
  }
}
