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
import CustomHeader from "../../components/CustomHeader";
import {
  PaperProvider,
  Divider,
  TextInput,
  Portal,
  Modal,
  Button,
  Provider,
  Menu,
} from "react-native-paper";
import { colors } from "../../assets/colors/colors";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomSnackbar from "../../components/CustomSnackbar";
import { addPatients, updatePatient } from "../../api/dataService";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

const UpdatePatients = ({ route, navigation }) => {
  // recuperation des inofrmations sur le patient
  const patient = route.params;

  // !-------------------------------definitin des states ------------------------
  const [formData, setFormData] = useState({
    nom: patient.nom,
    prenom: patient.prenom,
    adresse: patient.adresse,
    phone: patient.telephone,
    email: patient.adresseEmail,
    sexe: patient.sexe,
    dateDeNaissance: new Date(patient.dateNaissance),
    trueFormDate: "",
  });
  const [visible, setVisible] = useState(false);
  const [erros, setErros] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    phone: "",
    email: "",
  });
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [show, setShow] = useState(false);
  // definitions des regles de validation de notre formulaire
  const validation = {
    nom: "Nom  requis",
    prenom: "Prénom  requis",
    adresse: "Adresse est requise",
    phone: "Téléphone est requis",
    email: "Email est requis",
  };
  // !-----------------------definirtion des fonctions--------------------------------
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showSnackBar = () => {
    setVisibleSnack(true);
    // il disparait apres 3 seconde pour plus d'info
    setTimeout(() => setVisibleSnack(false), 3000);
  };
  const onChange = (event, selectedDate) => {
    currentDate = selectedDate || formData.dateDeNaissance;
    setShow(false);
    setFormData({ ...formData, dateDeNaissance: currentDate });
  };

  const formatDate = (date) => {
    dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
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
  const handleSubmit = () => {
    const tmp = new Date(formData.dateDeNaissance); //conversion de la date de naissance
    const tmp1 = format(tmp, "yyyy-MM-dd");
    setFormData({ ...formData, trueFormDate: tmp1 });
    console.log(formData.trueFormDate);

    if (validate()) {
      // ici les donnees ne contiennent pas d'erreur
      try {
        // addPatients(formData);
        updatePatient(formData, patient.id);
        setTimeout(() => showSnackBar(), 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={[globalStyles.container, { margin: 16 }]}>
      {/* definirion du contenue */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.elementsContainer}
      >
        <PaperProvider>
          <ScrollView
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={28}
                  color={colors.blueFonce}
                />
              </TouchableOpacity>
            </View>
            <CustomSnackbar
              visible={visibleSnack}
              onDismiss={() => setVisibleSnack(false)}
              message="Modification reussie !"
            />
            <TextInput
              label="Nom"
              mode="outlined"
              onChangeText={(text) => setFormData({ ...formData, nom: text })}
              value={formData.nom}
              style={styles.input}
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
              onChangeText={(text) =>
                setFormData({ ...formData, prenom: text })
              }
              value={formData.prenom}
              style={styles.input}
              activeOutlineColor={
                erros.prenom ? colors.erros : colors.bleuMoyen
              }
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
            {erros.prenom && (
              <Text style={styles.errorText}>{erros.prenom}</Text>
            )}

            {/* definiton du modal de selection du sexe */}

            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <View>
                  <TextInput
                    label={"Sexe"}
                    mode="outlined"
                    value={formData.sexe}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", left: "90%", top: "30%" }}
                    onPress={() => setVisible(true)}
                  >
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={28}
                      color={colors.bleuClaire}
                    />
                  </TouchableOpacity>
                </View>
              }
            >
              <Menu.Item
                title="Masculin"
                testID="items"
                onPress={() => {
                  setFormData({ ...formData, sexe: "Masculin" });
                  setVisible(false);
                }}
              />
              <Menu.Item
                title="Feminin "
                testID="item"
                onPress={() => {
                  setFormData({ ...formData, sexe: "Feminin" });
                  setVisible(false);
                }}
              />
            </Menu>
            <TextInput
              label="Telephone"
              onChangeText={(item) => setFormData({ ...formData, phone: item })}
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
              onChangeText={(text) =>
                setFormData({ ...formData, adresse: text })
              }
              value={formData.adresse}
              mode="outlined"
              style={styles.input}
              activeOutlineColor={
                erros.adresse ? colors.erros : colors.bleuMoyen
              }
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
            {/* definiton de la date de naissance */}
            <View>
              <TextInput
                label={"Date de naissance"}
                onChangeText={(date) => {
                  setFormData({ ...formData, dateDeNaissance: date });
                }}
                mode="outlined"
                value={new Date(formData.dateDeNaissance).toDateString()}
                style={styles.input}
              />
              <TouchableOpacity
                style={{ position: "absolute", left: "90%", top: "30%" }}
                onPress={() => setShow(true)}
              >
                <MaterialIcons
                  name="calendar-month"
                  size={28}
                  color={colors.bleuClaire}
                />
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                testID="datepicker"
                mode="date"
                display="default"
                onChange={onChange}
                value={formData.dateDeNaissance}
                is24Hour={true}
              />
            )}

            {/* definiton des buttons d'actions| validation ou annulation */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={{
                  // marginBottom: 10,
                  backgroundColor: colors.bleuMoyen,
                  flex: 1,
                  marginHorizontal: 4,
                }}
                onPress={() => {
                  handleSubmit();
                }}
              >
                Mettre à jour
              </Button>
              <Button
                style={{
                  borderColor: colors.erros,
                  flex: 1,
                  marginHorizontal: 4,
                }}
                textColor={colors.erros}
                outlineColor={colors.erros}
                mode="outlined"
                onPress={() => {
                  navigation.goBack();
                }}
              >
                Annuler
              </Button>
            </View>
          </ScrollView>
        </PaperProvider>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UpdatePatients;

const styles = StyleSheet.create({
  elementsContainer: {
    flex: 1,
  },
  input: {
    marginVertical: 10,
    backgroundColor: colors.white,
    borderColor: colors.grisClair,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  errorText: {
    color: colors.erros,
    fontSize: 10,
    fontFamily: "Roboto_400Regular_Italic",
    fontStyle: "italic",
    marginBottom: 12,
  },
});
