import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../assets/syles generaux/globalStyle";
import {
  Button,
  Divider,
  Modal,
  PaperProvider,
  Portal,
  TextInput,
} from "react-native-paper";
import { colors } from "../../assets/colors/colors";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomSnackbar from "../../components/CustomSnackbar";
import { addPatients } from "../../api/dataService";
import CustomHeader from "../../components/CustomHeader";

const AddPatients = ({ route }) => {
  // !-------------------------------definitin des states ------------------------
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    phone: "",
    email: "",
    sexe: "M",
    dateDeNaissance: new Date(),
    temperature: 0,
    poids: 0,
    taille: 0,
    tension: 0,
    trueFormDate: "",
  });
  //!--------------------definition des visibilites--------------------
  const [visible, setVisible] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);
  // nom des differents erreurs possibles
  const [erros, setErros] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    phone: "",
    email: "",
  });
  // definitions des regles de validation de notre formulaire
  const validation = {
    nom: "Nom  requis",
    prenom: "Prénom  requis",
    adresse: "Adresse est requise",
    phone: "Téléphone est requis",
    email: "Email est requis",
  };

  // ! --------------------deifiontion des fonctions --------------------
  const showSnackBar = () => {
    setVisibleSnack(true);
    // il disparait apres 3 seconde pour plus d'info
    setTimeout(() => setVisibleSnack(false), 3000);
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const formatDate = (date) => {
    dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // foncrion de validations
  const validate = () => {
    const newErros = {}; //variable erreus qui contiendra tous les erreurs durant un tests
    // on test en occurence l'etat de la variables si elle est vide ou pas et si elle contient certains caractere ou nom
    if (!formData.nom) {
      newErros.nom = validation.nom;
    }
    if (!formData.prenom) {
      newErros.prenom = validation.prenom;
    }
    if (!formData.adresse) {
      newErros.adresse = validation.adresse;
    }
    if (!formData.phone || formData.phone.length !== 9) {
      newErros.phone = validation.phone;
    }
    if (!formData.email) {
      newErros.email = validation.email;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErros.email = "Email invalide";
      }
    }
    setErros(newErros);
    return Object.keys(newErros).length === 0; //on verifier si il y'a d'erreur dans le tableur si oui on retour un tavleur avec les cles
  };
  const enable = () => {
    if (!validate()) {
      return false;
    }
    return true;
  };
  // ajout d'un nouveau patient
  const handleSubmit = async () => {
    const tmp = formatDate(formData.dateDeNaissance); //conversion de la date de naissance

    setFormData({ ...formData, trueFormDate: tmp });
    console.log(formData.trueFormDate);

    if (validate()) {
      // ici les donnees ne contiennent pas d'erreur
      try {
        nom = await addPatients(formData);
        console.log(nom);

        setTimeout(() => showSnackBar(), 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // !------------------------eleemts de retour--------------------------------------------------------

  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, { margin: 16 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* definition du header */}
      <CustomHeader title={route.name} origin="Main" />
      {/* formulaire en question */}

      <PaperProvider>
        {/* snack de validation */}
        <CustomSnackbar
          visible={visibleSnack}
          onDismiss={() => setVisibleSnack(false)}
          message="Enregistrement reussie !"
        />
        <ScrollView style={styles.formContainer}>
          <Text style={globalStyles.subHeader}>Informations Personnel (*)</Text>
          <Divider style={{ marginVertical: 10 }} />
          <TextInput
            label="Nom"
            mode="outlined"
            onChangeText={(text) => setFormData({ ...formData, nom: text })}
            value={formData.nom}
            style={[styles.input]}
            activeOutlineColor={erros.nom ? colors.erros : colors.bleuMoyen}
            outlineColor={erros.nom ? colors.erros : colors.grisMoyen}
            onBlur={() => {
              if (!formData.nom) {
                setErros((prevErros) => ({
                  ...prevErros,
                  nom: validation.nom,
                }));
              } else {
                setErros((prevErros) => ({ ...prevErros, nom: "" }));
              }
            }}
          />
          {erros.nom && <Text style={styles.errorText}>{erros.nom}</Text>}
          <TextInput
            label="Prenom"
            mode="outlined"
            onChangeText={(text) => setFormData({ ...formData, prenom: text })}
            value={formData.prenom}
            style={styles.input}
            activeOutlineColor={erros.prenom ? colors.erros : colors.bleuMoyen}
            outlineColor={erros.prenom ? colors.erros : colors.grisMoyen}
            onBlur={() => {
              if (!formData.prenom) {
                setErros((prevErros) => ({
                  ...prevErros,
                  prenom: validation.prenom,
                }));
              } else {
                setErros((prevErros) => ({ ...prevErros, prenom: "" }));
              }
            }}
          />
          {erros.prenom && <Text style={styles.errorText}>{erros.prenom}</Text>}
          <View>
            <TouchableOpacity
              style={[
                globalStyles.button,
                { backgroundColor: colors.grisMoyen },
              ]}
              onPress={() => showModal(true)}
            >
              <Text style={globalStyles.buttonText}>
                {formData.sexe === "M" ? "Homme" : "Femme"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* definition modal de selectrion du sex */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{ backgroundColor: colors.grisClair }}
            >
              <Picker
                selectedValue={formData.sexe}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, sexe: itemValue })
                }
              >
                <Picker.Item label="Homme" value="M" />
                <Picker.Item label="Femme" value="F" />
              </Picker>
            </Modal>
          </Portal>
          <TextInput
            label="Telephone"
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            value={formData.phone}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
            activeOutlineColor={erros.phone ? colors.erros : colors.bleuMoyen}
            outlineColor={erros.phone ? colors.erros : colors.grisMoyen}
            onBlur={() => {
              if (!formData.phone) {
                setErros((prevErros) => ({
                  ...prevErros,
                  phone: validation.phone,
                }));
              } else if (
                !/[0-9]/.test(formData.phone) ||
                formData.phone.length < 9
              ) {
                setErros((prevErros) => ({
                  ...prevErros,
                  phone: "Le numro doit contenir 9 chifferes dans 0-9",
                }));
              } else {
                setErros((prevErros) => ({ ...prevErros, phone: "" }));
              }
            }}
          />
          {erros.phone && <Text style={styles.errorText}>{erros.phone}</Text>}
          <TextInput
            label="Email"
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            value={formData.email}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            activeOutlineColor={erros.email ? colors.erros : colors.bleuMoyen}
            outlineColor={erros.email ? colors.erros : colors.grisMoyen}
            onBlur={() => {
              if (!formData.email) {
                setErros((prevErrors) => ({
                  ...prevErrors,
                  email: "L'email est requis",
                }));
              } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                setErros((prevErrors) => ({
                  ...prevErrors,
                  email: "Email invalide",
                }));
              } else {
                setErros((prevErrors) => ({ ...prevErrors, email: "" }));
              }
            }}
          />
          {erros.email && <Text style={styles.errorText}>{erros.email}</Text>}
          <TextInput
            label="Adresse"
            onChangeText={(text) => setFormData({ ...formData, adresse: text })}
            value={formData.adresse}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={erros.adresse ? colors.erros : colors.bleuMoyen}
            outlineColor={erros.adresse ? colors.erros : colors.grisMoyen}
            onBlur={() => {
              if (!formData.adresse) {
                setErros((prevErros) => ({
                  ...prevErros,
                  adresse: validation.adresse,
                }));
              } else {
                setErros((prevErros) => ({ ...prevErros, adresse: "" }));
              }
            }}
          />
          {erros.adresse && (
            <Text style={styles.errorText}>{erros.adresse}</Text>
          )}
          <View style={[styles.datepickerContainer]}>
            <Text style={[globalStyles.buttonText]}>Date de naissance !</Text>
            {
              <DateTimePicker
                mode="date"
                display="default"
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    dateDeNaissance: formatDate(text),
                  })
                }
                value={formData.dateDeNaissance}
                style={{
                  backgroundColor: colors.grisMoyen,
                }}
              />
            }
          </View>
          <Text style={globalStyles.subHeader}>Informations Medical (*)</Text>
          <Divider style={{ marginVertical: 10 }} />
          <TextInput
            label="Temperature"
            onChangeText={(text) =>
              setFormData({ ...formData, temperature: text })
            }
            value={formData.temperature}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            activeOutlineColor={colors.bleuMoyen}
          />
          <TextInput
            label="Poids"
            onChangeText={(text) => setFormData({ ...formData, poids: text })}
            value={formData.poids}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            activeOutlineColor={colors.bleuMoyen}
          />
          <TextInput
            label="Taille"
            onChangeText={(text) => setFormData({ ...formData, taille: text })}
            value={formData.taille}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            activeOutlineColor={colors.bleuMoyen}
          />
          <TextInput
            label="Tension"
            onChangeText={(text) => setFormData({ ...formData, tension: text })}
            value={formData.tension}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            activeOutlineColor={colors.bleuMoyen}
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={globalStyles.btn}
            // disabled={enable} //on deactive le bouttons s'il y'a des eerreur
            textColor={enable ? colors.white : colors.grisMoyen}
          >
            Enregister
          </Button>
        </ScrollView>
      </PaperProvider>
    </KeyboardAvoidingView>
  );
};

export default AddPatients;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.white,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formContainer: {
    // backgroundColor: "red",
  },
  menu: {
    width: 200,
    backgroundColor: colors.white,
    // elevation: 8,
  },
  liste: {
    backgroundColor: colors.grisClair,
  },
  input: {
    marginVertical: 10,
    backgroundColor: colors.white,
    borderColor: colors.grisClair,
  },
  inputFocused: {
    borderColor: colors.grisMoyen,
  },
  datepickerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.grisMoyen,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    marginVertical: 7,
  },
  inputErros: {
    borderColor: colors.white,
  },
  errorText: {
    color: colors.erros,
    fontSize: 10,
    fontFamily: "Roboto_400Regular_Italic",
    fontStyle: "italic",
    marginBottom: 12,
  },
});
