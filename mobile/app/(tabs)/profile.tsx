import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Images } from "@/constants/Images";
import { router } from "expo-router";

const ProfileScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={Images.avatar} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Thompson Motunde</Text>
            <Text style={styles.email}>Thompson5@gmail.com</Text>
          </View>
        </View>

        <View style={styles.couponSection}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="star" size={24} color="green" />
            <Text style={styles.couponText}>GET 1000 NAIRA COUPON</Text>
          </View>
          <View style={styles.pointsSection}>
            <Text style={styles.pointsText}>You have 3 points</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: "0.3%" }]} />
            </View>
            <Text style={styles.pointsInfo}>
              Every time you make a purchase, you earn points that can be
              exchanged for 1000 NGN coupon upon reaching your goal
            </Text>
          </View>
        </View>

        <View style={styles.pointsSection}>
          <Text style={styles.pointsText}>You have 3 points</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: "0.3%" }]} />
          </View>
          <Text style={styles.pointsInfo}>
            Every time you make a purchase, you earn points that can be
            exchanged for 1000 NGN coupon upon reaching your goal
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.navigate("/create-store")}
          style={styles.createStoreButton}
        >
          <Text style={styles.createStoreText}>Create Store</Text>
        </TouchableOpacity>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => router.navigate(`${item.slug}`)}
              key={index}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
              {item.title === "Notifications" ? (
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              ) : (
                <Icon name="chevron-right" size={24} color="#000" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* <View style={styles.bottomNav}>
       
      </View> */}
    </SafeAreaView>
  );
};

const menuItems = [
  { title: "Notifications", slug: "/notification" },
  { title: "Faq", slug: "/faq" },
  { title: "Privacy Polciy", slug: "/privacy-policy" },
  { title: " About Us", slug: "/about-us" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#888",
  },
  couponSection: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    margin: 15,
    borderRadius: 8,
  },
  couponText: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  pointsSection: {
    padding: 15,
  },
  pointsText: {
    marginBottom: 10,
  },
  progressBar: {
    height: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "pink",
    borderRadius: 5,
  },
  pointsInfo: {
    marginTop: 10,
    color: "#888",
    fontSize: 12,
  },
  createStoreButton: {
    backgroundColor: "#000",
    padding: 15,
    margin: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  createStoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuSection: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    marginHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 16,
  },
  bottomNav: {
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default ProfileScreen;
