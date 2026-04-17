import { useMemo } from 'react'
import type { Exercise, Lesson } from '../../data/lessons/types'
import { useBookUnitWords } from '../../hooks/useBookUnitWords'
import { useProgress } from '../../hooks/useProgress'
import { shuffleArray } from '../../lib/utils'
import type { BookWordDetail } from '../../types'
import SpeakButton from '../vocabulary/SpeakButton'
import QuizExercise from './QuizExercise'

interface Props {
  lesson: Lesson
}

interface ExerciseGroup {
  id: string
  title: string
  description?: string
  exercises: Exercise[]
}

function getDistractorWords(details: BookWordDetail[], excludeTerm: string): string[] {
  return details.filter((detail) => detail.term !== excludeTerm).map((detail) => detail.term)
}

function getDistractorDefinitions(details: BookWordDetail[], excludeTerm: string): string[] {
  return details.filter((detail) => detail.term !== excludeTerm).map((detail) => detail.definition)
}

function createCorrectSentence(detail: BookWordDetail): string {
  if (detail.example) return detail.example
  if (detail.partOfSpeech === 'verb') return `They ${detail.term} when the situation matches the definition.`
  if (detail.partOfSpeech === 'adjective') return `The situation feels ${detail.term} in this example.`
  if (detail.partOfSpeech === 'adverb') return `The team worked ${detail.term} to finish the task.`
  return `This sentence uses ${detail.term} in a natural context.`
}

function createIncorrectSentence(detail: BookWordDetail): string {
  if (detail.partOfSpeech === 'verb') return `The notebook ${detail.term} blue and square every morning.`
  if (detail.partOfSpeech === 'adjective') return `We can ${detail.term} the homework with a pencil.`
  if (detail.partOfSpeech === 'adverb') return `The ${detail.term} sat on the desk beside the lamp.`
  return `Every ${detail.term} can fly to school and cook the clouds.`
}

function buildChooseRightWordExercises(lessonId: string, details: BookWordDetail[]): Exercise[] {
  return details.slice(0, 5).map((detail, index) => {
    const options = shuffleArray([
      { text: detail.term, isCorrect: true },
      ...getDistractorWords(details, detail.term)
        .slice(0, 3)
        .map((word) => ({ text: word, isCorrect: false })),
    ]).map((option, optionIndex) => ({
      ...option,
      text: `${String.fromCharCode(97 + optionIndex)}. ${option.text}`,
    }))

    return {
      id: `${lessonId}-choose-word-${index + 1}`,
      type: 'multiple-choice',
      question: `${index + 1}. ${detail.definition}`,
      options,
    }
  })
}

function buildChooseRightDefinitionExercises(lessonId: string, details: BookWordDetail[]): Exercise[] {
  return details.slice(5, 10).map((detail, index) => ({
    id: `${lessonId}-choose-definition-${index + 1}`,
    type: 'multiple-choice',
    question: `${index + 1}. Choose the right definition for the given word: ${detail.term}`,
    options: shuffleArray([
      { text: detail.definition, isCorrect: true },
      ...getDistractorDefinitions(details, detail.term)
        .slice(0, 3)
        .map((definition) => ({ text: definition, isCorrect: false })),
    ]),
  }))
}

function buildSentenceSenseExercises(lessonId: string, details: BookWordDetail[]): Exercise[] {
  return details.slice(10, 20).map((detail, index) => ({
    id: `${lessonId}-sentence-sense-${index + 1}`,
    type: 'multiple-choice',
    question: `${index + 1}. Check the sentence with the bolded word that makes better sense.`,
    options: shuffleArray([
      { text: `a. ${createCorrectSentence(detail)}`, isCorrect: true },
      { text: `b. ${createIncorrectSentence(detail)}`, isCorrect: false },
    ]),
  }))
}

function buildReadingStory(details: BookWordDetail[]): { title: string; paragraphs: string[] } {
  const pick = (index: number, fallback: string) => details[index]?.term ?? fallback

  return {
    title: `The ${pick(0, 'Traveler')} and the ${pick(1, 'Guide')}`,
    paragraphs: [
      `A young traveler started an unexpected journey. At first, the traveler felt ${pick(0, 'afraid')}, but still decided to ${pick(1, 'continue')} because the goal was important.`,
      `Along the road, the traveler met a guide who gave a careful plan. Together, they tried to ${pick(2, 'follow')} each step and avoid mistakes when the weather suddenly changed.`,
      `In the middle of the trip, they found a clue that helped them ${pick(3, 'discover')} the safest path. The traveler used ${pick(4, 'wisdom')} and patience, and the two finally reached the right place.`,
      `At the end, they were pleased because the difficult journey had become a useful lesson. The guide smiled and said that practice, attention, and courage always lead to progress.`,
    ],
  }
}

function buildReadingExercises(lessonId: string, details: BookWordDetail[], storyTitle: string): Exercise[] {
  const keyWords = details.slice(0, 6).map((detail) => detail.term).join(', ')

  return [
    {
      id: `${lessonId}-reading-1`,
      type: 'multiple-choice',
      question: '1. What is this story mainly about?',
      options: [
        { text: 'How a traveler and a guide solved a problem during a journey', isCorrect: true },
        { text: 'How a scientist built a laboratory in the forest', isCorrect: false },
        { text: 'How a family prepared breakfast before school', isCorrect: false },
        { text: 'How a teacher graded a difficult exam', isCorrect: false },
      ],
    },
    {
      id: `${lessonId}-reading-2`,
      type: 'multiple-choice',
      question: `2. What happened near the beginning of "${storyTitle}"?`,
      options: [
        { text: 'The traveler began the journey even though it felt difficult', isCorrect: true },
        { text: 'The guide cancelled the trip and went home', isCorrect: false },
        { text: 'The team forgot all of the target words immediately', isCorrect: false },
        { text: 'A storm destroyed the entire village before the trip', isCorrect: false },
      ],
    },
    {
      id: `${lessonId}-reading-3`,
      type: 'multiple-choice',
      question: '3. Why did the clue matter in the story?',
      options: [
        { text: 'It helped the characters find a safer and better answer', isCorrect: true },
        { text: 'It made the trip longer and more confusing on purpose', isCorrect: false },
        { text: 'It showed that the guide wanted to stop helping', isCorrect: false },
        { text: 'It proved that the main character should turn back immediately', isCorrect: false },
      ],
    },
    {
      id: `${lessonId}-reading-4`,
      type: 'multiple-choice',
      question: '4. Which statement is true at the end of the story?',
      options: [
        { text: 'The characters finish the journey and learn from it', isCorrect: true },
        { text: 'The traveler refuses to continue and quits the task', isCorrect: false },
        { text: 'The guide loses the clue and forgets the plan', isCorrect: false },
        { text: 'The problem becomes worse because nobody pays attention', isCorrect: false },
      ],
    },
    {
      id: `${lessonId}-reading-5`,
      type: 'multiple-choice',
      question: '5. Which set of target words appears most directly in this reading?',
      options: [
        { text: keyWords, isCorrect: true },
        { text: 'camera, keyboard, printer, signal, browser, laptop', isCorrect: false },
        { text: 'doctor, dentist, pilot, chef, actor, singer', isCorrect: false },
        { text: 'breakfast, lunch, dinner, snack, dessert, soup', isCorrect: false },
      ],
    },
  ]
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
  const { updateLessonProgress } = useProgress()
  const unitWords = lesson.bookUnitWords ?? []
  const { details, loading } = useBookUnitWords(unitWords)

  const story = useMemo(() => buildReadingStory(details), [details])

  const exerciseGroups = useMemo<ExerciseGroup[]>(
    () => [
      {
        id: 'choose-right-word',
        title: 'Choose the right word for the given definition.',
        exercises: buildChooseRightWordExercises(lesson.id, details),
      },
      {
        id: 'choose-right-definition',
        title: 'Choose the right definition for the given word.',
        exercises: buildChooseRightDefinitionExercises(lesson.id, details),
      },
      {
        id: 'sentence-sense',
        title: 'Check the sentence with the bolded word that makes better sense.',
        exercises: buildSentenceSenseExercises(lesson.id, details),
      },
      {
        id: 'reading-questions',
        title: 'Answer the questions.',
        exercises: buildReadingExercises(lesson.id, details, story.title),
      },
    ],
    [details, lesson.id, story.title],
  )

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    updateLessonProgress(lesson.id, {
      exerciseScores: { [exerciseId]: score },
    })
  }

  return (
    <div className="space-y-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Unit Overview</h2>
        <p className="mt-3 text-base leading-8 text-gray-600 sm:text-lg">
          This lesson now follows the same exercise flow as the book: target words, definition
          checks, sentence sense checks, story reading, and answer questions.
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
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{story.title}</h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-gray-700 sm:text-lg">
          {story.paragraphs.map((paragraph, index) => (
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
