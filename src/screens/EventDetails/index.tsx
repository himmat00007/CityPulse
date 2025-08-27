import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomHeader from '@components/CustomHeader';
import FavoriteButton from '@components/FavoriteButton';
import RTLText from '@components/RTLText';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '@context/FavoritesContext';
import { useAuth } from '@context/AuthContext';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import { EventItem } from '@common/types';
import { createStyles } from './styles';

function openFullMap(venue: any, navigation: any) {
  if (venue?.location?.latitude && venue?.location?.longitude) {
    navigation.navigate('FullMapScreen', {
      latitude: Number(venue.location.latitude),
      longitude: Number(venue.location.longitude),
      name: venue.name,
      address: venue.address?.line1 || '',
    });
  }
}

type Props = {
  route: {
    params: {
      event: EventItem;
    };
  };
};

export default function EventDetailsScreen({ route }: Props) {
  const { event } = route.params;
  const navigation = useNavigation();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const handleToggleFavorite = async () => {
    if (!user) {
      Alert.alert(t('auth.pleaseSignIn'), t('auth.signInRequired'));
      return;
    }

    setIsTogglingFavorite(true);
    try {
      await toggleFavorite(event);
      Alert.alert(
        isFavorite(event.id)
          ? t('favorites.removedFromFavorites')
          : t('favorites.addedToFavorites'),
        isFavorite(event.id)
          ? t('favorites.eventRemovedFromFavorites')
          : t('favorites.eventAddedToFavorites'),
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert(t('common.error'), t('favorites.failedToUpdateFavorites'));
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const mainImage =
    event.images?.find(img => img.ratio === '16_9')?.url ||
    event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const genre = event.classifications?.[0]?.genre?.name;
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;

  return (
    <View style={themedStyles.container}>
      <CustomHeader
        showProfileIcon={true}
        showFavoritesIcon={true}
        onBack={() => navigation.goBack()}
        title={t('events.eventDetails')}
      />
      <ScrollView
        contentContainerStyle={[
          themedStyles.scrollContent,
          { alignItems: isRTL ? 'flex-end' : 'flex-start' },
        ]}
      >
        {mainImage && (
          <Image
            source={{ uri: mainImage }}
            style={themedStyles.image}
            resizeMode="cover"
          />
        )}
        <View
          style={[
            themedStyles.titleContainer,
            { flexDirection: isRTL ? 'row-reverse' : 'row' },
          ]}
        >
          <RTLText style={themedStyles.title}>{event.name}</RTLText>
          <FavoriteButton
            isFavorite={isFavorite(event.id)}
            onPress={handleToggleFavorite}
            style={themedStyles.favoriteButton}
          />
        </View>
        <RTLText style={themedStyles.date}>
          {date} {time ? `${isRTL ? 'في' : 'at'} ${time}` : ''}
        </RTLText>
        {venue && (
          <RTLText style={themedStyles.venue}>
            {t('events.venue')}: {venue.name}
            {venue.address?.line1 ? `, ${venue.address.line1}` : ''}
            {venue.city?.name ? `, ${venue.city.name}` : ''}
            {venue.country?.name ? `, ${venue.country.name}` : ''}
          </RTLText>
        )}
        {genre && (
          <RTLText style={themedStyles.genre}>
            {t('events.genre')}: {genre}
          </RTLText>
        )}
        <TouchableOpacity
          style={[
            themedStyles.button,
            { alignSelf: isRTL ? 'flex-end' : 'flex-start' },
          ]}
          onPress={() => Linking.openURL(event.url)}
        >
          <Text style={themedStyles.buttonText}>{t('events.buyTickets')}</Text>
        </TouchableOpacity>
        {event._embedded?.attractions?.[0]?.url &&
          typeof event._embedded.attractions[0].url === 'string' && (
            <TouchableOpacity
              style={[
                themedStyles.socialButton,
                { alignSelf: isRTL ? 'flex-end' : 'flex-start' },
              ]}
              onPress={() => {
                const artistUrl = event._embedded?.attractions?.[0]?.url;
                if (artistUrl) Linking.openURL(artistUrl);
              }}
            >
              <Text style={themedStyles.socialText}>
                {t('events.artistInfo')}
              </Text>
            </TouchableOpacity>
          )}
        {venue && venue.location?.latitude && venue.location?.longitude && (
          <View style={themedStyles.mapContainer}>
            <MapView
              style={themedStyles.map}
              initialRegion={{
                latitude: Number(venue.location.latitude),
                longitude: Number(venue.location.longitude),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              scrollEnabled={false}
              zoomEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: Number(venue.location.latitude),
                  longitude: Number(venue.location.longitude),
                }}
                title={venue.name}
                description={venue.address?.line1 || ''}
              />
            </MapView>
            <TouchableOpacity
              style={[
                themedStyles.fullMapButtonOverlay,
                { [isRTL ? 'left' : 'right']: 12 },
              ]}
              onPress={() => openFullMap(venue, navigation)}
            >
              <Text style={themedStyles.fullMapButtonText}>
                {t('events.openFullMap')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
