import { Link } from 'react-router-dom'
import StreakCounter from '../components/progress/StreakCounter'
import StatsCard from '../components/progress/StatsCard'
import { useProgress } from '../hooks/useProgress'
import { getDueWords } from '../lib/spaced-repetition'

export default function HomePage() {
  const { progress } = useProgress()
  const dueWords = getDueWords(progress.wordProgress)
  const completedLessons = Object.values(progress.lessonProgress).filter((lesson) => lesson.completed).length

  const quickActions = [
    {
      to: '/dictionary',
      eyebrow: 'Nhanh nhất',
      title: 'Tra từ ngay',
      description: 'Tìm nghĩa, phát âm và ví dụ chỉ trong vài giây.',
    },
    {
      to: '/flashcards',
      eyebrow: 'Dễ duy trì',
      title: 'Ôn bằng flashcards',
      description: 'Học ngắn, lặp lại đúng lúc để nhớ lâu hơn.',
    },
    {
      to: '/lessons',
      eyebrow: 'Có lộ trình',
      title: 'Học theo bài',
      description: 'Đi từng bước từ giao tiếp cơ bản tới tiếng Anh công việc.',
    },
    {
      to: '/vocabulary',
      eyebrow: 'Mở rộng vốn từ',
      title: 'Xem kho từ vựng',
      description: 'Dễ lọc theo chủ đề và xem lại những nhóm từ quan trọng.',
    },
  ]

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#f3f8ff_0%,#e8f1ff_45%,#f8fbff_100%)] p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_340px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">English Learning</p>
            <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Học tiếng Anh theo cách nhẹ nhàng, rõ ràng và dễ duy trì mỗi ngày.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              Mọi thứ bạn cần đều nằm ở một nơi: tra từ, ôn tập, học theo bài và theo dõi tiến độ mà
              không bị rối mắt.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={dueWords.length > 0 ? '/flashcards' : '/lessons'}
                className="rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
              >
                {dueWords.length > 0 ? `Ôn ${dueWords.length} từ ngay` : 'Bắt đầu học'}
              </Link>
              <Link
                to="/dictionary"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-primary-400 hover:text-primary-700"
              >
                Tra từ nhanh
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-[0_18px_40px_rgba(37,99,235,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Tổng quan hôm nay</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-sm text-slate-500">Việc nên làm tiếp theo</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {dueWords.length > 0
                    ? `Bạn có ${dueWords.length} từ đang chờ ôn tập.`
                    : 'Bạn đã sẵn sàng mở bài học tiếp theo.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Bài hoàn thành</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{completedLessons}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Từ đã học</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{progress.totalWordsLearned}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StreakCounter />

      <div className="grid gap-3 md:grid-cols-3">
        <StatsCard icon="Words" value={progress.totalWordsLearned} label="Từ đã học" />
        <StatsCard icon="Lessons" value={completedLessons} label="Bài đã hoàn thành" />
        <StatsCard icon="Streak" value={progress.streak.currentStreak} label="Ngày học liên tiếp" />
      </div>

      {dueWords.length > 0 && (
        <Link
          to="/flashcards"
          className="block rounded-[28px] border border-primary-200 bg-primary-100 p-5 text-slate-900 shadow-[0_14px_30px_rgba(37,99,235,0.14)] hover:-translate-y-0.5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-700">Nhắc bạn ôn tập</p>
          <p className="mt-3 text-2xl font-bold">Bạn có {dueWords.length} từ cần xem lại</p>
          <p className="mt-2 text-sm text-slate-600">Ôn đúng lúc sẽ giúp bạn nhớ lâu hơn và giảm quên từ.</p>
        </Link>
      )}

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Bắt đầu từ đâu</h2>
            <p className="mt-1 text-slate-600">Các lối vào chính được sắp theo nhu cầu học phổ biến nhất.</p>
          </div>
          <Link to="/progress" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
            Xem toàn bộ tiến độ
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(37,99,235,0.06)] hover:-translate-y-1 hover:border-primary-300"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-700">{action.eyebrow}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{action.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
              <p className="mt-5 text-sm font-semibold text-slate-900 group-hover:text-primary-700">
                Mở tính năng
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
