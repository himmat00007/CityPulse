import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  changeLanguage: (lang: Language) => Promise<void>;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('user-language');
        if (
          savedLanguage &&
          (savedLanguage === 'en' || savedLanguage === 'ar')
        ) {
          const lang = savedLanguage as Language;
          setLanguage(lang);
          await i18n.changeLanguage(lang);

          const shouldBeRTL = lang === 'ar';
          setIsRTL(shouldBeRTL);
        }
      } catch (error) {
        console.log('Error loading saved language:', error);
      }
    };

    loadSavedLanguage();
  }, [i18n]);

  const changeLanguage = useCallback(
    async (lang: Language) => {
      try {
        console.log('Changing language to:', lang);

        await AsyncStorage.setItem('user-language', lang);

        await i18n.changeLanguage(lang);
        setLanguage(lang);

        const shouldBeRTL = lang === 'ar';
        setIsRTL(shouldBeRTL);

        console.log(
          'Language changed successfully to:',
          lang,
          'RTL:',
          shouldBeRTL,
        );
      } catch (error) {
        console.log('Error changing language:', error);
      }
    },
    [i18n],
  );

  const value: LanguageContextType = useMemo(
    () => ({
      language,
      isRTL,
      changeLanguage,
      t,
    }),
    [language, isRTL, changeLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
