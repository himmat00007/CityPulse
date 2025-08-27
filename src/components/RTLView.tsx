import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, I18nManager } from 'react-native';
import { useLanguage } from '@context/LanguageContext';

interface RTLViewProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  row?: boolean;
}

export default function RTLView({
  children,
  style,
  row = false,
}: RTLViewProps) {
  const { language } = useLanguage();

  const isCurrentlyRTL = language === 'ar';
  const rtlStyle: ViewStyle = row
    ? {
        flexDirection: (isCurrentlyRTL ? 'row-reverse' : 'row') as
          | 'row'
          | 'row-reverse',
      }
    : {};

  return <View style={[rtlStyle, style]}>{children}</View>;
}
