import { Link } from 'react-router-dom'
import StreakCounter from '../components/progress/StreakCounter'
import StatsCard from '../components/progress/StatsCard'
import { useProgress } from '../hooks/useProgress'
import { getDueWords } from '../lib/spaced-repetition'

export default function HomePage() {
  const { progress } = useProgress()
  const dueWords = getDueWords(progress.wordProgress)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-gray-500">Tiếp tục hành trình học tiếng Anh của bạn</p>
      </div>

      <StreakCounter />

      <div className="grid grid-cols-3 gap-3">
        <StatsCard icon="Words" value={progress.totalWordsLearned} label="Từ đã học" />
        <StatsCard
          icon="Done"
          value={Object.values(progress.lessonProgress).filter((lesson) => lesson.completed).length}
          label="Bài hoàn thành"
        />
        <StatsCard icon="Streak" value={progress.streak.currentStreak} label="Ngày streak" />
      </div>

      {dueWords.length > 0 && (
        <Link
          to="/flashcards"
          className="block rounded-xl bg-primary-500 p-4 text-center text-white shadow-md transition-transform hover:scale-[1.02]"
        >
          <p className="text-lg font-semibold">Bạn có {dueWords.length} từ cần ôn tập</p>
          <p className="mt-1 text-primary-100">Nhấn để bắt đầu ôn tập</p>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/dictionary"
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-primary-300"
        >
          <span className="text-2xl">Chat</span>
          <p className="mt-1 font-medium text-gray-700">Tra từ</p>
        </Link>
        <Link
          to="/flashcards"
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-primary-300"
        >
          <span className="text-2xl">Cards</span>
          <p className="mt-1 font-medium text-gray-700">Flashcards</p>
        </Link>
        <Link
          to="/lessons"
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-primary-300"
        >
          <span className="text-2xl">Learn</span>
          <p className="mt-1 font-medium text-gray-700">Bài học</p>
        </Link>
        <Link
          to="/vocabulary"
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-primary-300"
        >
          <span className="text-2xl">Book</span>
          <p className="mt-1 font-medium text-gray-700">Từ vựng</p>
        </Link>
        <Link
          to="/progress"
          className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-primary-300"
        >
          <span className="text-2xl">Stats</span>
          <p className="mt-1 font-medium text-gray-700">Tiến độ</p>
        </Link>
      </div>
    </div>
  )
}
