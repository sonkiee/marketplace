import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Images } from "@/constants/Images";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ route }) => ({
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#ffffff", // Background color for the drawer
            width: 240, // Adjust the width of the drawer
          },
          drawerActiveTintColor: "#fff", // Text color for active item
          drawerInactiveTintColor: "#333", // Text color for inactive item
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          // drawerActiveBackgroundColor: "#e91e63", // Background color for active item
        })}
      >
        <Drawer.Screen
          name="sneakers"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.sneakers} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  Sneakers
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="skincare"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.skincare} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  Skincare
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="gadgets"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.gadgets} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  Gadgets
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="fashion"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.fashion} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  Fashion
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="appliances"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.appliances} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  appliances
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="health"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.health} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  health
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="heels"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.heelz} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  heels
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="home-office"
          options={{
            drawerLabel: ({ focused }) => (
              <View
                style={[
                  styles.drawerItem,
                  focused ? styles.activeDrawerItem : {},
                ]}
              >
                <Image source={Images.homeandoffice} />
                <Text
                  style={[
                    styles.drawerLabel,
                    { color: focused ? "#fff" : "#333" },
                  ]}
                >
                  home & office
                </Text>
              </View>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 122,
    height: 50,
  },
  activeDrawerItem: {
    backgroundColor: "#e91e63",
  },
  drawerLabel: {
    marginLeft: 10,
    fontSize: 16,
    textTransform: "capitalize",
  },
});
