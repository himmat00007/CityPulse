import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, CustomTheme } from '@theme/index';

export const createStyles = ({ colors }: CustomTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        languageSection: {
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.md,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderLight,
            alignItems: 'center',
        },
        languageLabel: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.textSecondary,
            marginBottom: Spacing.sm,
        },
        languageToggle: {
            backgroundColor: 'transparent',
        },
        subContainer: {
            padding: Spacing.md,
        },
        eventCard: {
            padding: Spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderLight,
            backgroundColor: colors.background,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing.sm,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
        },
        eventContent: {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        eventInfo: {
            flex: 1,
        },
        eventName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: Spacing.xs,
            color: colors.text,
        },
        eventDate: {
            fontSize: 14,
            color: colors.textMuted,
        },
        cardFavoriteButton: {
            padding: Spacing.xs,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.borderLight,
        },
        emptyText: {
            textAlign: 'center',
            marginTop: Spacing.xxl,
            color: colors.textMuted,
            fontSize: 16,
        },
    });
