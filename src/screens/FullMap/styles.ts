import { StyleSheet } from 'react-native';
import { Spacing, CustomTheme } from '@theme/index';

export const createStyles = ({ colors }: CustomTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        map: {
            flex: 1,
        },
        centered: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        errorText: {
            color: colors.textMuted,
            fontSize: 16,
            paddingHorizontal: Spacing.md,
        },
    });
