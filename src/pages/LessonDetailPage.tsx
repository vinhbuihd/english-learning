import { useParams, Link } from 'react-router-dom'
import { allLessons } from '../data/lessons'
import LessonContent from '../components/lesson/LessonContent'

export default function LessonDetailPage() {
  const { slug } = useParams()
  const lesson = allLessons.find((l) => l.slug === slug)

  if (!lesson) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">Không tìm thấy bài học</p>
        <Link to="/lessons" className="mt-2 text-primary-500 hover:underline">
          ← Quay lại danh sách
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/lessons"
          className="text-sm text-gray-500 hover:text-primary-500"
        >
          ← Danh sách bài học
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {lesson.titleVi}
        </h1>
        <p className="text-gray-500">{lesson.title}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {lesson.objectives.map((obj, i) => (
            <span
              key={i}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-700"
            >
              {obj}
            </span>
          ))}
        </div>
      </div>

      <LessonContent lesson={lesson} />

      <div className="flex justify-between border-t border-gray-200 pt-4">
        {lesson.prevLessonId ? (
          <Link
            to={`/lessons/${allLessons.find((l) => l.id === lesson.prevLessonId)?.slug}`}
            className="text-primary-500 hover:underline"
          >
            ← Bài trước
          </Link>
        ) : (
          <div />
        )}
        {lesson.nextLessonId ? (
          <Link
            to={`/lessons/${allLessons.find((l) => l.id === lesson.nextLessonId)?.slug}`}
            className="text-primary-500 hover:underline"
          >
            Bài tiếp theo →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
