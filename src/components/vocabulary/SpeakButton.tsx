import { useState } from 'react'
import { useSpeech } from '../../hooks/useSpeech'

interface Props {
  text: string
  className?: string
}

export default function SpeakButton({ text, className = '' }: Props) {
  const { speak } = useSpeech()
  const [playing, setPlaying] = useState(false)

  const handleClick = async () => {
    setPlaying(true)
    try {
      await speak(text)
    } catch {
      // ignore speech errors
    }
    setPlaying(false)
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-full p-2 text-lg transition-colors hover:bg-primary-50 ${
        playing ? 'animate-pulse text-primary-500' : 'text-gray-400'
      } ${className}`}
      aria-label={`Nghe phát âm: ${text}`}
    >
      🔊
    </button>
  )
}
