import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import 'intl-pluralrules';

import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

// Get device language
const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage, // language to use
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    cleanCode: true, // language will be looked up as 'en' instead of 'en-US'
  });

export default i18n;
