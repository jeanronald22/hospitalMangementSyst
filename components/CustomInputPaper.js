import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { colors } from "../assets/colors/colors";

const CustomInputPaper = ({
  label,
  value,
  onChangeText,
  style,
  showPicker,
  editable,
  type,
  placeholder,
  multiline,
}) => {
  const [showDate, setShowDate] = useState(showPicker);
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={style}
      theme={{
        colors: {
          primary: colors.bleuMoyen,
          background: colors.grisClair,
          backdrop: colors.grisClair,
        },
        animation: { scale: 2 },
      }}
      editable={editable}
      keyboardType={type}
      placeholder={placeholder}
      multiline={multiline}
    />
  );
};

export default CustomInputPaper;

const styles = StyleSheet.create({});
