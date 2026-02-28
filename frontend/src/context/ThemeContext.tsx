'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'cupcake' | 'business' | 'cyberpunk' | 'forest'

const THEMES: Theme[] = ['light', 'dark', 'cupcake', 'business', 'cyberpunk', 'forest']

interface ThemeContextType {
  theme: Theme
  setTheme: (t: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  themes: THEMES,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('bcp-theme') as Theme | null
    if (stored && THEMES.includes(stored)) {
      setThemeState(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('bcp-theme', t)
    document.documentElement.setAttribute('data-theme', t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
