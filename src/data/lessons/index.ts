import { lesson01 } from './lesson-01-alphabet'
import { lesson02 } from './lesson-02-greetings'
import { lesson03 } from './lesson-03-numbers'
import { lesson04 } from './lesson-04-sentences'
import { lesson05 } from './lesson-05-reading-docs'
import { lesson06 } from './lesson-06-writing-updates'
import { lesson07 } from './lesson-07-pr-and-issues'
import { lesson08 } from './lesson-08-meetings-and-questions'
import { lesson09 } from './lesson-09-code-review'
import { lesson10 } from './lesson-10-bugs-and-solutions'
import { book1Lessons } from './book-1-lessons'
import type { Lesson } from './types'

export const allLessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  ...book1Lessons,
]

export function getLessonBySlug(slug: string): Lesson | undefined {
  return allLessons.find((l) => l.slug === slug)
}

export type { Lesson, LessonSection, Exercise, ExerciseOption, ExerciseType, MatchPair } from './types'
