// src/i18n.js или i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';

i18n
  .use(initReactI18next) // подключаем react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
    },
    lng: 'ru', // устанавливаем начальный язык
    fallbackLng: 'ru', // запасной язык, если переводов нет
    interpolation: {
      escapeValue: false // React сам обрабатывает экранирование
    }
  });

export default i18n;
