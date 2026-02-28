'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, Translations, translations } from '@/i18n'

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('es')

  useEffect(() => {
    const stored = localStorage.getItem('bcp-lang') as Language | null
    if (stored && translations[stored]) setLangState(stored)
  }, [])

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem('bcp-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
