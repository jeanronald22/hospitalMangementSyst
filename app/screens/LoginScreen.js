import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import CustomInput from "../../components/CustomInput";
import CustomModal from "../../components/CustomModal";
import { authenticateUser } from "../../services/AuthService";

const LoginScreen = ({ navigation }) => {
  //!---------------------------------------definiton des hooks-------------------------------------------------------
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //!-----------------------------------------definition des fonctions-----------------------------------------------
  // fonction useEffer
  useEffect(() => {
    const KeyboardRemoveHanler = () => {};
    const keyboardShowSubscription = Keyboard.addListener(
      "keyboardDidHide",
      KeyboardRemoveHanler
    );
    return keyboardShowSubscription?.remove();
  }, []);
  //masquer le clavier
  function dismissKeyboard() {
    Keyboard.dismiss();
  }
  // fonction de connexion
  const handlerConnexction = async () => {
    // TODO : connecter l'utilisateur avec les données de la base de données
    if (!username || !password) {
      setErrorMessage("Les Champs ne doivent pas etre vide");
      setModalVisible(true);
    }
    try {
      // connexio au serveur
      const response = await authenticateUser(username, password);
      console.log(response);
      navigation.replace("Main", response);
    } catch (error) {
      setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
      setModalVisible(true);
    }
  };
  //!--------------------------------------definition foncion de retour-------------------------------------------
  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, { padding: 16 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={[globalStyles.header, { marginTop: 20 }]}>
              Connexion
            </Text>
            <Image
              source={require("../../assets/images/Login-rafiki (1).png")}
              style={styles.image}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.input}>
              <Text style={[globalStyles.text, { marginVertical: 7 }]}>
                Nom utilisateur
              </Text>
              <CustomInput
                placeholder="Entrez votre nom utilisateur ici !"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.input}>
              <Text style={[globalStyles.text, { marginVertical: 7 }]}>
                Mot de passe
              </Text>
              <CustomInput
                value={password}
                onChangeText={setpassword}
                placeholder="***********************"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={[globalStyles.button, { marginVertical: 20 }]}
              onPress={handlerConnexction}
            >
              <Text style={globalStyles.buttonText}>Connexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={errorMessage}
        image={require("../../assets/images/Feeling sorry-rafiki.png")}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: "red",
    width: "100%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    // backgroundColor: "yellow",
    marginTop: 30,
    height: "50%",
    // justifyContent: "center",
  },
});
export default LoginScreen;
