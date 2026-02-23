import { Link } from 'react-router-dom'
import { allLessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgress'

export default function LessonsPage() {
  const { progress } = useProgress()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Bài học</h1>

      <div className="space-y-3">
        {allLessons.map((lesson) => {
          const lp = progress.lessonProgress[lesson.id]
          const isCompleted = lp?.completed
          const isStarted = lp?.started

          return (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      Tuần {lesson.week}
                    </span>
                    {isCompleted && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Hoàn thành ✓
                      </span>
                    )}
                    {isStarted && !isCompleted && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                        Đang học
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-semibold text-gray-900">
                    {lesson.titleVi}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {lesson.title}
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  ~{lesson.estimatedMinutes} phút
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
