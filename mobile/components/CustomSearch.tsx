import {
  StyleSheet,
  Image,
  TextInput,
  View,
  TextInputProps,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";

// Define the props interface
interface CustomInputProps extends TextInputProps {
  title?: string;
  value: string;
  icon: ImageSourcePropType;
  placeholder?: string;
  containerStyle: ViewStyle;
  handleChangeText: (text: string) => void;
  clearInput?: () => void;
}

const CustomSearch: React.FC<CustomInputProps> = ({
  title,
  value,
  placeholder,
  icon,
  handleChangeText,
  clearInput,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderColor: isFocused ? "blue" : "#3b3b3b" },
      ]}
    >
      <Feather name="search" size={24} color="#ccc" />
      <TextInput
        placeholder={placeholder || "Search"}
        placeholderTextColor="#3b3b3b"
        onChangeText={handleChangeText}
        value={value}
        style={styles.textInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
          <Feather name="delete" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 30,
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  textInput: {
    padding: 10,
    fontSize: 16,

    color: "#3b3b3b",
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
    resizeMode: "contain",
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
});
