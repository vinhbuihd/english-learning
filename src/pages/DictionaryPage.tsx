import { useState, type FormEvent } from 'react'
import SpeakButton from '../components/vocabulary/SpeakButton'
import { useDictionaryLookup } from '../hooks/useDictionaryLookup'
import type { LearningWord, LookupMessage, LookupResult } from '../types'

function ResultSections({ result }: { result: LookupResult }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{result.term}</h3>
          <p className="mt-1 text-sm text-primary-600">{result.ipa || 'IPA đang được cập nhật'}</p>
        </div>
        <SpeakButton text={result.term} audioUrl={result.audioUrl} className="shrink-0" />
      </div>

      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nghĩa tiếng Anh</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {result.definitionsEn.length > 0 ? (
            result.definitionsEn.map((definition) => <li key={definition}>- {definition}</li>)
          ) : (
            <li>Chưa có nghĩa tiếng Anh.</li>
          )}
        </ul>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nghĩa tiếng Việt</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {result.definitionsVi.length > 0 ? (
            result.definitionsVi.map((definition) => <li key={definition}>- {definition}</li>)
          ) : (
            <li>Chưa dịch được nghĩa tiếng Việt cho từ này.</li>
          )}
        </ul>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Ví dụ</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {result.examples.length > 0 ? (
            result.examples.map((example) => <li key={example}>- {example}</li>)
          ) : (
            <li>Chưa có ví dụ từ API.</li>
          )}
        </ul>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Từ liên quan</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.relatedWords.length > 0 ? (
              result.relatedWords.map((word) => (
                <span key={word} className="rounded-full bg-primary-50 px-2.5 py-1 text-xs text-primary-700">
                  {word}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">Chưa có từ liên quan.</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Từ cùng họ</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.wordFamily.length > 0 ? (
              result.wordFamily.map((word) => (
                <span key={word} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">
                  {word}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">Chưa có dữ liệu từ cùng họ.</span>
            )}
          </div>
        </div>
      </section>

      <p className="text-xs text-gray-400">Nguồn: {result.source}</p>
    </div>
  )
}

function AssistantBubble({ message }: { message: LookupMessage }) {
  const statusClassName =
    message.status === 'error'
      ? 'border-red-200 bg-red-50'
      : message.status === 'not-found'
        ? 'border-amber-200 bg-amber-50'
        : 'border-gray-200 bg-white'

  return (
    <div className={`max-w-3xl rounded-2xl border p-4 shadow-sm ${statusClassName}`}>
      <p className="text-sm leading-6 text-gray-700">{message.content}</p>
      {message.result ? (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <ResultSections result={message.result} />
        </div>
      ) : null}
    </div>
  )
}

function UserBubble({ message }: { message: LookupMessage }) {
  return (
    <div className="ml-auto max-w-xl rounded-2xl bg-primary-600 px-4 py-3 text-sm text-white shadow-sm">
      {message.content}
    </div>
  )
}

function LearningWordCard({
  word,
  onRemove,
}: {
  word: LearningWord
  onRemove: (term: string) => void
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{word.term}</h3>
          <p className="mt-1 text-sm text-primary-600">{word.ipa || 'IPA đang được cập nhật'}</p>
        </div>
        <div className="flex items-center gap-2">
          <SpeakButton text={word.term} audioUrl={word.audioUrl} />
          <button
            onClick={() => onRemove(word.term)}
            className="rounded-full border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            type="button"
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <p>{word.definitionsVi[0] ?? word.definitionsEn[0] ?? 'Chưa có nghĩa.'}</p>
        {word.examples[0] ? <p className="italic text-gray-500">"{word.examples[0]}"</p> : null}
      </div>
    </div>
  )
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const { messages, loading, learningWords, search, removeLearningWord } = useDictionaryLookup()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await search(query)
    setQuery('')
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-linear-to-br from-slate-900 via-slate-800 to-primary-800 p-5 text-white shadow-lg">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-200">Dictionary chat</p>
          <h1 className="mt-3 text-2xl font-bold">Tra từ theo kiểu hội thoại và tự động lưu vào từ đang học</h1>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            Nhập một từ tiếng Anh, app sẽ tìm IPA, audio, nghĩa, ví dụ và gợi ý các từ liên quan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 rounded-2xl bg-white/10 p-3 backdrop-blur">
          <label htmlFor="dictionary-query" className="sr-only">
            Nhập từ tiếng Anh
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="dictionary-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ví dụ: resilient, deploy, architecture..."
              className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-300 focus:ring-2 focus:ring-primary-200"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Đang tra...' : 'Tra từ'}
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Cuộc hội thoại</h2>
            <span className="text-sm text-gray-500">{messages.length} tin nhắn</span>
          </div>

          <div className="space-y-3 rounded-3xl border border-gray-200 bg-gray-50/70 p-4">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                Chưa có lần tra nào. Hãy nhập một từ để bắt đầu.
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  {message.role === 'user' ? (
                    <UserBubble message={message} />
                  ) : (
                    <AssistantBubble message={message} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Từ đang học</h2>
            <span className="text-sm text-gray-500">{learningWords.length} từ</span>
          </div>

          <div className="space-y-3">
            {learningWords.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-5 text-sm text-gray-500">
                Các từ tra thành công sẽ tự động được lưu ở đây.
              </div>
            ) : (
              learningWords.map((word) => (
                <LearningWordCard key={word.term.toLowerCase()} word={word} onRemove={removeLearningWord} />
              ))
            )}
          </div>
        </aside>
      </section>
    </div>
  )
}
