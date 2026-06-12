import { TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="protect"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="forgot-password"
        options={{
          headerTitle: "Forgot Password",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="verify-email"
        options={{
          headerTitle: "Verify code",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="new-password"
        options={{
          headerShown: false,
          // headerTitle: "Generate new Password",
          // headerTitleAlign: "left",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => router.back()}>
          //     <Ionicons name="arrow-back-sharp" size={24} color="black" />
          //   </TouchableOpacity>
          // ),
        }}
      />
    </Stack>
  );
}
