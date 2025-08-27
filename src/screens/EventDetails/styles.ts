import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, CustomTheme } from '@theme/index';

export const createStyles = ({ colors }: CustomTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            padding: Spacing.md,
        },
        image: {
            width: '100%',
            height: 200,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing.md,
            backgroundColor: colors.surface,
        },
        titleContainer: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: Spacing.xs,
        },
        title: {
            flex: 1,
            fontSize: 24,
            fontWeight: 'bold',
            marginHorizontal: Spacing.sm,
            color: colors.text,
        },
        favoriteButton: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
        },
        date: {
            fontSize: 16,
            marginBottom: Spacing.xs,
            color: colors.textMuted,
        },
        venue: {
            fontSize: 15,
            marginBottom: Spacing.xs,
            color: colors.textMuted,
        },
        genre: {
            fontSize: 15,
            marginBottom: Spacing.md,
            color: colors.textMuted,
        },
        button: {
            backgroundColor: colors.primary,
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.xl,
            borderRadius: BorderRadius.sm,
            marginBottom: Spacing.sm,
        },
        buttonText: {
            color: colors.surface,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        socialButton: {
            backgroundColor: colors.surface,
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.lg,
            borderRadius: BorderRadius.sm,
            marginBottom: Spacing.md,
            borderWidth: 1,
            borderColor: colors.border,
        },
        socialText: {
            color: colors.primary,
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        mapContainer: {
            height: 300,
            width: '100%',
            borderRadius: BorderRadius.md,
            overflow: 'hidden',
            marginTop: Spacing.md,
            marginBottom: Spacing.md,
        },
        map: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        fullMapButtonOverlay: {
            position: 'absolute',
            bottom: Spacing.sm,
            backgroundColor: colors.primary,
            paddingVertical: Spacing.xs,
            paddingHorizontal: Spacing.lg,
            borderRadius: BorderRadius.lg,
            elevation: 3,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        fullMapButtonText: {
            color: colors.surface,
            fontSize: 14,
            fontWeight: 'bold',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            marginTop: Spacing.sm,
            fontSize: 16,
            color: colors.textMuted,
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: Spacing.lg,
        },
        errorText: {
            fontSize: 16,
            color: colors.textMuted,
            textAlign: 'center',
        },
    });
