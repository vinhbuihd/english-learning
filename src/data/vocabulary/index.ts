import { htmlTerms } from './html-terms'
import { cssTerms } from './css-terms'
import { javascriptTerms } from './javascript-terms'
import { reactTerms } from './react-terms'
import { gitTerms } from './git-terms'
import { greetingsTerms } from './greetings-terms'
import { commonTerms } from './common-terms'
import type { VocabCategory, VocabWord } from './types'

export const allCategories: VocabCategory[] = [
  { id: 'html', name: 'HTML', nameVi: 'Từ vựng HTML', icon: '🌐', words: htmlTerms },
  { id: 'css', name: 'CSS', nameVi: 'Từ vựng CSS', icon: '🎨', words: cssTerms },
  { id: 'javascript', name: 'JavaScript', nameVi: 'Từ vựng JavaScript', icon: '⚡', words: javascriptTerms },
  { id: 'react', name: 'React', nameVi: 'Từ vựng React', icon: '⚛️', words: reactTerms },
  { id: 'git', name: 'Git', nameVi: 'Từ vựng Git', icon: '📦', words: gitTerms },
  { id: 'greetings', name: 'Greetings', nameVi: 'Chào hỏi & Giao tiếp', icon: '👋', words: greetingsTerms },
  { id: 'common', name: 'Common', nameVi: 'Từ thông dụng', icon: '📝', words: commonTerms },
]

export function getAllWords(): VocabWord[] {
  return allCategories.flatMap((c) => c.words)
}

export function getWordById(id: string): VocabWord | undefined {
  return getAllWords().find((w) => w.id === id)
}

export function getAllWordIds(): string[] {
  return getAllWords().map((w) => w.id)
}

export type { VocabWord, VocabCategory, VocabCategoryId } from './types'
