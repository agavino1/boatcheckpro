import { es } from './translations/es'
import { en } from './translations/en'
import { fr } from './translations/fr'
import { it } from './translations/it'
import { pt } from './translations/pt'

export type Language = 'es' | 'en' | 'fr' | 'it' | 'pt'
export type Translations = typeof es

export const translations: Record<Language, Translations> = { es, en, fr, it, pt }

export const languageNames: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
  it: 'IT',
  pt: 'PT',
}
