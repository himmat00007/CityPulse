# CityPulse

A React Native application for discovering and managing events in your city with Firebase authentication and multi-language support.

## Demo Video

[Watch the demo video](https://drive.google.com/file/d/1SRK4K740A93YlXUKbxOAvoqIL7rvl1_s/view?usp=sharing)

## Features

- **Authentication**: Login and Signup using Firebase Auth with persistent sessions
- **Event Discovery**: Search events by keyword and city using Ticketmaster API
- **Event Details**: Detailed event pages with integrated map view
- **Favorites**: Save and manage favorite events with Firestore
- **Multi-language Support**: RTL layout implementation with language switching throughout the app
- **User Profile**: User Can View Profile Page
- **Session Persistence**: User sessions remain active when the app is closed and reopened

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (>= 18)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- iOS Simulator
- Android Emulator
- CocoaPods (for iOS dependencies)

## Setup Instructions

### 1. Install Dependencies

Navigate to the root directory and install npm dependencies:

```bash
npm i
```

### 2. iOS Setup

Install iOS dependencies using CocoaPods:

```bash
cd ios
pod install
cd ..
```

### 3. Running the Application

#### For Android:
```bash
npm run android
```

#### For iOS:
```bash
npm run ios
```

## Available Scripts

- `npm run android` - Run the app on Android emulator/device
- `npm run ios` - Run the app on iOS simulator/device
- `npm start` - Start the Metro bundler
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run android:release` - Build Android release APK
- `npm run android:bundle` - Build Android App Bundle
- `npm run ios:release` - Run iOS in release mode
- `npm run build:android` - Clean and build Android release
- `npm run build:ios` - Build iOS release for device

## Tech Stack

- **React Native 0.81.0**
- **TypeScript**
- **Firebase** (Auth, Firestore, Storage)
- **React Navigation** (Stack navigation)
- **i18next** (Internationalization)
- **React Native Maps**
- **AsyncStorage** (Local data persistence)

## Key Dependencies

- `@react-native-firebase/app` - Firebase core
- `@react-native-firebase/auth` - Firebase authentication
- `@react-native-firebase/firestore` - Firebase Firestore database
- `@react-native-firebase/storage` - Firebase storage
- `@react-navigation/native` - Navigation
- `react-i18next` - Internationalization
- `react-native-maps` - Map integration
- `react-native-localize` - Device locale detection

## Project Structure

```
src/
├── assets/          # Images and static assets
├── common/          # Shared utilities (API, Firebase, Storage, Types)
├── components/      # Reusable UI components
├── context/         # React Context providers (Auth, Favorites, Language)
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization files
├── navigation/      # Navigation configuration
├── screens/         # App screens/pages
├── theme/           # Theme and styling
└── utils/           # Utility functions
```



