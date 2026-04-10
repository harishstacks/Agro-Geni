import React, { createContext, useContext, useState } from "react";
import type { Language } from "./i18n";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
}>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    return (stored === 'ta' || stored === 'en') ? stored : 'ta';
  });
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
  };
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
