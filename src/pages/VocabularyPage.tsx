import { useState } from 'react'
import { allCategories, getAllWords } from '../data/vocabulary'
import type { VocabCategoryId } from '../data/vocabulary/types'
import VocabCard from '../components/vocabulary/VocabCard'

export default function VocabularyPage() {
  const [activeCategory, setActiveCategory] = useState<VocabCategoryId | 'all'>('all')

  const words =
    activeCategory === 'all'
      ? getAllWords()
      : allCategories.find((c) => c.id === activeCategory)?.words ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Từ vựng</h1>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Tất cả ({getAllWords().length})
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.icon} {cat.name} ({cat.words.length})
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {words.map((word) => (
          <VocabCard key={word.id} word={word} />
        ))}
      </div>
    </div>
  )
}
