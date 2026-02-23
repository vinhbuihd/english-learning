import type { SM2Data, ReviewQuality } from '../types'

export function createSM2Data(wordId: string): SM2Data {
  return {
    wordId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReviewDate: todayStr(),
    lastReviewDate: null,
  }
}

export function processReview(data: SM2Data, quality: ReviewQuality): SM2Data {
  const today = todayStr()

  let newEF = data.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  newEF = Math.max(1.3, newEF)

  let newInterval: number
  let newReps: number

  if (quality < 3) {
    newReps = 0
    newInterval = 1
  } else {
    newReps = data.repetitions + 1
    if (newReps === 1) {
      newInterval = 1
    } else if (newReps === 2) {
      newInterval = 6
    } else {
      newInterval = Math.round(data.interval * newEF)
    }
  }

  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + newInterval)

  return {
    wordId: data.wordId,
    easeFactor: newEF,
    interval: newInterval,
    repetitions: newReps,
    nextReviewDate: nextDate.toISOString().split('T')[0],
    lastReviewDate: today,
  }
}

export function getDueWords(allSM2Data: Record<string, SM2Data>): SM2Data[] {
  const today = todayStr()
  return Object.values(allSM2Data)
    .filter((data) => data.nextReviewDate <= today)
    .sort((a, b) => {
      if (a.repetitions === 0 && b.repetitions > 0) return -1
      if (b.repetitions === 0 && a.repetitions > 0) return 1
      return a.easeFactor - b.easeFactor
    })
}

export function getNewWordsForToday(
  allSM2Data: Record<string, SM2Data>,
  allWordIds: string[],
  dailyGoalWords: number,
): string[] {
  const dueCount = getDueWords(allSM2Data).length
  const newWordsNeeded = Math.max(0, dailyGoalWords - dueCount)
  const unseenWords = allWordIds.filter((id) => !(id in allSM2Data))
  return unseenWords.slice(0, newWordsNeeded)
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}
