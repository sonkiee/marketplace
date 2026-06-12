// TabLayout.tsx
import { Tabs } from "expo-router";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icons, Images } from "@/constants/Images";
import { router } from "expo-router";

// Define types
interface TabBarIconProps {
  size: number;
  color: string;
  icon: any; // Replace 'any' with a more specific type if possible
}

interface UserRoleContextType {
  role: string;
}

// Create context with default value
const UserRoleContext = React.createContext<UserRoleContextType>({
  role: "user",
});

const TabBarIcon: React.FC<TabBarIconProps> = ({ size, color, icon }) => (
  <Image
    source={icon}
    style={[
      styles.icon,
      {
        tintColor: color,
        width: size,
        height: size,
      },
    ]}
  />
);

const TabLayout: React.FC = () => {
  const { role: userRole } = useContext(UserRoleContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          height: 60,
          borderRadius: 30,
          marginBottom: 10,
          marginHorizontal: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={focused ? Icons.homeFocued : Icons.home}
              size={24}
              color={focused ? "#FF002CBF" : "#757575"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          headerShown: true,
          headerTitle: "Categories",
          headerTitleAlign: "left",
          headerRight: () => (
            <View style={styles.headerIconsContainer}>
              <TouchableOpacity
                onPress={() => router.navigate("/notification")}
              >
                <Ionicons name="notifications" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.navigate("/saved-items")}>
                <Image
                  source={Icons.heart}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={focused ? Icons.bookmarkFocued : Icons.bookmark}
              size={24}
              color={focused ? "#FF002CBF" : "#757575"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={focused ? Icons.lensFocused : Icons.lens}
              size={24}
              color={focused ? "#FF002CBF" : "#757575"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={focused ? Icons.cartFocued : Icons.cart}
              size={24}
              color={focused ? "#FF002CBF" : "#757575"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={focused ? Icons.profileFocused : Icons.profile}
              size={24}
              color={focused ? "#FF002CBF" : "#757575"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: "contain",
    margin: 5,
  },
  headerIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    gap: 15,
    paddingRight: 20,
  },
});

export default TabLayout;
