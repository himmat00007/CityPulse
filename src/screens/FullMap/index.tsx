import CustomHeader from '@components/CustomHeader';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useLanguage } from '@context/LanguageContext';
import { useTheme } from '@theme/index';
import { createStyles } from './styles';

type FullMapScreenRouteProp = RouteProp<RootStackParamList, 'FullMapScreen'>;

export default function FullMapScreen() {
  const navigation = useNavigation();
  const route = useRoute<FullMapScreenRouteProp>();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const themedStyles = createStyles(theme);
  const ref = useRef<MapView>(null);
  const latitude = route.params?.latitude;
  const longitude = route.params?.longitude;
  const name = route.params?.name;
  const address = route.params?.address;
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.animateToRegion({
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    }, 200);
  }, [latitude, longitude]);
  if (!latitude || !longitude) {
    return (
      <View style={themedStyles.container}>
        <CustomHeader
          onBack={() => navigation.goBack()}
          title={t('events.venueMap')}
        ></CustomHeader>
        <View style={themedStyles.centered}>
          <Text
            style={[
              themedStyles.errorText,
              { textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('events.noLocationData')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={themedStyles.container}>
      <CustomHeader
        onBack={() => navigation.goBack()}
        title={t('events.venueMap')}
      />
      {latitude && longitude && (
        <MapView
          ref={ref}
          style={themedStyles.map}
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          zoomEnabled={true}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
            title={name}
            description={address}
            renderToHardwareTextureAndroid={true}
          />
        </MapView>
      )}
    </View>
  );
}
