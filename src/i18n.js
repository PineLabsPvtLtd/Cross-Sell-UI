import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import translationEng from './locales/en/translation.json';
i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: 'en', // use en if detected lng is not available

        keySeparator: '.', // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },

        resources: {
            en: {
                translation: translationEng,
            },
        },
    });

export default i18n;
