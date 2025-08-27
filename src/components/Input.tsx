import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from 'react-native';
import { useLanguage } from '@context/LanguageContext';
import { useTheme, Spacing, BorderRadius, CustomTheme } from '@theme/index';
import { FONT_STYLES } from '@utils/fonts';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, style, ...props }: InputProps) {
  const { isRTL } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  return (
    <View style={themedStyles.container}>
      {label && (
        <View style={themedStyles.label}>
          <Text
            style={[
              themedStyles.labelText,
              { textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
      <TextInput
        autoCapitalize="none"
        style={[
          themedStyles.input,
          {
            textAlign: isRTL ? 'right' : 'left',
            writingDirection: isRTL ? 'rtl' : 'ltr',
          },
          style,
          error ? themedStyles.inputError : null,
        ]}
        placeholderTextColor={theme.colors.textMuted}
        {...props}
      />
      {error && (
        <Text
          style={[themedStyles.error, { textAlign: isRTL ? 'right' : 'left' }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const createStyles = ({ colors }: CustomTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.sm,
    },
    input: {
      ...FONT_STYLES.regular,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      fontSize: 20,
      backgroundColor: colors.surface,
      color: colors.text,
      maxHeight: 65,
    },
    inputError: {
      borderColor: colors.error,
    },
    label: {
      marginBottom: Spacing.xs,
    },
    labelText: {
      ...FONT_STYLES.medium,
      color: colors.textSecondary,
      fontSize: 15,
    },
    error: {
      ...FONT_STYLES.regular,
      color: colors.error,
      fontSize: 13,
      // marginTop: Spacing.xs,
    },
  });
