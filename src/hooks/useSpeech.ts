import { useState, useEffect, useCallback } from 'react'
import { speak as speakFn, getEnglishVoices } from '../lib/speech'
import { useProgress } from './useProgress'

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const { progress, updateSettings } = useProgress()

  useEffect(() => {
    const loadVoices = () => {
      setVoices(getEnglishVoices())
    }
    loadVoices()
    if (window.speechSynthesis?.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      return speakFn(text, {
        rate: progress.settings.speechRate,
        voiceURI: progress.settings.speechVoiceURI,
      })
    },
    [progress.settings.speechRate, progress.settings.speechVoiceURI],
  )

  const setVoice = useCallback(
    (voiceURI: string) => {
      updateSettings({ speechVoiceURI: voiceURI })
    },
    [updateSettings],
  )

  return {
    voices,
    currentVoiceURI: progress.settings.speechVoiceURI ?? '',
    speak,
    setVoice,
  }
}
