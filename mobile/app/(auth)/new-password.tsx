import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Icons, Images } from "@/constants/Images";
import SuccessAnimation from "@/components/SuccessAnimation";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const handleSkipPress = () => {
    setShowSuccessAnimation(false);
    router.navigate("/sign-in");
  };

  const handleSetPassword = () => {
    setShowSuccessAnimation(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.lockIcon}>
            <Image
              source={Images.cloudedLock}
              style={{
                resizeMode: "contain",
              }}
            />
          </View>
        </View>

        <Text style={styles.instruction}>
          Your new password must be different from your previous password.
        </Text>
        <CustomInput
          icon={Icons.password}
          title="password"
          placeholder="New Password"
          value={password}
          handleChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <CustomInput
          icon={Icons.password}
          title="password"
          placeholder="Repeat Password"
          value={password}
          handleChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSetPassword}
          style={styles.proceedButton}
        >
          <Text style={styles.proceedButtonText}> Save</Text>
        </TouchableOpacity>
      </View>
      {showSuccessAnimation && (
        <SuccessAnimation
          title="Well Done"
          description="You have successfully changed your password. Please use your new password when signing in."
          buttonText="Sign In"
          handlePress={handleSkipPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  lockIcon: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 10,
  },
  instruction: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    fontSize: 24,
    textAlign: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#666",
  },
  timerText: {
    color: "#FF0000",
  },
  proceedButton: {
    backgroundColor: "#FF0000",
    borderRadius: 8,
    padding: 16,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  proceedButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NewPassword;
