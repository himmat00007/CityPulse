# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Google Play Services and Maps
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# React Native Maps
-keep class com.airbnb.android.react.maps.** { *; }
-keep class com.google.android.libraries.maps.** { *; }
-dontwarn com.google.android.libraries.maps.**

# Keep Firebase classes
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**
