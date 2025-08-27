import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, CustomTheme } from '@theme/index';

export const createStyles = ({ colors }: CustomTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        listContainer: {
            padding: Spacing.md,
        },
        centeredContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        eventCard: {
            backgroundColor: colors.background,
            borderRadius: BorderRadius.md,
            marginBottom: Spacing.md,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.borderLight,
        },
        eventContent: {
            flexDirection: 'row',
            padding: Spacing.md,
        },
        eventImage: {
            width: 80,
            height: 80,
            borderRadius: BorderRadius.sm,
            marginRight: Spacing.md,
            backgroundColor: colors.surface,
        },
        eventImageRTL: {
            marginRight: 0,
            marginLeft: Spacing.md,
        },
        eventInfo: {
            flex: 1,
            justifyContent: 'space-between',
        },
        eventHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: Spacing.xs,
        },
        eventName: {
            flex: 1,
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text,
            marginRight: Spacing.sm,
        },
        smallFavoriteButton: {
            padding: Spacing.xs,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.borderLight,
        },
        eventDate: {
            fontSize: 14,
            color: colors.textMuted,
            marginBottom: Spacing.xs,
        },
        eventVenue: {
            fontSize: 14,
            color: colors.textMuted,
        },
        emptyContainer: {
            alignItems: 'center',
            paddingHorizontal: Spacing.xxl,
        },
        emptyText: {
            fontSize: 18,
            color: colors.textMuted,
            textAlign: 'center',
            marginBottom: Spacing.sm,
        },
        emptySubtext: {
            fontSize: 16,
            color: colors.textMuted,
            textAlign: 'center',
        },
    });
