import type { VocabWord } from '../../data/vocabulary/types'
import SpeakButton from './SpeakButton'

interface Props {
  word: VocabWord
}

export default function VocabCard({ word }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{word.word}</h3>
          <p className="text-sm text-primary-500">{word.pronunciation}</p>
        </div>
        <SpeakButton text={word.word} />
      </div>
      <p className="mt-2 text-gray-600">{word.meaning}</p>
      <p className="mt-1 text-sm italic text-gray-400">"{word.example}"</p>
    </div>
  )
}
