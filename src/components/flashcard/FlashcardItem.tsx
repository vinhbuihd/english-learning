import type { VocabWord } from '../../data/vocabulary/types'
import SpeakButton from '../vocabulary/SpeakButton'

interface Props {
  word: VocabWord
  isFlipped: boolean
  onFlip: () => void
}

export default function FlashcardItem({ word, isFlipped, onFlip }: Props) {
  return (
    <div
      onClick={!isFlipped ? onFlip : undefined}
      className={`relative min-h-[280px] cursor-pointer rounded-2xl border-2 p-6 shadow-lg transition-all duration-300 ${
        isFlipped
          ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-white'
          : 'border-gray-200 bg-white hover:border-primary-200 hover:shadow-xl'
      }`}
      style={{ perspective: '1000px' }}
    >
      {!isFlipped ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-4xl font-bold text-gray-900">{word.word}</p>
          <p className="mt-4 text-sm text-gray-400">Nhấn để xem đáp án</p>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-gray-900">{word.word}</p>
            <SpeakButton text={word.word} />
          </div>
          <p className="text-lg text-primary-500">{word.pronunciation}</p>
          <p className="text-xl font-medium text-gray-700">{word.meaning}</p>
          <p className="mt-2 text-sm italic text-gray-400">"{word.example}"</p>
        </div>
      )}
    </div>
  )
}
