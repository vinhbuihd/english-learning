import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { useSpeech } from '../hooks/useSpeech'

const syncStatusLabel = {
  signed_out: 'Chưa đăng nhập',
  unavailable: 'Chưa cấu hình Supabase',
  syncing: 'Đang đồng bộ',
  synced: 'Đã đồng bộ',
  error: 'Đồng bộ thất bại, sẽ thử lại',
} as const

export default function SettingsPage() {
  const {
    progress,
    updateSettings,
    resetAll,
    syncStatus,
    lastSyncedAt,
    isAuthenticated,
    isSyncConfigured,
    userEmail,
    signIn,
    signOut,
    syncNow,
  } = useProgress()
  const { voices, currentVoiceURI, setVoice, speak } = useSpeech()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [authActionLoading, setAuthActionLoading] = useState(false)

  const settings = progress.settings

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Cài đặt</h1>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-gray-900">Tài khoản và đồng bộ</h2>
            <p className="mt-1 text-sm text-gray-500">
              Đăng nhập để sao lưu tiến trình và tiếp tục học trên máy tính lẫn điện thoại.
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {syncStatusLabel[syncStatus]}
          </span>
        </div>

        {isAuthenticated ? (
          <div className="space-y-3">
            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <p className="font-medium text-gray-800">{userEmail}</p>
              <p className="mt-1">
                Lần đồng bộ gần nhất:{' '}
                {lastSyncedAt ? new Date(lastSyncedAt).toLocaleString() : 'Chưa có'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setAuthActionLoading(true)
                  void syncNow().finally(() => setAuthActionLoading(false))
                }}
                disabled={authActionLoading || syncStatus === 'syncing'}
                className="rounded-lg bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {syncStatus === 'syncing' ? 'Đang đồng bộ...' : 'Đồng bộ ngay'}
              </button>
              <button
                onClick={() => {
                  setAuthActionLoading(true)
                  void signOut().finally(() => setAuthActionLoading(false))
                }}
                disabled={authActionLoading}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {!isSyncConfigured ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                Hãy thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_PUBLISHABLE_KEY` để bật đăng nhập Google.
              </div>
            ) : null}
            <button
              onClick={() => {
                setAuthActionLoading(true)
                void signIn().finally(() => setAuthActionLoading(false))
              }}
              disabled={!isSyncConfigured || authActionLoading}
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Đăng nhập với Google
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900">Phát âm</h2>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Giọng đọc</label>
          <select
            value={currentVoiceURI}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <button
            onClick={() => speak('Hello, welcome to English Learning!')}
            className="mt-2 text-sm text-primary-500 hover:underline"
          >
            Nghe thử
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Tốc độ đọc: {settings.speechRate}x
          </label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.25"
            value={settings.speechRate}
            onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900">Mục tiêu hằng ngày</h2>

        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Số từ mới mỗi ngày: {settings.dailyGoalWords}
          </label>
          <input
            type="range"
            min="3"
            max="20"
            step="1"
            value={settings.dailyGoalWords}
            onChange={(e) => updateSettings({ dailyGoalWords: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Hiển thị phiên âm IPA</span>
          <button
            onClick={() => updateSettings({ showIPA: !settings.showIPA })}
            className={`h-6 w-11 rounded-full transition-colors ${
              settings.showIPA ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                settings.showIPA ? 'translate-x-5.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-red-200 bg-white p-4">
        <h2 className="font-semibold text-red-600">Vùng nguy hiểm</h2>
        <p className="mt-1 text-sm text-gray-500">
          Xóa toàn bộ dữ liệu học tập. Nếu đã đăng nhập, dữ liệu đồng bộ cũng sẽ bị đặt lại.
        </p>
        {showResetConfirm ? (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                void resetAll().finally(() => setShowResetConfirm(false))
              }}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Xác nhận xóa
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
            >
              Hủy
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Xóa tất cả dữ liệu
          </button>
        )}
      </div>
    </div>
  )
}
