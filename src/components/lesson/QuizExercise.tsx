import { useState } from 'react'
import type { Exercise } from '../../data/lessons/types'

interface Props {
  exercise: Exercise
  onComplete: (score: number) => void
}

export default function QuizExercise({ exercise, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (index: number) => {
    if (submitted) return
    setSelected(index)
  }

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    const isCorrect = exercise.options?.[selected]?.isCorrect ?? false
    onComplete(isCorrect ? 100 : 0)
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <p className="mb-3 font-medium text-gray-800">{exercise.question}</p>
      <div className="space-y-2">
        {exercise.options?.map((option, i) => {
          let style = 'border-gray-200 bg-white hover:border-primary-300'
          if (submitted && option.isCorrect) {
            style = 'border-green-400 bg-green-50 text-green-700'
          } else if (submitted && selected === i && !option.isCorrect) {
            style = 'border-red-400 bg-red-50 text-red-700'
          } else if (selected === i) {
            style = 'border-primary-400 bg-primary-50'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${style}`}
            >
              {option.text}
            </button>
          )
        })}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-3 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Kiểm tra
        </button>
      )}
      {submitted && (
        <p className={`mt-3 text-sm font-medium ${exercise.options?.[selected!]?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {exercise.options?.[selected!]?.isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng, hãy xem đáp án bên trên.'}
        </p>
      )}
    </div>
  )
}
