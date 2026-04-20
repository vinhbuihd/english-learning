import { useEffect, useMemo, useState } from 'react'
import { BOOK_WORD_CACHE_STORAGE_KEY } from '../lib/storage'
import { lookupWordBasics } from '../lib/dictionary'
import type { BookWordDetail } from '../types'
import { useLocalStorage } from './useLocalStorage'

const WORD_LOOKUP_TIMEOUT_MS = 8000

function createFallbackWord(term: string): BookWordDetail {
  return {
    term,
    ipa: '',
    partOfSpeech: 'word',
    definition: 'Review this word with the dictionary tab if the live lookup is unavailable.',
    definitionVi: 'Hay tra lai tu nay trong tab tu dien neu du lieu truc tuyen chua tai duoc.',
    example: `Try writing your own sentence with "${term}".`,
    relatedWords: [],
    source: 'fallback',
  }
}

async function lookupWordWithTimeout(word: string): Promise<BookWordDetail> {
  return Promise.race([
    lookupWordBasics(word),
    new Promise<BookWordDetail>((_, reject) => {
      window.setTimeout(() => reject(new Error(`Lookup timed out for "${word}"`)), WORD_LOOKUP_TIMEOUT_MS)
    }),
  ])
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
        return !cachedWord.definition?.trim() || !Array.isArray(cachedWord.relatedWords)
      })

      if (wordsNeedingRefresh.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const loadedWords = await Promise.all(
          wordsNeedingRefresh.map(async (word) => {
            try {
              const detail = await lookupWordWithTimeout(word)
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
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
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
