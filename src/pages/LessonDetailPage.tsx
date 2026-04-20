import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import LessonContent from '../components/lesson/LessonContent'
import { allLessons } from '../data/lessons'
import type { Lesson } from '../data/lessons/types'
import { useProgress } from '../hooks/useProgress'

const BOOK_LESSON_EXERCISE_COUNT = 25

function getLessonExerciseCount(lesson: Lesson): number {
  if (lesson.seriesId === 'book-1') return BOOK_LESSON_EXERCISE_COUNT

  return lesson.sections.reduce((total, section) => total + (section.exercises?.length ?? 0), 0)
}

function formatDateTime(value?: string): string {
  if (!value) return 'Chưa hoàn thành'
  return new Date(value).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

interface LessonSummaryModalProps {
  averageScore: number
  completedAt?: string
  completedExercises: number
  isCompleted: boolean
  lesson: Lesson
  onClose: () => void
  onContinue: () => void
  totalExercises: number
}

function LessonSummaryModal({
  averageScore,
  completedAt,
  completedExercises,
  isCompleted,
  lesson,
  onClose,
  onContinue,
  totalExercises,
}: LessonSummaryModalProps) {
  const progressPercent = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lesson-summary-title"
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">Tổng kết bài học</p>
          <h2 id="lesson-summary-title" className="mt-2 text-2xl font-bold text-slate-900">
            {lesson.titleVi}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{lesson.title}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Tiến độ</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{progressPercent}%</p>
            <p className="mt-1 text-sm text-slate-500">
              {completedExercises}/{totalExercises} bài tập
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Điểm TB</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{averageScore}</p>
            <p className="mt-1 text-sm text-slate-500">trên thang 100</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700">Trạng thái</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {isCompleted ? 'Hoàn thành' : 'Đang học'}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">Hoàn thành lúc: {formatDateTime(completedAt)}</p>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Ở lại bài này
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Tiếp tục chuyển bài
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LessonDetailPage() {
  const { slug } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const [pendingPath, setPendingPath] = useState<string | null>(null)
  const lesson = allLessons.find((item) => item.slug === slug)

  const lessonProgress = lesson ? progress.lessonProgress[lesson.id] : undefined
  const totalExercises = lesson ? getLessonExerciseCount(lesson) : 0
  const exerciseScores = useMemo(() => Object.values(lessonProgress?.exerciseScores ?? {}), [lessonProgress])
  const completedExercises = exerciseScores.length
  const averageScore =
    completedExercises > 0
      ? Math.round(exerciseScores.reduce((total, score) => total + score, 0) / completedExercises)
      : 0

  if (!lesson) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-500">Không tìm thấy bài học</p>
        <Link to={`/lessons${search}`} className="mt-2 text-lg text-primary-500 hover:underline">
          Quay lại danh sách
        </Link>
      </div>
    )
  }

  const prevLessonSlug = allLessons.find((item) => item.id === lesson.prevLessonId)?.slug
  const nextLessonSlug = allLessons.find((item) => item.id === lesson.nextLessonId)?.slug

  function openSummaryBeforeNavigation(path: string) {
    setPendingPath(path)
  }

  function continueNavigation() {
    if (!pendingPath) return
    navigate(pendingPath)
    setPendingPath(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to={`/lessons${search}`} className="text-base text-gray-500 hover:text-primary-500">
          Danh sách bài học
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
          <button
            type="button"
            onClick={() => openSummaryBeforeNavigation(`/lessons/${prevLessonSlug}${search}`)}
            className="text-primary-500 hover:underline"
          >
            Bài trước
          </button>
        ) : (
          <div />
        )}
        {nextLessonSlug ? (
          <button
            type="button"
            onClick={() => openSummaryBeforeNavigation(`/lessons/${nextLessonSlug}${search}`)}
            className="text-primary-500 hover:underline"
          >
            Bài tiếp theo
          </button>
        ) : (
          <div />
        )}
      </div>

      {pendingPath ? (
        <LessonSummaryModal
          averageScore={averageScore}
          completedAt={lessonProgress?.completedAt}
          completedExercises={completedExercises}
          isCompleted={Boolean(lessonProgress?.completed)}
          lesson={lesson}
          onClose={() => setPendingPath(null)}
          onContinue={continueNavigation}
          totalExercises={totalExercises}
        />
      ) : null}
    </div>
  )
}
