export type VocabCategoryId = 'html' | 'css' | 'javascript' | 'react' | 'git' | 'greetings' | 'common'

export interface VocabWord {
  id: string
  word: string
  pronunciation: string
  meaning: string
  example: string
  category: VocabCategoryId
}

export interface VocabCategory {
  id: VocabCategoryId
  name: string
  nameVi: string
  icon: string
  words: VocabWord[]
}
