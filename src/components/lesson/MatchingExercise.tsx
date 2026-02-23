import { useState, useMemo } from 'react'
import type { Exercise } from '../../data/lessons/types'
import { shuffleArray } from '../../lib/utils'

interface Props {
  exercise: Exercise
  onComplete: (score: number) => void
}

export default function MatchingExercise({ exercise, onComplete }: Props) {
  const pairs = exercise.pairs ?? []
  const shuffledRight = useMemo(() => shuffleArray(pairs.map((p) => p.right)), [pairs])

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [matches, setMatches] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleLeftClick = (index: number) => {
    if (submitted) return
    setSelectedLeft(index)
  }

  const handleRightClick = (index: number) => {
    if (submitted || selectedLeft === null) return
    setMatches((prev) => ({ ...prev, [selectedLeft]: index }))
    setSelectedLeft(null)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    let correct = 0
    for (const [leftIdx, rightIdx] of Object.entries(matches)) {
      if (pairs[Number(leftIdx)]?.right === shuffledRight[rightIdx]) {
        correct++
      }
    }
    onComplete(Math.round((correct / pairs.length) * 100))
  }

  const getMatchStatus = (leftIdx: number, rightIdx: number) => {
    if (!submitted) return null
    if (matches[leftIdx] === undefined) return null
    const isCorrect = pairs[leftIdx]?.right === shuffledRight[matches[leftIdx]]
    if (matches[leftIdx] === rightIdx) return isCorrect ? 'correct' : 'incorrect'
    return null
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <p className="mb-3 font-medium text-gray-800">{exercise.question}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => handleLeftClick(i)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                selectedLeft === i
                  ? 'border-primary-400 bg-primary-50'
                  : matches[i] !== undefined
                    ? submitted
                      ? pairs[i]?.right === shuffledRight[matches[i]]
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-400 bg-red-50'
                      : 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-primary-300'
              }`}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((right, i) => {
            const isMatched = Object.values(matches).includes(i)
            return (
              <button
                key={i}
                onClick={() => handleRightClick(i)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  isMatched
                    ? submitted
                      ? Object.entries(matches).some(
                          ([l, r]) => r === i && getMatchStatus(Number(l), i) === 'correct',
                        )
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-400 bg-red-50'
                      : 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
              >
                {right}
              </button>
            )
          })}
        </div>
      </div>
      {!submitted && Object.keys(matches).length === pairs.length && (
        <button
          onClick={handleSubmit}
          className="mt-3 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white"
        >
          Kiểm tra
        </button>
      )}
    </div>
  )
}
