import { create } from 'zustand';

export type Language = 'en' | 'es' | 'fr';

interface AuthState {
  selectedLanguage: Language;
  updateSelectedLanguage: (language: Language) => void;
}

const STORAGE_KEY = 'selectedLanguage';
const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'fr'];

const getInitialLanguage = (): Language => {
  const savedLang = localStorage.getItem(STORAGE_KEY);
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang as Language)) {
    return savedLang as Language;
  }

  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
    return browserLang as Language;
  }

  return 'en';
};

export const useLanguageStore = create<AuthState>((set) => ({
  selectedLanguage: getInitialLanguage(),

  updateSelectedLanguage: (lang): void => {
    localStorage.setItem(STORAGE_KEY, lang);
    set({ selectedLanguage: lang });
  },
}));
