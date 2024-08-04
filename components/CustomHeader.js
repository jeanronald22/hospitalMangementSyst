import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import globalStyles from "../assets/syles generaux/globalStyle";
import { useNavigation } from "@react-navigation/native";

/**
 *
 * @origin  designi la roue vers la quelle le composant retrournera
 * @title   le title du header  desi
 * @returns un comoosant
 */
const CustomHeader = ({ origin, title }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={styles.headerStyle}>
      <TouchableOpacity
        onPress={() => navigation.goBack(origin)}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={30}
          color={colors.blueFonce}
        />
      </TouchableOpacity>
      <View
        style={{
          marginHorizontal: 20,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={globalStyles.header}>{title}</Text>
      </View>
    </Appbar.Header>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.white,
    alignItems: "center",
  },
});
