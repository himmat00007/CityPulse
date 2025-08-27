import { Theme as NavigationTheme, DefaultTheme, useTheme as useNavigationTheme } from '@react-navigation/native';

export const Colors = {
    light: {
        primary: 'rgb(106, 64, 193)',
        secondary: 'rgb(255, 255, 255)',
        background: '#ffffff',
        surface: '#ffffff',
        text: '#222',
        textSecondary: '#333',
        textMuted: '#666',
        border: '#e0e0e0',
        borderLight: '#eee',
        shadow: '#000',
        accent: '#ff4757',
        success: '#2ed573',
        warning: '#ffa502',
        error: '#ff3742',
    },
    dark: {
        primary: 'rgb(106, 64, 193)',
        secondary: 'rgb(34, 34, 34)',
        background: '#121212',
        surface: '#1e1e1e',
        text: '#fff',
        textSecondary: '#e0e0e0',
        textMuted: '#aaa',
        border: '#444',
        borderLight: '#333',
        shadow: '#000',
        accent: '#ff4757',
        success: '#2ed573',
        warning: '#ffa502',
        error: '#ff3742',
    },
};

export type ColorKeys = Record<string, string>;

const createTheme = <T extends ColorKeys>(colors: T): NavigationTheme & { colors: T } => ({
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colors,
    },
});

export const LightTheme = createTheme(Colors.light);
export const DarkTheme = createTheme(Colors.dark);

export type CustomTheme = typeof LightTheme;

function assertCustomTheme(theme: any): asserts theme is CustomTheme { }

export function useTheme(): CustomTheme {
    const theme = useNavigationTheme();
    assertCustomTheme(theme);
    return theme;
}

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const BorderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
};

export const FontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
};
