import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getUser } from '@common/storage';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import CommonButton from '@components/CommonButton';
import LanguageToggle from '@components/LanguageToggle';
import CustomHeader from '@components/CustomHeader';
import RTLText from '@components/RTLText';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';

type User = {
  name: string;
  email: string;
};

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const { user: firebaseUser, signOut } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigation = useNavigation();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  useEffect(() => {
    (async () => {
      const data = await getUser();
      setUser(data as User | null);
    })();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const ProfileHeader = () => (
    <View style={themedStyles.profileHeader}>
      <View style={themedStyles.avatarContainer}>
        <View style={themedStyles.avatar}>
          <Text style={themedStyles.avatarText}>
            {firebaseUser?.email?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      </View>
      <RTLText style={themedStyles.userName}>
        {user?.name || firebaseUser?.email?.split('@')[0] || 'User'}
      </RTLText>
      <RTLText style={themedStyles.userEmail}>{firebaseUser?.email}</RTLText>
    </View>
  );

  return (
    <View style={themedStyles.container}>
      <CustomHeader
        title={t('common.profile')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        style={themedStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        <View style={themedStyles.section}>
          <RTLText style={themedStyles.sectionTitle}>
            {t('profile.language')}
          </RTLText>
          <View style={themedStyles.card}>
            <LanguageToggle style={themedStyles.languageToggle} />
          </View>
        </View>

        <View style={themedStyles.section}>
          <RTLText style={themedStyles.sectionTitle}>
            Account Information
          </RTLText>
          <View style={themedStyles.card}>
            <View style={themedStyles.infoItem}>
              <RTLText style={themedStyles.infoLabel}>
                {t('auth.email')}
              </RTLText>
              <RTLText style={themedStyles.infoValue}>
                {firebaseUser?.email}
              </RTLText>
            </View>

            <View style={themedStyles.divider} />

            <View style={themedStyles.infoItem}>
              <RTLText style={themedStyles.infoLabel}>User ID</RTLText>
              <RTLText style={themedStyles.infoValue} numberOfLines={1}>
                {firebaseUser?.uid}
              </RTLText>
            </View>

            {user?.name && (
              <>
                <View style={themedStyles.divider} />
                <View style={themedStyles.infoItem}>
                  <RTLText style={themedStyles.infoLabel}>Display Name</RTLText>
                  <RTLText style={themedStyles.infoValue}>{user.name}</RTLText>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={themedStyles.signOutSection}>
          <CommonButton
            title={t('auth.signOut')}
            onPress={handleSignOut}
            loading={false}
            disabled={false}
            style={themedStyles.signOutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}
