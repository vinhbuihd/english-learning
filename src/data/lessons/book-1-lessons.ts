import type { Lesson } from './types'
import { book1UnitWordLists } from './book-1-content'

const BOOK_1_SERIES_TITLE = '4000 Essential English Words - Book 1'

function buildBookLesson(unitNumber: number, words: string[]): Lesson {
  const id = `book-1-unit-${String(unitNumber).padStart(2, '0')}`

  return {
    id,
    slug: `book-1-unit-${unitNumber}`,
    title: `Unit ${unitNumber}`,
    titleVi: `Book 1 - Unit ${unitNumber}`,
    description: `Hoc 20 tu muc tieu cua Unit ${unitNumber} va luyen bai tap theo format cua 4000 Essential English Words.`,
    seriesId: 'book-1',
    seriesTitle: BOOK_1_SERIES_TITLE,
    phase: 1,
    week: Math.ceil(unitNumber / 5),
    order: unitNumber,
    objectives: [
      'Nho nghia va cach dung cua 20 tu muc tieu trong unit',
      'Luyen dang bai tap tu vung giong tai lieu goc',
      'On tap qua reading challenge va cau hoi doc hieu ngan',
    ],
    sections: [],
    estimatedMinutes: 35,
    bookUnitWords: words,
    prevLessonId: unitNumber > 1 ? `book-1-unit-${String(unitNumber - 1).padStart(2, '0')}` : undefined,
    nextLessonId: unitNumber < book1UnitWordLists.length ? `book-1-unit-${String(unitNumber + 1).padStart(2, '0')}` : undefined,
  }
}

export const book1Lessons: Lesson[] = book1UnitWordLists.map((words, index) => buildBookLesson(index + 1, words))
