import { useTheme, Spacing, BorderRadius, FontSizes, CustomTheme } from '@theme/index';

export const createThemedStyles = (styleCreator: (theme: CustomTheme) => any) => {
    return (theme: CustomTheme) => styleCreator(theme);
};
export const getShadowStyle = (colors: any, elevation: 'light' | 'medium' | 'heavy' = 'light') => {
    const shadowConfigs = {
        light: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
        },
        medium: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3,
        },
        heavy: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
        },
    };

    return shadowConfigs[elevation];
};
export const getCardStyle = (colors: any) => ({
    backgroundColor: colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...getShadowStyle(colors, 'light'),
});
export const getButtonStyle = (colors: any, variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
    const baseStyle = {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.md,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        ...getShadowStyle(colors, 'light'),
    };

    switch (variant) {
        case 'primary':
            return {
                ...baseStyle,
                backgroundColor: colors.primary,
            };
        case 'secondary':
            return {
                ...baseStyle,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            };
        case 'outline':
            return {
                ...baseStyle,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: colors.primary,
            };
        default:
            return baseStyle;
    }
};
export const getTextStyle = (colors: any, variant: 'heading' | 'body' | 'caption' | 'label' = 'body') => {
    const variants = {
        heading: {
            fontSize: FontSizes.xl,
            fontWeight: 'bold' as const,
            color: colors.text,
        },
        body: {
            fontSize: FontSizes.md,
            color: colors.text,
        },
        caption: {
            fontSize: FontSizes.sm,
            color: colors.textMuted,
        },
        label: {
            fontSize: FontSizes.sm,
            fontWeight: '600' as const,
            color: colors.textSecondary,
        },
    };

    return variants[variant];
};
