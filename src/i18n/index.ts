import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import ar from './ar.json';

const LANGUAGE_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: async (callback: (lng: string) => void) => {
        try {
            const savedLanguage = await AsyncStorage.getItem('user-language');
            if (savedLanguage) {
                callback(savedLanguage);
                return;
            }

            const locales = RNLocalize.getLocales();
            const deviceLanguage = locales[0]?.languageCode || 'en';

            const supportedLanguage = ['en', 'ar'].includes(deviceLanguage) ? deviceLanguage : 'en';
            callback(supportedLanguage);
        } catch (error) {
            console.log('Error reading language', error);
            callback('en');
        }
    },
    init: () => { },
    cacheUserLanguage: async (language: string) => {
        try {
            await AsyncStorage.setItem('user-language', language);
        } catch (error) {
            console.log('Error saving language', error);
        }
    },
};

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

i18n
    .use(LANGUAGE_DETECTOR as any)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
