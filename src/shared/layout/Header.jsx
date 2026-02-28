"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/shared/config/navigation";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import Brand from "@/shared/ui/Brand";
import styles from "./Header.module.css";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, messages, languageOptions } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentLanguage =
    languageOptions.find((item) => item.code === language) ?? languageOptions[0];

  return (
    <header className={`${styles.navbar} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.inner}>
        <nav className={styles.navLinks}>
          {navLinks.map((href, index) => (
            <a key={`${href}-${index}`} href={href}>
              {messages.nav[index]}
            </a>
          ))}
        </nav>
        <Brand />
        <div className={styles.tools}>
          <label className={styles.searchWrap}>
            <input
              type="text"
              placeholder={messages.searchPlaceholder}
              aria-label={messages.searchPlaceholder}
            />
            <span>⌕</span>
          </label>

          <div className={styles.languageSwitcher}>
            <button
              type="button"
              className={styles.languageButton}
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={isLanguageMenuOpen}
            >
              <span>{currentLanguage.flag}</span>
              <span className={styles.languageLabel}>{currentLanguage.label}</span>
              <span className={styles.chevron}>▾</span>
            </button>

            {isLanguageMenuOpen && (
              <ul className={styles.languageMenu} role="listbox" aria-label="Language selector">
                {languageOptions.map((option) => (
                  <li key={option.code}>
                    <button
                      type="button"
                      className={`${styles.languageOption} ${
                        option.code === language ? styles.languageOptionActive : ""
                      }`}
                      onClick={() => {
                        setLanguage(option.code);
                        setIsLanguageMenuOpen(false);
                      }}
                    >
                      <span>{option.flag}</span>
                      <span>{option.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
