import type { VocabWord } from '../../data/vocabulary/types'
import SpeakButton from './SpeakButton'

interface Props {
  word: VocabWord
}

export default function VocabCard({ word }: Props) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(37,99,235,0.05)] transition-transform hover:-translate-y-1 hover:border-primary-300">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Vocabulary</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{word.word}</h3>
          <p className="mt-1 text-sm font-medium text-primary-700">{word.pronunciation}</p>
        </div>
        <SpeakButton text={word.word} />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-500">Nghĩa</p>
        <p className="mt-1 text-base font-medium text-slate-800">{word.meaning}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-slate-500">Ví dụ</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">"{word.example}"</p>
      </div>
    </article>
  )
}
