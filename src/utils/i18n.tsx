import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React, { createContext, ReactNode, useMemo } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import de from '../locales/de';
import en from '../locales/en';

const resources = {
  de: { translation: de },
  en: { translation: en },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'de',
    preload: ['de', 'en'],
    fallbackLng: 'de',
    resources,
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false,
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

export default i18n;

interface Props {
  children?: ReactNode;
}

const I18nContext = createContext<[string, (value: string) => void]>([
  'de',
  (string) => string,
]);

export function I18nProvider({ children }: Props) {
  const i18nState = { lang: 'de' };

  const deps: [string, (lang: string) => void] = useMemo(() => {
    return [
      i18nState.lang,
      (lang: string) => {
        if (lang === i18nState.lang) return;

        i18n.changeLanguage(lang);
      },
    ];
  }, [i18nState.lang]);

  return (
    <I18nContext.Provider value={deps}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
}
