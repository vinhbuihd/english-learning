import { lesson01 } from './lesson-01-alphabet'
import type { Lesson } from './types'

export const allLessons: Lesson[] = [lesson01]

export function getLessonBySlug(slug: string): Lesson | undefined {
  return allLessons.find((l) => l.slug === slug)
}

export type { Lesson, LessonSection, Exercise, ExerciseOption, ExerciseType, MatchPair } from './types'
