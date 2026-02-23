import { useProgress } from '../hooks/useProgress'
import { useSpeech } from '../hooks/useSpeech'
import { useState } from 'react'

export default function SettingsPage() {
  const { progress, updateSettings, resetAll } = useProgress()
  const { voices, currentVoiceURI, setVoice, speak } = useSpeech()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const settings = progress.settings

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Cài đặt</h1>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900">Phát âm</h2>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Giọng đọc</label>
          <select
            value={currentVoiceURI}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
          <button
            onClick={() => speak('Hello, welcome to English Learning!')}
            className="mt-2 text-sm text-primary-500 hover:underline"
          >
            🔊 Nghe thử
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
            onChange={(e) =>
              updateSettings({ speechRate: parseFloat(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900">Mục tiêu hàng ngày</h2>

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
            onChange={(e) =>
              updateSettings({ dailyGoalWords: parseInt(e.target.value) })
            }
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
          Xóa toàn bộ dữ liệu học tập. Hành động này không thể hoàn tác.
        </p>
        {showResetConfirm ? (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                resetAll()
                setShowResetConfirm(false)
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
