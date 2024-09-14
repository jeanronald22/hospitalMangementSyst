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
import CustomHeader from "../../components/CustomHeader";
import CustomSnackbar from "../../components/CustomSnackbar";
import { colors } from "../../assets/colors/colors";
import globalStyles from "../../assets/syles generaux/globalStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Provider } from "react-native-paper";
import CustomInputPaper from "../../components/CustomInputPaper";
import DatePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { getData } from "../../services/stockage";
import { addPatient } from "../../api/dataService";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import CalenderModal from "../../components/CalenderModal";

const AddPatients = ({ route }) => {
  const patient = route.params;
  // ! definition des state
  const [formData, setFormaData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    telephone: "",
    adresse: "",
    adresseEmail: "",
    sexe: "",
    groupeSanguin: "",
    antecedentMedicaux: "",
    medicamentEnCour: "",
    alergie: "",
    poids: 0,
    taille: 0,
    tension: 0,
    pouls: 0,
  });
  const [visible, setVisible] = useState(false);

  //! definition des fonctions
  //  fonction de stockage dans la base de donnees
  const handlePresse = async () => {
    try {
      const status = await addPatient(formData);
      setTimeout(() => {
        setVisible(true);
      }, 3000);
      setVisible(false);
    } catch (error) {
      console.log("Erreur lors de l'ajout du patient", error);
    }
  };
  const showSnack = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader
        title="Ajouter Un Patient"
        subtitle="Remplissez les détails ci-dessous pour ajouter un patient"
        origin="Patients"
      />
      <CustomSnackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        message="Ajout patient reussi"
      />

      <ScrollView style={globalStyles.contain}>
        <View style={styles.personnalInformation}>
          <View style={styles.entete}>
            <MaterialIcons
              name="person"
              size={30}
              color={colors.bleuMoyen}
              style={{ marginBottom: 8, marginHorizontal: 10 }}
            />
            <Text style={globalStyles.subHeader}>Informations Personnel</Text>
          </View>
          {/* definition des champs proprement dit  */}
          <Provider>
            <CustomInputPaper
              label="Nom"
              value={formData.nom}
              style={styles.input}
              onChangeText={(text) => setFormaData({ ...formData, nom: text })}
            />
            <CustomInputPaper
              label="Prenom"
              value={formData.prenom}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, prenom: text })
              }
            />
            <CustomInputPaper
              label="Téléphone"
              value={formData.telephone}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, telephone: text })
              }
              type="phone-pad"
            />
            <CustomInputPaper
              label="Adresse"
              value={formData.adresse}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, adresse: text })
              }
            />
            <CustomInputPaper
              label="Adresse Email"
              value={formData.adresseEmail}
              style={styles.input}
              onChangeText={(text) =>
                setFormaData({ ...formData, adresseEmail: text })
              }
              type="email-address"
            />
            {/* <CustomInputPaper
              label="Sexe"
              placeholder="Masculin / Feminin"
              value={formData.sexe}
              onChangeText={(text) => setFormaData({ ...formData, sexe: text })}
              style={styles.input}
            /> */}
            <Picker
              selectedValue={formData.sexe}
              mode="dropdown"
              onValueChange={(text) =>
                setFormaData({ ...formData, sexe: text })
              }
            >
              <Picker.Item label="Masculin" value="Masculin" />
              <Picker.Item label="Feminin" value="Feminin" />
            </Picker>
            <View style={styles.date}>
              <CustomInputPaper
                // editable={false}
                label="date naissance"
                value={formData.dateNaissance}
                style={styles.input}
                editable={false}
              />

              <TouchableOpacity style={styles.calendar}>
                <MaterialIcons
                  name="calendar-month"
                  size={35}
                  color={colors.bleuMoyen}
                />
              </TouchableOpacity>
              <View>
                <Calendar
                  onDayPress={(day) => {
                    setFormaData({
                      ...formData,
                      dateNaissance: day.dateString,
                    });
                  }}
                  markedDates={{
                    [formData.dateNaissance]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: colors.bleuMoyen,
                    },
                  }}
                />
              </View>
            </View>
            <View style={styles.entete}>
              <MaterialIcons
                name="my-library-books"
                size={30}
                color={colors.bleuMoyen}
                style={{ marginBottom: 8, marginHorizontal: 10 }}
              />

              <Text style={globalStyles.subHeader}>Informations Medical</Text>
            </View>
            <CustomInputPaper
              label="Groupe Sanguin"
              value={formData.groupeSanguin}
              onChangeText={(text) =>
                setFormaData({ ...formData, groupeSanguin: text })
              }
              style={styles.input}
            />
            <CustomInputPaper
              label="Alergies"
              value={formData.alergie}
              onChangeText={(text) =>
                setFormaData({ ...formData, alergie: text })
              }
              style={styles.input}
              multiline={true}
            />
            <CustomInputPaper
              label="Medicaments en cours"
              value={formData.medicamentEnCour}
              onChangeText={(text) =>
                setFormaData({ ...formData, medicamentEnCour: text })
              }
              style={styles.input}
              multiline={true}
            />
            <CustomInputPaper
              label="Antecedent medicaux"
              value={formData.antecedentMedicaux}
              style={styles.input}
              multiline={true}
              onChangeText={(text) =>
                setFormaData({ ...formData, antecedentMedicaux: text })
              }
            />
            {/* definition du btn de validation*/}
            <CustomInputPaper
              label="Poids"
              value={formData.poids}
              onChangeText={(text) =>
                setFormaData({ ...formData, poids: text })
              }
              style={styles.input}
              type="numeric"
            />
            <CustomInputPaper
              label="Taille"
              value={formData.taille}
              onChangeText={(text) =>
                setFormaData({ ...formData, taille: text })
              }
              style={styles.input}
              type="numeric"
            />
            <CustomInputPaper
              label="Tension arterielle"
              value={formData.tension}
              onChangeText={(text) =>
                setFormaData({ ...formData, tension: text })
              }
              style={styles.input}
              type="numeric"
            />
            <CustomInputPaper
              label="poules"
              value={formData.pouls}
              onChangeText={(text) =>
                setFormaData({ ...formData, pouls: text })
              }
              style={styles.input}
              type="numeric"
            />

            <Button
              mode="contained"
              style={[globalStyles.btn, { marginVertical: 20 }]}
              onPress={handlePresse}
            >
              <Text style={globalStyles.buttonText}>Enregistré</Text>
            </Button>
          </Provider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPatients;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bleuClaire,
    marginBottom: 30,
  },
  entete: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: colors.grisClair,
  },
  date: {},
  calendar: {
    position: "absolute",
    right: 0,
    marginRight: 20,
    top: "25%",
  },
});
