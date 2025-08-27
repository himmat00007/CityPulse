import { StyleSheet } from 'react-native';
import { Spacing, CustomTheme } from '@theme/index';
import { FONT_STYLES } from '@utils/fonts';

export const createStyles = ({ colors }: CustomTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
            paddingVertical: Spacing.lg,
        },
        formContainer: {
            paddingHorizontal: Spacing.md,
        },
        languageToggle: {
            marginTop: Spacing.lg,
            marginBottom: Spacing.lg,
            alignSelf: 'center',
        },
        logo: {
            width: 120,
            height: 120,
            alignSelf: 'center',
            marginBottom: Spacing.xl,
            marginTop: Spacing.md,
            borderRadius: Spacing.xl,
        },
        errorText: {
            ...FONT_STYLES.regular,
            color: colors.error,
            marginBottom: Spacing.sm,
            fontSize: 14,
        },
        switchText: {
            ...FONT_STYLES.regular,
            color: colors.primary,
            textAlign: 'center',
            marginTop: Spacing.md,
            textDecorationLine: 'underline',
        },
    });
