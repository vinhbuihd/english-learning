export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'matching' | 'spelling'

export interface ExerciseOption {
  text: string
  isCorrect: boolean
}

export interface MatchPair {
  left: string
  right: string
}

export interface Exercise {
  id: string
  type: ExerciseType
  question: string
  options?: ExerciseOption[]
  correctAnswer?: string
  pairs?: MatchPair[]
  hint?: string
}

export interface LessonSection {
  id: string
  title: string
  titleEn?: string
  type: 'content' | 'vocabulary' | 'exercises'
  content?: string
  vocabularyIds?: string[]
  exercises?: Exercise[]
}

export interface Lesson {
  id: string
  slug: string
  title: string
  titleVi: string
  description: string
  phase: 1 | 2 | 3
  week: number
  order: number
  objectives: string[]
  sections: LessonSection[]
  estimatedMinutes: number
  nextLessonId?: string
  prevLessonId?: string
}
