import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-6 md:pb-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
