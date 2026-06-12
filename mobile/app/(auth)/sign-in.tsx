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
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { Icons } from "@/constants/Images";
import Checkbox from "expo-checkbox";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Signin = () => {
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
    router.replace("/home");
    // Alert.alert("Welcome", "Sign-in successful!");
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
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>
              {" "}
              Welcome back, we've missed you!
            </Text>
          </View>

          <CustomInput
            icon={Icons.email}
            title="email"
            placeholder="Email address"
            value={form.email}
            handleChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />

          <CustomInput
            icon={Icons.password}
            title="password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.section}
            onPress={() => router.navigate("/forgot-password")}
          >
            <Text style={styles.paragraph}> Forgot password?</Text>
          </TouchableOpacity>
          <CustomButton title="Sign In" handlePress={handleSignUp} />

          <View style={styles.centeredRow}>
            <Text style={styles.paragraph}>Dont have account?</Text>
            <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
              <Text style={[styles.paragraph, styles.boldText]}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

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
