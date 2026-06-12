import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { Icons } from "@/constants/Images";
import Checkbox from "expo-checkbox";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    fullName: "",
  });

  const [isChecked, setChecked] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log("Form submitted", form);
    router.navigate("/protect");
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/logo-red.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>
              {" "}
              Fill the form below to set up your account
            </Text>
          </View>
          <CustomInput
            icon={Icons.person}
            title="fullName"
            placeholder="Enter Full Name"
            value={form.fullName}
            handleChangeText={(text) => handleChange("fullName", text)}
            keyboardType="default"
          />
          <CustomInput
            icon={Icons.email}
            title="email"
            placeholder="Email address"
            value={form.email}
            handleChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />
          <CustomInput
            icon={Icons.phone}
            title="phoneNumber"
            placeholder="Phone number"
            value={form.phoneNumber}
            handleChangeText={(text) => handleChange("phoneNumber", text)}
            keyboardType="phone-pad"
          />
          <CustomInput
            icon={Icons.password}
            title="password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Text style={styles.paragraph}> Remember password</Text>
          </View>
          <CustomButton title="Sign Up" handlePress={handleSignUp} />

          <View style={styles.centeredRow}>
            <Text style={styles.paragraph}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.navigate("/sign-in")}>
              <Text style={[styles.paragraph, styles.boldText]}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centeredRow}>
            <Text style={styles.textCenter}>
              By continuing you automatically accept our{" "}
              <Text
                style={styles.underline}
                onPress={() => handleLinkPress("https://example.com/terms")}
              >
                Terms and Conditions
              </Text>
              ,{" "}
              <Text
                style={styles.underline}
                onPress={() => handleLinkPress("https://example.com/privacy")}
              >
                Privacy Policy
              </Text>{" "}
              and{" "}
              <Text
                style={styles.underline}
                onPress={() => handleLinkPress("https://example.com/cookies")}
              >
                Cookies Policy
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 13,
  },
  checkbox: {
    margin: 8,
  },
  centeredRow: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "center",
    marginTop: 16,
  },
  textCenter: {
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
    color: "blue", // optional, to show it's a link
  },
  boldText: {
    fontWeight: "bold",
    color: "red",
  },
  logo: {
    alignSelf: "center",
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
});
