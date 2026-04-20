import { useMemo } from 'react'
import { buildBook1UnitContent } from '../../data/lessons/book-1-content'
import type { Exercise, Lesson } from '../../data/lessons/types'
import { useBookUnitWords } from '../../hooks/useBookUnitWords'
import { useProgress } from '../../hooks/useProgress'
import SpeakButton from '../vocabulary/SpeakButton'
import QuizExercise from './QuizExercise'

interface Props {
  lesson: Lesson
}

function ExerciseRenderer({
  exercise,
  onComplete,
}: {
  exercise: Exercise
  onComplete: (score: number) => void
}) {
  return <QuizExercise exercise={exercise} onComplete={onComplete} />
}

export default function BookLessonContent({ lesson }: Props) {
  const { progress, updateLessonProgress } = useProgress()
  const unitWords = lesson.bookUnitWords ?? []
  const { details, loading } = useBookUnitWords(unitWords)

  const content = useMemo(() => buildBook1UnitContent(lesson.order, details), [details, lesson.order])
  const exerciseGroups = content.exerciseGroups

  const exerciseIds = exerciseGroups.flatMap((group) => group.exercises.map((exercise) => exercise.id))

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    const exerciseScores = {
      ...(progress.lessonProgress[lesson.id]?.exerciseScores ?? {}),
      [exerciseId]: score,
    }

    updateLessonProgress(lesson.id, {
      exerciseScores: { [exerciseId]: score },
      completed: exerciseIds.length > 0 && exerciseIds.every((id) => id in exerciseScores),
    })
  }

  return (
    <div className="space-y-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Unit Overview</h2>
        <p className="mt-3 text-base leading-8 text-gray-600 sm:text-lg">
          {content.overview}
        </p>
        <div className="mt-5 rounded-lg bg-primary-50 p-4 text-base leading-7 text-primary-800 sm:text-lg">
          {loading
            ? 'Loading live vocabulary data for this unit...'
            : 'Vocabulary details are ready. You can review the words and do the exercises below.'}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Target Words</h2>
        <p className="mt-2 text-base text-gray-400 sm:text-lg">20 words from {lesson.title}</p>
        <div className="mt-5 space-y-3">
          {details.map((detail) => (
            <div
              key={detail.term}
              className="flex items-start justify-between gap-3 rounded-lg bg-gray-50 px-4 py-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900 sm:text-xl">{detail.term}</span>
                  {detail.ipa ? <span className="text-base text-primary-600 sm:text-lg">{detail.ipa}</span> : null}
                  <span className="rounded-full bg-white px-2.5 py-1 text-sm text-gray-500">
                    {detail.partOfSpeech}
                  </span>
                </div>
                <p className="mt-2 text-base leading-7 text-gray-700 sm:text-lg">{detail.definition}</p>
                {detail.definitionVi ? (
                  <p className="mt-2 text-base leading-7 text-emerald-700 sm:text-lg">{detail.definitionVi}</p>
                ) : null}
                {detail.example ? (
                  <p className="mt-2 text-base italic text-gray-500 sm:text-lg">"{detail.example}"</p>
                ) : null}
              </div>
              <SpeakButton text={detail.term} audioUrl={detail.audioUrl} />
            </div>
          ))}
        </div>
      </div>

      {exerciseGroups.slice(0, 3).map((group) => (
        <div key={group.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{group.title}</h2>
          <div className="mt-5 space-y-6">
            {group.exercises.map((exercise) => (
              <ExerciseRenderer
                key={exercise.id}
                exercise={exercise}
                onComplete={(score) => handleExerciseComplete(exercise.id, score)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{content.reading.title}</h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-gray-700 sm:text-lg">
          {content.reading.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{exerciseGroups[3].title}</h2>
        <div className="mt-5 space-y-6">
          {exerciseGroups[3].exercises.map((exercise) => (
            <ExerciseRenderer
              key={exercise.id}
              exercise={exercise}
              onComplete={(score) => handleExerciseComplete(exercise.id, score)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
