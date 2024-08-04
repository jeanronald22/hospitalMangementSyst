import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { colors } from "../assets/colors/colors";

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { fontFamily: "Roboto_400Regular" }]}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: colors.grisMoyen,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontFamily: "Roboto_400Regular",
    color: colors.blueFonce,
  },
});

export default CustomInput;
