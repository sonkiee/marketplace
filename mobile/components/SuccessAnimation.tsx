import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { useGlobalSearchParams } from "expo-router";

const SuccessAnimation = ({ handlePress, title, description, buttonText }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    // Control the animation programmatically if needed
    // animationRef.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop={false} // Set to false if you don't want the animation to loop
        ref={animationRef}
        style={styles.lottieView}
        source={require("../assets/Animation - 1722257781985.json")}
      />

      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark"
            size={40}
            color="white"
            accessibilityLabel="Success Icon"
          />
        </View>

        <Text style={styles.title}>{title || "title text"}</Text>
        <Text style={styles.subTitle}>{description || "description text"}</Text>
      </View>

      <CustomButton
        title={buttonText || "button text"}
        handlePress={handlePress} // Ensure `CustomButton` uses `onPress`
        accessibilityLabel="Action Button"
      />
    </View>
  );
};

export default SuccessAnimation;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    zIndex: 100,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  lottieView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: 80, // Adjust based on your design
  },
  iconContainer: {
    backgroundColor: "#FF002C",
    height: 60,
    width: 70,
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 16,

    marginVertical: 25,
    textAlign: "center",
    width: 300,
  },
});
