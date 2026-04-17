import { Link } from 'react-router-dom'
import { useFlashcards } from '../hooks/useFlashcards'
import FlashcardItem from '../components/flashcard/FlashcardItem'
import DifficultyButtons from '../components/flashcard/DifficultyButtons'
import SessionSummary from '../components/flashcard/SessionSummary'

export default function FlashcardsPage() {
  const {
    currentWord,
    isFlipped,
    flip,
    rateAndNext,
    progress,
    isComplete,
    session,
    resetSession,
  } = useFlashcards()

  if (isComplete && session) {
    return <SessionSummary session={session} onRestart={resetSession} />
  }

  if (!currentWord) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="text-5xl">🎉</span>
        <h2 className="text-xl font-bold text-gray-900">Không có từ nào cần ôn!</h2>
        <p className="text-gray-500">Hãy học thêm từ mới trong phần Từ vựng</p>
        <Link
          to="/vocabulary"
          className="rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
        >
          Xem từ vựng
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Flashcards</h1>
        <span className="text-sm text-gray-500">
          {progress.current}/{progress.total}
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary-500 transition-all"
          style={{ width: `${(progress.current / progress.total) * 100}%` }}
        />
      </div>

      <FlashcardItem word={currentWord} isFlipped={isFlipped} onFlip={flip} />

      {isFlipped ? (
        <DifficultyButtons onRate={rateAndNext} />
      ) : (
        <p className="text-center text-sm text-gray-400">Nhấn vào thẻ để xem đáp án</p>
      )}
    </div>
  )
}
