import { StyleSheet, Dimensions } from 'react-native';
import { Spacing, CustomTheme } from '@theme/index';

const { width } = Dimensions.get('window');

export const createStyles = ({ colors }: CustomTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.surface,
        },
        scrollContainer: {
            flex: 1,
        },
        profileHeader: {
            backgroundColor: colors.background,
            paddingVertical: Spacing.xxl,
            paddingHorizontal: Spacing.xl,
            alignItems: 'center',
            borderBottomLeftRadius: Spacing.xl,
            borderBottomRightRadius: Spacing.xl,
            marginBottom: Spacing.lg,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        avatarContainer: {
            marginBottom: Spacing.md,
        },
        avatar: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
        },
        avatarText: {
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.secondary,
        },
        userName: {
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
            marginBottom: Spacing.xs,
        },
        userEmail: {
            fontSize: 16,
            color: colors.textMuted,
            fontWeight: '400',
        },
        section: {
            marginBottom: Spacing.xl,
            paddingHorizontal: Spacing.lg,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: colors.text,
            marginBottom: Spacing.md,
        },
        card: {
            backgroundColor: colors.background,
            borderRadius: Spacing.md,
            padding: 0,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 1,
            borderColor: colors.borderLight,
        },
        languageToggle: {
            backgroundColor: 'transparent',
            padding: Spacing.lg,
            borderRadius: 0,
            borderWidth: 0,
        },
        infoItem: {
            padding: Spacing.lg,
        },
        infoLabel: {
            fontSize: 14,
            fontWeight: '500',
            color: colors.textMuted,
            marginBottom: Spacing.xs,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        infoValue: {
            fontSize: 16,
            fontWeight: '400',
            color: colors.text,
        },
        divider: {
            height: 1,
            backgroundColor: colors.borderLight,
            marginHorizontal: Spacing.lg,
        },
        signOutSection: {
            paddingHorizontal: Spacing.lg,
            paddingBottom: 40,
            marginTop: Spacing.lg,
        },
        signOutButton: {
            backgroundColor: colors.error,
            borderRadius: Spacing.md,
            height: 60,
            shadowColor: colors.error,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
    });
