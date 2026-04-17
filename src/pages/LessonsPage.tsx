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
  { id: 'book-2', title: 'Book 2', description: 'Nội dung đang được bổ sung.' },
  { id: 'book-3', title: 'Book 3', description: 'Nội dung đang được bổ sung.' },
  { id: 'book-4', title: 'Book 4', description: 'Nội dung đang được bổ sung.' },
  { id: 'book-5', title: 'Book 5', description: 'Nội dung đang được bổ sung.' },
  { id: 'book-6', title: 'Book 6', description: 'Nội dung đang được bổ sung.' },
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

  const totalCoreLessons = lessonsBySeries.core?.length ?? 0
  const totalBookLessons = bookTabs.reduce((total, book) => total + (lessonsBySeries[book.id]?.length ?? 0), 0)

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
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#f3f8ff_0%,#e8f1ff_45%,#f8fbff_100%)] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary-700">Lesson roadmap</p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bài học rõ ràng, dễ chọn và dễ theo tiếp</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Bạn có thể học theo lộ trình giao tiếp thực tế hoặc đi theo chuỗi từ vựng sách. Mọi bài học đều hiển thị trạng thái rõ ràng để dễ quay lại đúng chỗ đang học.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[24px] border border-white/70 bg-white/75 px-4 py-4 shadow-[0_14px_30px_rgba(37,99,235,0.08)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Core lessons</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{totalCoreLessons}</p>
            </div>
            <div className="rounded-[24px] border border-white/70 bg-white/75 px-4 py-4 shadow-[0_14px_30px_rgba(37,99,235,0.08)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Book units</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{totalBookLessons}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(37,99,235,0.05)]">
        <div>
          <p className="text-sm font-semibold text-slate-600">Chọn lộ trình</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {parentTabs.map((tab) => {
              const isActive = tab.id === selectedParentTab
              const lessonCount = tab.id === 'core' ? totalCoreLessons : totalBookLessons

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => updateParentTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{tab.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/20' : 'bg-white text-slate-500'}`}>
                    {lessonCount}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {selectedParentTab === 'book-series' ? (
          <div>
            <p className="text-sm font-semibold text-slate-600">Chọn quyển</p>
            <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {bookTabs.map((book) => {
                const isActive = book.id === selectedBookTab
                const lessonCount = lessonsBySeries[book.id]?.length ?? 0

                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => updateBookTab(book.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ${
                      isActive
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span>{book.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white text-primary-700' : 'bg-white text-slate-500'}`}>
                      {lessonCount}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {selectedParentTab === 'core'
              ? activeParentMeta.title
              : `${activeParentMeta.title} - ${activeBookMeta.title}`}
          </h2>
          <p className="mt-1 text-slate-600">
            {selectedParentTab === 'core' ? activeParentMeta.description : activeBookMeta.description}
          </p>
        </div>

        {activeLessons.length > 0 ? (
          <div className="space-y-4">
            {activeLessons.map((lesson) => {
              const lessonProgress = progress.lessonProgress[lesson.id]
              const isCompleted = lessonProgress?.completed
              const isStarted = lessonProgress?.started
              const prefix = lesson.seriesId?.startsWith('book-') ? `Unit ${lesson.order}` : `Week ${lesson.week}`
              const previewWords = lesson.bookUnitWords ?? []

              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.slug}${lessonsSearch}`}
                  className="block rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(37,99,235,0.05)] hover:-translate-y-1 hover:border-primary-300"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                          {prefix}
                        </span>
                        {isCompleted ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Hoàn thành
                          </span>
                        ) : null}
                        {isStarted && !isCompleted ? (
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Đang học
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-4 text-xl font-bold text-slate-900">{lesson.titleVi}</h3>
                      <p className="mt-1 text-sm text-slate-500">{lesson.title}</p>

                      {previewWords.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {previewWords.map((word) => (
                            <span
                              key={word}
                              className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-left lg:min-w-[140px] lg:text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Thời lượng</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">~{lesson.estimatedMinutes} phút</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-5 py-7 text-sm text-slate-500">
            Nội dung cho {activeBookMeta.title} đang được cập nhật. Tạm thời bạn có thể học {bookTabs[0].title} trước.
          </div>
        )}
      </section>
    </div>
  )
}
