import {
  HomeScreen,
  EventDetailsScreen,
  ProfileScreen,
  LoginScreen,
  SignupScreen,
  FullMapScreen,
  FavoritesScreen,
} from '@screens/index';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { LightTheme } from '@theme/index';
import { EventItem } from '@common/types';
import { useAuth } from '@context/AuthContext';

export type RootStackParamList = {
  Home: undefined;
  EventDetails: { event: EventItem };
  Profile: undefined;
  Login: undefined;
  Signup: undefined;
  Favorites: undefined;
  FullMapScreen: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer theme={LightTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="EventDetails"
                  component={EventDetailsScreen}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="FullMapScreen" component={FullMapScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
