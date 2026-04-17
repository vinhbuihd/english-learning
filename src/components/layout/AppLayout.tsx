import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6 md:pb-10 md:pt-8">
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/82 shadow-[0_24px_80px_rgba(37,99,235,0.08)] backdrop-blur">
          <div className="min-h-[calc(100vh-11rem)] px-4 py-5 sm:px-6 md:px-8 md:py-8">
            <Outlet />
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
