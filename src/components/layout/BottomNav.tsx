import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '01', label: 'Trang chủ' },
  { to: '/dictionary', icon: '02', label: 'Tra từ' },
  { to: '/vocabulary', icon: '03', label: 'Từ vựng' },
  { to: '/flashcards', icon: '04', label: 'Ôn tập' },
  { to: '/lessons', icon: '05', label: 'Bài học' },
  { to: '/progress', icon: '06', label: 'Tiến độ' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 md:hidden">
      <div className="grid grid-cols-6 rounded-[28px] border border-white/80 bg-white/88 p-2 shadow-[0_18px_40px_rgba(37,99,235,0.12)] backdrop-blur">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] ${
                isActive ? 'bg-primary-100 text-primary-800' : 'text-gray-500'
              }`
            }
          >
            <span className="text-[10px] font-semibold tracking-[0.18em]">{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
