import type { Lesson } from '../../data/lessons/types'
import { getWordById } from '../../data/vocabulary'
import SpeakButton from '../vocabulary/SpeakButton'
import QuizExercise from './QuizExercise'
import FillBlankExercise from './FillBlankExercise'
import MatchingExercise from './MatchingExercise'
import SpellingExercise from './SpellingExercise'
import { useProgress } from '../../hooks/useProgress'
import BookLessonContent from './BookLessonContent'

interface Props {
  lesson: Lesson
}

export default function LessonContent({ lesson }: Props) {
  const { updateLessonProgress } = useProgress()

  if (lesson.seriesId === 'book-1' && lesson.bookUnitWords?.length) {
    return <BookLessonContent lesson={lesson} />
  }

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    updateLessonProgress(lesson.id, {
      exerciseScores: { [exerciseId]: score },
    })
  }

  return (
    <div className="space-y-8">
      {lesson.sections.map((section) => (
        <div key={section.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
          {section.titleEn && (
            <p className="text-sm text-gray-400">{section.titleEn}</p>
          )}

          {section.type === 'content' && section.content && (
            <div
              className="prose prose-sm mt-4 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
            />
          )}

          {section.type === 'vocabulary' && section.vocabularyIds && (
            <div className="mt-4 space-y-2">
              {section.vocabularyIds.map((id) => {
                const word = getWordById(id)
                if (!word) return null
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2"
                  >
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900">{word.word}</span>
                      <span className="ml-2 text-sm text-primary-500">{word.pronunciation}</span>
                      <span className="ml-2 text-sm text-gray-500">— {word.meaning}</span>
                    </div>
                    <SpeakButton text={word.word} />
                  </div>
                )
              })}
            </div>
          )}

          {section.type === 'exercises' && section.exercises && (
            <div className="mt-4 space-y-6">
              {section.exercises.map((exercise) => {
                switch (exercise.type) {
                  case 'multiple-choice':
                    return (
                      <QuizExercise
                        key={exercise.id}
                        exercise={exercise}
                        onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      />
                    )
                  case 'fill-blank':
                    return (
                      <FillBlankExercise
                        key={exercise.id}
                        exercise={exercise}
                        onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      />
                    )
                  case 'matching':
                    return (
                      <MatchingExercise
                        key={exercise.id}
                        exercise={exercise}
                        onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      />
                    )
                  case 'spelling':
                    return (
                      <SpellingExercise
                        key={exercise.id}
                        exercise={exercise}
                        onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      />
                    )
                  default:
                    return null
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="mt-4 mb-2 font-semibold text-gray-800">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-4 mb-2 text-lg font-bold text-gray-900">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n\|(.+)\|/g, (_, row) => {
      const cells = row.split('|').map((c: string) => c.trim())
      return `<tr>${cells.map((c: string) => `<td class="border border-gray-200 px-2 py-1 text-sm">${c}</td>`).join('')}</tr>`
    })
    .replace(
      /(<tr>.*<\/tr>)/s,
      '<div class="overflow-x-auto"><table class="mt-2 w-full border-collapse border border-gray-200">$1</table></div>',
    )
}
