import React from 'react';
import { Text, TextStyle, I18nManager } from 'react-native';
import { useLanguage } from '@context/LanguageContext';
import { FONT_STYLES } from '@utils/fonts';

interface RTLTextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export default function RTLText({
  children,
  style,
  numberOfLines,
  ellipsizeMode,
}: RTLTextProps) {
  const { isRTL } = useLanguage();

  const rtlStyle: TextStyle = {
    ...FONT_STYLES.regular,
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  };

  return (
    <Text
      style={[rtlStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
}
