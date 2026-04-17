import { Link } from 'react-router-dom'
import { allLessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgress'

const seriesMeta = {
  core: {
    title: 'Core Communication',
    description: '10 bai hoc giao tiep va cong viec trong moi truong tech.',
  },
  'book-1': {
    title: '4000 Essential English Words - Book 1',
    description: '30 unit tu vung voi bai tap theo format cua tai lieu goc.',
  },
} as const

export default function LessonsPage() {
  const { progress } = useProgress()

  const groupedLessons = allLessons.reduce<Record<string, typeof allLessons>>((groups, lesson) => {
    const key = lesson.seriesId ?? 'core'
    groups[key] = [...(groups[key] ?? []), lesson]
    return groups
  }, {})

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Bai hoc</h1>

      {Object.entries(groupedLessons).map(([seriesId, lessons]) => (
        <section key={seriesId} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {seriesMeta[seriesId as keyof typeof seriesMeta]?.title ?? seriesId}
            </h2>
            <p className="text-sm text-gray-500">
              {seriesMeta[seriesId as keyof typeof seriesMeta]?.description ?? ''}
            </p>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson) => {
              const lp = progress.lessonProgress[lesson.id]
              const isCompleted = lp?.completed
              const isStarted = lp?.started
              const prefix = lesson.seriesId === 'book-1' ? `Unit ${lesson.order}` : `Week ${lesson.week}`

              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.slug}`}
                  className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{prefix}</span>
                        {isCompleted && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Hoan thanh
                          </span>
                        )}
                        {isStarted && !isCompleted && (
                          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                            Dang hoc
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-semibold text-gray-900">{lesson.titleVi}</h3>
                      <p className="mt-0.5 text-sm text-gray-500">{lesson.title}</p>
                    </div>
                    <span className="text-sm text-gray-400">~{lesson.estimatedMinutes} phut</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
