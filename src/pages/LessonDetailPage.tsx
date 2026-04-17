import { Link, useLocation, useParams } from 'react-router-dom'
import { allLessons } from '../data/lessons'
import LessonContent from '../components/lesson/LessonContent'

export default function LessonDetailPage() {
  const { slug } = useParams()
  const { search } = useLocation()
  const lesson = allLessons.find((item) => item.slug === slug)

  if (!lesson) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-500">Không tìm thấy bài học</p>
        <Link to={`/lessons${search}`} className="mt-2 text-lg text-primary-500 hover:underline">
          ← Quay lại danh sách
        </Link>
      </div>
    )
  }

  const prevLessonSlug = allLessons.find((item) => item.id === lesson.prevLessonId)?.slug
  const nextLessonSlug = allLessons.find((item) => item.id === lesson.nextLessonId)?.slug

  return (
    <div className="space-y-8">
      <div>
        <Link to={`/lessons${search}`} className="text-base text-gray-500 hover:text-primary-500">
          ← Danh sách bài học
        </Link>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{lesson.titleVi}</h1>
        <p className="mt-2 text-lg text-gray-500 sm:text-xl">{lesson.title}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {lesson.objectives.map((objective, index) => (
            <span
              key={index}
              className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700"
            >
              {objective}
            </span>
          ))}
        </div>
      </div>

      <LessonContent lesson={lesson} />

      <div className="flex justify-between border-t border-gray-200 pt-5 text-lg">
        {prevLessonSlug ? (
          <Link to={`/lessons/${prevLessonSlug}${search}`} className="text-primary-500 hover:underline">
            ← Bài trước
          </Link>
        ) : (
          <div />
        )}
        {nextLessonSlug ? (
          <Link to={`/lessons/${nextLessonSlug}${search}`} className="text-primary-500 hover:underline">
            Bài tiếp theo →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
