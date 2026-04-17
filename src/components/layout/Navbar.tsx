import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/dictionary', label: 'Tra từ' },
  { to: '/vocabulary', label: 'Từ vựng' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/lessons', label: 'Bài học' },
  { to: '/progress', label: 'Tiến độ' },
]

export default function Navbar() {
  return (
    <nav className="hidden md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-sm font-bold text-primary-700 shadow-sm">
            EL
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">English Learning</p>
            <p className="text-sm text-gray-500">Học dễ hơn, đều hơn mỗi ngày</p>
          </div>
        </NavLink>

        <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-2 py-2 shadow-[0_10px_30px_rgba(37,99,235,0.08)] backdrop-blur">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold ${
                isActive
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
              }`
            }
          >
            Cài đặt
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
