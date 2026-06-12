import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(83); // 1:23 in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.lockIcon}>
            <Image source={require("@/assets/images/locked.png")} />
          </View>
        </View>

        <Text style={styles.instruction}>
          Please enter the 4 digit OTP code sent to Johndoe@gmail.com
        </Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <Text style={styles.resendText}>
          Resend code in{" "}
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </Text>

        <TouchableOpacity
          onPress={() => router.navigate("/new-password")}
          style={styles.proceedButton}
        >
          <Text style={styles.proceedButtonText}> Verify </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

export default VerifyEmail;
