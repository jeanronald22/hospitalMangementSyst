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
const CustomHeader = ({ origin, title, subtitle, image = true }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {image && (
        <TouchableOpacity onPress={() => navigation.goBack(origin)}>
          <MaterialIcons
            name="keyboard-backspace"
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>
      )}
      <View style={styles.text}>
        <Text style={[globalStyles.header, { color: colors.white }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, globalStyles.subtitle]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
  },
  subtitle: {
    paddingTop: 20,
    fontSize: 11,
  },
});
