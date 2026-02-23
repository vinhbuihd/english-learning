import { useState, useMemo, useCallback } from 'react'
import { useProgress } from './useProgress'
import { getDueWords, getNewWordsForToday, createSM2Data, processReview } from '../lib/spaced-repetition'
import { getAllWords, getAllWordIds } from '../data/vocabulary'
import { shuffleArray } from '../lib/utils'
import type { VocabWord } from '../data/vocabulary/types'
import type { ReviewQuality, FlashcardSession } from '../types'

export function useFlashcards() {
  const { progress, updateWordProgress, recordActivity } = useProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [session, setSession] = useState<FlashcardSession | null>(null)
  const [sessionReviewed, setSessionReviewed] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)

  const queue = useMemo(() => {
    const dueData = getDueWords(progress.wordProgress)
    const newIds = getNewWordsForToday(
      progress.wordProgress,
      getAllWordIds(),
      progress.settings.dailyGoalWords,
    )

    const allWords = getAllWords()
    const wordMap = new Map(allWords.map((w) => [w.id, w]))

    const dueWords = dueData.map((d) => wordMap.get(d.wordId)).filter(Boolean) as VocabWord[]
    const newWords = newIds.map((id) => wordMap.get(id)).filter(Boolean) as VocabWord[]

    return shuffleArray([...dueWords, ...newWords])
  }, [progress.wordProgress, progress.settings.dailyGoalWords])

  const currentWord = queue[currentIndex] ?? null
  const isComplete = currentIndex >= queue.length && queue.length > 0

  const flip = useCallback(() => {
    setIsFlipped(true)
  }, [])

  const rateAndNext = useCallback(
    (quality: ReviewQuality) => {
      if (!currentWord) return

      const existing = progress.wordProgress[currentWord.id]
      const sm2 = existing ?? createSM2Data(currentWord.id)
      const updated = processReview(sm2, quality)

      updateWordProgress(currentWord.id, updated)
      recordActivity()

      const newReviewed = sessionReviewed + 1
      const newCorrect = quality >= 3 ? sessionCorrect + 1 : sessionCorrect
      setSessionReviewed(newReviewed)
      setSessionCorrect(newCorrect)

      if (currentIndex + 1 >= queue.length) {
        setSession({
          startedAt: new Date().toISOString(),
          wordsReviewed: newReviewed,
          wordsCorrect: newCorrect,
          wordsFailed: newReviewed - newCorrect,
        })
      }

      setCurrentIndex((i) => i + 1)
      setIsFlipped(false)
    },
    [currentWord, currentIndex, queue.length, progress.wordProgress, updateWordProgress, recordActivity, sessionReviewed, sessionCorrect],
  )

  const resetSession = useCallback(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setSession(null)
    setSessionReviewed(0)
    setSessionCorrect(0)
  }, [])

  return {
    currentWord,
    isFlipped,
    flip,
    rateAndNext,
    progress: { current: Math.min(currentIndex + 1, queue.length), total: queue.length },
    isComplete,
    session,
    resetSession,
  }
}
