import { useState } from 'react'
import { allCategories, getAllWords } from '../data/vocabulary'
import type { VocabCategoryId } from '../data/vocabulary/types'
import VocabCard from '../components/vocabulary/VocabCard'

export default function VocabularyPage() {
  const [activeCategory, setActiveCategory] = useState<VocabCategoryId | 'all'>('all')

  const allWords = getAllWords()
  const words =
    activeCategory === 'all'
      ? allWords
      : allCategories.find((category) => category.id === activeCategory)?.words ?? []

  const activeLabel =
    activeCategory === 'all'
      ? 'Tất cả chủ đề'
      : allCategories.find((category) => category.id === activeCategory)?.name ?? 'Từ vựng'

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#f3f8ff_0%,#e8f1ff_45%,#f8fbff_100%)] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary-700">Vocabulary hub</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Từ vựng được sắp gọn theo chủ đề</h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Chọn một nhóm từ để học tập trung hơn, hoặc xem toàn bộ để ôn lại nhanh những gì bạn đã gặp.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_18px_40px_rgba(37,99,235,0.08)]">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Đang xem</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{activeLabel}</p>
            <p className="text-sm text-slate-500">{words.length} từ</p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(37,99,235,0.05)]">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700'
            }`}
          >
            Tất cả ({allWords.length})
          </button>
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {category.icon} {category.name} ({category.words.length})
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {words.map((word) => (
          <VocabCard key={word.id} word={word} />
        ))}
      </section>
    </div>
  )
}
