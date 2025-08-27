import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  I18nManager,
  View,
  ViewStyle,
} from 'react-native';
import { useLanguage } from '@context/LanguageContext';
import { useTheme, Spacing, BorderRadius, CustomTheme } from '@theme/index';
import { FONT_STYLES } from '@utils/fonts';
import RTLText from './RTLText';
import RTLView from './RTLView';

interface LanguageToggleProps {
  style?: ViewStyle;
  showTitle?: boolean;
}

export default function LanguageToggle({
  style,
  showTitle = true,
}: LanguageToggleProps) {
  const { language, changeLanguage, t } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  const handleLanguageChange = async (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== language) {
      try {
        await changeLanguage(newLanguage);
        Alert.alert(t('language.languageChanged'), undefined, [
          { text: t('common.confirm') },
        ]);
      } catch (error) {
        Alert.alert(t('common.error'), 'Failed to change language');
      }
    }
  };

  return (
    <RTLView row style={[themedStyles.container, style || {}]}>
      {showTitle && (
        <RTLText style={themedStyles.title}>{t('profile.language')}:</RTLText>
      )}
      <RTLView row style={themedStyles.toggleContainer}>
        <TouchableOpacity
          style={[
            themedStyles.toggleButton,
            language === 'en' && themedStyles.activeButton,
          ]}
          onPress={() => handleLanguageChange('en')}
        >
          <RTLText
            style={[
              themedStyles.toggleText,
              ...(language === 'en' ? [themedStyles.activeText] : []),
            ]}
          >
            {t('language.english')}
          </RTLText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            themedStyles.toggleButton,
            language === 'ar' && themedStyles.activeButton,
          ]}
          onPress={() => handleLanguageChange('ar')}
        >
          <RTLText
            style={[
              themedStyles.toggleText,
              ...(language === 'ar' ? [themedStyles.activeText] : []),
            ]}
          >
            {t('language.arabic')}
          </RTLText>
        </TouchableOpacity>
      </RTLView>
    </RTLView>
  );
}

const createStyles = ({ colors }: CustomTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      justifyContent: 'center',
    },
    title: {
      ...FONT_STYLES.medium,
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: Spacing.sm,
    },
    toggleContainer: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    toggleButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.sm,
      marginHorizontal: 2,
    },
    activeButton: {
      backgroundColor: colors.primary,
    },
    toggleText: {
      ...FONT_STYLES.medium,
      fontSize: 14,
      color: colors.textMuted,
    },
    activeText: {
      color: colors.secondary,
    },
  });
