import { useEffect, useMemo, useState } from 'react'
import { BOOK_WORD_CACHE_STORAGE_KEY } from '../lib/storage'
import { lookupWordBasics } from '../lib/dictionary'
import type { BookWordDetail } from '../types'
import { useLocalStorage } from './useLocalStorage'

function createFallbackWord(term: string): BookWordDetail {
  return {
    term,
    ipa: '',
    partOfSpeech: 'word',
    definition: 'Review this word with the dictionary tab if the live lookup is unavailable.',
    definitionVi: 'Hãy tra lại từ này trong tab từ điển nếu dữ liệu trực tuyến chưa tải được.',
    example: `Try writing your own sentence with "${term}".`,
    source: 'fallback',
  }
}

export function useBookUnitWords(words: string[]) {
  const [cache, setCache] = useLocalStorage<Record<string, BookWordDetail>>(
    BOOK_WORD_CACHE_STORAGE_KEY,
    {},
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadMissingWords() {
      const wordsNeedingRefresh = words.filter((word) => {
        const cachedWord = cache[word.toLowerCase()]
        if (!cachedWord) return true
        return !cachedWord.definitionVi?.trim()
      })

      if (wordsNeedingRefresh.length === 0) return

      setLoading(true)

      const loadedWords = await Promise.all(
        wordsNeedingRefresh.map(async (word) => {
          try {
            const detail = await lookupWordBasics(word)
            return [word.toLowerCase(), detail] as const
          } catch {
            return [word.toLowerCase(), createFallbackWord(word)] as const
          }
        }),
      )

      if (cancelled) return

      setCache((prev) => {
        const next = { ...prev }
        loadedWords.forEach(([key, value]) => {
          next[key] = value
        })
        return next
      })

      setLoading(false)
    }

    void loadMissingWords()

    return () => {
      cancelled = true
    }
  }, [cache, setCache, words])

  const details = useMemo(
    () => words.map((word) => cache[word.toLowerCase()] ?? createFallbackWord(word)),
    [cache, words],
  )

  return {
    details,
    loading,
  }
}
