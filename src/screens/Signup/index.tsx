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
import { saveUser } from '@common/storage';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import { validateForm } from '@utils/validation';
import { createStyles } from './styles';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  const handleSignup = async () => {
    setErrors({});
    setLoading(true);

    const validation = validateForm(email, password, name);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (name) {
        await userCredential.user.updateProfile({ displayName: name });
      }
      const user = {
        name: name || userCredential.user.displayName || '',
        email: userCredential.user.email || '',
        uid: userCredential.user.uid,
      };
      await saveUser(user);
    } catch (e: any) {
      setErrors({ general: e.message || t('auth.signupFailed') });
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (errors.name) {
      const newErrors = { ...errors };
      delete newErrors.name;
      setErrors(newErrors);
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
      <CustomHeader title={t('auth.signUp')} />

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
            placeholder={t('auth.name')}
            value={name}
            onChangeText={handleNameChange}
          />
          {errors.name && (
            <RTLText style={themedStyles.errorText}>{t(errors.name)}</RTLText>
          )}

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
            title={t('auth.signUp')}
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
          />

          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <RTLText style={themedStyles.switchText}>
              {t('auth.alreadyHaveAccount')} {t('auth.login')}
            </RTLText>
          </TouchableOpacity>
        </RTLView>
      </KeyboardAwareScrollView>
    </View>
  );
}
