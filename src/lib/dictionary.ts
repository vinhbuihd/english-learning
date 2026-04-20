import type { BookWordDetail, LearningWord, LookupResult } from '../types'

const DICTIONARY_API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en'
const DATAMUSE_API_BASE = 'https://api.datamuse.com/words'
const TRANSLATE_API_BASE = 'https://api.mymemory.translated.net/get'

interface DictionaryApiPhonetic {
  text?: string
  audio?: string
}

interface DictionaryApiDefinition {
  definition: string
  example?: string
}

interface DictionaryApiMeaning {
  partOfSpeech?: string
  definitions: DictionaryApiDefinition[]
}

interface DictionaryApiEntry {
  word: string
  phonetic?: string
  phonetics?: DictionaryApiPhonetic[]
  meanings?: DictionaryApiMeaning[]
}

interface DatamuseWord {
  word: string
}

interface TranslationResponse {
  responseData?: {
    translatedText?: string
  }
}

export class DictionaryNotFoundError extends Error {
  constructor(term: string) {
    super(`No dictionary entry found for "${term}"`)
    this.name = 'DictionaryNotFoundError'
  }
}

function uniq(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  )
}

function normalizeTerm(term: string): string {
  return term.trim().toLowerCase()
}

function extractAudioUrl(entries: DictionaryApiEntry[]): string | undefined {
  const rawUrl = entries
    .flatMap((entry) => entry.phonetics ?? [])
    .map((phonetic) => phonetic.audio?.trim())
    .find(Boolean)

  if (!rawUrl) return undefined
  if (rawUrl.startsWith('//')) return `https:${rawUrl}`
  return rawUrl
}

function extractIpa(entries: DictionaryApiEntry[]): string {
  return (
    entries.find((entry) => entry.phonetic?.trim())?.phonetic?.trim() ??
    entries
      .flatMap((entry) => entry.phonetics ?? [])
      .map((phonetic) => phonetic.text?.trim())
      .find(Boolean) ??
    ''
  )
}

function extractDefinitions(entries: DictionaryApiEntry[]): string[] {
  const definitions = entries.flatMap((entry) =>
    (entry.meanings ?? []).flatMap((meaning) =>
      meaning.definitions.map((definition) =>
        meaning.partOfSpeech
          ? `${meaning.partOfSpeech}: ${definition.definition}`
          : definition.definition,
      ),
    ),
  )

  return uniq(definitions).slice(0, 6)
}

function extractExamples(entries: DictionaryApiEntry[]): string[] {
  return uniq(
    entries.flatMap((entry) =>
      (entry.meanings ?? []).flatMap((meaning) =>
        meaning.definitions.map((definition) => definition.example ?? ''),
      ),
    ),
  ).slice(0, 4)
}

function extractPrimaryMeaning(entries: DictionaryApiEntry[]): {
  partOfSpeech: string
  definition: string
  example: string
} {
  for (const entry of entries) {
    for (const meaning of entry.meanings ?? []) {
      const firstDefinition = meaning.definitions[0]
      if (firstDefinition?.definition) {
        return {
          partOfSpeech: meaning.partOfSpeech ?? 'word',
          definition: firstDefinition.definition,
          example: firstDefinition.example ?? '',
        }
      }
    }
  }

  return {
    partOfSpeech: 'word',
    definition: 'A useful English word from this unit.',
    example: '',
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return (await response.json()) as T
}

async function translateDefinitions(definitions: string[]): Promise<string[]> {
  const topDefinitions = definitions.slice(0, 3)

  const translations = await Promise.all(
    topDefinitions.map(async (definition) => {
      const url = new URL(TRANSLATE_API_BASE)
      url.searchParams.set('q', definition)
      url.searchParams.set('langpair', 'en|vi')

      try {
        const response = await fetchJson<TranslationResponse>(url.toString())
        return response.responseData?.translatedText?.trim() ?? ''
      } catch {
        return ''
      }
    }),
  )

  return uniq(translations)
}

async function translateText(text: string): Promise<string> {
  if (!text.trim()) return ''

  const url = new URL(TRANSLATE_API_BASE)
  url.searchParams.set('q', text)
  url.searchParams.set('langpair', 'en|vi')

  try {
    const response = await fetchJson<TranslationResponse>(url.toString())
    return response.responseData?.translatedText?.trim() ?? ''
  } catch {
    return ''
  }
}

async function fetchDatamuseWords(params: Record<string, string>, limit: number): Promise<string[]> {
  const url = new URL(DATAMUSE_API_BASE)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  url.searchParams.set('max', String(limit))

  try {
    const words = await fetchJson<DatamuseWord[]>(url.toString())
    return uniq(words.map((item) => item.word)).slice(0, limit)
  } catch {
    return []
  }
}

export async function lookupWord(term: string): Promise<LookupResult> {
  const normalizedTerm = normalizeTerm(term)

  if (!normalizedTerm) {
    throw new Error('Please enter a word to look up')
  }

  const dictionaryUrl = `${DICTIONARY_API_BASE}/${encodeURIComponent(normalizedTerm)}`
  let entries: DictionaryApiEntry[]

  try {
    entries = await fetchJson<DictionaryApiEntry[]>(dictionaryUrl)
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      throw new DictionaryNotFoundError(normalizedTerm)
    }
    throw error
  }

  const definitionsEn = extractDefinitions(entries)
  const [definitionsVi, relatedWords, wordFamily] = await Promise.all([
    translateDefinitions(definitionsEn),
    fetchDatamuseWords({ ml: normalizedTerm }, 8),
    fetchDatamuseWords({ sp: `${normalizedTerm}*` }, 8),
  ])

  return {
    term: entries[0]?.word ?? normalizedTerm,
    ipa: extractIpa(entries),
    audioUrl: extractAudioUrl(entries),
    definitionsEn,
    definitionsVi,
    examples: extractExamples(entries),
    relatedWords: relatedWords.filter((word) => word !== normalizedTerm),
    wordFamily: wordFamily.filter((word) => word !== normalizedTerm),
    searchedAt: new Date().toISOString(),
    source: 'dictionaryapi.dev + datamuse + mymemory',
  }
}

export async function lookupWordBasics(term: string): Promise<BookWordDetail> {
  const normalizedTerm = normalizeTerm(term)

  if (!normalizedTerm) {
    throw new Error('Please enter a word to look up')
  }

  const dictionaryUrl = `${DICTIONARY_API_BASE}/${encodeURIComponent(normalizedTerm)}`
  let entries: DictionaryApiEntry[]

  try {
    entries = await fetchJson<DictionaryApiEntry[]>(dictionaryUrl)
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      throw new DictionaryNotFoundError(normalizedTerm)
    }
    throw error
  }

  const primaryMeaning = extractPrimaryMeaning(entries)
  const [definitionVi, relatedWords] = await Promise.all([
    translateText(primaryMeaning.definition),
    fetchDatamuseWords({ ml: normalizedTerm }, 6),
  ])

  return {
    term: entries[0]?.word ?? normalizedTerm,
    ipa: extractIpa(entries),
    audioUrl: extractAudioUrl(entries),
    partOfSpeech: primaryMeaning.partOfSpeech,
    definition: primaryMeaning.definition,
    definitionVi,
    example: primaryMeaning.example,
    relatedWords: relatedWords.filter((word) => word !== normalizedTerm),
    source: 'dictionaryapi.dev + datamuse',
  }
}

export function upsertLearningWord(words: LearningWord[], word: LearningWord): LearningWord[] {
  const normalizedTerm = normalizeTerm(word.term)
  const nextWords = words.filter((item) => normalizeTerm(item.term) !== normalizedTerm)
  return [word, ...nextWords]
}
