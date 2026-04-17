import type { Lesson } from '../../data/lessons/types'
import { getWordById } from '../../data/vocabulary'
import { useProgress } from '../../hooks/useProgress'
import SpeakButton from '../vocabulary/SpeakButton'
import BookLessonContent from './BookLessonContent'
import FillBlankExercise from './FillBlankExercise'
import MatchingExercise from './MatchingExercise'
import QuizExercise from './QuizExercise'
import SpellingExercise from './SpellingExercise'

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
    <div className="space-y-10">
      {lesson.sections.map((section) => (
        <div key={section.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{section.title}</h2>
          {section.titleEn ? (
            <p className="mt-1 text-base text-gray-400 sm:text-lg">{section.titleEn}</p>
          ) : null}

          {section.type === 'content' && section.content ? (
            <div
              className="prose prose-lg mt-5 max-w-none text-gray-700 sm:prose-xl"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
            />
          ) : null}

          {section.type === 'vocabulary' && section.vocabularyIds ? (
            <div className="mt-5 space-y-3">
              {section.vocabularyIds.map((id) => {
                const word = getWordById(id)
                if (!word) return null

                return (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                  >
                    <div className="flex-1">
                      <span className="text-lg font-semibold text-gray-900 sm:text-xl">{word.word}</span>
                      <span className="ml-2 text-base text-primary-500 sm:text-lg">{word.pronunciation}</span>
                      <span className="ml-2 text-base text-gray-500 sm:text-lg">- {word.meaning}</span>
                    </div>
                    <SpeakButton text={word.word} />
                  </div>
                )
              })}
            </div>
          ) : null}

          {section.type === 'exercises' && section.exercises ? (
            <div className="mt-5 space-y-6">
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
          ) : null}
        </div>
      ))}
    </div>
  )
}

function renderMarkdown(md: string): string {
  return `<p class="text-lg leading-8">${md
    .replace(/^### (.+)$/gm, '<h3 class="mt-5 mb-3 text-xl font-semibold text-gray-800">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-6 mb-3 text-2xl font-bold text-gray-900">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-3 text-lg leading-8">')
    .replace(/\n\|(.+)\|/g, (_, row) => {
      const cells = row.split('|').map((c: string) => c.trim())
      return `<tr>${cells.map((c: string) => `<td class="border border-gray-200 px-3 py-2 text-base">${c}</td>`).join('')}</tr>`
    })
    .replace(
      /(<tr>.*<\/tr>)/s,
      '<div class="overflow-x-auto"><table class="mt-2 w-full border-collapse border border-gray-200">$1</table></div>',
    )}</p>`
}
