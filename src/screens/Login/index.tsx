import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Input from '@components/Input';
import CustomHeader from '@components/CustomHeader';
import CommonButton from '@components/CommonButton';
import LanguageToggle from '@components/LanguageToggle';
import RTLView from '@components/RTLView';
import RTLText from '@components/RTLText';
import KeyboardAwareScrollView from '@components/KeyboardAwareScrollView';
import { auth } from '@common/firebase';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import { validateForm } from '@utils/validation';
import { createStyles } from './styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);

    const validation = validateForm(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      setErrors({ general: e.message || t('auth.loginFailed') });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      const newErrors = { ...errors };
      delete newErrors.password;
      setErrors(newErrors);
    }
  };

  return (
    <View style={themedStyles.container}>
      <CustomHeader title={t('auth.login')} />

      <KeyboardAwareScrollView
        style={themedStyles.scrollView}
        contentContainerStyle={themedStyles.scrollContent}
        enableOnAndroid={true}
        extraHeight={150}
        extraScrollHeight={150}
        keyboardShouldPersistTaps="handled"
      >
        <RTLView style={themedStyles.formContainer}>
          <LanguageToggle
            style={themedStyles.languageToggle}
            showTitle={false}
          />

          <Image
            source={require('@assets/logo.png')}
            style={themedStyles.logo}
          />

          <Input
            placeholder={t('auth.email')}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <RTLText style={themedStyles.errorText}>{t(errors.email)}</RTLText>
          )}

          <Input
            placeholder={t('auth.password')}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
          {errors.password && (
            <RTLText style={themedStyles.errorText}>
              {t(errors.password)}
            </RTLText>
          )}

          {errors.general && (
            <RTLText style={themedStyles.errorText}>{errors.general}</RTLText>
          )}

          <CommonButton
            title={t('auth.login')}
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
          />

          <TouchableOpacity onPress={() => navigation.replace('Signup')}>
            <RTLText style={themedStyles.switchText}>
              {t('auth.dontHaveAccount')} {t('auth.signUp')}
            </RTLText>
          </TouchableOpacity>
        </RTLView>
      </KeyboardAwareScrollView>
    </View>
  );
}
