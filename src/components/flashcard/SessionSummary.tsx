import { Link } from 'react-router-dom'
import type { FlashcardSession } from '../../types'

interface Props {
  session: FlashcardSession
  onRestart: () => void
}

export default function SessionSummary({ session, onRestart }: Props) {
  const percentage =
    session.wordsReviewed > 0
      ? Math.round((session.wordsCorrect / session.wordsReviewed) * 100)
      : 0

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <span className="text-6xl">{percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}</span>
      <h2 className="text-2xl font-bold text-gray-900">Phiên ôn tập hoàn thành!</h2>

      <div className="grid w-full max-w-sm grid-cols-3 gap-4">
        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-2xl font-bold text-blue-600">{session.wordsReviewed}</p>
          <p className="text-xs text-blue-500">Đã ôn</p>
        </div>
        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-2xl font-bold text-green-600">{session.wordsCorrect}</p>
          <p className="text-xs text-green-500">Đúng</p>
        </div>
        <div className="rounded-xl bg-orange-50 p-4">
          <p className="text-2xl font-bold text-orange-600">{percentage}%</p>
          <p className="text-xs text-orange-500">Chính xác</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="rounded-lg bg-primary-500 px-6 py-2 font-medium text-white hover:bg-primary-600"
        >
          Học tiếp
        </button>
        <Link
          to="/"
          className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-600 hover:bg-gray-50"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
