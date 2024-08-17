import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";

const CustomDateTimePickerAndroid = (mode = "date", onChange, value) => {
  return (
    <View>
      {DateTimePickerAndroid.open({
        mode: mode,
        value: value,
        onChange: onChange,
        is24Hour: true,
      })}
    </View>
  );
};

export default CustomDateTimePickerAndroid;

const styles = StyleSheet.create({});
