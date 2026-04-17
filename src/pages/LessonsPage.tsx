import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { allLessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgress'

type ParentTabId = 'core' | 'book-series'
type BookTabId = 'book-1' | 'book-2' | 'book-3' | 'book-4' | 'book-5' | 'book-6'

const parentTabs = [
  {
    id: 'core' as const,
    title: 'Core Communication',
    description: '10 bài học giao tiếp và công việc trong môi trường tech.',
  },
  {
    id: 'book-series' as const,
    title: '4000 Essential English Words',
    description: 'Lộ trình 6 quyển, mỗi quyển gồm các unit từ vựng và bài tập.',
  },
]

const bookTabs: Array<{ id: BookTabId; title: string; description: string }> = [
  {
    id: 'book-1',
    title: 'Book 1',
    description: '30 unit từ vựng với bài tập theo format của tài liệu gốc.',
  },
  {
    id: 'book-2',
    title: 'Book 2',
    description: 'Nội dung đang được bổ sung.',
  },
  {
    id: 'book-3',
    title: 'Book 3',
    description: 'Nội dung đang được bổ sung.',
  },
  {
    id: 'book-4',
    title: 'Book 4',
    description: 'Nội dung đang được bổ sung.',
  },
  {
    id: 'book-5',
    title: 'Book 5',
    description: 'Nội dung đang được bổ sung.',
  },
  {
    id: 'book-6',
    title: 'Book 6',
    description: 'Nội dung đang được bổ sung.',
  },
]

function isParentTabId(value: string | null): value is ParentTabId {
  return value === 'core' || value === 'book-series'
}

function isBookTabId(value: string | null): value is BookTabId {
  return (
    value === 'book-1' ||
    value === 'book-2' ||
    value === 'book-3' ||
    value === 'book-4' ||
    value === 'book-5' ||
    value === 'book-6'
  )
}

export default function LessonsPage() {
  const { progress } = useProgress()
  const [searchParams, setSearchParams] = useSearchParams()

  const lessonsBySeries = useMemo(
    () =>
      allLessons.reduce<Record<string, typeof allLessons>>((groups, lesson) => {
        const key = lesson.seriesId ?? 'core'
        groups[key] = [...(groups[key] ?? []), lesson]
        return groups
      }, {}),
    [],
  )

  const parentParam = searchParams.get('parent')
  const bookParam = searchParams.get('book')
  const selectedParentTab: ParentTabId = isParentTabId(parentParam) ? parentParam : 'core'
  const selectedBookTab: BookTabId = isBookTabId(bookParam) ? bookParam : 'book-1'

  const activeParentMeta = parentTabs.find((tab) => tab.id === selectedParentTab) ?? parentTabs[0]
  const activeBookMeta = bookTabs.find((tab) => tab.id === selectedBookTab) ?? bookTabs[0]

  const activeLessons =
    selectedParentTab === 'core'
      ? lessonsBySeries.core ?? []
      : lessonsBySeries[selectedBookTab] ?? []

  const lessonsSearch = `?${new URLSearchParams(
    selectedParentTab === 'book-series'
      ? { parent: selectedParentTab, book: selectedBookTab }
      : { parent: selectedParentTab },
  ).toString()}`

  function updateParentTab(nextParentTab: ParentTabId) {
    setSearchParams(
      nextParentTab === 'book-series'
        ? { parent: nextParentTab, book: selectedBookTab }
        : { parent: nextParentTab },
    )
  }

  function updateBookTab(nextBookTab: BookTabId) {
    setSearchParams({ parent: 'book-series', book: nextBookTab })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Bài học</h1>

      <div className="space-y-4">
        <section className="space-y-2">
          <p className="text-base font-medium text-gray-500">Mục cha</p>
          <div className="flex flex-wrap gap-2">
            {parentTabs.map((tab) => {
              const isActive = tab.id === selectedParentTab
              const lessonCount =
                tab.id === 'core'
                  ? lessonsBySeries.core?.length ?? 0
                  : bookTabs.reduce((total, book) => total + (lessonsBySeries[book.id]?.length ?? 0), 0)

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => updateParentTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{tab.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {lessonCount}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {selectedParentTab === 'book-series' && (
          <section className="space-y-2">
            <p className="text-base font-medium text-gray-500">Chọn quyển</p>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {bookTabs.map((book) => {
                const isActive = book.id === selectedBookTab
                const lessonCount = lessonsBySeries[book.id]?.length ?? 0

                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => updateBookTab(book.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span>{book.title}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        isActive ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {lessonCount}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedParentTab === 'core'
                ? activeParentMeta.title
                : `${activeParentMeta.title} - ${activeBookMeta.title}`}
            </h2>
            <p className="text-sm text-gray-500">
              {selectedParentTab === 'core' ? activeParentMeta.description : activeBookMeta.description}
            </p>
          </div>

          {activeLessons.length > 0 ? (
            <div className="space-y-3">
              {activeLessons.map((lesson) => {
                const lessonProgress = progress.lessonProgress[lesson.id]
                const isCompleted = lessonProgress?.completed
                const isStarted = lessonProgress?.started
                const prefix = lesson.seriesId?.startsWith('book-')
                  ? `Unit ${lesson.order}`
                  : `Week ${lesson.week}`
                const previewWords = lesson.bookUnitWords ?? []

                return (
                  <Link
                    key={lesson.id}
                    to={`/lessons/${lesson.slug}${lessonsSearch}`}
                    className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">{prefix}</span>
                          {isCompleted && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              Hoàn thành
                            </span>
                          )}
                          {isStarted && !isCompleted && (
                            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                              Đang học
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-semibold text-gray-900">{lesson.titleVi}</h3>
                        <p className="mt-0.5 text-sm text-gray-500">{lesson.title}</p>
                        {previewWords.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {previewWords.map((word) => (
                              <span
                                key={word}
                                className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800"
                              >
                                {word}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">~{lesson.estimatedMinutes} phút</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-6 text-sm text-gray-500">
              Nội dung cho {activeBookMeta.title} đang được cập nhật. Tạm thời bạn có thể học{' '}
              {bookTabs[0].title} trước.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
