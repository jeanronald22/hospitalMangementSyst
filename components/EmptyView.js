import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../assets/colors/colors";
import { FAB } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomEmtyView = ({ imageSource, title, subTitile, handlePress }) => {
  const text = `si le problème perciste contacter votre administrateur`;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={28}
              color={colors.blueFonce}
            />
          </TouchableOpacity>
        </View>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{`${subTitile}`}</Text>
        <FAB
          label="Ajouter un Rendez-vous"
          icon={"plus"}
          style={{
            marginTop: 20,
            backgroundColor: colors.bleuClaire,
            fontSize: 18,
          }}
          color={colors.white}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

export default CustomEmtyView;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imgContainer: {
    width: "100%",
    height: "70%",
    // backgroundColor: "blue",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    // backgroundColor: "red",
    height: "20%",
    alignItems: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    textTransform: "none",
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
  },
  defaulteText: {
    color: colors.bleuMoyen,
    fontFamily: "Roboto_100Thin_Italic",
  },
});
