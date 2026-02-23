import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/vocabulary', label: 'Từ vựng' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/lessons', label: 'Bài học' },
  { to: '/progress', label: 'Tiến độ' },
]

export default function Navbar() {
  return (
    <nav className="hidden border-b border-gray-200 bg-white md:block">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-lg font-bold text-primary-600">
          📚 English Learning
        </NavLink>
        <div className="flex gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            ⚙️
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
