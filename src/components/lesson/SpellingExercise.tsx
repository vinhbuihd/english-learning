import { useState } from 'react'
import type { Exercise } from '../../data/lessons/types'

interface Props {
  exercise: Exercise
  onComplete: (score: number) => void
}

export default function SpellingExercise({ exercise, onComplete }: Props) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = answer.trim().toLowerCase() === exercise.correctAnswer?.toLowerCase()

  const handleSubmit = () => {
    if (!answer.trim()) return
    setSubmitted(true)
    onComplete(isCorrect ? 100 : 0)
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <p className="mb-3 font-medium text-gray-800">{exercise.question}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
          disabled={submitted}
          placeholder="Nhập từ..."
          className={`flex-1 rounded-lg border px-3 py-2 font-mono text-sm tracking-wider ${
            submitted
              ? isCorrect
                ? 'border-green-400 bg-green-50'
                : 'border-red-400 bg-red-50'
              : 'border-gray-300'
          }`}
        />
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Kiểm tra
          </button>
        )}
      </div>
      {submitted && (
        <p className={`mt-2 text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect
            ? '✓ Chính xác!'
            : `✗ Đáp án đúng: ${exercise.correctAnswer}`}
        </p>
      )}
    </div>
  )
}
