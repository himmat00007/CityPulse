import React from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView as RNKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLanguage } from '@context/LanguageContext';

interface KeyboardAwareScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  enableOnAndroid?: boolean;
  enableAutomaticScroll?: boolean;
  extraHeight?: number;
  extraScrollHeight?: number;
  resetScrollToCoords?: { x: number; y: number };
  scrollEnabled?: boolean;
}

export default function KeyboardAwareScrollView({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  enableOnAndroid = true,
  enableAutomaticScroll = true,
  extraHeight = 120,
  extraScrollHeight = 120,
  resetScrollToCoords = { x: 0, y: 0 },
  scrollEnabled = true,
}: KeyboardAwareScrollViewProps) {
  const { isRTL } = useLanguage();

  return (
    <RNKeyboardAwareScrollView
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingBottom: 20,
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      enableOnAndroid={enableOnAndroid}
      enableAutomaticScroll={enableAutomaticScroll}
      extraHeight={extraHeight}
      extraScrollHeight={extraScrollHeight}
      resetScrollToCoords={resetScrollToCoords}
      scrollEnabled={scrollEnabled}
      enableResetScrollToCoords={false}
      viewIsInsideTabBar={false}
    >
      {children}
    </RNKeyboardAwareScrollView>
  );
}
