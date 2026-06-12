import * as React from "react";
import { Platform, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen"; // Correct import
import { Stack, router } from "expo-router";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function App() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="intersection"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="location"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="location-search"
        options={{
          headerTitle: "Search for your location",
          headerTitleStyle: {
            color: "black",
            fontSize: 18,
          },
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="details/[id]"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent", // semi-transparent white
              }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => router.replace("/home")}
            >
              <Ionicons name="arrow-back-outline" size={20} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => router.push("/cart")}
            >
              <Ionicons name="cart" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="check-out"
        options={{
          headerTitle: "Check out",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="add-card"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="verify-code"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="order-details"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent", // semi-transparent white
              }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back-outline" size={20} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => router.push("/cart")}
            >
              <Ionicons name="cart" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="create-store"
        options={{
          headerTitle: "Store Information",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="product-setup"
        options={{
          headerTitle: " Product setup",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="store-delivery-method"
        options={{
          headerTitle: "Shipping and delivery",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="store-payment"
        options={{
          headerTitle: "Payment method",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="store-policy"
        options={{
          headerTitle: "Store Policies",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="store-review"
        options={{
          headerTitle: "Store Review",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerTitle: "Notifications",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="saved-items"
        options={{
          headerTitle: " Saved Items",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="faq"
        options={{
          headerTitle: "Frequently Asked Questions",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.canGoBack()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{
          headerTitle: "Privacy Policy",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.canGoBack()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="about-us"
        options={{
          headerTitle: "About Us",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.canGoBack()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 2,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
});
