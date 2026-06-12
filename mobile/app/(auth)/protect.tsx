import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

import SuccessAnimation from "@/components/SuccessAnimation";
import { router } from "expo-router";

const Protect = () => {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const handleSkipPress = () => {
    setShowSuccessAnimation(false);
    // router.navigate("/location");

    router.navigate("/sign-in");
  };
  const protectOptions = [
    {
      title: "Google",
      route: "Home",
      icon: require("@/assets/icons/devicon_google.png"),
    },
    {
      title: "Facebook",
      route: "Home",
      icon: require("@/assets/icons/logos_facebook.png"),
    },
    {
      title: "Email",
      route: "Home",
      icon: require("@/assets/icons/dashicons_email.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>
        Please select the media to protect your account and sync details.
      </Text>
      <View style={styles.listContainer}>
        {protectOptions.map((item) => (
          <View key={item.title} style={styles.listItem}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.listItemText}>{item.title}</Text>
          </View>
        ))}
      </View>
      <CustomButton
        title="Skip"
        handlePress={() => setShowSuccessAnimation(true)}
      />
      {showSuccessAnimation && (
        <SuccessAnimation
          title="Well Done"
          description="You have successfully signed up for Rakayar. Welcome onboard!"
          buttonText=" Sign In Now"
          handlePress={handleSkipPress}
        />
      )}
    </SafeAreaView>
  );
};

export default Protect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    marginHorizontal: 15,
    color: "#333",
    textAlign: "center",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    marginBottom: 20,
  },
  listItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  listItemText: {
    marginHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
