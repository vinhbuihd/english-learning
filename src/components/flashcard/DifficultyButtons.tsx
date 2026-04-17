import type { ReviewQuality } from '../../types'

interface Props {
  onRate: (quality: ReviewQuality) => void
}

const buttons: { label: string; quality: ReviewQuality; color: string }[] = [
  { label: 'Quên rồi', quality: 0, color: 'bg-red-500 hover:bg-red-600' },
  { label: 'Khó', quality: 2, color: 'bg-orange-500 hover:bg-orange-600' },
  { label: 'Ổn', quality: 4, color: 'bg-green-500 hover:bg-green-600' },
  { label: 'Dễ', quality: 5, color: 'bg-blue-500 hover:bg-blue-600' },
]

export default function DifficultyButtons({ onRate }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((button) => (
        <button
          key={button.quality}
          onClick={() => onRate(button.quality)}
          className={`rounded-xl px-3 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 ${button.color}`}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
