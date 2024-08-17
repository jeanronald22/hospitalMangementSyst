import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import globalStyles from "../assets/syles generaux/globalStyle";

const IconToggle = ({ name, title }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={name} size={20} color={colors.bleuMoyen} />
      <Text style={globalStyles.text}>{title}</Text>
    </View>
  );
};

export default IconToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-around",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
