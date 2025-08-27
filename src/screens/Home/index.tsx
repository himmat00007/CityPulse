import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import CommonButton from '@components/CommonButton';
import Input from '@components/Input';
import LanguageToggle from '@components/LanguageToggle';
import RTLText from '@components/RTLText';
import RTLView from '@components/RTLView';
import { fetchEvents } from '@common/api';
import CustomHeader from '@components/CustomHeader';
import FavoriteButton from '@components/FavoriteButton';
import { useFavorites } from '@context/FavoritesContext';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import { EventItem } from '@common/types';
import { createStyles } from './styles';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleToggleFavorite = async (event: EventItem) => {
    if (!user) {
      Alert.alert(t('auth.pleaseSignIn'), t('auth.signInRequired'));
      return;
    }

    try {
      await toggleFavorite(event);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert(t('common.error'), t('favorites.failedToUpdateFavorites'));
    }
  };

  const searchEvents = async () => {
    if (!keyword.trim() && !city.trim()) {
      Alert.alert(t('common.error'), 'Please enter city or keyword');
      return;
    }
    setLoading(true);
    setHasSearched(true);
    Keyboard.dismiss();
    try {
      const data = await fetchEvents(keyword, city);
      setEvents(data._embedded?.events || []);
    } catch (e) {
      setEvents([]);
    }
    setLoading(false);
  };

  const renderItem: ListRenderItem<EventItem> = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetails', { event: item })}
      style={themedStyles.eventCard}
    >
      <RTLView row style={themedStyles.eventContent}>
        <View style={themedStyles.eventInfo}>
          <RTLText style={themedStyles.eventName}>{item.name}</RTLText>
          <RTLText style={themedStyles.eventDate}>
            {item.dates?.start?.localDate}
          </RTLText>
        </View>
        {user && (
          <FavoriteButton
            isFavorite={isFavorite(item.id)}
            onPress={() => handleToggleFavorite(item)}
            size={20}
            style={themedStyles.cardFavoriteButton}
          />
        )}
      </RTLView>
    </TouchableOpacity>
  );

  return (
    <View style={themedStyles.container}>
      <CustomHeader
        showProfileIcon={true}
        showFavoritesIcon={true}
        title={t('events.searchEvents')}
      />

      <View style={themedStyles.languageSection}>
        <RTLText style={themedStyles.languageLabel}>
          {t('profile.language')}
        </RTLText>
        <LanguageToggle showTitle={false} style={themedStyles.languageToggle} />
      </View>

      <View style={themedStyles.subContainer}>
        <Input
          placeholder={t('events.searchEvents')}
          value={keyword}
          onChangeText={setKeyword}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        />
        <Input
          placeholder={t('location.searchLocation')}
          value={city}
          onChangeText={setCity}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        />
        <CommonButton
          title={t('common.search') || 'Search'}
          onPress={searchEvents}
          loading={loading}
          disabled={loading}
        />
      </View>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={themedStyles.subContainer}
        ListEmptyComponent={
          hasSearched && !loading ? (
            <RTLText style={themedStyles.emptyText}>
              {t('events.noEventsFound')}
            </RTLText>
          ) : null
        }
      />
    </View>
  );
}
