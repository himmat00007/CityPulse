import { useTheme, Spacing, BorderRadius, CustomTheme } from '@theme/index';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { FONT_STYLES } from '@utils/fonts';

export type CommonButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function CommonButton({
  title,
  onPress,
  disabled,
  loading,
  style,
  textStyle,
}: CommonButtonProps) {
  const theme = useTheme();
  const themedStyles = createStyles(theme);
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        themedStyles.button,
        isDisabled && themedStyles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.secondary} />
      ) : (
        <Text style={[themedStyles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const createStyles = ({ colors }: CustomTheme) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      marginVertical: Spacing.sm,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    buttonDisabled: {
      backgroundColor: colors.textMuted,
      opacity: 0.6,
    },
    buttonText: {
      ...FONT_STYLES.medium,
      fontSize: 18,
      color: colors.secondary,
    },
  });
