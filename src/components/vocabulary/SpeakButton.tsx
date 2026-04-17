import { useState } from 'react'
import { useSpeech } from '../../hooks/useSpeech'

interface Props {
  text: string
  audioUrl?: string
  className?: string
}

export default function SpeakButton({ text, audioUrl, className = '' }: Props) {
  const { speak } = useSpeech()
  const [playing, setPlaying] = useState(false)

  const handleClick = async () => {
    setPlaying(true)

    try {
      if (audioUrl) {
        await new Promise<void>((resolve, reject) => {
          const audio = new Audio(audioUrl)
          audio.onended = () => resolve()
          audio.onerror = () => reject(new Error('Audio playback failed'))
          void audio.play().catch(reject)
        })
      } else {
        await speak(text)
      }
    } catch {
      try {
        await speak(text)
      } catch {
        // ignore speech errors
      }
    } finally {
      setPlaying(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-full p-2 text-lg transition-colors hover:bg-primary-50 ${
        playing ? 'animate-pulse text-primary-500' : 'text-gray-400'
      } ${className}`}
      aria-label={`Play pronunciation for ${text}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 10v4h4l5 4V6l-5 4H5Z" />
        <path d="M17 9a4 4 0 0 1 0 6" />
        <path d="M19.5 6.5a7.5 7.5 0 0 1 0 11" />
      </svg>
    </button>
  )
}
