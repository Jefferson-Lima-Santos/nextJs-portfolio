/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './translations/en';
import { ptBR } from './translations/pt-br';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ptBR: { translation: ptBR }
    },
    lng: 'ptBR',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
