import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme, Spacing, BorderRadius, CustomTheme } from '@theme/index';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export default function FavoriteButton({
  isFavorite,
  onPress,
  size = 24,
  style,
}: FavoriteButtonProps) {
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[themedStyles.favoriteButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          themedStyles.heartIcon,
          {
            fontSize: size,
            color: isFavorite ? theme.colors.accent : theme.colors.textMuted,
          },
        ]}
      >
        {isFavorite ? '❤️' : '🤍'}
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = ({ colors }: CustomTheme) =>
  StyleSheet.create({
    favoriteButton: {
      padding: Spacing.sm,
      borderRadius: BorderRadius.round,
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    heartIcon: {
      textAlign: 'center',
    },
  });
