import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '@navigation/AppNavigator';
import CustomHeader from '@components/CustomHeader';
import FavoriteButton from '@components/FavoriteButton';
import { useFavorites } from '@context/FavoritesContext';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import { EventItem } from '@common/types';
import RTLView from '@components/RTLView';
import RTLText from '@components/RTLText';
import { createStyles } from './styles';

export default function FavoritesScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { user } = useAuth();
  const { favorites, isLoading, isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const themedStyles = createStyles(theme);

  const handleToggleFavorite = async (event: EventItem) => {
    try {
      await toggleFavorite(event);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert(t('common.error'), t('favorites.failedToUpdateFavorites'));
    }
  };

  const renderItem = ({ item }: { item: EventItem }) => {
    const mainImage =
      item.images?.find(img => img.ratio === '16_9')?.url ||
      item.images?.[0]?.url;

    const venue = item._embedded?.venues?.[0];

    const date = item.dates?.start?.localDate;
    const time = item.dates?.start?.localTime;

    return (
      <TouchableOpacity
        style={themedStyles.eventCard}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        <RTLView style={themedStyles.eventContent}>
          {mainImage && (
            <Image
              source={{ uri: mainImage }}
              style={[
                themedStyles.eventImage,
                isRTL && themedStyles.eventImageRTL,
              ]}
              resizeMode="cover"
            />
          )}
          <View style={themedStyles.eventInfo}>
            <RTLView style={themedStyles.eventHeader}>
              <RTLText style={themedStyles.eventName} numberOfLines={2}>
                {item.name}
              </RTLText>
              <FavoriteButton
                isFavorite={isFavorite(item.id)}
                onPress={() => handleToggleFavorite(item)}
                size={20}
                style={themedStyles.smallFavoriteButton}
              />
            </RTLView>
            <RTLText style={themedStyles.eventDate}>
              {date} {time ? `${t('favorites.at')} ${time}` : ''}
            </RTLText>
            {venue && (
              <RTLText style={themedStyles.eventVenue} numberOfLines={1}>
                {venue.name}
                {venue.city?.name ? `, ${venue.city.name}` : ''}
              </RTLText>
            )}
          </View>
        </RTLView>
      </TouchableOpacity>
    );
  };

  if (!user) {
    return (
      <RTLView style={themedStyles.container}>
        <CustomHeader
          onBack={() => navigation.goBack()}
          title={t('favorites.myFavorites')}
        />
        <View style={themedStyles.centeredContainer}>
          <RTLText style={themedStyles.emptyText}>
            {t('favorites.pleaseSignInFavorites')}
          </RTLText>
        </View>
      </RTLView>
    );
  }

  return (
    <RTLView style={themedStyles.container}>
      <CustomHeader
        onBack={() => navigation.goBack()}
        title={t('favorites.myFavorites')}
      />
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          themedStyles.listContainer,
          favorites.length === 0 && themedStyles.centeredContainer,
        ]}
        ListEmptyComponent={
          <View style={themedStyles.emptyContainer}>
            <RTLText style={themedStyles.emptyText}>
              {isLoading ? t('common.loading') : t('favorites.noFavorites')}
            </RTLText>
            {!isLoading && (
              <RTLText style={themedStyles.emptySubtext}>
                {t('favorites.noFavoritesDescription')}
              </RTLText>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </RTLView>
  );
}
