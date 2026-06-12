import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Fonts } from "@/constants/Fonts";
import PagerView from "react-native-pager-view";

const Index = () => {
  const [page, setPage] = useState(0);

  const onboarding = [
    {
      title: "Browse and Order at Your Fingertips with just a few taps.",
      description:
        "Explore products and place orders easily with just a few taps.",
      image: require("../assets/images/1.png"),
      color: "#f5f5f5",
    },
    {
      title: "Add to Cart",
      description:
        "Add your favorite items to your cart and proceed to checkout anytime.",
      image: require("../assets/images/2.png"),
      color: "#f5f5f5",
    },
    {
      title: "Track and Get Order Door Delivered!",
      description:
        "Track your order in real-time and get it delivered to your door.",
      image: require("../assets/images/3.png"),
      color: "#f5f5f5",
    },
    {
      title: "Pay on the Go!",
      description:
        "Choose from various payment options and pay securely on the go.",
      image: require("../assets/images/4.png"),
      color: "#000000",
    },
    {
      title: "Sell on Rakaya: Reach More Customers",
      description:
        "Rakayar isn't just for shoppers. Create your own store and start selling your products to thousands of customers. It's easy, fast and free!",
      image: require("../assets/images/5.png"),
      color: "#f5f5f5",
    },
  ];

  return (
    <>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={({ nativeEvent }) => setPage(nativeEvent.position)}
      >
        {onboarding.map((item, index) => (
          <ImageBackground
            key={index}
            source={item.image} // Use item.image here
            style={styles.backgroundImage}
          >
            <SafeAreaView style={styles.container}>
              <StatusBar style="dark" />
              <View style={styles.header}>
                <Image
                  source={require("../assets/images/icon.png")}
                  style={styles.logo}
                />
                <Pressable
                  style={styles.skipButton}
                  onPress={() => router.navigate("/sign-in")}
                >
                  <Text style={styles.skipText}>Skip</Text>
                </Pressable>
              </View>

              <View style={styles.footer}>
                <View style={styles.contentContainer}>
                  <Text style={[styles.title, { color: item.color }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.subtitle, { color: item.color }]}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.footerContainer}>
                  <View style={styles.progressContainer}>
                    {onboarding.map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.progressDot,
                          {
                            backgroundColor: i === page ? "red" : "#E0E0E0",
                            width: i === page ? 20 : 8,
                          },
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.callContainer}>
                    {page === onboarding.length - 1 ? (
                      <Pressable
                        onPress={() => router.replace("/sign-in")}
                        style={styles.getStartedButton}
                      >
                        <Text style={styles.buttonText}>Get Started</Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={({ pressed }) => [
                          styles.button,
                          {
                            backgroundColor: pressed ? "darkred" : "red",
                            opacity: page === onboarding.length - 1 ? 0.5 : 1,
                          },
                        ]}
                        // onPress={() => {
                        //   if (page < onboarding.length - 1) {
                        //     setPage((currPage) => currPage + 1);
                        //   }
                        // }}
                      >
                        <AntDesign name="arrowright" size={18} color="white" />
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        ))}
      </PagerView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  skipButton: {
    // borderWidth: 1,
    // borderColor: "#000000",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  skipText: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: Fonts.semiBold,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: Fonts.medium,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    paddingVertical: 20,
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: "row",
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  callContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "red",
    borderRadius: 8,
    width: 120,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 99999,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  pagerView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Index;
