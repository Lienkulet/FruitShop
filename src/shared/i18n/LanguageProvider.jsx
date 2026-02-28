"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGE_OPTIONS, translations } from "./translations";

const STORAGE_KEY = "fruit_burst_lang";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage && translations[savedLanguage] && savedLanguage !== "en") {
      // Defer until after hydration paint to avoid server/client text mismatch.
      queueMicrotask(() => setLanguage(savedLanguage));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      messages: translations[language] ?? translations.en,
      languageOptions: LANGUAGE_OPTIONS,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
