import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "@/components/CustomInput";
import { Icons } from "@/constants/Images";
import CustomSearch from "@/components/CustomSearch";
import { StatusBar } from "expo-status-bar";

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearchInput = () => {
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <CustomSearch
        icon={Icons.search}
        value={searchQuery}
        handleChangeText={setSearchQuery}
        clearInput={clearSearchInput}
        placeholder="Search streets, cities, state..."
      />
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffff",
  },
});
