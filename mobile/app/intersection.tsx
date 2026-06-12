import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import { Images } from "@/constants/Images";

const Intersection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setCurrentImage(1);
    }, 4000);

    return () => {
      clearTimeout(firstTimer);
      //   clearTimeout(secondTimer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
        onPress={() => router.replace("/home")}
      >
        <Image source={Images.frame} style={styles.image} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Intersection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    // opacity: 0.8,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  icon: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
});
