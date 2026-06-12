import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Places from "@/components/places";
import Where from "@/components/Where";
import SuccessAnimation from "@/components/SuccessAnimation";

const Location = () => {
  const [location, setLocation] = useState("Abuj");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const handleSkipPress = () => {
    setShowSuccessAnimation(false);
    router.navigate("/home");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.subContainer}>
        <View style={styles.infoContainer}>
          {location ? (
            <>
              <Text style={styles.infoText}>
                Please specify your location type below
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>
                Setting your current location is the quickest way to see your
                area
              </Text>
              <Text style={styles.shareText}>Share</Text>
            </>
          )}
        </View>
        <View style={styles.contentContainer}>
          {location ? (
            <Places
              showSuccessAnimation={showSuccessAnimation}
              setShowSuccessAnimation={setShowSuccessAnimation}
            />
          ) : (
            <Where location={location} />
          )}
        </View>
      </View>
      {showSuccessAnimation && (
        <SuccessAnimation
          title="Well Done"
          description=" You have successfully added location and are ready to shop. "
          buttonText="Start Shopping"
          handlePress={handleSkipPress}
        />
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  subContainer: {
    width: "100%",
    backgroundColor: "pink",
    height: "45%",
    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  infoContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  infoText: {
    fontSize: 13,
    width: "80%",
    fontWeight: "500",
  },
  shareText: {
    fontSize: 13,
    color: "#007AFF",
  },
  contentContainer: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    padding: 10,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
});
