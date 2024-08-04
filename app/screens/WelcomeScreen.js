import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";

const WelcomeScreen = ({ navigation }) => {
  //!------------------------------------------------definiton des finctions---------------------------------------
  const handlerNavigation = () => {
    navigation.replace("Login");
  };
  //!--------------------------------------------------definitoon de la fonction de retour----------------------------
  return (
    <View style={[styles.container, globalStyles.container]}>
      {/* definition du style du container d'image */}
      <View style={styles.imageContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Image
            source={require("../../assets/images/Online Doctor-rafiki.png")}
            style={styles.welcomeImage}
          />
        </View>
      </View>
      {/* messgae et buttons de naviagtion*/}
      <View style={styles.messageContainer}>
        <Text style={[styles.title, globalStyles.header]}>
          Bienvenue à l'Application de Gestion Hospitalière
        </Text>
        <Text style={[styles.message, globalStyles.text]}>
          Cette application vous permet de gérer efficacement la prise en charge
          des patients au sein de notre établissement hospitalier. Veuillez vous
          connecter pour accéder aux différentes fonctionnalités disponibles
          selon votre rôle.
        </Text>
        <TouchableOpacity
          style={[globalStyles.button, styles.btn]}
          onPress={handlerNavigation}
        >
          <Text style={globalStyles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // backgroundColor: colors.white,
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    // backgroundColor: "yellow",
    width: "100%",
    height: "60%",
  },
  logoContainer: {
    width: "100%",
    height: "auto",
    // backgroundColor: "green",
    alignItems: "center",
  },
  welcomeContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
  },
  messageContainer: {
    height: "40",
    // backgroundColor: "purple",
    width: "100%",
    height: "40%",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    width: "100%",
  },
  btn: {
    width: "100%",
    marginVertical: 20,
  },
});
export default WelcomeScreen;
