import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: 'Home', label: 'Trang chủ' },
  { to: '/dictionary', icon: 'Chat', label: 'Tra từ' },
  { to: '/vocabulary', icon: 'Book', label: 'Từ vựng' },
  { to: '/flashcards', icon: 'Cards', label: 'Flashcards' },
  { to: '/lessons', icon: 'Learn', label: 'Bài học' },
  { to: '/progress', icon: 'Stats', label: 'Tiến độ' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:hidden">
      <div className="grid grid-cols-6">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-1 py-2 text-[11px] transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
