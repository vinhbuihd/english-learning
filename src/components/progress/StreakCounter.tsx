import { useProgress } from '../../hooks/useProgress'

export default function StreakCounter() {
  const { progress } = useProgress()
  const { currentStreak, longestStreak } = progress.streak

  return (
    <div className="rounded-[28px] bg-[linear-gradient(135deg,#1d4ed8_0%,#3b82f6_52%,#93c5fd_100%)] p-[1px] shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
      <div className="flex items-center justify-between gap-4 rounded-[27px] bg-[linear-gradient(135deg,#1e3a8a_0%,#2563eb_58%,#60a5fa_100%)] p-5 text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">Daily streak</p>
          <p className="mt-3 text-4xl font-bold leading-none">{currentStreak}</p>
          <p className="mt-2 text-sm text-white/85">
            {currentStreak > 0 ? 'Bạn đang giữ nhịp học rất tốt.' : 'Bắt đầu chuỗi học hôm nay.'}
          </p>
          {longestStreak > currentStreak ? (
            <p className="mt-1 text-sm text-white/75">Kỷ lục cá nhân: {longestStreak} ngày</p>
          ) : null}
        </div>

        <div className="rounded-[24px] border border-white/20 bg-white/12 px-4 py-5 text-right backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-white/70">Mục tiêu</p>
          <p className="mt-2 text-lg font-semibold">10 phút</p>
          <p className="text-sm text-white/75">mỗi ngày</p>
        </div>
      </div>
    </div>
  )
}
