import i18nExport, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DE, EN } from './resourses';

const resources = {
  en: {
    translation: EN,
  },
  de: {
    translation: DE,
  },
};

const Languages = ['en', 'de'];

use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'de',
  debug: true,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
  resources: resources,
  supportedLngs: Languages,
});

export default i18nExport;
