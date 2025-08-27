import { Platform } from 'react-native';

export const SYSTEM_FONTS = {
    ios: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
        light: 'System',
    },
    android: {
        regular: 'sans-serif',
        medium: 'sans-serif-medium',
        bold: 'sans-serif',
        light: 'sans-serif-light',
    },
};

export const getSystemFont = (weight: 'regular' | 'medium' | 'bold' | 'light' = 'regular') => {
    return Platform.select({
        ios: SYSTEM_FONTS.ios[weight],
        android: SYSTEM_FONTS.android[weight],
        default: SYSTEM_FONTS.android[weight],
    });
};

export const FONT_STYLES = {
    regular: {
        fontFamily: getSystemFont('regular'),
        fontWeight: '400' as const,
    },
    medium: {
        fontFamily: getSystemFont('medium'),
        fontWeight: Platform.select({
            ios: '500' as const,
            android: '400' as const,
            default: '400' as const,
        }),
    },
    bold: {
        fontFamily: getSystemFont('bold'),
        fontWeight: Platform.select({
            ios: '700' as const,
            android: '400' as const,
            default: '400' as const,
        }),
    },
    light: {
        fontFamily: getSystemFont('light'),
        fontWeight: Platform.select({
            ios: '300' as const,
            android: '400' as const,
            default: '400' as const,
        }),
    },
};
