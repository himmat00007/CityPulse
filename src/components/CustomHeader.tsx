import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useLanguage } from '@context/LanguageContext';
import { FONT_STYLES } from '@utils/fonts';
import { useTheme, Spacing, BorderRadius, CustomTheme } from '@theme/index';
import RTLView from './RTLView';
import RTLText from './RTLText';

export type CustomHeaderProps = {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  onBack?: () => void;
  showProfileIcon?: boolean;
  showFavoritesIcon?: boolean;
};

type CommonHeaderProps = {
  themedStyles: any;
  onBack?: () => void;
  showProfileIcon?: boolean;
  showFavoritesIcon?: boolean;
  navigation: any;
};

const BackButton = ({
  onBack,
  themedStyles,
  isRTL,
}: {
  onBack?: () => void;
  themedStyles: any;
  isRTL: boolean;
}) => {
  if (!onBack) return null;

  return (
    <TouchableOpacity onPress={onBack}>
      <Image
        source={require('@assets/back.png')}
        style={[
          themedStyles.backIcon,
          isRTL && { transform: [{ scaleX: -1 }] },
        ]}
      />
    </TouchableOpacity>
  );
};

const ActionIcons = ({
  showFavoritesIcon,
  showProfileIcon,
  themedStyles,
  navigation,
}: {
  showFavoritesIcon?: boolean;
  showProfileIcon?: boolean;
  themedStyles: any;
  navigation: any;
}) => (
  <RTLView row style={themedStyles.right}>
    {showFavoritesIcon && (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Favorites' as never);
        }}
        style={themedStyles.iconButton}
      >
        <Text style={themedStyles.heartIcon}>♥</Text>
      </TouchableOpacity>
    )}
    {showProfileIcon && (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile' as never);
        }}
        style={themedStyles.iconButton}
      >
        <Image
          source={require('@assets/user.png')}
          style={themedStyles.profileIcon}
        />
      </TouchableOpacity>
    )}
  </RTLView>
);

const HeaderTitle = ({
  title,
  themedStyles,
  textStyle,
  isRTL,
}: {
  title: string;
  themedStyles: any;
  textStyle?: TextStyle;
  isRTL: boolean;
}) => (
  <View style={themedStyles.center}>
    <RTLText
      style={[
        themedStyles.headerText,
        {
          textAlign: 'center',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        textStyle as TextStyle,
      ]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {title}
    </RTLText>
  </View>
);

const LTRHeader = ({
  title,
  themedStyles,
  textStyle,
  onBack,
  showProfileIcon,
  showFavoritesIcon,
  navigation,
}: {
  title: string;
  themedStyles: any;
  textStyle?: TextStyle;
} & CommonHeaderProps) => {
  console.log('LTR Header');
  return (
    <>
      <View style={themedStyles.left}>
        <BackButton onBack={onBack} themedStyles={themedStyles} isRTL={false} />
      </View>

      <HeaderTitle
        title={title}
        themedStyles={themedStyles}
        textStyle={textStyle}
        isRTL={false}
      />

      <ActionIcons
        showFavoritesIcon={showFavoritesIcon}
        showProfileIcon={showProfileIcon}
        themedStyles={themedStyles}
        navigation={navigation}
      />
    </>
  );
};

const RTLHeader = ({
  title,
  themedStyles,
  textStyle,
  onBack,
  showProfileIcon,
  showFavoritesIcon,
  navigation,
}: {
  title: string;
  themedStyles: any;
  textStyle?: TextStyle;
} & CommonHeaderProps) => {
  console.log('RTL Header');
  return (
    <>
      <ActionIcons
        showFavoritesIcon={showFavoritesIcon}
        showProfileIcon={showProfileIcon}
        themedStyles={themedStyles}
        navigation={navigation}
      />

      <HeaderTitle
        title={title}
        themedStyles={themedStyles}
        textStyle={textStyle}
        isRTL={true}
      />

      <View style={themedStyles.left}>
        <BackButton onBack={onBack} themedStyles={themedStyles} isRTL={true} />
      </View>
    </>
  );
};

export default function CustomHeader({
  title,
  style,
  textStyle,
  children,
  onBack,
  showProfileIcon,
  showFavoritesIcon,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  const isCurrentlyRTL = language === 'ar';
  return (
    <View key={'custom-header'} style={[themedStyles.header]}>
      {isCurrentlyRTL ? (
        <RTLHeader
          title={title}
          themedStyles={themedStyles}
          textStyle={textStyle}
          onBack={onBack}
          showProfileIcon={showProfileIcon}
          showFavoritesIcon={showFavoritesIcon}
          navigation={navigation}
        />
      ) : (
        <LTRHeader
          title={title}
          themedStyles={themedStyles}
          textStyle={textStyle}
          onBack={onBack}
          showProfileIcon={showProfileIcon}
          showFavoritesIcon={showFavoritesIcon}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const createStyles = ({ colors }: CustomTheme) =>
  StyleSheet.create({
    header: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
      borderRadius: BorderRadius.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      paddingHorizontal: Spacing.md,
      width: '100%',
    },
    left: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    right: {
      flexDirection: 'row',
      width: 'auto',
      minWidth: 40,
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: Spacing.sm,
      padding: Spacing.xs,
    },
    heartIcon: {
      fontSize: 20,
      color: colors.accent,
    },
    headerText: {
      ...FONT_STYLES.bold,
      fontSize: 26,
      color: colors.textSecondary,
    },
    backIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    profileIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
  });
