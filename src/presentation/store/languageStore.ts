import { create } from 'zustand';

export type Language = 'en' | 'es' | 'fr';

interface AuthState {
  selectedLanguage: Language;
  updateSelectedLanguage: (language: Language) => void;
}

export const useLanguageStore = create<AuthState>((set) => ({
  selectedLanguage: 'en',

  updateSelectedLanguage: (lang): void => {
    set({ selectedLanguage: lang });
  },
}));
