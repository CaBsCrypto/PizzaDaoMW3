'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import es from '@/locales/es.json'
import en from '@/locales/en.json'

type Lang = 'es' | 'en'
type Translations = typeof es

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const dicts = { es, en }

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
  t: es,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  return (
    <LangContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
