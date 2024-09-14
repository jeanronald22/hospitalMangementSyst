import { StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { colors } from "../../assets/colors/colors";
import CustomHeader from "../../components/CustomHeader";

const PrescriptionByPatient = ({ route, navigation }) => {
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.bleuClaire }]}
    >
      <CustomHeader title={"Liste des prescription"} />
      <View style={[globalStyles.contain, { height: "100%" }]}></View>
    </View>
  );
};

export default PrescriptionByPatient;

const styles = StyleSheet.create({});
