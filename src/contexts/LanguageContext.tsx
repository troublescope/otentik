/**
 * Language Context
 *
 * Provides language state management across the application.
 * Includes interface abstraction for better testability and decoupling.
 */

"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { SupportedLanguage } from '@/types/language';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  validateLanguage,
  getLanguageFromBrowser,
} from '@/types/language';
import { createStorage, STORAGE_KEYS, STORAGE_VERSIONS } from '@/lib/storage';

/**
 * Language Context Interface
 *
 * Abstract interface for language management.
 * Useful for testing with mock implementations.
 */
export interface ILanguageContext {
  /** Current active language */
  readonly language: SupportedLanguage;

  /** Set a new language */
  setLanguage(lang: SupportedLanguage): void;

  /** Check if a language is supported */
  isSupported(lang: string): lang is SupportedLanguage;

  /** Get available languages */
  getAvailableLanguages(): readonly SupportedLanguage[];
}

/**
 * Language Context Value Type
 * Internal type that extends the interface with implementation details
 */
interface LanguageContextValue extends ILanguageContext {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

/**
 * Default implementation of available languages
 */
const AVAILABLE_LANGUAGES = [
  'in', // Indonesian
  'en', // English
  'th', // Thai
  'ar', // Arabic
  'pt', // Portuguese
  'fr', // French
  'de', // German
  'ja', // Japanese
  'es', // Spanish
  'zh', // Chinese Traditional
  'zhHans', // Chinese Simplified
] as const satisfies readonly SupportedLanguage[];

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}

/**
 * Language Provider Implementation
 */
class LanguageContextImpl implements ILanguageContext {
  constructor(
    private _language: SupportedLanguage,
    private setLanguageState: (lang: SupportedLanguage) => void,
    private languageStorage: ReturnType<typeof createStorage<SupportedLanguage>>
  ) {}

  get language() {
    return this._language;
  }

  setLanguage(lang: SupportedLanguage): void {
    this._language = lang;
    this.setLanguageState(lang);
    this.languageStorage.set(lang);

    // Navigate to new language route
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        const isDetailOrWatchPage = pathSegments[1] === 'detail' || pathSegments[1] === 'watch';

        if (isDetailOrWatchPage) {
          window.location.href = '/' + lang;
        } else {
          pathSegments[0] = lang;
          window.location.href = '/' + pathSegments.join('/');
        }
      }
    }
  }

  isSupported(lang: string): lang is SupportedLanguage {
    return validateLanguage(lang) === lang;
  }

  getAvailableLanguages(): readonly SupportedLanguage[] {
    return AVAILABLE_LANGUAGES;
  }
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  // Create versioned storage for language
  const languageStorage = useMemo(() => createStorage<SupportedLanguage>({
    key: STORAGE_KEYS.LANGUAGE,
    version: STORAGE_VERSIONS.LANGUAGE,
    defaultValue: DEFAULT_LANGUAGE,
    validate: (data): data is SupportedLanguage => validateLanguage(data as string) === data,
  }), []);

  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage || DEFAULT_LANGUAGE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load language from storage on mount, or use initialLanguage from route
  useEffect(() => {
    if (initialLanguage) {
      setLanguageState(initialLanguage);
      languageStorage.set(initialLanguage);
      setIsInitialized(true);
    } else {
      const storedLang = languageStorage.get();
      if (storedLang !== DEFAULT_LANGUAGE) {
        setLanguageState(storedLang);
      } else {
        const browserLang = getLanguageFromBrowser(navigator.language);
        setLanguageState(browserLang);
        languageStorage.set(browserLang);
      }
      setIsInitialized(true);
    }
  }, [initialLanguage, languageStorage]);

  // Don't render children until language is initialized to prevent hydration mismatch
  if (!isInitialized) {
    return null;
  }

  // Create stable context value to prevent infinite re-renders
  const contextValue = useMemo(() => {
    const impl = new LanguageContextImpl(language, setLanguageState, languageStorage);
    return {
      language: impl.language,
      setLanguage: impl.setLanguage.bind(impl),
      isSupported: impl.isSupported.bind(impl),
      getAvailableLanguages: impl.getAvailableLanguages.bind(impl),
    } as LanguageContextValue;
  }, [language, setLanguageState, languageStorage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context
 * @throws Error if used outside LanguageProvider
 */
export function useLanguageContext(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}

/**
 * Hook to access only the language value
 */
export function useLanguage(): { language: SupportedLanguage } {
  const { language } = useLanguageContext();
  return { language };
}

/**
 * Export available languages constant
 */
export { AVAILABLE_LANGUAGES };
